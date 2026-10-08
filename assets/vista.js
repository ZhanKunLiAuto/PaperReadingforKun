(() => {
  const root = document.querySelector('[data-vista-demo]');
  if (!root) return;
  const before = root.querySelector('[data-vista-before]');
  const after = root.querySelector('[data-vista-after]');
  const originals = [before.innerHTML, after.innerHTML];
  const states = {
    observe: ['没有主动取回旧帧', '默认输入：最后一帧', '上下文：尚有本轮记录', '当前观察：t67 最后一帧', '当前帧能显示 X 和实心方块，但单靠它无法确认二者怎样由橙色块变化而来。全部返回帧已在外部档案中。'],
    compact: ['旧图退出上下文，档案仍在', '最后一帧 + 文字摘要', '新上下文：笔记与当前帧', '压缩后仍见：t67 最后一帧', '上下文压缩保留规则与工作笔记，旧图可能不在当前输入中。原始帧档案不被删除，模型之后仍可按轮次和帧号取回。'],
    inspect: ['取回：动作前 · t66 最后一帧', 'inspect：主动取回', '取回前后局部视图', '取回：动作后 · t67 最后一帧', '回看两个历史局部：被点击的橙色块变为 X，下方块变实心。模型有证据修订规则，而当前游戏没有发生新动作。']
  };
  function render(key) {
    const s = states[key];
    root.querySelectorAll('[data-vista-state]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.vistaState === key)));
    root.querySelector('[data-vista-before-label]').textContent = s[0];
    root.querySelectorAll('[data-vista-route]').forEach(el => el.textContent = s[1]);
    root.querySelectorAll('[data-vista-context]').forEach(el => el.textContent = s[2]);
    root.querySelector('[data-vista-after-label]').textContent = s[3];
    root.querySelector('[data-vista-explanation]').textContent = s[4];
    const inspect = key === 'inspect';
    before.innerHTML = inspect ? originals[0] : key === 'compact' ? 'GUIDE：可修订规则\nWORKING：当前计划' : '需要时可请求历史帧';
    after.innerHTML = originals[1];
    before.classList.toggle('is-empty', !inspect);
    [before, after].forEach(el => el.classList.toggle('is-zoom', inspect));
    if (inspect) [before, after].forEach(el => el.querySelector('svg').setAttribute('viewBox', '55 25 40 70'));
    root.querySelector('[data-vista-retrieval]').style.visibility = inspect ? 'visible' : 'hidden';
  }
  root.querySelectorAll('[data-vista-state]').forEach(b => b.addEventListener('click', () => render(b.dataset.vistaState)));
  render('inspect');
})();
