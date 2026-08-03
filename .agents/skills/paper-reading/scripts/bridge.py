#!/usr/bin/env python3
"""Local write-back bridge for paper annotations and personal comments.

Adapted from Agentchengfeng/paper-reading-skills (Apache-2.0). This version
preserves the original annotation flow and adds a separate comment endpoint,
multi-page repository routing, loopback-origin checks, and serialized writes.
"""

import argparse
import html
import json
import re
import threading
import uuid
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse


KIND_LABELS = {
    "term": "名词讲解",
    "logic": "逻辑梳理",
    "diagram": "作图理解",
}

BLOCK_RE = re.compile(
    r"\n(?P<indent>\s*)(?P<block><(?P<tag>p|li|h[1-6]|div)\b[^>]*>.*?</(?P=tag)>)",
    re.S,
)
TAG_RE = re.compile(r"<[^>]+>")
SVG_TEXT_RE = re.compile(
    r"(?P<open><text\b(?P<attrs>[^>]*)>)(?P<body>.*?)(?P<close></text>)",
    re.S,
)
ID_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$")
LOOPBACK_HOSTS = {"127.0.0.1", "localhost", "::1"}
MAX_BODY_BYTES = 64 * 1024


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def attr_escape(value):
    return html.escape(str(value or ""), quote=True)


def text_escape(value):
    return html.escape(str(value or ""), quote=False)


def multiline_escape(value):
    return "<br>".join(text_escape(value).splitlines())


def normalize_kind(kind):
    return kind if kind in KIND_LABELS else "logic"


def safe_anchor_id(item_id, prefix="paper-anchor"):
    safe = re.sub(r"[^A-Za-z0-9_-]+", "-", str(item_id or "")).strip("-")
    return f"{prefix}-{safe or 'item'}"


def normalize_text(value):
    return re.sub(r"\s+", " ", html.unescape(str(value or ""))).strip()


def visible_text(fragment):
    return normalize_text(TAG_RE.sub("", fragment))


def is_inside_generated_aside(source, start):
    last_question = source.rfind('<aside class="paper-question-marker"', 0, start)
    last_comment = source.rfind('<aside class="paper-comment"', 0, start)
    last_close = source.rfind("</aside>", 0, start)
    return max(last_question, last_comment) > last_close


def selected_candidates(selected):
    selected = normalize_text(selected)
    if not selected:
        return []

    candidates = [selected]
    parts = [
        part.strip()
        for part in re.split(r"(?<=[。；;.!?？])\s*", selected)
        if len(part.strip()) >= 12
    ]
    candidates.extend(parts)
    if len(selected) > 80:
        candidates.append(selected[:120].strip())
        candidates.append(selected[-120:].strip())

    escaped = []
    for value in candidates:
        escaped.extend((value, html.escape(value, quote=False)))

    seen = set()
    result = []
    for value in sorted(escaped, key=len, reverse=True):
        if value and value not in seen:
            seen.add(value)
            result.append(value)
    return result


def highlight_text_block(block, item, *, mode):
    item_id = str(item.get("id") or "")
    if mode == "comment":
        data_attribute = "data-comment-id"
        css_class = "comment-highlight"
        anchor_id = item.get("anchorId") or safe_anchor_id(
            item_id, "paper-comment-anchor"
        )
        extra_attribute = ""
    else:
        data_attribute = "data-mark-id"
        css_class = "annotation-highlight"
        anchor_id = item.get("anchorId") or safe_anchor_id(item_id)
        kind = normalize_kind(item.get("kind"))
        extra_attribute = f' data-mark-kind="{attr_escape(kind)}"'

    if item_id and f'{data_attribute}="{attr_escape(item_id)}"' in block:
        return block, False

    for candidate in selected_candidates(item.get("text")):
        index = block.find(candidate)
        if index == -1:
            continue
        span = (
            f'<span id="{attr_escape(anchor_id)}" class="{css_class}" '
            f'{data_attribute}="{attr_escape(item_id)}"{extra_attribute}>'
            f"{candidate}</span>"
        )
        return block[:index] + span + block[index + len(candidate) :], True

    if mode == "annotation":
        highlighted_svg, svg_changed = highlight_svg_text(block, item)
        if svg_changed:
            return highlighted_svg, True

    return block, False


