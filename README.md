# Paper Reading for Kun

一个面向长期积累的个人论文阅读库。这里不只保存摘要，而是围绕研究目的、关键机制、证据边界、代码线索和个人判断，把每篇论文整理成可继续修订的独立 HTML 阅读档案。

## 在线访问

- [ChatGPT Sites（主站）](https://paper-reading-for-kun.kunzhan.chatgpt.site/)
- [GitHub Pages（镜像）](https://zhankunliauto.github.io/PaperReadingforKun/)
- [GitHub 仓库](https://github.com/ZhanKunLiAuto/PaperReadingforKun)

## 最近更新

- **2026-11-02 · SuperMimic**：详解共享可微动力学、32 步解析策略梯度与 critic，核对千倍 GPU 时、训练动作零失败和真机迁移的证据边界；含训练／部署与想象时域两处机制交互。阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/supermimic/) · [GitHub 源码](papers/supermimic/index.html)

- **2026-10-31 · 26 篇独立论文**：27 份附件中两份 Latent Manifold PDF 完全重复；新增 25 篇详细解读，LAW 按 v2 更新，均含机制交互、实验条件与证据边界。完整阅读地图：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/2026-10-31-reading-batch.html) · [GitHub 入口](papers/2026-10-31-reading-batch.html)。各篇阅读与源码链接见下表。

- **DirectWAM**：DirectWAM 用冻结的单步动作模型监督学生自己的未来预测，保留未来到动作的级联并去掉迭代采样；拆解动作充分性、局部敏感方向、28倍加速与闭环证据边界。 阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/directwam/) · [GitHub 源码](papers/directwam/index.html)

- **LAW**：详细解读 LAW 如何用语义子任务进度连接 VLM 与 WAM：混合频率闭环、MoTE、双流记忆、局部价值学习，以及 RoboTwin、RoboDojo 和真机实验的证据边界。 阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/law/) · [GitHub 源码](papers/law/index.html)
- **DriveWLA**：详细解读 DriveWLA 的三专家结构、世界—语言双向注意力、仅轨迹监督的联合适配和 Flow-GRPO；用交互图核对信息流与训练阶段，分析 NAVSIM、HUGSIM 和开环迁移结果，以及未来预测、零样本与实时性的证据边界。 阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/drivewla/) · [GitHub 源码](papers/drivewla/index.html)
- **VPP2**：VPP2 通过完整事件与详细描述学好操作视频预测，再蒸馏为单步视觉规划器、接入动作专家；区分零样本真机、后训练基准与因果证据边界。 阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/video-prediction-policy-2/) · [GitHub 源码](papers/video-prediction-policy-2/index.html)
- **Long-WAM**：解读 Long-WAM 的自回归视频预训练、因果动作适配与实时部署，核对长历史收益、107.4 ms 的条件和原文数字不一致。 阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/long-wam/) · [GitHub 源码](papers/long-wam/index.html)
- **VISTA**：解读 VISTA 如何用无损画面档案与主动视觉检查支持长程推理，核对 ARC-AGI-3 满分、组件消融、跨游戏结果及计算成本。 阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/vista/) · [GitHub 源码](papers/vista/index.html)
- **OpenWAM**：OpenWAM 解读：同骨干比较四种视频动作交互，以反事实转移训练可复用局部动力学；区分冻结动作组件迁移与整模型零样本。 阅读：[ChatGPT Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/openwam/) · [GitHub 源码](papers/openwam/index.html)

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

