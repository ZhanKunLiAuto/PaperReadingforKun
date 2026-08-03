# Paper Reading for Kun

一个面向长期积累的个人论文阅读库。这里不只保存摘要，而是围绕研究目的、关键机制、证据边界、代码线索和个人判断，把每篇论文整理成可继续修订的独立 HTML 阅读档案。

## 项目特点

- **目的优先**：先回答论文试图解决什么，再进入方法细节。
- **机制可视化**：用结构化页面梳理问题链、核心机制和实验结论。
- **证据与推断分开**：明确区分论文原始证据、合理推断与个人评论。
- **交互式阅读**：支持划线、批注和评论，并保存在浏览器本地。
- **静态站点**：不依赖后端服务，可直接托管到 GitHub Pages。

## 当前收录

- [EgoGenesis: Egocentric World-Action Modeling with Online Anchored Projective Memory and Action-3D RoPE](papers/egogenesis/)

完整目录由 [`papers/catalog.json`](papers/catalog.json) 自动生成。

## 本地浏览

页面会通过 HTTP 读取论文目录，因此请使用本地服务器，不要直接通过 `file://` 打开：

```bash
python3 -m http.server 8000
```

然后访问 [http://localhost:8000](http://localhost:8000)。

## 新增论文解读

1. 按仓库内的 [paper-reading skill](.agents/skills/paper-reading/SKILL.md) 完成论文阅读。
2. 将页面保存为 `papers/<slug>/index.html`。
3. 复用 `assets/` 中的公共样式与交互脚本。
4. 重建目录并校验站点：

```bash
python3 scripts/rebuild_catalog.py
python3 scripts/validate_site.py
python3 -m unittest discover -s tests -v
```

## 目录结构

```text
.
├── index.html                 # 论文目录首页
├── papers/
│   ├── catalog.json           # 自动生成的论文目录
│   └── <slug>/index.html      # 单篇论文解读
├── assets/                    # 共享样式与浏览器交互
├── scripts/                   # 目录生成与站点校验
├── tests/                     # 自动化测试
└── .agents/skills/            # 仓库内论文阅读工作流
```

## 说明

本仓库内容是个人研究笔记，不代表论文作者或所属机构的官方观点。引用结论时请回到页面列出的原论文与一手资料。
