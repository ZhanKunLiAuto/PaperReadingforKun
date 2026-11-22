(() => {
  const figure = document.querySelector("[data-aw-interaction]");
  if (!figure) return;

  // Teaching example. The horizontal and vertical roads intersect at the origin.
  // Each array contains a coordinate in metres at t = 0, 1, 2, 3, 4 seconds.
  const agentX = [-8, -4, 0, 4, 8];
  const egoPaths = {
    maintain: [-8, -4, 0, 4, 8],
    yield: [-8, -5, -3, 0, 3],
  };
  const safeDistance = 2.5;
  const scale = 10.5;
  const buttons = figure.querySelectorAll("[data-aw-plan]");
  const timeInput = figure.querySelector("[data-aw-time]");
  const ego = figure.querySelector("[data-aw-ego]");
  const agent = figure.querySelector("[data-aw-agent]");
  const distanceLine = figure.querySelector("[data-aw-line]");
  const egoPath = figure.querySelector("[data-aw-path]");
  const timeLabel = figure.querySelector("[data-aw-time-label]");
  const distanceLabel = figure.querySelector("[data-aw-distance]");
  const minimumLabel = figure.querySelector("[data-aw-minimum]");
  const ttcLabel = figure.querySelector("[data-aw-ttc]");
  const description = figure.querySelector("[data-aw-description]");
  let plan = "maintain";

  function render() {
    const time = Number(timeInput.value);
    const egoY = egoPaths[plan];
    const distances = agentX.map((x, index) => Math.hypot(x, egoY[index]));
    const firstUnsafe = distances.findIndex((distance) => distance < safeDistance);
    const egoScreenY = 130 - egoY[time] * scale;
    const agentScreenX = 140 + agentX[time] * scale;
    const currentDistance = distances[time].toFixed(1);

    ego.setAttribute("transform", `translate(140 ${egoScreenY})`);
    agent.setAttribute("transform", `translate(${agentScreenX} 130)`);
    distanceLine.setAttribute("x1", agentScreenX);
    distanceLine.setAttribute("y2", egoScreenY);
    egoPath.setAttribute("points", egoY.map((y) => `140,${130 - y * scale}`).join(" "));
    timeLabel.textContent = `${time} 秒`;
    timeInput.setAttribute("aria-valuetext", `第 ${time} 秒`);
    distanceLabel.textContent = `${currentDistance} 米`;
    minimumLabel.textContent = `${Math.min(...distances).toFixed(1)} 米`;
    ttcLabel.textContent = firstUnsafe < 0 ? "∞（窗口内未触发）" : `${firstUnsafe} 秒`;
    description.textContent = `第 ${time} 秒，两车相距 ${currentDistance} 米。`;
    for (const button of buttons) {
      button.setAttribute("aria-pressed", String(button.dataset.awPlan === plan));
    }
  }

  for (const button of buttons) {
    button.addEventListener("click", () => {
      plan = button.dataset.awPlan;
      render();
    });
  }
  timeInput.addEventListener("input", render);
  render();
  figure.querySelector("[data-aw-controls]").hidden = false;
})();
