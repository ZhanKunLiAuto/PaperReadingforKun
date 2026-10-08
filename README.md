# Paper Reading for Kun

一个面向长期积累的个人论文阅读库。这里不只保存摘要，而是围绕研究目的、关键机制、证据边界、代码线索和个人判断，把每篇论文整理成可继续修订的独立 HTML 阅读档案。

## 在线访问

- [ChatGPT Sites（主站）](https://paper-reading-for-kun.kunzhan.chatgpt.site/)
- [GitHub Pages（镜像）](https://zhankunliauto.github.io/PaperReadingforKun/)
- [GitHub 仓库](https://github.com/ZhanKunLiAuto/PaperReadingforKun)

## 最近更新

- **THAW-VLA（交互重读）**：用阶段切换拆开离线教师提取、学生训练与部署，再用向量滑块解释余弦对齐的方向约束；保留同架构对照、真实机器人小样本及因果知识迁移的证据边界。阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/thaw-vla/#mechanism) · [GitHub 源码](papers/thaw-vla/index.html)。配套 [paper-reading Skill](.agents/skills/paper-reading/SKILL.md) 已改为默认主动实现有助理解的机制交互，并要求实际操作验证。

- **EmbodiedSWE**：让编程 Agent 在仿真中调试控制程序，再通过五层变化生成 VLA 示范；重点区分 23/28 任务求解、六任务同分布数据扩展、保留配置泛化与真实机器人 2/10 的证据边界。阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/embodiedswe/) · [GitHub Pages](https://zhankunliauto.github.io/PaperReadingforKun/papers/embodiedswe/)
- **Motus2**：用共享策略、动作条件模拟器与价值评估器构成学习闭环，重点区分 84% 主任务成绩、两任务 MBRL 65%→72.5% 及长期自主进化的证据边界。阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/motus2/) · [GitHub Pages](https://zhankunliauto.github.io/PaperReadingforKun/papers/motus2/)

- **Qwen-Drive-1.0**：用共享 VLM、BEV 感知头和流匹配规划器连接三维感知、驾驶问答与连续轨迹，重点核对能力保留、四阶段训练及 RL 的闭环安全与进度取舍。阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/qwen-drive-1-0/) · [GitHub Pages](https://zhankunliauto.github.io/PaperReadingforKun/papers/qwen-drive-1-0/)
- **BrainWAM**：把 VLA 的语义先验与 WAM 的预测动力学分别压成 action tokens，再以 CAB/CIF 协调；重点解释 Tri-MoT 87.8 低于 WAM-only 88.1 的融合负结果，并限定 89.5/89.6 与 475–644 ms 延迟的部署含义。阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/brainwam/) · [GitHub Pages](https://zhankunliauto.github.io/PaperReadingforKun/papers/brainwam/)
- **Zero-WAM**：把人类视频作为部署时任务规范，用 HumanGen、任务均衡采样与 IFP 连接未见任务泛化；并区分仿真完整留出任务、真实 Franka 未见配置和仍未覆盖的开放世界视频。阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/zero-wam/) · [GitHub Pages](https://zhankunliauto.github.io/PaperReadingforKun/papers/zero-wam/)
- **Code as Worlds**：把物理组成、动态演化与视觉外观写成可执行世界表示，通过 Agent 循环反复模拟验证，再用世界状态监督 VLM；重点区分观测一致性、唯一真实机制与公开 QuantiPhy-validation 上的定量提升。阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/code-as-worlds/) · [GitHub Pages](https://zhankunliauto.github.io/PaperReadingforKun/papers/code-as-worlds/)
- **FlashVLA**：把多个不同噪声层级的动作块放进同一流式缓冲区，用块级因果注意力同时处理去噪延迟与异步时序失配，并严格区分动作头、整次策略调用、闭环每动作和 30 Hz 部署四种速度口径。阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/flashvla/) · [GitHub Pages](https://zhankunliauto.github.io/PaperReadingforKun/papers/flashvla/)
- **CLAP**：用末端位姿、语言动作和潜动作统一跨本体视频条件，再以 latent-to-EE 课程兼顾无标签数据扩展与真实机器人部署；同时拆开视频预测、跨策略规划、少样本适配与“物理模拟器”的证据边界。阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/clap/) · [GitHub Pages](https://zhankunliauto.github.io/PaperReadingforKun/papers/clap/)
- **Riemann-1.0**：把动作与视觉后果排成严格的全因果自回归序列，并用三阶段具身预训练把人类视频、手持夹爪与多本体机器人轨迹逐步转成可执行策略；重点区分强策略结果与仍偏定性的世界模拟证据。阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/riemann-1-0/) · [GitHub Pages](https://zhankunliauto.github.io/PaperReadingforKun/papers/riemann-1-0/)
- **Self-Harness**：让同一个固定模型从自己的失败轨迹中提出有限支架编辑，再用 held-in / held-out 回归门槛决定是否晋升；并区分同模型自改、外部 Meta-Harness 与开放式自我进化。阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/self-harness/) · [GitHub Pages](https://zhankunliauto.github.io/PaperReadingforKun/papers/self-harness/)
- **Meta Context Engineering**：把“怎样学习上下文”本身写成可演化 Skill，由元代理搜索 CE 方法、基础代理生成文件和代码形式的 context artifact，并核对五领域性能、迁移、长度与 FiNER 效率证据。阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/meta-context-engineering/) · [GitHub Pages](https://zhankunliauto.github.io/PaperReadingforKun/papers/meta-context-engineering/)
- **RoboTTT**：把 8K timesteps 的机器人经历压进测试时持续更新的快权重，重点拆解 sequence action forcing、TBPTT、视频 one-shot 与 DAgger Distillation，并区分阶段完成分、完整成功率和“恒定延迟”的证据边界。阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/robottt/) · [GitHub Pages](https://zhankunliauto.github.io/PaperReadingforKun/papers/robottt/)
- **WAM-Diff2**：基于用户提供的 arXiv v1，重点解释块因果离散扩散与三级 AR-to-Diffusion 蒸馏，并区分 2.8× 算法加速、15.1× 系统级解码加速和端到端驾驶时延。阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/wam-diff2/) · [GitHub Pages](https://zhankunliauto.github.io/PaperReadingforKun/papers/wam-diff2/)

## 项目特点

- **目的优先**：先回答论文试图解决什么，再进入方法细节。
- **机制可视化与交互**：围绕核心机制设计流程步进、阶段切换、方法对比或参数操控，让操作与图形、信息流、数值联动；保留静态解释，示意与论文实测结果明确区分。
- **证据与推断分开**：明确区分论文原始证据、合理推断与个人评论。
- **协作阅读**：支持划线、批注和评论；离线时暂存在浏览器，本地 bridge 在线时可写回论文页面。
- **静态站点**：不依赖后端服务，可直接托管到 GitHub Pages。

## 当前收录

| 论文 | 解读主线 |
| --- | --- |
| [World Action Agent: Harnessing VLMs for Robot Manipulation via World Action Rehearsal](papers/world-action-agent/) | 解读 WAA 如何用接触视图、动作预演和视图内修正让通用 VLM 操纵机器人；核对技能增益、仿真泛化与 9B 主策略微调的证据边界。 |
| [Think Like a World Model, Act Like a VLA: Distilling World-Model Representations into Compact Robot Policies](papers/thaw-vla/) | THAW-VLA 用离线世界模型特征监督紧凑 VLA，在部署结构不变时提升成功率；通过阶段切换与余弦向量实验解释蒸馏机制，核对同架构证据与因果知识迁移边界。 |
| [Less Language, More Latents: Annotation-Efficient VLAs for Driving](papers/less-language-more-latents/) | LADA 用少量语言与反事实监督对齐离散驾驶意图，再在全量专家轨迹上训练；解读闭环收益、额外成本和仿真迁移边界。 |
| [ForeDrive: Foresight-Guided End-to-End Autonomous Driving with a Planning-Relevant Latent World Model](papers/foredrive/) | ForeDrive 解读：共享编码器接受规划梯度，未来预测器保持预测目标；核对未来注入、TAB 消融、错误未来与非交互评测边界。 |
| [AD-WM: Action-Discriminative World Models for Counterfactual Model Predictive Control](papers/ad-wm/) | AD-WM 用残差预测与预测转移上的动作恢复改善反事实 MPC；核对 Cube 消融、精英集 regret 与带人工子目标的 Franka 迁移证据。 |
| [ME 系列四篇联合解读：认知、记忆、世界动作与触觉的价值及证据缺口](papers/me-embodied-family/) | 联合审读 ME-VLM、ME-Brain-1.0、MachEmbodied-U0 与 ME-Dex1.0：解释四者关系，区分系统工程价值与机制证据，重点核查自进化、统一建模、实时触觉、泛化和复现的不足。 |
| [ME-VLM: A Unified VLM for Embodied Cognition and Agent Coordination](papers/me-vlm/) | ME-VLM 用两阶段具身 SFT、双专家强化学习和多教师 on-policy 蒸馏统一物理认知与 Agent 能力。解读训练机制、平均分口径、导航适配与 M100 端侧部署的证据边界。 |
| [EmbodiedSWE: Coding Agents for Long-Horizon Dexterous Robotics](papers/embodiedswe/) | 解读 EmbodiedSWE：编程 Agent 在仿真中调试机器人程序，再通过场景、策略、阶段、动力学和视觉变化生成 VLA 示范；核对 23/28 求解率、六任务数据扩展、泛化分数与真实机器人 2/10 的证据边界。 |
| [Scaling up Test-Time Compute with Latent Reasoning: A Recurrent Depth Approach](papers/recurrent-depth/) | 潜空间推理系列 01：Huginn 如何用随机深度训练、输入持续注入与截断反传扩展测试时计算；区分多循环收益、CoT 评测与等 FLOPs 证据。 |
| [Mixture-of-Recursions: Learning Dynamic Recursive Depths for Adaptive Token-Level Computation](papers/mixture-of-recursions/) | 潜空间推理系列 02：MoR 将参数共享、token 级深度路由与 KV 缓存联合设计；核对等数据与等计算实验、因果路由问题和 2.06 倍吞吐的计时边界。 |
| [LoopMoE: Unifying Iterative Computation with Mixture-of-Experts for Language Modeling](papers/loopmoe/) | LoopMoE 精炼解读：共享 MoE 层如何通过逐轮逐 token 调制与容量平衡改善语言建模；拆清相同有效深度、物理激活参数、3B/9B 对照与训练快但解码慢的取舍。 |
| [LoopFormer: Elastic-Depth Looped Transformers for Latent Reasoning via Shortcut Modulation](papers/loopformer/) | 潜空间推理系列 03：LoopFormer 用时间／步长调制与短长轨迹一致性实现预算条件化推理；保留低预算反例、额外训练成本和等训练 FLOPs 对照。 |
| [Infinite Worlds with Versatile Interactions](papers/lingbot-world-infinity/) | 解读 LingBot-World 2.0：MoBA 与自滚动蒸馏如何维持长时生成，VLM 如何组织交互，以及小时级演示、720p/60 fps 和长期世界记忆之间的证据边界。 |
| [TANGO: Humanoid Navigation in Cluttered Environments with a Whole-Body Vision-Language-Action Model](papers/tango/) | 解读 TANGO：通过 Plan–Edit–Track 合成全身避障数据，让 VLA 预测 29 自由度动作；核对碰撞率、动作连续性消融，以及小样本、行为明确指令下的真实机器人迁移边界。 |
| [ZETA: A Controlled Study of Zero-Shot Cross-Embodiment VLA Transfer for Tabletop Manipulation](papers/zeta/) | 通过固定任务与场景研究本体变化，区分严格零样本与预训练暴露；核对局部状态动作表示、多样性、辅助监督及进度指标的含义。 |
| [WISE: World-model-guided Imagination Scheduling for Efficient Post-training of Vision-Language-Action Models](papers/wise/) | 通过关键状态调度、有限时域反事实推演和可靠性筛选改善 VLA 后训练；区分阶段性计算节省、前置训练成本与真实泛化证据。 |
| [Towards Zero-Shot Transfer Across Embodiments For Driving VLAs](papers/driving-vla-zero-shot-transfer/) | 从低容量 BEV 辅助头和多相机布局训练解释驾驶 VLA 的零样本迁移，并保留多数据集条件下收益减弱甚至反向的关键证据。 |
| [SV-WAM: An Efficient Surround-View World-Action Model for End-to-End Autonomous Driving](papers/sv-wam/) | 用非对称注意力把未来视频监督留在训练期，保留六路环视的动作推理；核对性能消融、延迟口径与零样本评测边界。 |
| [从 VLA 到 World-Action Model：六篇论文的横向对比导读](papers/vla-to-world-action-models/) | 横向比较 FlashVLA、CLAP、Riemann-1.0、BrainWAM、Zero-WAM 与 Code as Worlds 的任务、动作表示、世界模型、训练数据、实时性和证据边界，梳理从 VLA 到 world-action model 的研究脉络。 |
| [Motus2: A Self-Evolving General World Model for Dexterous Manipulation](papers/motus2/) | 以 action-first 因果遮罩、轨迹监督分流和 DiffusionNFT 连接动作、想象与评价，并核对人类数据、记忆、触觉及有限自进化证据。 |
| [Qwen-Drive-1.0: An Initial Step towards a Vision-Language Foundation Model for Autonomous Driving](papers/qwen-drive-1-0/) | 以显式三维监督与通用数据保留共享 VLM 能力，再用流匹配和轨迹奖励训练规划器；区分基准收益与闭环行为取舍。 |
| [BrainWAM: Action-Space Coordination of Semantic Priors and Predictive Dynamics for Autonomous Driving](papers/brainwam/) | 让 VLA 与 WAM 先形成专业化动作表征，再用 CAB 和 CIF 在动作空间协调，避免 raw-token 联合注意力中的语义捷径压制预测动力学。 |
| [Zero-WAM: In-Context World-Action Modeling from Human Videos for Open-Ended Task Generalization](papers/zero-wam/) | 把人类视频变成部署时视觉任务规范，以 HumanGen 扩展人机配对、用 IFP 迫使主干编码远期任务演化。 |
| [Code as Worlds: Agentic Discovery of Executable World Representations for Physical Reasoning](papers/code-as-worlds/) | 用可执行代码显式表示物理组成、动态演化与视觉外观，通过模拟—渲染—验证循环发现世界，再产出定量物理监督。 |
| [FlashVLA: Streaming Action Decoding for Fast and Asynchronous VLA Inference](papers/flashvla/) | 用交错噪声动作缓冲区和块级因果注意力把去噪流水线化，并区分动作解码、策略调用、闭环执行与异步控制频率的不同速度口径。 |
| [CLAP: Cross-Embodiment Video World Models are Zero-Shot Physical Simulators](papers/clap/) | 以末端位姿、语言与潜动作协调跨本体条件，解释 latent-to-EE 课程如何连接无标签视频扩展、真实规划和目标实体适配。 |
| [Riemann-1.0: An Embodied World Action Model for Physical AI](papers/riemann-1-0/) | 以 action-first 全因果序列统一机器人策略与动作条件视觉模拟，并梳理从人类视频到可执行机器人动作的三阶段具身预训练。 |
| [Self-Harness: Harnesses That Improve Themselves](papers/self-harness/) | 同一个固定模型从 verifier-grounded 失败证据提出有限支架编辑，再用 held-in / held-out 非退化门槛筛选和合并。 |
| [Meta Context Engineering via Agentic Skill Evolution](papers/meta-context-engineering/) | 将 CE 的表示与学习方法提升为可演化 Skill，让元代理搜索“怎样学上下文”，基础代理生成可执行 context function。 |
| [RoboTTT: Context Scaling for Robot Policies](papers/robottt/) | 把长视觉—动作历史写进测试时梯度更新的快权重，并核对 8K context scaling、视频 one-shot、扰动恢复、DAgger Distillation 与恒定上下文复杂度的证据边界。 |
| [GeniWorld: A Generalizable Interactive World Model for Robotic Manipulation via Visual Actions](papers/geniworld/) | 把数值动作经 URDF 与正向运动学渲染成像素对齐的视觉动作，梳理其 OOD 世界建模、策略评估和数据合成证据，并区分视频逼真度与物理可靠性的边界。 |
| [Next Forcing: Causal World Modeling with Multi-Chunk Prediction](papers/next-forcing/) | 从高帧率视频中的外观复制捷径出发，解释多视频块预测如何迫使世界模型学习更长程的因果变化，并拆开 2.3× 训练加速与 2× 推理加速的证据口径。 |
| [Don't Train the Model, Evolve the Harness](papers/evolve-the-harness/) | 冻结模型权重，通过自动搜索运行支架修复交付、工具调用和事项一致性问题，并分析 20 点提升背后的 verifier、迁移边界与实质能力天花板。 |
| [V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning](papers/v-jepa-2/) | 从无动作视频预训练、动作条件后训练到潜空间模型预测控制，梳理视频理解、未来预测与机器人规划之间的能力链，并核对“零样本规划”的适用边界。 |
| [V-JEPA 2.1: Unlocking Dense Features in Video Self-Supervised Learning](papers/v-jepa-2-1/) | 解释 context token 的监督缺口，以及距离加权 context loss、深层自监督和原生 tokenizer 如何恢复稠密空间特征，同时区分方法、规模与规划器变化带来的收益。 |
| [WAM-Diff2: Hierarchical AR-to-Diffusion Distillation for Highly Efficient Autonomous Driving VLA](papers/wam-diff2/) | 核对 arXiv v1：用块因果离散扩散与三级蒸馏把自回归驾驶 VLA 转成并行解码器，并拆分 2.8× 算法加速、15.1× 系统优化、候选选择与任务性能的证据边界。 |
| [Auto-JEPA: A Latent World Model of Continuous Intent for End-to-End Autonomous Driving](papers/auto-jepa/) | 预测未来自车连续意图，再通过固定轨迹记忆、场景评分与可行域门控生成规划结果。 |
| [Video Generation Models are General-Purpose Vision Learners](papers/genception/) | 解析 GenCeption 如何把视频生成骨干改造成多任务感知模型，并审视“通用视觉学习器”的证据边界。 |
| [PhiZero: A World Model Built Around Physical Language](papers/phizero/) | 用离散“物理语言”压缩状态变化，再以 reason-then-render 生成未来。 |
| [LLaWA: A Unified Latent Language World Action Model for Autonomous Driving](papers/llawa/) | 统一文本、未来视频与潜在动作，并用 AACA 和 Flow Policy GRPO 对齐规划目标。 |
| [INTACT: Isomorphic Intent-to-Action Learning for Search-Free World Models](papers/intact/) | 把意图映射到动作，减少潜在世界模型部署时对 CEM 搜索的依赖。 |
| [Data Pyramid for Embodied Manipulation](papers/data-pyramid/) | 梳理真实机器人、UMI、人类视频、仿真与通用数据组成的数据金字塔。 |
| [FoMoVLA: Bridging Visual Foresight and Motion Guidance for Vision-Language-Action Models](papers/fomovla/) | 用未来特征回答“去哪里”，用二维点轨迹回答“怎么去”。 |
| [EgoGenesis: Egocentric World-Action Modeling with Online Anchored Projective Memory and Action-3D RoPE](papers/egogenesis/) | 通过 OAPM 场景记忆与 A3D-RoPE 动作几何提升世界—动作建模。 |

当前共收录 44 篇解读与导读；完整目录由 [`papers/catalog.json`](papers/catalog.json) 自动生成。

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

1. 按仓库内的 [paper-reading Skill](.agents/skills/paper-reading/SKILL.md) 完成论文阅读，在选择呈现形式前读取[交互图解规范](.agents/skills/paper-reading/references/04-interactive-explainers.md)。
2. 将页面保存为 `papers/<slug>/index.html`，默认主动实现有助理解的机制交互。存在阶段、信息流、变量作用或方法差异时，通常至少实现一处；确无合适主题或材料不足时，交付中说明具体原因。评论、划线、目录跳转和纯文字折叠不算机制交互。
3. 复用 `assets/` 中的公共样式与交互脚本，交互可在普通静态站点运行，不依赖本地 bridge 或模型接口。以 [THAW-VLA](papers/thaw-vla/index.html) 及其 [CSS](assets/thaw-vla.css)、[JavaScript](assets/thaw-vla.js) 为已实现参考。
4. 通过 localhost 实际操作关键状态、参数边界和键盘控件，检查桌面与窄屏、静态回退以及划线／评论兼容性；构建成功不等于交互可用。
5. 重建目录并校验站点：

```bash
python3 scripts/rebuild_catalog.py
python3 scripts/rebuild_catalog.py --check
python3 scripts/validate_site.py
python3 -m unittest discover -s tests -v
npm run build
```

6. 论文解读完成后，按 [AGENTS.md](AGENTS.md) 同步 GitHub `origin/main` 与 `.openai/hosting.json` 中的既有 ChatGPT Sites 项目，保持公开访问，并返回两端链接。

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
