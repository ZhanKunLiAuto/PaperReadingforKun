(() => {
  const demo = document.querySelector('[data-longwam-demo]');
  if (demo) {
    const messages = [
      '步骤 1：真实历史与当前帧构成因果前缀。下一次决策会加入新的真实观测。',
      '步骤 2：视频专家从历史预测未来，只去噪到 σ*=0.9；未来是预测潜变量，不是真实观测，也不解码为像素。',
      '步骤 3：动作专家同时读取历史和预测未来的视觉 KV，在动作去噪步骤间复用它。视频分支不读取动作。',
      '步骤 4：执行动作块，同时流式编码新观测并准备下一块；交接时丢弃已过期的动作前缀。新的决策需要刷新相关缓存。'
    ];
    const update = step => {
      demo.querySelectorAll('[data-step]').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.step) === step)));
      demo.querySelectorAll('[data-mobile-node]').forEach(n => n.classList.toggle('is-active', Number(n.dataset.mobileNode) === step));
      demo.querySelectorAll('[data-node]').forEach(n => { n.setAttribute('stroke', Number(n.dataset.node) === step ? '#bd4c32' : '#afbeb7'); n.setAttribute('stroke-width', Number(n.dataset.node) === step ? '4' : '1'); });
      demo.querySelectorAll('[data-flow]').forEach(p => { p.setAttribute('opacity', Number(p.dataset.flow) === step ? '1' : '0.18'); p.setAttribute('stroke-width', Number(p.dataset.flow) === step ? '4' : '2'); });
      demo.querySelector('[data-step-status]').textContent = messages[step];
    };
    demo.querySelectorAll('[data-step]').forEach(b => b.addEventListener('click', () => update(Number(b.dataset.step))));
    update(0);
  }
  const context = document.querySelector('[data-context-demo]');
  if (context) {
    const history = [0, 2.4, 4.8, 9.6, 19.2], latency = [74.6, 107.4, 138.3, 204.5, 341.0];
    const input = context.querySelector('input');
    const update = () => {
      const i = Number(input.value);
      context.querySelector('[data-history]').textContent = `${history[i]} 秒历史`;
      context.querySelector('[data-latency]').textContent = `${latency[i].toFixed(1)} ms / 动作块`;
      context.querySelector('[data-latency-bar]').style.width = `${latency[i] / 341 * 100}%`;
      context.querySelector('[data-context-status]').textContent = `${history[i]} 秒窗口对应 ${latency[i].toFixed(1)} ms。${i === 0 ? '零历史仍保留当前观测。' : i === 4 ? '历史比 2.4 秒长 8 倍，计算延迟约为 3.2 倍。' : '延迟来自表12，不与其他 benchmark 的成功率拼接为同一实验。'}`;
    };
    input.addEventListener('input', update); update();
  }
})();
