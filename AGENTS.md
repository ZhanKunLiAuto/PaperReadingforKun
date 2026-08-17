# PaperReadingforKun

- 处理论文、技术报告、arXiv PDF、论文 repo 或论文 HTML 时，使用仓库内 `.agents/skills/paper-reading/SKILL.md`。
- 每篇解读保存为 `papers/<slug>/index.html`，共享样式和交互放在 `assets/`，不要把 API key 写入页面。
- 新增或修改论文页面后运行 `python3 scripts/rebuild_catalog.py`、`python3 scripts/validate_site.py` 和 `npm run build`。
- 用户已在 2026-08-17 明确要求：以后每次完成一篇论文解读，都默认将完整变更提交并推送到 GitHub `origin/main`，同时使用 `.openai/hosting.json` 中的既有项目发布到 ChatGPT Sites，并保持站点公开访问；不得只更新其中一端。
- 同步完成后向用户返回该论文的 GitHub 链接与 ChatGPT Sites 链接；若任一端发布失败，明确说明并继续修复，不得把本地完成当作已发布。
- 上述长期授权仅适用于论文解读及其目录、共享资源和发布配置；其他改动未经用户明确要求不上传远端、不发布页面。不要删除论文原始材料。
