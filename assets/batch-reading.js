/* Progressive enhancement: every mechanism state remains readable without JS. */
document.querySelectorAll('[data-mechanism-lab]').forEach((lab) => {
  const buttons = [...lab.querySelectorAll('[data-lab-target]')];
  const states = [...lab.querySelectorAll('[data-lab-state]')];
  const status = lab.querySelector('[data-lab-status]');
  if (!buttons.length || !states.length) return;
  const select = (button, announce = true) => {
    const target = states.find((state) => state.id === button.dataset.labTarget);
    if (!target) return;
    states.forEach((state) => { state.hidden = state !== target; });
    buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    if (status && announce) status.textContent = `当前图示：${button.textContent.trim()}`;
  };
  buttons.forEach((button) => {
    button.setAttribute('aria-controls', button.dataset.labTarget);
    button.addEventListener('click', () => select(button));
  });
  select(buttons.find((button) => button.getAttribute('aria-pressed') === 'true') || buttons[0], false);
  lab.dataset.labReady = 'true';
});
