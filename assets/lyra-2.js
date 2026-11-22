(() => {
  const figure = document.querySelector(".lyra-retrieval");
  if (!figure) return;

  const options = {
    first: {
      count: "已选 A，覆盖 8 / 15 格",
      shape: "",
      description: "A 的可见点最多，先占第一个槽。实色格已有历史观测，空格仍待覆盖。",
      title: "A 覆盖 8 格，空白 7 格。"
    },
    rank: {
      count: "已选 A、B，覆盖 9 / 15 格",
      shape: "M0 40h20v20H0z",
      description: "B 的单帧分数排第二，但它看见的 7 格中已有 6 格被 A 覆盖。斜纹标出它补上的左下角一格。",
      title: "A 覆盖 8 格，B 在左下角新增 1 格，空白 6 格。"
    },
    greedy: {
      count: "已选 A、C，覆盖 11 / 15 格",
      shape: "M80 0h20v60H80z",
      description: "扣除与 A 的重合区域，B 能补 1 格，C 能补 3 格。因此第二个槽给 C，斜纹标出它补上的整列。",
      title: "A 覆盖 8 格，C 在最右一列新增 3 格，空白 4 格。"
    }
  };
  const controls = figure.querySelector(".lyra-retrieval__controls");
  const buttons = controls.querySelectorAll("[data-lyra-pick]");
  const count = figure.querySelector("[data-lyra-count]");
  const detail = figure.querySelector("[data-lyra-detail]");
  const newCells = figure.querySelector("[data-lyra-new]");
  const title = figure.querySelector("#lyra-grid-title");

  for (const button of buttons) {
    button.addEventListener("click", () => {
      const state = options[button.dataset.lyraPick];
      for (const candidate of buttons) {
        candidate.setAttribute("aria-pressed", String(candidate === button));
      }
      count.textContent = state.count;
      detail.textContent = state.description;
      newCells.setAttribute("d", state.shape);
      title.textContent = state.title;
    });
  }
  controls.hidden = false;
})();
