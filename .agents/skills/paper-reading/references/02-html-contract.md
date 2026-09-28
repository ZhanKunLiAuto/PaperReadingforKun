<!-- Modified from Agentchengfeng/paper-reading-skills in 2026: adds personal comments and clarifies concise-page compatibility. -->

# HTML 协作契约

## 页面结构

```text
paper-doc
├── paper-sidebar        内容阅读地图
├── paper-main           精炼正文；按用户需求深入
│   ├── section#thesis
│   ├── section#concepts
│   ├── section#problem-chain
│   ├── section#mechanism
│   ├── section#evidence
│   ├── section#limits
│   └── section#sources
└── paper-rail           协作状态与章节评论入口
    ├── section#paper-mark-panel
    └── section#paper-comments
```

稳定 `section id` 用于写回、目录和刷新定位；可见入口文案按当次论文生成。

保留 `thesis` 至 `sources` 的七个正文 section 作为 `paper-main` 的直接子元素，以兼容现有校验、阅读位置与章节评论逻辑；`paper-mark-panel` 和 `paper-comments` 仍放在 `paper-rail` 内。稳定锚点不等于七个长章节。`concepts` 和 `problem-chain` 通常各用一个短段交代必要概念和旧瓶颈，避免与开头或机制重复，不要求独立图表。不要使用空 section、隐藏占位或重复文字凑契约。已有页面精简时保留被标记、评论引用的锚点和相应上下文。

页面 `<head>` 至少包含：`citation_title`、一个或多个 `citation_author`、`citation_publication_date`、`citation_pdf_url`（有则填写）、`description`、`keywords` 和 `paper:read_at`。`body` 包含 `data-page-kind="paper"`。

## 组件类名契约

页面骨架、协作入口与评论面板按既有实现保留。下列名称是使用相应组件时的契约；公式卡、术语框、概念图和回答块按实际内容需要出现，不要求每页把组件全部铺齐。

```text
paper-doc paper-sidebar paper-main paper-rail
paper-askbar paper-askbar__form paper-askbar__input paper-askbar__button
paper-mark-panel paper-annotation paper-question-marker paper-answer-note
paper-comment-panel paper-comment paper-comment__body paper-comment-new
annotation-highlight comment-highlight
svg-text-annotation-highlight svg-inline-highlight svg-figure read-guide
formula-card formula-card__label formula-card__equation formula-symbol
formula-card__caption formula-legend formula-legend__row formula-card__intuition
term-bridge concept-visual
```

## 公式组件

```html
<div class="formula-card" aria-label="公式说明">
  <div class="formula-card__label">公式拆解</div>
  <div class="formula-card__equation">
    <span class="formula-symbol">A</span> = <span class="formula-symbol">B</span> / <span class="formula-symbol">C</span>
  </div>
  <p class="formula-card__caption">这条公式在回答什么问题。</p>
  <dl class="formula-legend">
    <div class="formula-legend__row">
      <dt>A</dt>
      <dd>符号含义，以及它在论文机制里扮演什么角色。</dd>
    </div>
  </dl>
  <div class="formula-card__intuition">公式的直觉读法，以及它为什么导向论文的关键动作。</div>
</div>
```

选择展示公式后，解释所展示符号及关键约束，并把直觉读法连接回论文动作。短公式可使用普通 `.formula`；不必为不影响核心判断的公式新增组件。

## 划线标记

协作标记只有三种语义：

```text
term     名词讲解
logic    逻辑梳理
diagram  作图理解
```

标记对象至少包含：

```json
{
  "id": "mark-id",
  "anchorId": "paper-anchor-mark-id",
  "kind": "logic",
  "text": "selected text",
  "anchorText": "containing block text",
  "question": "user supplement",
  "sectionId": "section id",
  "sectionTitle": "section title",
  "pageTitle": "page title",
  "url": "page url",
  "createdAt": "ISO time"
}
```

- `paper-question-marker` 只显示动作和用户补充，不重复原文、章节或时间。
- 文字解释写入同一 `paper-annotation` 内的 `paper-answer-note`。
- 作图解释写入相邻 `svg-figure`，并附读图说明。
- 普通正文选区使用 `annotation-highlight`；SVG 文字使用 `svg-text-annotation-highlight`，图内精确标记优先使用 `svg-inline-highlight`。
- 已补过的标记不重复插入。

## 个人评论

评论不使用 `kind`，对象至少包含：

```json
{
  "id": "comment-id",
  "anchorId": "paper-comment-anchor-comment-id",
  "text": "optional selected text",
  "anchorText": "optional containing block text",
  "comment": "user-authored comment",
  "author": "optional display name",
  "sectionId": "section id",
  "sectionTitle": "section title",
  "pageTitle": "page title",
  "url": "page url",
  "createdAt": "ISO time"
}
```

- 有选区时使用 `comment-highlight` 并把 `paper-comment` 放到匹配块之后。
- 没有选区时作为章节评论插入对应 section 末尾；找不到 section 时放入 `paper-comment-panel`。
- 评论文本必须当作纯文本转义，不能注入 HTML。
- Bridge 离线时前端可把评论暂存在 localStorage，但必须标记为“仅此浏览器”；恢复在线后才可写回 HTML。
- 评论不自动被模型改写、解释或合并到正文。

## Bridge

接口：

```text
POST http://127.0.0.1:8766/__paper_annotation
POST http://127.0.0.1:8766/__paper_comment
GET  http://127.0.0.1:8766/healthz
GET  http://127.0.0.1:8766/requests
GET  http://127.0.0.1:8766/comments
```

单页启动：

```bash
python3 .agents/skills/paper-reading/scripts/bridge.py \
  --page <HTML 绝对路径> \
  --log <annotation_requests.jsonl 绝对路径> \
  --comment-log <comments.jsonl 绝对路径>
```

仓库多页启动：

```bash
python3 .agents/skills/paper-reading/scripts/bridge.py \
  --site-root <仓库绝对路径> \
  --log <annotation_requests.jsonl 绝对路径> \
  --comment-log <comments.jsonl 绝对路径>
```

多页模式根据请求 URL 解析 HTML，目标必须位于 `site-root` 内。Bridge 只接受来自 localhost / loopback 的浏览器请求。

## 页面运行时对象

共享脚本暴露：

```js
window.paperReadingMarks = { load, render, bridgeUrl };
window.paperReadingComments = { load, render, create, bridgeUrl };
```

页面必须在 HTTP localhost 下验证。普通刷新读到旧 DOM 时追加 `_refresh=<timestamp>`。
