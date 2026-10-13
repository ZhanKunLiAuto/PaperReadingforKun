(() => {
  const demo = document.querySelector('[data-vpp2-demo]');
  if (!demo) return;
  const states = [
    {mode:'事件级继续预训练', output:'完整子任务轨迹', frames:'49 帧；覆盖事件全程', target:'学习目标：从初态直到子任务完成', timing:'事件长短不同，均匀采样的帧间隔也不同', span:'视频：覆盖完整事件（时长可变）', status:'阶段①：均匀取样覆盖完整子任务，描述和视觉终点对齐。此时尚未训练动作专家。'},
    {mode:'固定时长后训练＋蒸馏', output:'固定时长未来潜变量', frames:'17 帧；机器人 8 秒', target:'单次前向生成固定跨度的未来', timing:'机器人 8 秒 / 人手 2 秒；此图展示机器人路径', span:'视频：固定 8 秒；单步生成', status:'阶段②：用固定跨度统一时间尺度，再蒸馏为单步生成。没有动作专家；完整事件不再是每个样本的预测目标。'},
    {mode:'基础冻结＋LoRA（早期）', output:'8 秒视觉未来特征', frames:'动作读取视频 KV', target:'', timing:'', span:'视频：8 秒预见（17 帧）；不是执行时长', status:'阶段③：增加动作专家，经视觉 KV 条件生成 2 秒动作块。下方长度按 2:8 示意；动作 5 步去噪，视频仅单步。训练早期用 LoRA 保护视频骨干。'}
  ];
  const put = (selector, value) => { demo.querySelector(selector).textContent = value; };
  const update = index => {
    const state = states[index];
    demo.querySelectorAll('[data-stage]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.stage) === index)));
    put('[data-video-mode]', state.mode); put('[data-output-label]', state.output); put('[data-frame-label]', state.frames);
    put('[data-target-note]', state.target); put('[data-timing-note]', state.timing); put('[data-video-span]', state.span);
    put('[data-mobile-video]', `视频骨干：${state.mode}`); put('[data-mobile-output]', `${state.output} · ${state.frames}`);
    demo.querySelector('[data-action-graph]').setAttribute('visibility', index === 2 ? 'visible' : 'hidden');
    demo.querySelector('[data-event-note]').setAttribute('visibility', index === 2 ? 'hidden' : 'visible');
    demo.querySelector('[data-action-track]').hidden = index !== 2;
    demo.querySelector('[data-mobile-action]').hidden = index !== 2;
    put('[data-stage-status]', state.status);
  };
  demo.querySelectorAll('[data-stage]').forEach(button => button.addEventListener('click', () => update(Number(button.dataset.stage))));
  update(0);
})();
