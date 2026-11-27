(() => {
  const explorer = document.querySelector("[data-sw-explorer]");
  if (!explorer) return;

  const find = (selector) => explorer.querySelector(selector);
  const buttons = explorer.querySelectorAll("button[data-sw-step], button[data-sw-camera]");
  let step = "future";
  let camera = "A";

  // Two illustrative camera poses around the same tabletop; world units are arbitrary.
  function project(x, y, z) {
    const horizontal = camera === "A" ? x - y : x + y;
    const depth = camera === "A" ? x + y : -x + y;
    return [128 + 1.35 * horizontal, 95 - 0.58 * depth - 1.1 * z];
  }

  function setPoints(selector, vertices) {
    const points = vertices.map((vertex) => project(...vertex).join(",")).join(" ");
    find(selector).setAttribute("points", points);
  }

  function updateDiagram() {
    const predicted = step === "future";
    const gripX = predicted ? 9 : -22;
    const gripY = 7;
    const description = predicted ? "动作后的" : "观测时刻的";
    const side = camera === "A" ? "左前方" : "右前方";

    find("[data-sw-map-grip]").setAttribute("transform",
      `translate(${130 + gripX * 1.75} ${72 - gripY * 1.45})`);
    explorer.querySelectorAll("[data-sw-map-camera]").forEach((marker) => {
      marker.setAttribute("display", marker.dataset.swMapCamera === camera ? "inline" : "none");
    });
    find("[data-sw-projected-table]").setAttribute("transform",
      camera === "A" ? "translate(0 0)" : "translate(256 0) scale(-1 1)");

    setPoints('[data-sw-prong="left"]', [
      [gripX, gripY, 46], [gripX, gripY, 31], [gripX - 5, gripY, 31], [gripX - 5, gripY, 23],
    ]);
    setPoints('[data-sw-prong="right"]', [
      [gripX, gripY, 31], [gripX + 5, gripY, 31], [gripX + 5, gripY, 23],
    ]);
    const [jointX, jointY] = project(gripX, gripY, 31);
    find("[data-sw-joint]").setAttribute("cx", jointX);
    find("[data-sw-joint]").setAttribute("cy", jointY);
    const visibleX = camera === "A" ? 22 : 32;
    setPoints('[data-sw-face="side"]', [
      [visibleX, -12, 10], [visibleX, -2, 10], [visibleX, -2, 0], [visibleX, -12, 0],
    ]);
    setPoints('[data-sw-face="front"]', [[22,-12,10], [32,-12,10], [32,-12,0], [22,-12,0]]);
    setPoints('[data-sw-face="top"]', [[22,-12,10], [32,-12,10], [32,-2,10], [22,-2,10]]);

    find("[data-sw-source]").textContent = predicted ? "D 的预测" : "T 编码的观测";
    find("[data-sw-projection]").textContent = `R · 相机 ${camera}`;
    find("#sw-map-desc").textContent = `桌面上是${description}夹爪和方块，相机 ${camera} 从${side}观察。`;
    find("#sw-image-desc").textContent = `相机 ${camera} 从${side}投影${description}夹爪和方块。`;
    buttons.forEach((button) => {
      const active = button.dataset.swStep === step || button.dataset.swCamera === camera;
      button.setAttribute("aria-pressed", String(active));
    });
  }

  buttons.forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.swStep === step || button.dataset.swCamera === camera) return;
    let message;
    if (button.dataset.swStep) {
      step = button.dataset.swStep;
      message = step === "future"
        ? `D 根据历史状态和动作预测下一时刻，夹爪靠近方块。R 从相机 ${camera} 投影新的状态。`
        : `回到观测时刻。T 从输入图像编码当前状态，R 从相机 ${camera} 投影它。`;
    } else {
      camera = button.dataset.swCamera;
      message = `切到相机 ${camera}。左图的夹爪和方块保持原位，右图由 R 从新位置再次投影同一个状态。`;
    }
    updateDiagram();
    find("[data-sw-status]").textContent = message;
  }));
  find("[data-sw-controls]").hidden = false;
})();
