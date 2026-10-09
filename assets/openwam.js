(() => {
  const root = document.querySelector('.ow-interactive');
  if (!root) return;
  const modes = {
    vta: ['共同上下文：语言、观测与动作历史、当前观测、本体状态','① 视频预测器','先生成未来视频','→','② 动作专家','读取已生成的未来视频，求动作','VTA：先完成视频去噪，再条件生成动作。动作可见完成的未来视频；视频不可见未来动作。'],
    atv: ['共同上下文：语言、观测与动作历史、当前观测、本体状态','② 视频专家','读取已生成的动作，预测后果','←','① 动作生成器','先生成动作轨迹','ATV：先完成动作去噪，后预测视觉结果。本轮动作不读取本轮预测未来；论文未加入结果筛选或重排环节。'],
    joint: ['共同上下文：语言、观测与动作历史、当前观测、本体状态','同轮 · 视频专家','生成中的视频读取生成中的动作','↔','同轮 · 动作专家','生成中的动作读取生成中的视频','Joint：双方同步去噪，双向交换尚未完成的未来 token，不是先得到干净视频再求动作。'],
    decoupled: ['共同上下文：语言、观测与动作历史、当前观测、本体状态','同轮 · 视频专家','独立预测未来视频','∥','同轮 · 动作专家','独立生成动作轨迹','Decoupled：未来之间没有跨模态注意力；仍共享历史和语言条件，也共享预训练与训练配方。'],
    local: ['视频侧：任务上下文；IDM 侧：仅当前观测、本体状态、给定未来视频','① 已适配的视频预测器','选择新任务的未来；输出 VAE 潜变量','→','② 冻结的局部 IDM','独立训练；无语言及开始前历史','局部组合：接口传递未来 VAE 潜变量，不共享隐藏状态或缓存。冻结的是动作组件；视频预测器仍需新任务适配。']
  };
  const ids = ['ow-context','ow-video-title','ow-video-detail','ow-arrow','ow-action-title','ow-action-detail','ow-status'];
  root.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
    modes[button.dataset.mode].forEach((value,i) => {root.querySelector('#'+ids[i]).textContent=value;});
    root.querySelector('#ow-arrow').setAttribute('aria-label', modes[button.dataset.mode][6]);
    root.querySelectorAll('[data-mode]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
  }));
})();
