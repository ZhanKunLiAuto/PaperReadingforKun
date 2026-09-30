---
name: paper-reading
description: "阅读研究论文、技术报告、arXiv PDF、论文仓库或资料包，在本仓库生成或维护精炼的论文解读 HTML。默认提炼核心判断、关键方法、证据与局限，深入细节通过后续交流按需展开；支持 SVG 图解、按需交互动画、划线协作、个人评论和本地持久化。"
---

<!-- Modified from Agentchengfeng/paper-reading-skills in 2026: adds personal comments, repository workflow, concise-first reading with conversational follow-up, and optional interactive explainers. -->

# 论文协作阅读

## 原则

- 只定义方法、结构、组件契约和执行边界；具体内容必须来自当次论文材料、repo、用户补充或现有 HTML。
- 默认产出可独立读懂的精炼核心版：研究目的之后立即给出核心判断，再解释关键方法、决定性证据与局限；篇幅和取舍见阅读方法。
- 阅读与核验覆盖支撑判断所需的原文；网页只呈现最值得记住的内容，不能用精简省略改变结论的前提或反面证据。
- 左侧使用内容阅读地图，不做机械章节目录。
- SVG 用于压缩核心机制或对照关系；公式、术语和实现细节按理解核心判断的必要性取舍，不逐项展开。
- 静态图先讲清，交互按需展开：主动评估最难理解的 1–2 处机制是否适合交互 HTML 动画；只有能帮助理解过程、变量变化或方法差异时才添加，简单论文可不用。示意动画与论文实测结果明确区分。
- 划线协作只保留 `名词讲解`、`逻辑梳理`、`作图理解` 三类动作；个人评论是独立内容层，不冒充模型解释。
- HTML 不放 API key，不直接调用模型。Bridge 只接收标记或评论、写 JSONL、修改 HTML，不生成解释。

## 资源路由

- 从论文或 repo 生成、重写正文：完整读取 `references/01-paper-method.md`。
- 创建、修复或优化论文 HTML：先完整读取 `references/03-layout-standard.md`，再完整读取 `references/02-html-contract.md`。
- 添加或修改机制动画、参数操控、流程步进或方法切换：另读 `references/04-interactive-explainers.md`；普通静态图无需加载。
- 普通追问与深入讨论：遵循 `references/01-paper-method.md` 的后续交流规则，先在对话中回答；用户要求写回网页或处理网页标记时，再读取 `references/02-html-contract.md`。
- 处理划线标记、评论、作图或正文重组：完整读取 `references/02-html-contract.md`。
- 本地持久化标记或评论：运行 `scripts/bridge.py`，保留既有写回逻辑。

## 仓库工作流

1. 读取当次材料，区分论文事实、repo 事实和推断。
2. 在 `papers/<slug>/index.html` 写精炼的论文页面；用户明确要求深读或推导时按需扩展。没有论文材料时不生成虚构示例。
3. 引用 `../../assets/site.css` 和 `../../assets/paper-reading.js`，补齐契约规定的稳定 section、评论区和页面元数据。
4. 运行 `python3 scripts/rebuild_catalog.py` 更新首页目录。
5. 启动静态服务器与 bridge，通过 localhost 检查正文、主要断点、三类划线动作、评论写回和刷新定位。
6. 提交前运行 `python3 scripts/rebuild_catalog.py --check`、`python3 scripts/validate_site.py` 和 `npm run build`。发布范围与双端同步遵循仓库 `AGENTS.md`。

上述页面生成、验证和发布步骤只在实际新增或修改论文页面时执行；仅调整本 skill 时检查规则、引用与元数据的一致性。

## 重组规则

- 用户说“重组”“整合”“合并到正文”或“改成新段落”时，把批注内容融入正文并删除对应疑问卡片和解释块。
- 整合时优先替换重复表述，使结论与证据落在对应段落，避免把每轮交流追加成新的长篇章节。
- 有用 SVG 保留为普通正文图。
- 个人评论默认保留；只有用户明确要求吸收或删除评论时才改动。

## 来源与协议

本 skill 改编自 `https://github.com/Agentchengfeng/paper-reading-skills`，作者为成峰 / AI产品自由，协议为 Apache-2.0。分发时保留本目录中的 `LICENSE`、`NOTICE.md` 和修改说明。

## 边界

- 不修改用户提供的论文原文或原始附件。
- 不把浏览器本地评论宣称为已写入仓库；只有 bridge 成功返回后才算持久化进 HTML。
- 不新增 README、examples、templates、runtime 解释层或未验证示例。
