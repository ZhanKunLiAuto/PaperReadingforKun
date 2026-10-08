(() => {
  'use strict';
  const stages = document.querySelector('[data-thaw-stages]');
  if (stages) {
    const messages = {
      overview: '当前：总览。教师用于离线提取，投影头用于训练，部署仅保留学生。',
      offline: '当前：离线提取。运行冻结教师，写入特征缓存；不生成未来视频。',
      train: '当前：学生训练。读取缓存与示范动作，更新学生和投影头；不加载教师权重。',
      deploy: '当前：部署。仅学生骨干和动作头参与；教师、缓存及投影头均已移除。'
    };
    const controls = stages.querySelector('.thaw-controls');
    controls.hidden = false;
    controls.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-stage]');
      if (!button || !controls.contains(button)) return;
      const value = button.dataset.stage;
      if (!Object.hasOwn(messages, value)) return;
      stages.querySelectorAll('[data-stage-panel]').forEach((panel) => {
        panel.hidden = panel.dataset.stagePanel !== value;
      });
      controls.querySelectorAll('button').forEach((item) => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      stages.querySelector('[data-stage-status]').textContent = messages[value];
    });
  }
  const vector = document.querySelector('[data-thaw-vector]');
  if (!vector) return;
  const angle = vector.querySelector('#thaw-angle');
  const scale = vector.querySelector('#thaw-scale');
  const update = () => {
    const degrees = Number(angle.value);
    const multiplier = Number(scale.value);
    const radians = degrees * Math.PI / 180;
    const cosine = Math.cos(radians);
    const length = 75 * multiplier;
    const x = 160 + length * Math.cos(radians);
    const y = 180 - length * Math.sin(radians);
    vector.querySelector('[data-student-vector]').setAttribute('d', `M160 180L${x} ${y}`);
    const label = vector.querySelector('[data-student-label]');
    label.setAttribute('x', degrees > 90 ? Math.max(80, x - 5) : x + 5);
    label.setAttribute('y', y - 10);
    label.setAttribute('text-anchor', degrees > 90 ? 'end' : 'start');
    vector.querySelector('[data-angle-output]').value = `${degrees}°`;
    vector.querySelector('[data-scale-output]').value = `${multiplier.toFixed(2)}×`;
    vector.querySelector('[data-cosine]').textContent = cosine.toFixed(3);
    vector.querySelector('[data-loss]').textContent = (1 - cosine).toFixed(3);
    vector.querySelector('[data-weighted-loss]').textContent = (0.5 * (1 - cosine)).toFixed(3);
    vector.querySelector('#cos-desc').textContent = `当前夹角 ${degrees} 度，学生长度倍率 ${multiplier.toFixed(2)}，余弦 ${cosine.toFixed(3)}，对齐损失 ${(1 - cosine).toFixed(3)}。这是数学示意，不是实验结果。`;
  };
  angle.addEventListener('input', update);
  scale.addEventListener('input', update);
  vector.querySelector('[data-vector-reset]').addEventListener('click', () => {
    angle.value = '60';
    scale.value = '1';
    update();
  });
  vector.querySelector('[data-vector-controls]').hidden = false;
  update();
})();
