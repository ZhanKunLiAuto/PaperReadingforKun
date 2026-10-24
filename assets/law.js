(() => {
  'use strict';
  const loop = document.querySelector('[data-law-loop]');
  if (loop) {
    const states = [
      {nodes:['plan','wam'],flows:['plan'],objective:'打开第一个抽屉',text:'① 初始化：planner 根据全局指令、当前图像和 VLM 记忆生成剩余计划。第一项成为当前子任务，WAM 随后以它为条件。这里用 Organize 的前两个阶段作机制示意。'},
      {nodes:['wam','value','execute'],flows:['candidate','action'],objective:'打开第一个抽屉',text:'② 每次生成动作块：WAM 用独立噪声采样 32 个候选，每个 32 步；value 同步评分，保留 top-8 并融合。执行只取融合块的前缀，然后重新观察。候选生成和评分都在动作决策的同步路径上。'},
      {nodes:['execute','state'],flows:['observe'],objective:'打开第一个抽屉',text:'③ 继续执行：state 与动作执行并行。没有有效结果，或有效完成概率小于 0.5，就继续当前子任务；不会因为等待状态评估而阻塞。图中的概率仅用于说明阈值，不是实测输出。'},
      {nodes:['state','memory','plan'],flows:['advance','memory'],objective:'放入第一个方块',text:'④ 接受完成：结果属于当前子任务实例、时间戳比上次已消费结果更新，且完成概率至少 0.5。在控制循环边界保存当时的观测，增加实例编号，重新规划；新计划第一项成为“放入第一个方块”。最终仅剩一个子任务时，接受完成则结束。'},
      {nodes:['state','execute'],flows:[],objective:'放入第一个方块',text:'⑤ 丢弃迟到结果：此前“开抽屉”的完成预测现在才返回，因为实例编号属于旧子任务，不能触发第二次切换。“放方块”仍是当前目标。每条结果按观测采集时间排序，并丢弃被更新结果替代的预测。'}
    ];
    const buttons = [...loop.querySelectorAll('[data-loop-step]')];
    const render = index => {
      const state = states[index];
      buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
      loop.querySelectorAll('[data-loop-node]').forEach(el=>el.classList.toggle('active',state.nodes.includes(el.dataset.loopNode)));
      loop.querySelectorAll('[data-loop-flow]').forEach(el=>el.classList.toggle('active',state.flows.includes(el.dataset.loopFlow)));
      loop.querySelector('[data-loop-status]').textContent=state.text;
      loop.querySelector('[data-loop-objective]').textContent=state.objective;
      loop.querySelector('[data-loop-instance]').textContent=index>=3?'实例编号 u = 1':'实例编号 u = 0';
      loop.querySelector('[data-loop-result]').textContent=index===2?'有效预测：未完成 / 无结果':index===3?'有效预测：完成 → 切换':index===4?'旧实例 u = 0 → 丢弃':'state 与动作执行并行';
    };
    buttons.forEach((button,i)=>button.addEventListener('click',()=>render(i)));
    loop.querySelector('[data-loop-controls]').hidden=false;
    render(0);
  }
  const value = document.querySelector('[data-law-value]');
  if (value) {
    let mode='local';
    const slider=value.querySelector('input');
    const buttons=[...value.querySelectorAll('[data-value-mode]')];
    const render=()=>{
      const gamma=Number(slider.value);
      const scores=mode==='local'?[gamma**9,gamma**9,0]:[0,0,0];
      value.querySelector('[data-gamma]').textContent=gamma.toFixed(3);
      buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.valueMode===mode)));
      value.querySelectorAll('[data-return]').forEach((out,i)=>out.textContent=scores[i].toFixed(3));
      value.querySelectorAll('[data-return-bar]').forEach((bar,i)=>bar.style.width=`${scores[i]*100}%`);
      value.querySelector('[data-value-status]').textContent=mode==='local'?`子任务局部回报：前两段各在第 10 个动作获得奖励 1，因此段首回报 γ⁹ = ${scores[0].toFixed(3)}；第三段失败为 0。子任务边界令 bootstrap 系数 b = 0，后续失败不抹去此前完成的局部目标。`:'整条任务终点奖励：因为最后一段失败，整条任务没有成功奖励，三段的示意回报都为 0。这里展示两种信用分配的区别，不复现作者训练出的 critic 数值。';
    };
    buttons.forEach(button=>button.addEventListener('click',()=>{mode=button.dataset.valueMode;render();}));
    slider.addEventListener('input',render);
    value.querySelector('[data-value-controls]').hidden=false;
    render();
  }
})();
