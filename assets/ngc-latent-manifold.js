(() => {
  const slider = document.getElementById('ngc-angle');
  if (!slider) return;
  const query = document.getElementById('ngc-query');
  const label = document.getElementById('ngc-query-label');
  const path = document.getElementById('ngc-path');
  const chord = document.getElementById('ngc-chord');
  const buttons = [...document.querySelectorAll('[data-ngc-mode]')];
  let mode = 'graph';
  const point = (degrees) => {
    const angle = degrees * Math.PI / 180;
    return [300 + 120 * Math.sin(angle), 160 - 120 * Math.cos(angle)];
  };
  const render = () => {
    const degrees = Number(slider.value);
    const radians = degrees * Math.PI / 180;
    const [x, y] = point(degrees);
    query.setAttribute('cx', x); query.setAttribute('cy', y);
    label.setAttribute('x', x + (x < 300 ? -24 : 15));
    label.setAttribute('y', y + (degrees === 0 ? 27 : 4));
    chord.setAttribute('x2', x); chord.setAttribute('y2', y);
    const coordinates = Array.from({length: degrees / 10 + 1}, (_, i) => point(i * 10));
    path.setAttribute('d', coordinates.map(([px, py], i) => `${i ? 'L' : 'M'}${px} ${py}`).join(' '));
    path.setAttribute('visibility', mode === 'graph' ? 'visible' : 'hidden');
    chord.setAttribute('visibility', mode === 'ambient' ? 'visible' : 'hidden');
    document.getElementById('ngc-angle-output').textContent = `${degrees}°`;
    document.getElementById('ngc-ambient').textContent = (2 - 2 * Math.cos(radians)).toFixed(3);
    document.getElementById('ngc-distance').textContent = (degrees / 10 * 2 * Math.sin(Math.PI / 36)).toFixed(3);
    document.getElementById('ngc-status').textContent = mode === 'graph'
      ? `沿图计距：经过 ${degrees / 10} 条局部边；沿圆弧走远时，代价持续增大。`
      : `直线计距：候选在 ${degrees}°；超过 180° 后继续走远，平方欧氏代价反而减小。`;
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.ngcMode === mode)));
  };
  slider.addEventListener('input', render);
  buttons.forEach((button) => button.addEventListener('click', () => { mode = button.dataset.ngcMode; render(); }));
  render();
})();