def add_svg_text_marker(open_tag, item, *, with_anchor):
    mark_id = attr_escape(item.get("id"))
    kind = attr_escape(normalize_kind(item.get("kind")))
    anchor_id = attr_escape(item.get("anchorId") or safe_anchor_id(item.get("id")))

    if "svg-text-annotation-highlight" not in open_tag:
        if 'class="' in open_tag:
            open_tag = re.sub(
                r'class="([^"]*)"',
                r'class="\1 svg-text-annotation-highlight"',
                open_tag,
                count=1,
            )
        else:
            open_tag = open_tag[:-1] + ' class="svg-text-annotation-highlight">'

    extras = []
    if with_anchor and ' id="' not in open_tag:
        extras.append(f'id="{anchor_id}"')
    if 'data-mark-id="' not in open_tag:
        extras.append(f'data-mark-id="{mark_id}"')
    if 'data-mark-kind="' not in open_tag:
        extras.append(f'data-mark-kind="{kind}"')
    if extras:
        open_tag = open_tag[:-1] + " " + " ".join(extras) + ">"
    return open_tag


def highlight_svg_text(block, item):
    if "<svg" not in block or "<text" not in block:
        return block, False

    mark_id = str(item.get("id") or "")
    anchor_id = item.get("anchorId") or safe_anchor_id(mark_id)
    if anchor_id and f'id="{attr_escape(anchor_id)}"' in block:
        return block, False

    selected = normalize_text(item.get("text"))
    if not selected:
        return block, False

    matches = list(SVG_TEXT_RE.finditer(block))
    target_indexes = set()
    for index, match in enumerate(matches):
        text = visible_text(match.group("body"))
        if text and (text in selected or selected in text):
            target_indexes.add(index)

    if not target_indexes:
        selected_tokens = [
            token for token in re.split(r"\s+", selected) if len(token) >= 2
        ]
        for index, match in enumerate(matches):
            text = visible_text(match.group("body"))
            if text and any(token in text for token in selected_tokens):
                target_indexes.add(index)

    if not target_indexes:
        return block, False

    first_target = min(target_indexes)
    current_index = -1

    def replace(match):
        nonlocal current_index
        current_index += 1
        if current_index not in target_indexes:
            return match.group(0)
        open_tag = add_svg_text_marker(
            match.group("open"), item, with_anchor=current_index == first_target
        )
        return f'{open_tag}{match.group("body")}{match.group("close")}'

    return SVG_TEXT_RE.sub(replace, block), True


def find_section_bounds(source, section_id):
    section_start = source.find(f'<section id="{section_id}"')
    if section_start == -1:
        return None
    section_open_end = source.find(">", section_start)
    section_close = source.find("\n      </section>", section_open_end)
    if section_close == -1:
        close_match = re.search(r"\n\s*</section>", source[section_open_end:])
        section_close = section_open_end + close_match.start() if close_match else -1
    if section_close == -1:
        return None
    return section_start, section_close


def find_best_block(source, item, section_bounds):
    selected = normalize_text(item.get("text"))
    anchor_text = normalize_text(item.get("anchorText"))
    needles = [text for text in (selected, anchor_text) if text]
    if not needles:
        return None

    ranges = []
    if section_bounds:
        ranges.append(section_bounds)
    main_start = source.find('<main class="paper-main">')
    main_close = source.rfind("</main>")
    if main_start != -1 and main_close != -1:
        ranges.append((main_start, main_close))
    ranges.append((0, len(source)))

    used_ranges = set()
    for start, end in ranges:
        key = (start, end)
        if key in used_ranges:
            continue
        used_ranges.add(key)
        best = None
        for match in BLOCK_RE.finditer(source, start, end):
            block_start = match.start("block")
            block_end = match.end("block")
            if is_inside_generated_aside(source, block_start):
                continue
            block = match.group("block")
            block_text = visible_text(block)
            if not block_text:
                continue

            score = 0
            for needle in needles:
                if needle in block_text:
                    score = max(score, 100000 + len(needle))
                elif block_text in needle:
                    score = max(score, 50000 + len(block_text))
                elif needle[:48] and needle[:48] in block_text:
                    score = max(score, 10000 + len(needle[:48]))

            if score and (best is None or score > best["score"]):
                best = {
                    "start": block_start,
                    "end": block_end,
                    "block": block,
                    "score": score,
                }
        if best:
            return best
    return None


