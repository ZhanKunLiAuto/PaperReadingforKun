#!/usr/bin/env python3
"""Build papers/catalog.json from metadata embedded in paper HTML pages."""

import argparse
import json
import sys
from html.parser import HTMLParser
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
PAPERS_ROOT = REPO_ROOT / "papers"
CATALOG_PATH = PAPERS_ROOT / "catalog.json"


class MetaParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.meta = {}

    def handle_starttag(self, tag, attrs):
        if tag != "meta":
            return
        values = dict(attrs)
        name = values.get("name") or values.get("property")
        content = values.get("content")
        if not name or content is None:
            return
        self.meta.setdefault(name, []).append(content.strip())


def first(meta, key, default=""):
    values = meta.get(key) or []
    return values[0] if values else default


def parse_page(page):
    parser = MetaParser()
    parser.feed(page.read_text(encoding="utf-8"))
    meta = parser.meta
    required = ("citation_title", "citation_author", "description", "paper:read_at")
    missing = [key for key in required if not first(meta, key)]
    if missing:
        joined = ", ".join(missing)
        raise ValueError(f"{page.relative_to(REPO_ROOT)} missing metadata: {joined}")

    relative = page.relative_to(REPO_ROOT).as_posix()
    href = relative[: -len("index.html")]
    keywords = first(meta, "keywords")
    tags = [
        value.strip()
        for value in keywords.replace("，", ",").split(",")
        if value.strip()
    ]
    publication_date = first(meta, "citation_publication_date")
    return {
        "slug": page.parent.name,
        "title": first(meta, "citation_title"),
        "authors": meta.get("citation_author", []),
        "publicationDate": publication_date,
        "readAt": first(meta, "paper:read_at"),
        "description": first(meta, "description"),
        "tags": tags,
        "sourceUrl": first(meta, "citation_public_url")
        or first(meta, "citation_pdf_url"),
        "href": href,
    }


def build_payload():
    pages = sorted(PAPERS_ROOT.glob("*/index.html"))
    papers = [parse_page(page) for page in pages]
    papers.sort(key=lambda item: (item["readAt"], item["title"]), reverse=True)
    updated_at = max((item["readAt"] for item in papers), default=None)
    return {"updatedAt": updated_at, "papers": papers}


def serialized(payload):
    return json.dumps(payload, ensure_ascii=False, indent=2) + "\n"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check", action="store_true", help="Fail when catalog.json is stale."
    )
    args = parser.parse_args()

    try:
        expected = serialized(build_payload())
    except (OSError, UnicodeError, ValueError) as exc:
        print(f"catalog error: {exc}", file=sys.stderr)
        return 1

    current = CATALOG_PATH.read_text(encoding="utf-8") if CATALOG_PATH.exists() else ""
    if args.check:
        if current != expected:
            print("papers/catalog.json is stale; run scripts/rebuild_catalog.py", file=sys.stderr)
            return 1
        print("catalog ok")
        return 0

    PAPERS_ROOT.mkdir(parents=True, exist_ok=True)
    CATALOG_PATH.write_text(expected, encoding="utf-8")
    print(f"wrote {CATALOG_PATH.relative_to(REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
