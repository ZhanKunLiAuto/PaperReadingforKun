(() => {
  'use strict';
  const stages = document.querySelector('[data-sm-stages]');
  if (stages) {
    const descriptions = {
      collect: '① 采集：策略权重保持不变，动作加探索噪声后交给 MuJoCo Warp。缓冲区保存实际执行的动作、状态与仿真上下文；这一阶段不对物理仿真器求导。',
      fit: '② 拟合：用记录的动作连续预测 8 步，每一步把预测状态继续喂回模型。误差梯度只更新世界模型参数 ω；下一次策略更新再使用它。',
      improve: '③ 改策略：从缓冲区状态出发，策略在模型内闭环行动 32 步。世界模型权重固定，但状态与动作的导数保留；回报沿橙色梯度路径更新策略 θ。critic 另用固定目标拟合。',
      deploy: '④ 真机：未来参考动作与最近 10 帧本体观测进入策略，输出 29 维关节设定值。世界模型、critic 和回放缓冲区退出执行链；下一训练迭代仍会重新更新模型。'
    };
    const buttons = [...stages.querySelectorAll('[data-sm-stage]')];
    const show = (name) => {
      if (!Object.hasOwn(descriptions, name)) return;
      stages.querySelectorAll('[data-sm-panel]').forEach(p => { p.hidden = p.dataset.smPanel !== name; });
      buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.smStage === name)));
      stages.querySelector('[data-sm-stage-status]').textContent = descriptions[name];
    };
    buttons.forEach(b => b.addEventListener('click', () => show(b.dataset.smStage)));
    stages.querySelector('.sm-controls').hidden = false;
    show('collect');
  }
  const horizon = document.querySelector('[data-sm-horizon]');
  if (horizon) {
    let steps = 32;
    const critic = horizon.querySelector('[data-sm-critic-toggle]');
    const evidence = {
      8: ['有 critic 的 H=8 仍未达到训练回报 0.82。', '无 critic 的 H=8 未达到训练回报 0.82。'],
      16: ['有 critic 的 H=16 可达到接近无 critic、H=32 的最终回报。', '无 critic 的 H=16 未达到训练回报 0.82。'],
      32: ['默认 H=32 配合 critic，在这组消融中最快达到训练回报 0.82。', '无 critic 的 H=32 可以学到相近的名义跟踪回报，但扰动恢复较弱。'],
      64: ['H=64 可以学会，但该消融中达到目标回报慢于默认 H=32。', 'H=64 可以学会；增加展开长度并未超过默认配置的训练效率。'],
      128: ['H=128 的最终回报下降；正文报告从 64 增至 128，达到目标的耗时接近三倍。', '无 critic 的 H=128 也能达到目标，但长展开增加开销，最终回报低于较短时域。']
    };
    const render = () => {
      horizon.querySelectorAll('[data-sm-steps]').forEach(b => b.setAttribute('aria-pressed', String(Number(b.dataset.smSteps) === steps)));
      horizon.querySelector('[data-sm-time-fill]').style.width = `${steps / 128 * 100}%`;
      horizon.querySelector('[data-sm-duration]').textContent = `${steps} 步 × 0.02 秒 = ${(steps * .02).toFixed(2)} 秒`;
      const end = horizon.querySelector('[data-sm-terminal]');
      end.dataset.active = String(critic.checked);
      end.textContent = critic.checked ? `第 ${steps} 步 → critic V：估计展开结束之后的长期回报，梯度可经末端状态传回策略。` : `第 ${steps} 步 → 截断：只优化窗口内奖励，没有末端价值估计。`;
      horizon.querySelector('[data-sm-horizon-status]').textContent = evidence[steps][critic.checked ? 0 : 1];
    };
    horizon.querySelectorAll('[data-sm-steps]').forEach(b => b.addEventListener('click', () => { steps = Number(b.dataset.smSteps); render(); }));
    critic.addEventListener('change', render);
    horizon.querySelectorAll('.sm-controls').forEach(c => { c.hidden = false; });
    render();
  }
})();