def build_question_block(item):
    kind = normalize_kind(item.get("kind"))
    mark_id = attr_escape(item.get("id"))
    anchor_id = attr_escape(item.get("anchorId") or safe_anchor_id(item.get("id")))
    label = KIND_LABELS[kind]
    question = text_escape(item.get("question") or "")
    supplement = (
        f'<span class="paper-question-marker__supplement">补充：{question}</span>'
        if question
        else ""
    )

    return f"""

        <aside class="paper-question-marker" data-question-id="{mark_id}" data-question-kind="{attr_escape(kind)}" data-anchor-id="{anchor_id}">
          <span class="paper-question-marker__action">{text_escape(label)}</span>
          {supplement}
        </aside>
"""


def build_comment_block(item, *, link_anchor=False):
    comment_id = attr_escape(item.get("id"))
    anchor_id = attr_escape(
        item.get("anchorId")
        or safe_anchor_id(item.get("id"), "paper-comment-anchor")
    )
    author = text_escape(item.get("author") or "我的评论")
    comment = multiline_escape(item.get("comment") or "")
    created_at = attr_escape(item.get("createdAt") or now_iso())
    date_label = text_escape(str(item.get("createdAt") or "")[:10])
    anchor_link = (
        f'<a class="paper-comment__anchor" href="#{anchor_id}">回到原文</a>'
        if link_anchor
        else ""
    )
    date_html = (
        f'<time datetime="{created_at}">{date_label}</time>' if date_label else ""
    )

    return f"""

        <aside id="paper-comment-{comment_id}" class="paper-comment" data-comment-id="{comment_id}" data-anchor-id="{anchor_id}">
          <header class="paper-comment__header">
            <strong>{author}</strong>
            <span class="paper-comment__meta">{date_html}{anchor_link}</span>
          </header>
          <p class="paper-comment__body">{comment}</p>
        </aside>
"""


def write_page(path, source):
    temporary = path.with_name(f".{path.name}.{uuid.uuid4().hex}.tmp")
    try:
        temporary.write_text(source, encoding="utf-8")
        temporary.chmod(path.stat().st_mode)
        temporary.replace(path)
    finally:
        if temporary.exists():
            temporary.unlink()


def insert_question_block(page_path, item):
    source = page_path.read_text(encoding="utf-8")
    mark_id = attr_escape(item.get("id"))
    if mark_id and f'data-question-id="{mark_id}"' in source:
        return {"inserted": False, "duplicate": True}

    section_id = str(item.get("sectionId") or "").strip() or "thesis"
    item["anchorId"] = item.get("anchorId") or safe_anchor_id(item.get("id"))
    question_block = build_question_block(item)
    section_bounds = find_section_bounds(source, section_id)
    target = find_best_block(source, item, section_bounds)

    if target:
        highlighted, highlighted_text = highlight_text_block(
            target["block"], item, mode="annotation"
        )
        updated = (
            source[: target["start"]]
            + highlighted
            + question_block
            + source[target["end"] :]
        )
        write_page(page_path, updated)
        return {
            "inserted": True,
            "sectionId": section_id,
            "placement": "after matched block",
            "highlighted": highlighted_text,
        }

    if section_bounds:
        _, section_close = section_bounds
        updated = source[:section_close] + question_block + source[section_close:]
        write_page(page_path, updated)
        return {
            "inserted": True,
            "sectionId": section_id,
            "placement": "section fallback",
        }

    fallback = re.search(r'\n\s*<section\s+id="paper-mark-panel"', source)
    if fallback:
        updated = source[: fallback.start()] + question_block + source[fallback.start() :]
        write_page(page_path, updated)
        return {
            "inserted": True,
            "sectionId": None,
            "fallback": "before paper-mark-panel",
        }

    return {"inserted": False, "reason": f"section not found: {section_id}"}


