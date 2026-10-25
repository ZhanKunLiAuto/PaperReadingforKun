(() => {
  const root = document.querySelector('[data-dw-stages]');
  if (root) {
    const states = {
      action: {
        future: '冻结的视频通路', futureDetail: '使用示范未来 z*；此时不以学生预测未来训练动作模型。',
        action: 'Gψ：训练单步动作模型', actionDetail: '输入 z* 与上下文 h，直接预测动作块 â。',
        forward: '示范未来 z* + 上下文 h → Gψ（1 次）→ 动作 â → 与示范 a* 比较',
        gradient: '动作误差 → 更新 ψ；视频通路冻结。',
        status: '阶段 1 学会单步读取动作。真实未来是训练条件，部署时不会获得它。',
        target: 'action'
      },
      future: {
        future: 'Fθ：训练单步未来模型', futureDetail: '从上下文 h 产生自己的未来 ẑ；可选 z* 重建锚点。',
        action: 'Gψ：权重冻结，梯度穿过', actionDetail: '读取学生预测 ẑ 与 h，动作误差反传到 Fθ。',
        forward: '上下文 h → Fθ（1 次）→ 学生未来 ẑ → Gψ（1 次）→ 动作 â → a* 监督',
        gradient: '动作误差 → 穿过 Gψ 对输入的导数 → 更新 θ；ψ 保持不变。',
        status: '阶段 2 对齐训练与部署的未来接口。冻结 G 的参数不等于切断通过 G 的梯度。',
        target: 'future'
      },
      deploy: {
        future: 'Fθ：单步预测未来', futureDetail: '固定输入噪声，不在控制块之间重新随机采样。',
        action: 'Gψ：单步生成动作', actionDetail: '读取预测未来和上下文，输出待执行动作块。',
        forward: '真实观测 / 历史 / 指令 → Fθ → ẑ → Gψ → 动作执行 → 下一轮真实观测',
        gradient: '部署没有监督或参数更新；未来可解码检查，控制条件是未来表征。',
        status: '部署每条流各前向 1 次。1/1 表示两次串联的专家计算，不是整套系统只调用一次网络。',
        target: 'none'
      }
    };
    const controls = root.querySelector('[data-dw-controls]');
    controls.hidden = false;
    controls.addEventListener('click', (event) => {
      const button = event.target.closest('[data-dw-stage]');
      if (!button) return;
      const state = states[button.dataset.dwStage];
      for (const key of ['future', 'futureDetail', 'action', 'actionDetail', 'forward', 'gradient', 'status']) {
        root.querySelector(`[data-dw-field="${key}"]`).textContent = state[key];
      }
      root.querySelectorAll('[data-dw-stage]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      root.querySelectorAll('[data-dw-node]').forEach((item) => { item.dataset.active = String(item.dataset.dwNode === state.target); });
    });
  }
  const toy = document.querySelector('[data-dw-toy]');
  if (!toy) return;
  toy.querySelector('[data-dw-slider-wrap]').hidden = false;
  const slider = toy.querySelector('input');
  const update = () => {
    const angle = Number(slider.value), rad = angle * Math.PI / 180;
    const x = Math.cos(rad), y = Math.sin(rad), error = 100 * x * x + y * y;
    toy.querySelector('[data-dw-angle]').textContent = `${angle}°`;
    toy.querySelector('[data-dw-vector]').setAttribute('x2', String(55 + 180 * x));
    toy.querySelector('[data-dw-vector]').setAttribute('y2', String(245 - 180 * y));
    toy.querySelector('[data-dw-dot]').setAttribute('cx', String(55 + 180 * x));
    toy.querySelector('[data-dw-dot]').setAttribute('cy', String(245 - 180 * y));
    toy.querySelector('[data-dw-energy]').textContent = `${(100 * x * x).toFixed(1)}%`;
    toy.querySelector('[data-dw-error]').textContent = error.toFixed(2);
    toy.querySelector('[data-dw-bar]').style.width = `${error}%`;
    toy.querySelector('[data-dw-toy-status]').textContent = `表征误差平方和始终为 1；方向为 ${angle}° 时，动作误差平方和为 ${error.toFixed(2)}。这是二维线性示意，不是论文实测曲线。`;
  };
  slider.addEventListener('input', update);
  update();
})();
