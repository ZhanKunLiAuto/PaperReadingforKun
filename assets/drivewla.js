(() => {
  'use strict';

  const maskRoot = document.querySelector('[data-dw-mask]');
  if (maskRoot) {
    // Edge keys are source -> destination; matrix keys are query row + KV column.
    const variants = {
      full: { edges: ['wl', 'lw', 'wa', 'la'], score: '90.8', detail: '论文默认方案：世界与语言双向交换，动作只接收两者。表 7 中得分最高。' },
      'world-to-language': { edges: ['wl', 'wa', 'la'], score: '90.1', detail: '只保留 W → L：语言适配器能读取世界特征，世界分支不能读取语言特征。比默认方案低 0.7 分。' },
      'language-to-world': { edges: ['lw', 'wa', 'la'], score: '89.8', detail: '只保留 L → W：世界分支能读取语言特征，语言适配器不能读取世界特征。比默认方案低 1.0 分。' },
      all: { edges: ['wl', 'lw', 'wa', 'la', 'aw', 'al'], score: '90.4', detail: '全向连接：动作特征也回流到世界和语言分支。表 7 比默认方案低 0.4 分，未报告误差条。' },
      none: { edges: ['wa', 'la'], score: '88.4', detail: '世界与语言不互通：动作仍然读取两个分支，但两个条件表示无法彼此适配。比默认方案低 2.4 分。' },
    };
    const select = maskRoot.querySelector('select');
    const update = () => {
      const state = variants[select.value] || variants.full;
      maskRoot.querySelectorAll('[data-edge]').forEach((edge) => {
        edge.toggleAttribute('hidden', !state.edges.includes(edge.dataset.edge));
      });
      maskRoot.querySelectorAll('[data-cell]').forEach((cell) => {
        const [query, key] = cell.dataset.cell;
        const allowed = query === key || state.edges.includes(key + query);
        cell.textContent = allowed ? '✓' : '×';
        cell.dataset.allowed = String(allowed);
        cell.setAttribute('aria-label', `${query.toUpperCase()} 读取 ${key.toUpperCase()}：${allowed ? '允许' : '禁止'}`);
      });
      maskRoot.querySelector('[data-mask-score]').textContent = `${state.score} PDMS`;
      maskRoot.querySelector('[data-mask-detail]').textContent = state.detail;
      maskRoot.querySelector('#dw-graph-desc').textContent = state.detail + ' 自注意力始终保留，图中省略自环。';
    };
    select.addEventListener('change', update);
    update();
  }

  const stageRoot = document.querySelector('[data-dw-training]');
  if (stageRoot) {
    const stages = {
      il: {
        world: ['is-trainable', '更新全部 DiT 权重'], language: ['is-trainable', '更新适配器权重'], action: ['is-trainable', '更新全部动作权重'],
        output: '<span>加噪示范 → 预测速度场 → LBC</span>',
        gradient: '轨迹损失反向更新：Action + World + Adapter',
        detail: '模仿学习：30 epochs，16 张 A100，全局 batch 16。只使用轨迹 flow-matching 损失，没有视频预测损失或文本生成损失。',
      },
      rl: {
        world: ['', '冻结权重，提供条件'], language: ['', '冻结权重，提供条件'], action: ['is-lora', '仅更新 LoRA，基础权重冻结'],
        output: '<strong>每个低分场景采样 8 条候选</strong><div class="dw-candidates">' + Array.from({ length: 8 }, (_, i) => `<span>轨迹 ${i + 1}</span>`).join('') + '</div><span>分项奖励 → 组相对优势 → 策略更新</span>',
        gradient: '仅 Action LoRA 更新；加 0.1 LBC 正则',
        detail: '强化学习：筛选模仿策略 PDMS < 90 的场景；10 步随机 flow，训练 8 epochs。LoRA rank 16、缩放 32；此处只展示候选数量，不模拟奖励或轨迹质量。',
      },
      infer: {
        world: ['', '一次前向提供逐层特征'], language: ['', '冻结特征 + 适配器前向'], action: ['', '10 步确定性 Euler，无参数更新'],
        output: '<strong>输出 4 秒的 8 个路点</strong><div class="dw-waypoints">' + Array.from({ length: 8 }, (_, i) => `<span>${((i + 1) * 0.5).toFixed(1)} s</span>`).join('') + '</div><span>每点 (x, y, θ) → 跟踪控制器</span>',
        gradient: '',
        detail: '部署推理：不生成 RGB 视频，不输出语言推理链；移除 RL 探索噪声。固定世界潜变量、驾驶输入和初始动作噪声后，轨迹积分是确定的。',
      },
    };
    stageRoot.querySelectorAll('[data-phase]').forEach((button) => {
      button.addEventListener('click', () => {
        const phase = button.dataset.phase;
        const stage = stages[phase];
        stageRoot.querySelectorAll('[data-phase]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        stageRoot.querySelectorAll('[data-module]').forEach((module) => {
          const [className, label] = stage[module.dataset.module];
          module.classList.remove('is-trainable', 'is-lora');
          if (className) module.classList.add(className);
          module.querySelector('[data-module-status]').textContent = label;
        });
        // Only fixed, locally authored markup is used here; user marks/comments are untouched.
        stageRoot.querySelector('[data-stage-output]').innerHTML = stage.output;
        const gradient = stageRoot.querySelector('[data-gradient]');
        gradient.textContent = stage.gradient;
        gradient.hidden = !stage.gradient;
        stageRoot.querySelector('[data-stage-detail]').textContent = stage.detail;
      });
    });
  }
})();
