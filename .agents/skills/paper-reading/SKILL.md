---
name: paper-reading
description: "阅读研究论文、技术报告、arXiv PDF、论文仓库或资料包，在本仓库生成或维护精炼的论文解读 HTML。默认提炼核心判断、关键方法、证据与局限，深入细节通过后续交流按需展开；默认主动实现有助理解的交互 HTML 图解，支持 SVG、划线协作、个人评论和本地持久化。"
---

<!-- Modified from Agentchengfeng/paper-reading-skills in 2026: adds personal comments, repository workflow, concise-first reading with conversational follow-up, and default meaningful interactive explainers. -->

# 论文协作阅读

## 原则

- 只定义方法、结构、组件契约和执行边界；具体内容必须来自当次论文材料、repo、用户补充或现有 HTML。
- 默认产出可独立读懂的精炼核心版：研究目的之后立即给出核心判断，再解释关键方法、决定性证据与局限；篇幅和取舍见阅读方法。
- 阅读与核验覆盖支撑判断所需的原文；网页只呈现最值得记住的内容，不能用精简省略改变结论的前提或反面证据。
- 左侧使用内容阅读地图，不做机械章节目录。
- SVG 用于压缩核心机制或对照关系；公式、术语和实现细节按理解核心判断的必要性取舍，不逐项展开。
- 遵循用户“解读论文时尽可能加入交互 HTML”的偏好：默认主动设计并实现机制交互。有阶段、信息流、变量作用或方法差异时，通常至少实现一处流程步进、参数操控或方法切换，围绕最影响核心判断的 1–2 处难点。静态解释是回退，不是跳过交互的理由；读者可按需操作，作者不能等用户再次要求才实现。
- 操作后必须能看见机制、图形或数值的有意义变化；评论、划线、目录、纯文字折叠和装饰动画不算机制交互。确无合适主题或材料不足以支持忠实交互时可以省略，交付时说明具体原因，不能只用“论文简单”“静态已清楚”作理由。示意与论文实测结果明确区分。
- 划线协作只保留 `名词讲解`、`逻辑梳理`、`作图理解` 三类动作；个人评论是独立内容层，不冒充模型解释。
- HTML 不放 API key，不直接调用模型。Bridge 只接收标记或评论、写 JSONL、修改 HTML，不生成解释。

## 资源路由

- 从论文或 repo 生成、重写正文：完整读取 `references/01-paper-method.md`。
- 创建、修复或优化论文 HTML：先完整读取 `references/03-layout-standard.md`，再完整读取 `references/02-html-contract.md`。
- 生成解读、重写机制正文或评估／修复缺失交互：必须在选择呈现形式前完整读取 `references/04-interactive-explainers.md`，据此选题并实现；不能先决定只画静态图再跳过该资源。纯评论写回、错字或元数据修复无需加载。
- 普通追问与深入讨论：遵循 `references/01-paper-method.md` 的后续交流规则，先在对话中回答；用户要求写回网页或处理网页标记时，再读取 `references/02-html-contract.md`。
- 处理划线标记、评论、作图或正文重组：完整读取 `references/02-html-contract.md`。
- 本地持久化标记或评论：运行 `scripts/bridge.py`，保留既有写回逻辑。

## 仓库工作流

1. 读取当次材料，区分论文事实、repo 事实和推断。
2. 依据材料选定交互问题、可操作控件、变化前后的状态及原文依据，在 `papers/<slug>/index.html` 实现精炼正文与机制交互。优先增强已有机制图，以交互替代重复解释；精炼不等于只做静态页面。用户明确要求深读或推导时按需扩展。没有论文材料时不生成虚构示例。
3. 引用 `../../assets/site.css` 和 `../../assets/paper-reading.js`，补齐契约规定的稳定 section、评论区和页面元数据。
4. 运行 `python3 scripts/rebuild_catalog.py` 更新首页目录。
5. 启动静态服务器与 bridge，通过 localhost 实际操作机制交互，核对关键状态与静态回退，再检查正文、主要断点、三类划线动作、评论写回和刷新定位。仅有控件或脚本引用不代表交互已完成。
6. 提交前运行 `python3 scripts/rebuild_catalog.py --check`、`python3 scripts/validate_site.py` 和 `npm run build`。这些检查通过不代表机制交互可用，仍须完成浏览器验证。发布范围与双端同步遵循仓库 `AGENTS.md`。
7. 交付时简述交互的位置、读者能操作什么及已验证的变化；若省略，说明针对本篇材料的理由。未实现、未验证或未发布的部分如实说明。

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
