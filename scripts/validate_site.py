#!/usr/bin/env python3
"""Validate the static site and the contract of every paper HTML page."""

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REQUIRED_SITE_FILES = (
    "index.html",
    "assets/site.css",
    "assets/catalog.js",
    "assets/paper-reading.js",
    "papers/catalog.json",
)
REQUIRED_IDS = {
    "thesis",
    "concepts",
    "problem-chain",
    "mechanism",
    "evidence",
    "limits",
    "sources",
    "paper-mark-panel",
    "paper-comments",
}
REQUIRED_CLASSES = {
    "paper-doc",
    "paper-sidebar",
    "paper-main",
    "paper-rail",
    "paper-mark-panel",
    "paper-comment-panel",
    "paper-comment-new",
}
SECRET_PATTERNS = (
    re.compile(r"\bsk-[A-Za-z0-9_-]{20,}\b"),
    re.compile(r"\bAIza[0-9A-Za-z_-]{30,}\b"),
)


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.classes = set()
        self.meta = {}
        self.scripts = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if values.get("id"):
            self.ids.add(values["id"])
        self.classes.update((values.get("class") or "").split())
        if tag == "meta":
            name = values.get("name") or values.get("property")
            if name:
                self.meta.setdefault(name, []).append(values.get("content", ""))
        if tag == "script" and values.get("src"):
            self.scripts.append(values["src"])


def validate_page(path):
    errors = []
    source = path.read_text(encoding="utf-8")
    parser = PageParser()
    parser.feed(source)

    missing_ids = sorted(REQUIRED_IDS - parser.ids)
    missing_classes = sorted(REQUIRED_CLASSES - parser.classes)
    if missing_ids:
        errors.append(f"missing ids: {', '.join(missing_ids)}")
    if missing_classes:
        errors.append(f"missing classes: {', '.join(missing_classes)}")
    for name in ("citation_title", "citation_author", "description", "paper:read_at"):
        if not any(parser.meta.get(name, [])):
            errors.append(f"missing metadata: {name}")
    if not any(src.endswith("assets/paper-reading.js") for src in parser.scripts):
        errors.append("missing shared paper-reading.js")
    if 'data-page-kind="paper"' not in source:
        errors.append('body must include data-page-kind="paper"')
    if "paperReadingMarks" in source or "paperReadingComments" in source:
        errors.append("page must use the shared runtime instead of duplicating it inline")
    return errors


def main():
    errors = []
    for relative in REQUIRED_SITE_FILES:
        if not (ROOT / relative).is_file():
            errors.append(f"missing site file: {relative}")

    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in {".html", ".js"}:
            continue
        source = path.read_text(encoding="utf-8")
        if any(pattern.search(source) for pattern in SECRET_PATTERNS):
            errors.append(f"possible API key in {path.relative_to(ROOT)}")

    pages = sorted((ROOT / "papers").glob("*/index.html"))
    for page in pages:
        for error in validate_page(page):
            errors.append(f"{page.relative_to(ROOT)}: {error}")

    catalog_path = ROOT / "papers/catalog.json"
    if catalog_path.exists():
        try:
            catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
            catalog_hrefs = {item["href"] for item in catalog.get("papers", [])}
            page_hrefs = {
                page.relative_to(ROOT).as_posix()[: -len("index.html")]
                for page in pages
            }
            if catalog_hrefs != page_hrefs:
                errors.append("papers/catalog.json does not match paper pages")
        except (KeyError, TypeError, json.JSONDecodeError) as exc:
            errors.append(f"invalid papers/catalog.json: {exc}")

    if errors:
        for error in errors:
            print(f"ERROR: {error}", file=sys.stderr)
        return 1
    print(f"site ok: {len(pages)} paper page(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
