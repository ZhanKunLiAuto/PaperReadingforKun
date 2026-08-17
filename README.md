# Paper Reading for Kun

一个面向长期积累的个人论文阅读库。这里不只保存摘要，而是围绕研究目的、关键机制、证据边界、代码线索和个人判断，把每篇论文整理成可继续修订的独立 HTML 阅读档案。

## 在线访问

- [ChatGPT Sites（主站）](https://paper-reading-for-kun.kunzhan.chatgpt.site/)
- [GitHub Pages（镜像）](https://zhankunliauto.github.io/PaperReadingforKun/)
- [GitHub 仓库](https://github.com/ZhanKunLiAuto/PaperReadingforKun)

## 项目特点

- **目的优先**：先回答论文试图解决什么，再进入方法细节。
- **机制可视化**：用结构化页面梳理问题链、核心机制和实验结论。
- **证据与推断分开**：明确区分论文原始证据、合理推断与个人评论。
- **交互式阅读**：支持划线、批注和评论；离线时暂存在浏览器，本地 bridge 在线时可写回论文页面。
- **静态站点**：不依赖后端服务，可直接托管到 GitHub Pages。

## 当前收录

| 论文 | 解读主线 |
| --- | --- |
| [GeniWorld: A Generalizable Interactive World Model for Robotic Manipulation via Visual Actions](papers/geniworld/) | 把数值动作经 URDF 与正向运动学渲染成像素对齐的视觉动作，梳理其 OOD 世界建模、策略评估和数据合成证据，并区分视频逼真度与物理可靠性的边界。 |
| [Next Forcing: Causal World Modeling with Multi-Chunk Prediction](papers/next-forcing/) | 从高帧率视频中的外观复制捷径出发，解释多视频块预测如何迫使世界模型学习更长程的因果变化，并拆开 2.3× 训练加速与 2× 推理加速的证据口径。 |
| [Don't Train the Model, Evolve the Harness](papers/evolve-the-harness/) | 冻结模型权重，通过自动搜索运行支架修复交付、工具调用和事项一致性问题，并分析 20 点提升背后的 verifier、迁移边界与实质能力天花板。 |
| [V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning](papers/v-jepa-2/) | 从无动作视频预训练、动作条件后训练到潜空间模型预测控制，梳理视频理解、未来预测与机器人规划之间的能力链，并核对“零样本规划”的适用边界。 |
| [V-JEPA 2.1: Unlocking Dense Features in Video Self-Supervised Learning](papers/v-jepa-2-1/) | 解释 context token 的监督缺口，以及距离加权 context loss、深层自监督和原生 tokenizer 如何恢复稠密空间特征，同时区分方法、规模与规划器变化带来的收益。 |
| [WAM-Diff2: Hierarchical AR-to-Diffusion Distillation for Highly Efficient Autonomous Driving VLA](papers/wam-diff2/) | 用块因果离散扩散与三级蒸馏把自回归驾驶 VLA 转成并行解码器，并拆分模型、候选选择与系统优化的收益。 |
| [Auto-JEPA: A Latent World Model of Continuous Intent for End-to-End Autonomous Driving](papers/auto-jepa/) | 预测未来自车连续意图，再通过固定轨迹记忆、场景评分与可行域门控生成规划结果。 |
| [Video Generation Models are General-Purpose Vision Learners](papers/genception/) | 解析 GenCeption 如何把视频生成骨干改造成多任务感知模型，并审视“通用视觉学习器”的证据边界。 |
| [PhiZero: A World Model Built Around Physical Language](papers/phizero/) | 用离散“物理语言”压缩状态变化，再以 reason-then-render 生成未来。 |
| [LLaWA: A Unified Latent Language World Action Model for Autonomous Driving](papers/llawa/) | 统一文本、未来视频与潜在动作，并用 AACA 和 Flow Policy GRPO 对齐规划目标。 |
| [INTACT: Isomorphic Intent-to-Action Learning for Search-Free World Models](papers/intact/) | 把意图映射到动作，减少潜在世界模型部署时对 CEM 搜索的依赖。 |
| [Data Pyramid for Embodied Manipulation](papers/data-pyramid/) | 梳理真实机器人、UMI、人类视频、仿真与通用数据组成的数据金字塔。 |
| [FoMoVLA: Bridging Visual Foresight and Motion Guidance for Vision-Language-Action Models](papers/fomovla/) | 用未来特征回答“去哪里”，用二维点轨迹回答“怎么去”。 |
| [EgoGenesis: Egocentric World-Action Modeling with Online Anchored Projective Memory and Action-3D RoPE](papers/egogenesis/) | 通过 OAPM 场景记忆与 A3D-RoPE 动作几何提升世界—动作建模。 |

当前共收录 14 篇论文解读；完整目录由 [`papers/catalog.json`](papers/catalog.json) 自动生成。

## 本地浏览

页面会通过 HTTP 读取论文目录，因此请使用本地服务器，不要直接通过 `file://` 打开：

```bash
python3 -m http.server 8000
```

然后访问 [http://localhost:8000](http://localhost:8000)。

如需将页面中的划线解释和个人评论写回 HTML，可在另一个终端启动本地 bridge：

```bash
python3 .agents/skills/paper-reading/scripts/bridge.py --site-root .
```

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
