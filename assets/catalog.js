(() => {
  "use strict";

  const grid = document.querySelector("#paper-grid");
  const empty = document.querySelector("#paper-empty");
  const error = document.querySelector("#paper-error");
  const count = document.querySelector("#paper-count");
  const search = document.querySelector("#paper-search");
  const updated = document.querySelector("#catalog-updated");

  if (!grid || !empty || !count || !search) return;

  let papers = [];

  const normalize = (value) =>
    String(value || "")
      .normalize("NFKC")
      .toLocaleLowerCase("zh-CN");

  const formatDate = (value) => {
    if (!value) return "未记录日期";
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const paperCard = (paper, index) => {
    const article = element("article", "paper-card");
    const link = element("a", "paper-card__link");
    link.href = paper.href;

    const meta = element("div", "paper-card__meta");
    meta.append(
      element("span", "paper-card__index", String(index + 1).padStart(3, "0")),
      element("time", "paper-card__date", formatDate(paper.readAt)),
    );

    const title = element("h3", "paper-card__title", paper.title);
    const description = element("p", "paper-card__description", paper.description);
    const authors = element(
      "p",
      "paper-card__authors",
      (paper.authors || []).join(" · ") || "作者未记录",
    );
    const footer = element("div", "paper-card__footer");
    const tags = element("div", "paper-card__tags");
    (paper.tags || []).slice(0, 4).forEach((tag) => {
      tags.append(element("span", "paper-tag", tag));
    });
    const arrow = element("span", "paper-card__arrow", "阅读 →");
    footer.append(tags, arrow);
    link.append(meta, title, description, authors, footer);
    article.append(link);
    return article;
  };

  const render = () => {
    const query = normalize(search.value.trim());
    const filtered = papers.filter((paper) => {
      const haystack = normalize(
        [
          paper.title,
          paper.description,
          ...(paper.authors || []),
          ...(paper.tags || []),
        ].join(" "),
      );
      return !query || haystack.includes(query);
    });

    grid.replaceChildren(...filtered.map(paperCard));
    grid.hidden = filtered.length === 0;
    empty.hidden = papers.length !== 0 || Boolean(query);
    count.textContent = query ? `${filtered.length} / ${papers.length}` : String(papers.length);

    if (papers.length > 0 && filtered.length === 0) {
      const noResult = element("div", "paper-no-result");
      noResult.append(
        element("h3", "", "没有匹配的论文"),
        element("p", "", "换一个标题、作者或关键词试试。"),
      );
      grid.hidden = false;
      grid.append(noResult);
    }
  };

  const load = async () => {
    try {
      const response = await fetch("papers/catalog.json", { cache: "no-store" });
      if (!response.ok) throw new Error(`catalog HTTP ${response.status}`);
      const payload = await response.json();
      papers = Array.isArray(payload.papers) ? payload.papers : [];
      if (updated) {
        updated.textContent = payload.updatedAt
          ? `最近阅读：${formatDate(payload.updatedAt)}`
          : "等待第一篇阅读";
      }
      render();
    } catch (loadError) {
      console.error(loadError);
      grid.hidden = true;
      empty.hidden = true;
      if (error) error.hidden = false;
    } finally {
      grid.setAttribute("aria-busy", "false");
    }
  };

  search.addEventListener("input", render);
  load();
})();
