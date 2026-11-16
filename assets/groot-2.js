(() => {
  for (const figure of document.querySelectorAll(".gr2-transfer")) {
    const controls = figure.querySelector(".gr2-transfer__controls");
    const buttons = controls.querySelectorAll("[data-gr2-stage]");
    const panels = figure.querySelectorAll("[data-gr2-panel]");
    const status = figure.querySelector('[role="status"]');

    function showStage(stage) {
      for (const button of buttons) {
        button.setAttribute("aria-pressed", String(button.dataset.gr2Stage === stage));
      }
      for (const panel of panels) {
        panel.hidden = panel.dataset.gr2Panel !== stage;
      }
    }

    for (const button of buttons) {
      button.addEventListener("click", () => {
        const stage = button.dataset.gr2Stage;
        showStage(stage);
        status.textContent = figure.querySelector('[data-gr2-panel="' + stage + '"] h4').textContent;
      });
    }
    showStage("train");
    controls.hidden = false;
  }
})();