| 论文 | 解读主线 | 阅读链接 |
| --- | --- | --- |
| [SuperMimic: Scaling Humanoid Whole-Body Control with One Differentiable World Model](papers/supermimic/) | 解读 SuperMimic 如何以共享可微动力学、短时域解析梯度和 critic 降低人形全身控制训练成本；核对千倍 GPU 时比较、训练动作零失败、受控 PPO 对照与真机迁移边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/supermimic/) · [源码](papers/supermimic/index.html) |
| [Ψ-0.6: Adaptive Streams of Thought in a Unified Vision-Language World Model](papers/psi-0-6/) | 解释统一视觉语言世界模型的指针token、可组合预测、反事实光流和GRPO表示选择；区分能力统一、推理增益、内容联合优化及机器人控制的证据。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/psi-0-6/) · [源码](papers/psi-0-6/index.html) |
| [Vision-Language-Action or World-Action? Just Action Models](papers/just-action-models/) | 详细解读 JAM 如何拆开骨干初始化、未来监督和推理模块，固定架构实验、冻结目标选择、缓存训练成本及证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/just-action-models/) · [源码](papers/just-action-models/index.html) |
| [To Route or to Adapt? Multi-Expert Diffusion Planners in Unseen Regions](papers/route-or-adapt/) | 用 oracle 选择余量判断路由瓶颈，并比较地域权重混合、共享适配器修复与少量目标域回放；保留横向偏移下降但闭环退化的反例。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/route-or-adapt/) · [源码](papers/route-or-adapt/index.html) |
| [ThinkJev: One Thought, Every Budget for Calibrated Typed Decisions](papers/thinkjev/) | 详细解读 ThinkJev 的 typed decision、共享缓存、单条思考前缀、预算校准和风险门控，重点分析节省计算的实测收益与预设目标失败。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/thinkjev/) · [源码](papers/thinkjev/index.html) |
| [TerraTransfer++: Demonstration-Free End-to-End Planner](papers/terratransfer-plus-plus/) | 通过多智能体自博弈学决策、轨迹蒸馏补规划接口，再用动作分布和低秩关系对齐视觉；区分免行为示范、状态标注依赖和测试场景适配。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/terratransfer-plus-plus/) · [源码](papers/terratransfer-plus-plus/index.html) |
| [State World Models: Execute the Rules, Generate the Pixels](papers/state-world-models/) | 把可执行规则、持久语义状态和空间布局放在冻结视频模型之外，区分规则结算、画面遵从与视频反馈；核对 50 对反事实及多回合证据。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/state-world-models/) · [源码](papers/state-world-models/index.html) |
| [Progress Probes P²: Lightweight Runtime Monitoring for Vision-Language-Action Models](papers/progress-probes-p2/) | P² 用成功示范的归一化剩余时间训练线性探针，再以进度滞后触发失败报警；拆解监测成本、任务泛化、报警时机与真机表格的口径问题。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/progress-probes-p2/) · [源码](papers/progress-probes-p2/index.html) |
| [Profiling a Frontier Agent with EBench: From Direct Control to Harness with Policy](papers/ebench-frontier-agent/) | 解读 GPT-6 Astra 在 EBench 中的直接控制与混合策略实验，区分语义能力、接触精度、控制权交接及成功率和 token 成本的证据。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/ebench-frontier-agent/) · [源码](papers/ebench-frontier-agent/index.html) |
| [Perceives but Doesn't Brake: A Perception-Action Binding Gap in Reasoning Driving VLAs](papers/perception-action-binding-gap/) | 用匹配反事实拆开危险可解码性、动作表达能力与感知对动作的实际影响，核对冻结 Alpamayo 的引导修复和跨域门控边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/perception-action-binding-gap/) · [源码](papers/perception-action-binding-gap/index.html) |
| [On the Limits of Scale: Inverse Scaling in Vision-Language Models](papers/inverse-scaling-vlm/) | 19 个 VLM 的配对翻转分析：375 个候选、16 个全空间校正后的强反例，以及 CoT、视觉编码器和人工审计揭示的证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/inverse-scaling-vlm/) · [源码](papers/inverse-scaling-vlm/index.html) |
| [Model-Aware Generation of Safety-Critical Scenes for Robust End-to-End Driving via Distilled Planner Surrogates](papers/model-aware-driving-scenes/) | 通过保留目标规划头的 BEV 替身搜索对抗场景，几何求解逃生标签后才渲染；核对 50 场景微调、定向收益、替身误差与闭环边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/model-aware-driving-scenes/) · [源码](papers/model-aware-driving-scenes/index.html) |
| [Learning the 4D World through Point Trajectory Forecasting](papers/video-point-model/) | 用跨视角持续三维点轨迹监督多视角未来视频，并扩展到动作生成；解释几何、对应关系、动作收益与真实任务半分计分和推理成本边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/video-point-model/) · [源码](papers/video-point-model/index.html) |
| [Latent World Models Should Plan with Distances Along the Latent Manifold](papers/ngc-latent-manifold/) | NGC 冻结世界模型，只用邻域图最短路替换终点代价；从伪低谷、锚定消融和 oracle 预测器解释收益，同时核对图捷径、接触动力学与训练分布内评测的边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/ngc-latent-manifold/) · [源码](papers/ngc-latent-manifold/index.html) |
| [LAW: Unifying Language, Action, and World Modeling for Agentic Physical Intelligence](papers/law/) | 基于 v2 更新 LAW 如何用语义子任务进度连接 VLM 与 WAM：混合频率闭环、MoTE、双流记忆、局部价值学习，以及 RoboTwin、RoboDojo 和真机实验的证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/law/) · [源码](papers/law/index.html) |
| [How Much Should a VLA Trust Its Reasoning? Step-Level Guidance as a Measured Action-Value Function](papers/coc-cfg/) | CoC-CFG 将推理对动作的影响变为逐步可控的引导强度，以确定性分支测量价值再训练小型控制器；核对开环、闭环与 Waymo 成绩的证据范围。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/coc-cfg/) · [源码](papers/coc-cfg/index.html) |
| [Harness²: Recursive Agent Harnessing for an Open World](papers/harness2/) | 详细解读 Harness² 的 Propose–Probe–Compose、任务内与跨任务两层改进、无评测反馈实验以及额外计算和选择偏差的边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/harness2/) · [源码](papers/harness2/index.html) |
| [GPT-6 Astra Is a Native Visuo-Tactile Policy for Contact-Rich Manipulation](papers/astra-visuotactile/) | 把触觉 RGB 直接送入通用视觉接口，通过少样本交互记忆闭环控制；区分触觉增益、视觉替代线索、历史基线、修改成功标准和真实部署成本。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/astra-visuotactile/) · [源码](papers/astra-visuotactile/index.html) |
| [FastHarness: Experience-Driven Review Scheduling for Vision-Language-Action Policies](papers/fast-harness/) | FastHarness 用阶段记忆与已审查结果安排复核频率，保留每块动作的新观测反馈；解释错误记忆、恢复验证、token下降与非配对外部基线的限制。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/fast-harness/) · [源码](papers/fast-harness/index.html) |
| [Echo: Coupled Action and Task Status Signal Denoising for Vision Language Action Models](papers/echo/) | ECHO 将停止与失败信号加入动作块，通过四类轨迹监督和异步去噪，让任务状态既用于监测也用于纠正；拆解标签、注意力方向与真实机器人证据。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/echo/) · [源码](papers/echo/index.html) |
| [E0.5: From Reconstructive to Future-Predictive 3D Foundations for Robotic World-Action Modeling](papers/e0-5/) | 详细解读 E0.5 的几何原生骨干、未来终点监督、动作注意力、C2R 与真实机器人证据，以及训练集诊断和反事实预测的边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/e0-5/) · [源码](papers/e0-5/index.html) |
| [DriveMind: Mind-Evolving Belief Tracking for Closed-Loop Autonomous Driving](papers/drivemind/) | 用加权自然语言假设跨帧传播与重评分，为异步扩散规划器提供条件；分析信念权重、语义平均、闭环收益和迟到更新的限制。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/drivemind/) · [源码](papers/drivemind/index.html) |
| [DeXplicit: Making Physical State Explicit in Dexterous Manipulation World Models](papers/dexplicit/) | 拆解关节感知动作编码、物体全局运动与局部形变、外观搬运和两步因果渲染；核对运动点误差、静态点反例、57倍加速的比较条件。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/dexplicit/) · [源码](papers/dexplicit/index.html) |
| [Ask to Evolve: A Unified Harness for Lifelong Embodied Navigation with Hybrid Action Space and Persistent Memory](papers/evolife/) | 解读 EvoLife 的混合动作接口、具有特权信息的交互向导、持久地点记忆与多基准实验，解释高成功率的条件和再访收益。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/evolife/) · [源码](papers/evolife/index.html) |
| [Agentic World Action Models](papers/aw-0/) | 解读 AW-0 的代码—视频—动作三专家、联合去噪、自动技能标注和混合执行；保留随机化退化、rubric 分数、不同示范及代码有效性边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/aw-0/) · [源码](papers/aw-0/index.html) |
| [AUGUstus: Autonomous Driving VLA Model with Unified Generation and Understanding](papers/augustus/) | 在同一Transformer内先生成连续动作、后监督结构化预测文本，部署跳过CoT；拆解注意力与梯度、单步x0、联合GRPO、分数与延迟条件。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/augustus/) · [源码](papers/augustus/index.html) |
| [ALPS: Visual State Encoders for World Models](papers/alps/) | 拆解 ALPS 的四目标图文预训练和跨裁剪自蒸馏，核对冻结表示的状态探针、语言、重建与规划取舍，区分编码器能力与世界模型能力。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/alps/) · [源码](papers/alps/index.html) |
| [De-Diffusing WAMs: Action-Sufficient Direct Prediction for Robot Control](papers/directwam/) | DirectWAM 用冻结的单步动作模型监督学生自己的未来预测，保留未来到动作的级联并去掉迭代采样；拆解动作充分性、局部敏感方向、28倍加速与闭环证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/directwam/) · [源码](papers/directwam/index.html) |
| [DriveWLA: Unifying Future Dynamics and Scene Semantics through World-Language-Action Modeling for Autonomous Driving](papers/drivewla/) | 详细解读 DriveWLA 的三专家结构、世界—语言双向注意力、仅轨迹监督的联合适配和 Flow-GRPO；用交互图核对信息流与训练阶段，分析 NAVSIM、HUGSIM 和开环迁移结果，以及未来预测、零样本与实时性的证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/drivewla/) · [源码](papers/drivewla/index.html) |
| [Video Prediction Policy 2: Predict Better, Act Better](papers/video-prediction-policy-2/) | VPP2 通过完整事件与详细描述学好操作视频预测，再蒸馏为单步视觉规划器、接入动作专家；区分零样本真机、后训练基准与因果证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/video-prediction-policy-2/) · [源码](papers/video-prediction-policy-2/index.html) |
| [Long-WAM: Scaling the Context of World-Action Models](papers/long-wam/) | 解读 Long-WAM 的自回归视频预训练、因果动作适配与实时部署，核对长历史收益、107.4 ms 的条件和原文数字不一致。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/long-wam/) · [源码](papers/long-wam/index.html) |
| [World Action Agent: Harnessing VLMs for Robot Manipulation via World Action Rehearsal](papers/world-action-agent/) | 解读 WAA 如何用接触视图、动作预演和视图内修正让通用 VLM 操纵机器人；核对技能增益、仿真泛化与 9B 主策略微调的证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/world-action-agent/) · [源码](papers/world-action-agent/index.html) |
| [VISTA: A Visual Harness for Reasoning in an Interactive World](papers/vista/) | 解读 VISTA 如何用无损画面档案与主动视觉检查支持长程推理，核对 ARC-AGI-3 满分、组件消融、跨游戏结果及计算成本。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/vista/) · [源码](papers/vista/index.html) |
| [Think Like a World Model, Act Like a VLA: Distilling World-Model Representations into Compact Robot Policies](papers/thaw-vla/) | THAW-VLA 用离线世界模型特征监督紧凑 VLA，在部署结构不变时提升成功率；通过阶段切换与余弦向量实验解释蒸馏机制，核对同架构证据与因果知识迁移边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/thaw-vla/) · [源码](papers/thaw-vla/index.html) |
| [OpenWAM: An Open Framework for Composable World-Action Models](papers/openwam/) | OpenWAM 解读：同骨干比较四种视频动作交互，以反事实转移训练可复用局部动力学；区分冻结动作组件迁移与整模型零样本。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/openwam/) · [源码](papers/openwam/index.html) |
| [Less Language, More Latents: Annotation-Efficient VLAs for Driving](papers/less-language-more-latents/) | LADA 用少量语言与反事实监督对齐离散驾驶意图，再在全量专家轨迹上训练；解读闭环收益、额外成本和仿真迁移边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/less-language-more-latents/) · [源码](papers/less-language-more-latents/index.html) |
| [ForeDrive: Foresight-Guided End-to-End Autonomous Driving with a Planning-Relevant Latent World Model](papers/foredrive/) | ForeDrive 解读：共享编码器接受规划梯度，未来预测器保持预测目标；核对未来注入、TAB 消融、错误未来与非交互评测边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/foredrive/) · [源码](papers/foredrive/index.html) |
| [EmbodiedSWE: Coding Agents for Long-Horizon Dexterous Robotics](papers/embodiedswe/) | 解读 EmbodiedSWE：编程 Agent 在仿真中调试机器人程序，再通过场景、策略、阶段、动力学和视觉变化生成 VLA 示范；核对 23/28 求解率、六任务数据扩展、泛化分数与真实机器人 2/10 的证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/embodiedswe/) · [源码](papers/embodiedswe/index.html) |
| [AD-WM: Action-Discriminative World Models for Counterfactual Model Predictive Control](papers/ad-wm/) | AD-WM 用残差预测与预测转移上的动作恢复改善反事实 MPC；核对 Cube 消融、精英集 regret 与带人工子目标的 Franka 迁移证据。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/ad-wm/) · [源码](papers/ad-wm/index.html) |
| [ME 系列四篇联合解读：认知、记忆、世界动作与触觉的价值及证据缺口](papers/me-embodied-family/) | 联合审读 ME-VLM、ME-Brain-1.0、MachEmbodied-U0 与 ME-Dex1.0：解释四者关系，区分系统工程价值与机制证据，重点核查自进化、统一建模、实时触觉、泛化和复现的不足。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/me-embodied-family/) · [源码](papers/me-embodied-family/index.html) |
| [ME-VLM: A Unified VLM for Embodied Cognition and Agent Coordination](papers/me-vlm/) | ME-VLM 用两阶段具身 SFT、双专家强化学习和多教师 on-policy 蒸馏统一物理认知与 Agent 能力。解读训练机制、平均分口径、导航适配与 M100 端侧部署的证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/me-vlm/) · [源码](papers/me-vlm/index.html) |
| [Scaling up Test-Time Compute with Latent Reasoning: A Recurrent Depth Approach](papers/recurrent-depth/) | 潜空间推理系列 01：Huginn 如何用随机深度训练、输入持续注入与截断反传扩展测试时计算；区分多循环收益、CoT 评测与等 FLOPs 证据。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/recurrent-depth/) · [源码](papers/recurrent-depth/index.html) |
| [Mixture-of-Recursions: Learning Dynamic Recursive Depths for Adaptive Token-Level Computation](papers/mixture-of-recursions/) | 潜空间推理系列 02：MoR 将参数共享、token 级深度路由与 KV 缓存联合设计；核对等数据与等计算实验、因果路由问题和 2.06 倍吞吐的计时边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/mixture-of-recursions/) · [源码](papers/mixture-of-recursions/index.html) |
| [LoopMoE: Unifying Iterative Computation with Mixture-of-Experts for Language Modeling](papers/loopmoe/) | LoopMoE 精炼解读：共享 MoE 层如何通过逐轮逐 token 调制与容量平衡改善语言建模；拆清相同有效深度、物理激活参数、3B/9B 对照与训练快但解码慢的取舍。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/loopmoe/) · [源码](papers/loopmoe/index.html) |
| [LoopFormer: Elastic-Depth Looped Transformers for Latent Reasoning via Shortcut Modulation](papers/loopformer/) | 潜空间推理系列 03：LoopFormer 用时间／步长调制与短长轨迹一致性实现预算条件化推理；保留低预算反例、额外训练成本和等训练 FLOPs 对照。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/loopformer/) · [源码](papers/loopformer/index.html) |
| [Infinite Worlds with Versatile Interactions](papers/lingbot-world-infinity/) | 解读 LingBot-World 2.0：MoBA 与自滚动蒸馏如何维持长时生成，VLM 如何组织交互，以及小时级演示、720p/60 fps 和长期世界记忆之间的证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/lingbot-world-infinity/) · [源码](papers/lingbot-world-infinity/index.html) |
| [TANGO: Humanoid Navigation in Cluttered Environments with a Whole-Body Vision-Language-Action Model](papers/tango/) | 解读 TANGO：通过 Plan–Edit–Track 合成全身避障数据，让 VLA 预测 29 自由度动作；核对碰撞率、动作连续性消融，以及小样本、行为明确指令下的真实机器人迁移边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/tango/) · [源码](papers/tango/index.html) |
| [Motus2: A Self-Evolving General World Model for Dexterous Manipulation](papers/motus2/) | 围绕最值得关注的因果接口、失败数据利用与评价器可靠性，区分数据适配的 84% 成功率和两任务 MBRL 的 65%→72.5%，审视自进化、数据扩展、记忆与触觉的证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/motus2/) · [源码](papers/motus2/index.html) |
| [ZETA: A Controlled Study of Zero-Shot Cross-Embodiment VLA Transfer for Tabletop Manipulation](papers/zeta/) | 通过固定任务与场景研究本体变化，区分严格零样本与预训练暴露；核对局部状态动作表示、多样性、辅助监督及进度指标的含义。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/zeta/) · [源码](papers/zeta/index.html) |
| [WISE: World-model-guided Imagination Scheduling for Efficient Post-training of Vision-Language-Action Models](papers/wise/) | 通过关键状态调度、有限时域反事实推演和可靠性筛选改善 VLA 后训练；区分阶段性计算节省、前置训练成本与真实泛化证据。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/wise/) · [源码](papers/wise/index.html) |
| [Towards Zero-Shot Transfer Across Embodiments For Driving VLAs](papers/driving-vla-zero-shot-transfer/) | 从低容量 BEV 辅助头和多相机布局训练解释驾驶 VLA 的零样本迁移，并保留多数据集条件下收益减弱甚至反向的关键证据。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/driving-vla-zero-shot-transfer/) · [源码](papers/driving-vla-zero-shot-transfer/index.html) |
| [SV-WAM: An Efficient Surround-View World-Action Model for End-to-End Autonomous Driving](papers/sv-wam/) | 用非对称注意力把未来视频监督留在训练期，保留六路环视的动作推理；核对性能消融、延迟口径与零样本评测边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/sv-wam/) · [源码](papers/sv-wam/index.html) |
| [Qwen-Drive-1.0: An Initial Step towards a Vision-Language Foundation Model for Autonomous Driving](papers/qwen-drive-1-0/) | 解读 Qwen-Drive-1.0 如何以共享 Qwen3.5-4B、BEV 感知头、flow matching 规划器和四阶段训练连接三维感知、驾驶推理与轨迹生成，并核对通用能力保留、NAVSIM/WOD 成绩、闭环安全与进度的取舍。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/qwen-drive-1-0/) · [源码](papers/qwen-drive-1-0/index.html) |
| [从 VLA 到 World-Action Model：六篇论文的横向对比导读](papers/vla-to-world-action-models/) | 横向比较 FlashVLA、CLAP、Riemann-1.0、BrainWAM、Zero-WAM 与 Code as Worlds 的任务、动作表示、世界模型、训练数据、实时性和证据边界，梳理从 VLA 到 world-action model 的研究脉络。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/vla-to-world-action-models/) · [源码](papers/vla-to-world-action-models/index.html) |
| [Zero-WAM: In-Context World-Action Modeling from Human Videos for Open-Ended Task Generalization](papers/zero-wam/) | 从人类视频任务接口、HumanGen 自动配对、任务均衡预训练与 IFP 远期监督解读 Zero-WAM，并区分仿真未见任务、真实未见配置与开放世界泛化的证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/zero-wam/) · [源码](papers/zero-wam/index.html) |
| [Self-Harness: Harnesses That Improve Themselves](papers/self-harness/) | 解读 Self-Harness v3：固定模型如何从自己的失败轨迹中提炼机制、提出有限支架编辑，并用 held-in / held-out 回归门槛晋升；核对三模型 × 三 benchmark 的九组结果及其测试污染、成本与自治边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/self-harness/) · [源码](papers/self-harness/index.html) |
| [Riemann-1.0: An Embodied World Action Model for Physical AI](papers/riemann-1-0/) | 从全因果 action→video 因子分解、三阶段具身预训练、多本体接口与策略/模拟器双重角色解读 Riemann-1.0，并核对 230K+ 小时数据、真实机器人与三项仿真结果的证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/riemann-1-0/) · [源码](papers/riemann-1-0/index.html) |
| [Meta Context Engineering via Agentic Skill Evolution](papers/meta-context-engineering/) | 解读 Meta Context Engineering：如何用双层优化共同演化 context-engineering skill 与 context artifact，并核对五领域实验、上下文长度、迁移、训练效率与消融的证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/meta-context-engineering/) · [源码](papers/meta-context-engineering/index.html) |
| [FlashVLA: Streaming Action Decoding for Fast and Asynchronous VLA Inference](papers/flashvla/) | 从交错噪声动作缓冲区、chunk-wise causal attention、冷启动与多缓冲联合微调四条线解读 FlashVLA，并区分动作解码、策略调用、闭环执行与 30 Hz 部署的不同延迟口径。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/flashvla/) · [源码](papers/flashvla/index.html) |
| [Code as Worlds: Agentic Discovery of Executable World Representations for Physical Reasoning](papers/code-as-worlds/) | 从可执行世界表示、溯因式 Agent 发现循环、像素到世界尺度校准与两阶段物理监督解读 Code as Worlds，并区分可观测一致性、真实机制恢复和 QuantiPhy-validation 证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/code-as-worlds/) · [源码](papers/code-as-worlds/index.html) |
| [CLAP: Cross-Embodiment Video World Models are Zero-Shot Physical Simulators](papers/clap/) | 从末端位姿、语言动作、潜动作与 latent-to-EE curriculum 四条线解读 CLAP，并核对 DROID/Bridge 视频指标、跨策略规划、双臂压力测试、少样本适配及“零样本物理模拟器”的证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/clap/) · [源码](papers/clap/index.html) |
| [BrainWAM: Action-Space Coordination of Semantic Priors and Predictive Dynamics for Autonomous Driving](papers/brainwam/) | 从注意力分配失衡、动作空间瓶颈、CAB/CIF 双通路协调与异步整流流四条线解读 BrainWAM，并区分 NAVSIM 得分、融合机制证据和真实车载部署边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/brainwam/) · [源码](papers/brainwam/index.html) |
| [RoboTTT: Context Scaling for Robot Policies](papers/robottt/) | 从快权重、sequence action forcing、TBPTT 与上下文损失掩码四条线解读 RoboTTT，并核对 8K context scaling、视频 one-shot、DAgger Distillation、扰动恢复与延迟主张的证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/robottt/) · [源码](papers/robottt/index.html) |
| [WAM-Diff2: Hierarchical AR-to-Diffusion Distillation for Highly Efficient Autonomous Driving VLA](papers/wam-diff2/) | 从块因果离散扩散、三级 AR-to-Diffusion 蒸馏、统一多任务 VLA 与系统级加速四条线解读 WAM-Diff2，并拆分模型收益、候选选择和硬件优化的证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/wam-diff2/) · [源码](papers/wam-diff2/index.html) |
| [GeniWorld: A Generalizable Interactive World Model for Robotic Manipulation via Visual Actions](papers/geniworld/) | 从视觉动作、URDF 渲染、空间对齐条件、自回归闭环与数据合成五条线解读 GeniWorld，并审视 OOD 泛化、策略评估和策略增益的证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/geniworld/) · [源码](papers/geniworld/index.html) |
| [Next Forcing: Causal World Modeling with Multi-Chunk Prediction](papers/next-forcing/) | 从高帧率视频世界模型的外观复制捷径、多视频块预测目标、因果 MCP 链、训练收敛与推理边界解读 Next Forcing，并拆开 2.3× 训练加速与 2× 推理加速的证据口径。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/next-forcing/) · [源码](papers/next-forcing/index.html) |
| [Don't Train the Model, Evolve the Harness](papers/evolve-the-harness/) | 解读 Don't Train the Model, Evolve the Harness：为什么固定模型、自动搜索运行支架，能在 Legal Agent Benchmark 上显著提升成绩；以及这项实验真正证明了什么、尚未证明什么。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/evolve-the-harness/) · [源码](papers/evolve-the-harness/index.html) |
| [V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning](papers/v-jepa-2/) | 从无动作视频预训练、动作条件后训练与潜空间模型预测控制三条线解读 V-JEPA 2，核对规模化收益、视频理解与预测结果、机器人闭环实验及其零样本边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/v-jepa-2/) · [源码](papers/v-jepa-2/index.html) |
| [V-JEPA 2.1: Unlocking Dense Features in Video Self-Supervised Learning](papers/v-jepa-2-1/) | 从 context token 的监督缺口、距离加权稠密预测、深层自监督和图像视频原生 tokenizer 解读 V-JEPA 2.1，并核对稠密任务、预测、机器人规划与模型缩放的证据边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/v-jepa-2-1/) · [源码](papers/v-jepa-2-1/index.html) |
| [Auto-JEPA: A Latent World Model of Continuous Intent for End-to-End Autonomous Driving](papers/auto-jepa/) | 从动作相关世界模型、连续意图表征、非参数轨迹检索和候选筛选四条线解读 Auto-JEPA，并核对 NAVSIM 结果、语义遮挡证据与固定记忆边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/auto-jepa/) · [源码](papers/auto-jepa/index.html) |
| [Video Generation Models are General-Purpose Vision Learners](papers/genception/) | 从生成式预训练、单步前馈改造、统一任务表示和证据边界四条线解读 GenCeption：视频生成模型何以迁移到多种视觉感知任务，以及它距离真正的通用视觉学习器还有多远。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/genception/) · [源码](papers/genception/index.html) |
| [PhiZero: A World Model Built Around Physical Language](papers/phizero/) | 从状态过渡压缩、显式过渡推理和生成先验三条线解读 PhiZero：256 个离散符号怎样承载四秒世界变化，reason-then-render 又为何不同于直接像素预测。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/phizero/) · [源码](papers/phizero/index.html) |
| [LLaWA: A Unified Latent Language World Action Model for Autonomous Driving](papers/llawa/) | 从表示对齐与目标对齐两条线解读 LLaWA：文本—未来视频—潜在动作如何因果串联，AACA 怎样筛选决策相关未来信息，Flow Policy GRPO 又如何把预测能力转成规划收益。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/llawa/) · [源码](papers/llawa/index.html) |
| [INTACT: Isomorphic Intent-to-Action Learning for Search-Free World Models](papers/intact/) | 从前向世界模型的动作反演缺口解读 INTACT：局部物理意图与未来目标意图如何共用一个条件动作律，把部署时 CEM 搜索改造成零候选直接控制与低预算验证。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/intact/) · [源码](papers/intact/index.html) |
| [Data Pyramid for Embodied Manipulation](papers/data-pyramid/) | 以可扩展性和机器人对齐为主轴解读具身操作数据金字塔：真实机器人、UMI、人类第一/第三视角、仿真与通用数据各自提供什么，为什么最优数据配方仍是开放问题。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/data-pyramid/) · [源码](papers/data-pyramid/index.html) |
| [FoMoVLA: Bridging Visual Foresight and Motion Guidance for Vision-Language-Action Models](papers/fomovla/) | 从终态预见、二维点轨迹与训练时耦合三条线解读 FoMoVLA：未来特征回答去哪里，稀疏轨迹回答怎么去，FCCA 如何把两种辅助监督转成更好的 VLA 动作表征。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/fomovla/) · [源码](papers/fomovla/index.html) |
| [EgoGenesis: Egocentric World-Action Modeling with Online Anchored Projective Memory and Action-3D RoPE](papers/egogenesis/) | 从场景记忆、动作几何与真实机器人泛化三条线解读 EgoGenesis：OAPM 如何抑制漂移，A3D-RoPE 如何把 3D 动作注入交叉注意力，以及论文证据的有效边界。 | [Sites](https://paper-reading-for-kun.kunzhan.chatgpt.site/papers/egogenesis/) · [源码](papers/egogenesis/index.html) |

当前共收录 77 篇解读与导读；完整目录由 [`papers/catalog.json`](papers/catalog.json) 自动生成。

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

6. 上传前同步更新本 README 的“最近更新”“当前收录”和收录总数，核对新增论文的源码与在线阅读链接，再按 [AGENTS.md](AGENTS.md) 同步 GitHub `origin/main` 与 `.openai/hosting.json` 中的既有 ChatGPT Sites 项目，保持公开访问，并返回两端链接。

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
