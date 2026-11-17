const figure = document.querySelector("[data-f4d-attention]");

if (figure) {
  const controls = figure.querySelector(".f4d-figure__controls");
  const buttons = controls.querySelectorAll("[data-mode]");
  const cells = figure.querySelectorAll("[data-join]");
  const note = figure.querySelector("[data-f4d-note]");
  const notes = {
    view: note.textContent,
    time: "跨时间层读取前广角在三个采样时刻的图像。其他机位在各自的时间组内交流。",
  };

  for (const button of buttons) {
    button.addEventListener("click", () => {
      const mode = button.dataset.mode;
      for (const option of buttons) {
        option.setAttribute("aria-pressed", String(option === button));
      }
      for (const cell of cells) {
        const joined = cell.dataset.join === mode;
        cell.classList.toggle("f4d-joined", joined);
        cell.textContent = joined ? "同组" : "—";
      }
      note.textContent = notes[mode];
    });
  }

  controls.hidden = false;
}