def insert_comment_block(page_path, item):
    source = page_path.read_text(encoding="utf-8")
    comment_id = attr_escape(item.get("id"))
    if comment_id and f'data-comment-id="{comment_id}"' in source:
        return {"inserted": False, "duplicate": True}

    section_id = str(item.get("sectionId") or "").strip() or "paper-comments"
    item["anchorId"] = item.get("anchorId") or safe_anchor_id(
        item.get("id"), "paper-comment-anchor"
    )
    section_bounds = find_section_bounds(source, section_id)
    target = find_best_block(source, item, section_bounds) if item.get("text") else None

    if target:
        highlighted, highlighted_text = highlight_text_block(
            target["block"], item, mode="comment"
        )
        comment_block = build_comment_block(item, link_anchor=highlighted_text)
        updated = (
            source[: target["start"]]
            + highlighted
            + comment_block
            + source[target["end"] :]
        )
        write_page(page_path, updated)
        return {
            "inserted": True,
            "sectionId": section_id,
            "placement": "after matched block",
            "highlighted": highlighted_text,
        }

    comment_block = build_comment_block(item)
    if section_bounds:
        _, section_close = section_bounds
        updated = source[:section_close] + comment_block + source[section_close:]
        write_page(page_path, updated)
        return {
            "inserted": True,
            "sectionId": section_id,
            "placement": "section fallback",
        }

    fallback = re.search(r'\n\s*</section>\s*\n\s*</aside>', source)
    if fallback:
        updated = source[: fallback.start()] + comment_block + source[fallback.start() :]
        write_page(page_path, updated)
        return {
            "inserted": True,
            "sectionId": None,
            "fallback": "paper rail",
        }

    return {"inserted": False, "reason": f"section not found: {section_id}"}


def append_jsonl(path, item):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(item, ensure_ascii=False) + "\n")


def read_jsonl(path):
    rows = []
    if not path.exists():
        return rows
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        try:
            rows.append(json.loads(line))
        except json.JSONDecodeError:
            rows.append({"raw": line})
    return rows


def resolve_page_path(server, item):
    if server.page_path:
        page = server.page_path.resolve()
    else:
        route = str(item.get("pagePath") or "").strip()
        if not route:
            route = urlparse(str(item.get("url") or "")).path
        route = unquote(route).split("?", 1)[0].lstrip("/")
        if not route:
            route = "index.html"
        if route.endswith("/") or not Path(route).suffix:
            route = f"{route.rstrip('/')}/index.html" if route else "index.html"
        root = server.site_root.resolve()
        page = (root / route).resolve()
        try:
            page.relative_to(root)
        except ValueError as exc:
            raise ValueError("page path escapes site root") from exc

    if page.suffix.lower() not in {".html", ".htm"}:
        raise ValueError("target page must be HTML")
    if not page.is_file():
        raise ValueError(f"target page not found: {page}")
    return page


def clean_item(item, *, comment=False):
    if not isinstance(item, dict):
        raise ValueError("JSON body must be an object")
    item_id = str(item.get("id") or "").strip()
    if not ID_RE.fullmatch(item_id):
        raise ValueError("id is required and must use safe characters")

    limits = {
        "text": 4000,
        "anchorText": 8000,
        "sectionId": 128,
        "sectionTitle": 500,
        "pageTitle": 1000,
        "url": 4000,
        "pagePath": 2000,
        "author": 200,
        "question": 4000,
        "comment": 10000,
    }
    cleaned = dict(item)
    cleaned["id"] = item_id
    for key, limit in limits.items():
        value = str(cleaned.get(key) or "").strip()
        if len(value) > limit:
            raise ValueError(f"{key} is too long")
        cleaned[key] = value

    if comment:
        if not cleaned["comment"]:
            raise ValueError("comment is required")
        cleaned["anchorId"] = str(
            cleaned.get("anchorId")
            or safe_anchor_id(item_id, "paper-comment-anchor")
        )
    else:
        if not cleaned["text"]:
            raise ValueError("selected text is required")
        cleaned["kind"] = normalize_kind(cleaned.get("kind"))
        cleaned["anchorId"] = str(
            cleaned.get("anchorId") or safe_anchor_id(item_id)
        )
    cleaned["createdAt"] = str(cleaned.get("createdAt") or now_iso())
    return cleaned


