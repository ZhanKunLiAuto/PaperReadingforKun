# PaperReadingforKun

- 处理论文、技术报告、arXiv PDF、论文 repo 或论文 HTML 时，使用仓库内 `.agents/skills/paper-reading/SKILL.md`。
- 每篇解读保存为 `papers/<slug>/index.html`，共享样式和交互放在 `assets/`，不要把 API key 写入页面。
- 新增或修改论文页面后运行 `python3 scripts/rebuild_catalog.py` 和 `python3 scripts/validate_site.py`。
- 未经用户明确要求，不上传远端、不发布页面、不删除论文原始材料。
