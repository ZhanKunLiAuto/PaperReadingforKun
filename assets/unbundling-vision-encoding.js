(() => {
  const figure = document.querySelector("[data-vision-recipes]");
  if (!figure) return;

  const controls = figure.querySelector("[data-recipe-controls]");
  const buttons = controls.querySelectorAll("button[data-recipe]");
  const conditionalNodes = figure.querySelectorAll("[data-show-recipes]");
  const status = figure.querySelector("[data-recipe-status]");

  function selectRecipe(button) {
    const recipe = button.dataset.recipe;
    for (const option of buttons) {
      option.setAttribute("aria-pressed", String(option === button));
    }
    for (const node of conditionalNodes) {
      node.hidden = !node.dataset.showRecipes.split(" ").includes(recipe);
    }
    const explanation = figure.querySelector("[data-recipe-note]:not([hidden])");
    status.textContent = button.textContent.trim() + "。" + explanation.textContent.trim();
  }

  for (const button of buttons) {
    button.addEventListener("click", () => selectRecipe(button));
  }
  controls.hidden = false;
})();
