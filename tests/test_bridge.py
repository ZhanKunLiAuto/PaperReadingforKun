import importlib.util
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace


ROOT = Path(__file__).resolve().parents[1]
BRIDGE_PATH = ROOT / ".agents/skills/paper-reading/scripts/bridge.py"
SPEC = importlib.util.spec_from_file_location("paper_bridge", BRIDGE_PATH)
BRIDGE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(BRIDGE)


PAGE = """<!doctype html>
<html lang="zh-CN">
  <body data-page-kind="paper">
    <div class="paper-doc">
      <main class="paper-main">
      <section id="thesis">
        <h2>研究目的</h2>
        <p>这段正文用于验证划线写回和评论写回。</p>
      </section>
      </main>
      <aside class="paper-rail">
      <section id="paper-mark-panel" class="paper-mark-panel">
      </section>
      <section id="paper-comments" class="paper-comment-panel">
      </section>
      </aside>
    </div>
  </body>
</html>
"""


class BridgeTests(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.root = Path(self.temp_dir.name)
        self.page = self.root / "papers/demo/index.html"
        self.page.parent.mkdir(parents=True)
        self.page.write_text(PAGE, encoding="utf-8")

    def tearDown(self):
        self.temp_dir.cleanup()

    def test_annotation_preserves_three_kind_contract(self):
        item = BRIDGE.clean_item(
            {
                "id": "mark-1",
                "kind": "term",
                "text": "划线写回",
                "anchorText": "这段正文用于验证划线写回和评论写回。",
                "question": "这里是什么意思？",
                "sectionId": "thesis",
            }
        )
        result = BRIDGE.insert_question_block(self.page, item)
        source = self.page.read_text(encoding="utf-8")

        self.assertTrue(result["inserted"])
        self.assertIn('class="annotation-highlight"', source)
        self.assertIn('data-question-kind="term"', source)
        self.assertIn("名词讲解", source)

    def test_comment_is_escaped_and_written_next_to_selection(self):
        item = BRIDGE.clean_item(
            {
                "id": "comment-1",
                "text": "评论写回",
                "anchorText": "这段正文用于验证划线写回和评论写回。",
                "comment": "先保留这个判断。<script>alert(1)</script>",
                "author": "Kun",
                "sectionId": "thesis",
                "createdAt": "2026-08-03T12:00:00+00:00",
            },
            comment=True,
        )
        result = BRIDGE.insert_comment_block(self.page, item)
        source = self.page.read_text(encoding="utf-8")

        self.assertTrue(result["inserted"])
        self.assertIn('class="comment-highlight"', source)
        self.assertIn('class="paper-comment"', source)
        self.assertIn("&lt;script&gt;alert(1)&lt;/script&gt;", source)
        self.assertNotIn("<script>alert(1)</script>", source)

    def test_site_root_cannot_escape(self):
        server = SimpleNamespace(page_path=None, site_root=self.root)
        with self.assertRaisesRegex(ValueError, "escapes site root"):
            BRIDGE.resolve_page_path(server, {"pagePath": "/../outside.html"})

    def test_site_root_resolves_directory_index(self):
        server = SimpleNamespace(page_path=None, site_root=self.root)
        resolved = BRIDGE.resolve_page_path(
            server, {"pagePath": "/papers/demo/"}
        )
        self.assertEqual(resolved, self.page.resolve())


if __name__ == "__main__":
    unittest.main()
