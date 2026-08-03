---
name: paper-reading
description: "读研究论文、技术报告、arXiv PDF、论文仓库或资料包，并在本仓库生成或维护可发布到 GitHub Pages 的论文解读 HTML。用于目的优先的长文解读、SVG 图解、公式拆解、划线协作标记、个人评论、本地 bridge 持久化、正文重组和浏览器验证。"
---

<!-- Modified from Agentchengfeng/paper-reading-skills in 2026: adds a separate personal-comment layer and repository workflow. -->

# 论文协作阅读

## 原则

- 只定义方法、结构、组件契约和执行边界；具体内容必须来自当次论文材料、repo、用户补充或现有 HTML。
- 解读开头先写研究目的，再用总览图压缩全文读法，随后写核心结论。
- 左侧使用内容阅读地图，不做机械章节目录。
- 稍微复杂的机制、流程、对照、公式关系、调度逻辑、瓶颈链和概念依赖默认使用 SVG 图解。
- 划线协作只保留 `名词讲解`、`逻辑梳理`、`作图理解` 三类动作；个人评论是独立内容层，不冒充模型解释。
- HTML 不放 API key，不直接调用模型。Bridge 只接收标记或评论、写 JSONL、修改 HTML，不生成解释。

## 资源路由

- 从论文或 repo 生成、重写正文：完整读取 `references/01-paper-method.md`。
- 创建、修复或优化论文 HTML：先完整读取 `references/03-layout-standard.md`，再完整读取 `references/02-html-contract.md`。
- 处理划线标记、评论、补充解释、作图或正文重组：完整读取 `references/02-html-contract.md`。
- 本地持久化标记或评论：运行 `scripts/bridge.py`，保留既有写回逻辑。

## 仓库工作流

1. 读取当次材料，区分论文事实、repo 事实和推断。
2. 在 `papers/<slug>/index.html` 写完整论文页面；没有论文材料时不生成虚构示例。
3. 引用 `../../assets/site.css` 和 `../../assets/paper-reading.js`，补齐契约规定的稳定 section、评论区和页面元数据。
4. 运行 `python3 scripts/rebuild_catalog.py` 更新首页目录。
5. 启动静态服务器与 bridge，通过 localhost 检查正文、主要断点、三类划线动作、评论写回和刷新定位。
6. 提交前运行 `python3 scripts/rebuild_catalog.py --check` 与 `python3 scripts/validate_site.py`。

## 重组规则

- 用户说“重组”“整合”“合并到正文”或“改成新段落”时，把批注内容融入正文并删除对应疑问卡片和解释块。
- 有用 SVG 保留为普通正文图。
- 个人评论默认保留；只有用户明确要求吸收或删除评论时才改动。

## 来源与协议

本 skill 改编自 `https://github.com/Agentchengfeng/paper-reading-skills`，作者为成峰 / AI产品自由，协议为 Apache-2.0。分发时保留本目录中的 `LICENSE`、`NOTICE.md` 和修改说明。

## 边界

- 不修改用户提供的论文原文或原始附件。
- 不把浏览器本地评论宣称为已写入仓库；只有 bridge 成功返回后才算持久化进 HTML。
- 不新增 README、examples、templates、runtime 解释层或未验证示例。