class PaperBridgeHandler(BaseHTTPRequestHandler):
    server_version = "PaperReadingBridge/3.0"

    def origin_allowed(self):
        origin = self.headers.get("Origin")
        if not origin:
            return True
        parsed = urlparse(origin)
        return parsed.scheme in {"http", "https"} and parsed.hostname in LOOPBACK_HOSTS

    def end_headers(self):
        origin = self.headers.get("Origin")
        if origin and self.origin_allowed():
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def write_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        if not self.origin_allowed():
            self.write_json({"ok": False, "error": "origin not allowed"}, status=403)
            return
        self.write_json({"ok": True})

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/healthz":
            self.write_json(
                {
                    "ok": True,
                    "page": str(self.server.page_path) if self.server.page_path else None,
                    "siteRoot": str(self.server.site_root)
                    if self.server.site_root
                    else None,
                    "annotationLog": str(self.server.log_path),
                    "commentLog": str(self.server.comment_log_path),
                }
            )
            return
        if path == "/requests":
            self.write_json(
                {"ok": True, "requests": read_jsonl(self.server.log_path)}
            )
            return
        if path == "/comments":
            self.write_json(
                {
                    "ok": True,
                    "comments": read_jsonl(self.server.comment_log_path),
                }
            )
            return
        self.write_json({"ok": False, "error": "not found"}, status=404)

    def read_payload(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError as exc:
            raise ValueError("invalid Content-Length") from exc
        if length <= 0 or length > MAX_BODY_BYTES:
            raise ValueError("request body must be between 1 byte and 64 KiB")
        raw = self.rfile.read(length).decode("utf-8")
        try:
            return json.loads(raw)
        except json.JSONDecodeError as exc:
            raise ValueError(f"bad json: {exc.msg}") from exc

    def do_POST(self):
        if not self.origin_allowed():
            self.write_json({"ok": False, "error": "origin not allowed"}, status=403)
            return

        path = urlparse(self.path).path
        if path not in {self.server.annotation_endpoint, self.server.comment_endpoint}:
            self.write_json({"ok": False, "error": "not found"}, status=404)
            return

        is_comment = path == self.server.comment_endpoint
        try:
            item = clean_item(self.read_payload(), comment=is_comment)
            with self.server.write_lock:
                page_path = resolve_page_path(self.server, item)
                item["receivedAt"] = now_iso()
                item["status"] = "written"
                if is_comment:
                    insert_result = insert_comment_block(page_path, item)
                    log_path = self.server.comment_log_path
                else:
                    insert_result = insert_question_block(page_path, item)
                    log_path = self.server.log_path
                item["pagePath"] = str(page_path)
                item["insertResult"] = insert_result
                item["handledAt"] = (
                    now_iso() if insert_result.get("inserted") else None
                )
                append_jsonl(log_path, item)
        except (OSError, UnicodeError, ValueError) as exc:
            self.write_json({"ok": False, "error": str(exc)}, status=422)
            return

        self.write_json(
            {
                "ok": True,
                "item": item,
                "reload": bool(insert_result.get("inserted")),
            }
        )

    def log_message(self, format, *args):
        print(
            f"[{self.log_date_time_string()}] {self.address_string()} {format % args}"
        )


class PaperBridgeServer(ThreadingHTTPServer):
    def __init__(
        self,
        server_address,
        handler_class,
        *,
        annotation_endpoint,
        comment_endpoint,
        page_path,
        site_root,
        log_path,
        comment_log_path,
    ):
        super().__init__(server_address, handler_class)
        self.annotation_endpoint = annotation_endpoint
        self.comment_endpoint = comment_endpoint
        self.page_path = Path(page_path).expanduser() if page_path else None
        self.site_root = Path(site_root).expanduser() if site_root else None
        self.log_path = Path(log_path).expanduser()
        self.comment_log_path = Path(comment_log_path).expanduser()
        self.write_lock = threading.Lock()


def main():
    parser = argparse.ArgumentParser(
        description="Paper reading local annotation and comment bridge."
    )
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8766)
    parser.add_argument("--endpoint", default="/__paper_annotation")
    parser.add_argument("--comment-endpoint", default="/__paper_comment")
    target = parser.add_mutually_exclusive_group(required=True)
    target.add_argument("--page", help="Single HTML file to update.")
    target.add_argument(
        "--site-root", help="Repository root used to resolve multiple HTML pages."
    )
    parser.add_argument("--log", default="data/annotation_requests.jsonl")
    parser.add_argument("--comment-log", default="data/comments.jsonl")
    args = parser.parse_args()

    server = PaperBridgeServer(
        (args.host, args.port),
        PaperBridgeHandler,
        annotation_endpoint=args.endpoint,
        comment_endpoint=args.comment_endpoint,
        page_path=args.page,
        site_root=args.site_root,
        log_path=args.log,
        comment_log_path=args.comment_log,
    )
    print(f"Annotation: http://{args.host}:{args.port}{args.endpoint}")
    print(f"Comment: http://{args.host}:{args.port}{args.comment_endpoint}")
    print(f"Health: http://{args.host}:{args.port}/healthz")
    print(f"Target: {Path(args.page or args.site_root).expanduser()}")
    server.serve_forever()


if __name__ == "__main__":
    main()
