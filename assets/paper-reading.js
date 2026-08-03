(() => {
  "use strict";

  if (document.body.dataset.pageKind !== "paper") return;

  const main = document.querySelector(".paper-main");
  const commentPanel = document.querySelector(".paper-comment-panel");
  const markPanel = document.querySelector(".paper-mark-panel");
  if (!main || !commentPanel || !markPanel) return;

  const bridgeUrl = (document.body.dataset.bridgeUrl || "http://127.0.0.1:8766").replace(/\/$/, "");
  const pagePath = document.body.dataset.pagePath || window.location.pathname;
  const storageKey = `paper-reading:pending:${pagePath}`;
  const authorKey = "paper-reading:comment-author";
  const kindLabels = {
    term: "名词讲解",
    logic: "逻辑梳理",
    diagram: "作图理解",
  };

  let bridgeOnline = false;
  let activeSelection = null;
  let activeSectionId = "thesis";
  let activeKind = "logic";

  const readStorage = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  };

  const writeStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  };

  const makeId = (prefix) => {
    const id = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    return `${prefix}-${id}`;
  };

  const cleanUrl = () => {
    const url = new URL(window.location.href);
    url.hash = "";
    url.search = "";
    return url.toString();
  };

  const sectionTitle = (section) =>
    section?.querySelector(":scope > h1, :scope > h2, :scope > h3")?.textContent?.trim() || document.title;

  const commonPayload = (selection = activeSelection) => {
    const section = selection?.section || document.querySelector(`#${CSS.escape(activeSectionId)}`);
    return {
      text: selection?.text || "",
      anchorText: selection?.anchorText || "",
      sectionId: section?.id || activeSectionId || "thesis",
      sectionTitle: sectionTitle(section),
      pageTitle: document.title,
      pagePath,
      url: cleanUrl(),
      createdAt: new Date().toISOString(),
    };
  };

  const toast = document.createElement("div");
  toast.className = "paper-toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.hidden = true;
  document.body.append(toast);
  let toastTimer;

  const notify = (message) => {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 3600);
  };

  const status = markPanel.querySelector("[data-bridge-status]") || document.createElement("p");
  if (!status.parentElement) {
    status.className = "bridge-status";
    status.dataset.bridgeStatus = "";
    markPanel.prepend(status);
  }

  const setBridgeStatus = (online) => {
    bridgeOnline = online;
    status.dataset.state = online ? "online" : "local";
    status.textContent = online
      ? "本地写回已连接：标记与评论会进入 HTML"
      : "静态阅读模式：新评论仅保存在此浏览器";
  };

  const toolbar = document.createElement("div");
  toolbar.className = "paper-askbar";
  toolbar.setAttribute("role", "toolbar");
  toolbar.setAttribute("aria-label", "划线协作工具");
  toolbar.hidden = true;
  toolbar.innerHTML = `
    <div class="paper-askbar__actions">
      <span class="paper-askbar__label">需要解释</span>
      <button class="paper-askbar__button" type="button" data-kind="term">名词讲解</button>
      <button class="paper-askbar__button" type="button" data-kind="logic">逻辑梳理</button>
      <button class="paper-askbar__button" type="button" data-kind="diagram">作图理解</button>
      <span class="paper-askbar__divider" aria-hidden="true"></span>
      <button class="paper-askbar__button paper-askbar__button--comment" type="button" data-action="comment">写评论</button>
    </div>
    <form class="paper-askbar__form" hidden>
      <label>
        <span class="sr-only">补充你的问题</span>
        <textarea class="paper-askbar__input" rows="2" maxlength="4000" placeholder="可补充你具体想弄清的问题"></textarea>
      </label>
      <div class="paper-askbar__form-actions">
        <button class="paper-askbar__cancel" type="button">取消</button>
        <button class="paper-askbar__submit" type="submit">记录请求</button>
      </div>
    </form>
  `;
  document.body.append(toolbar);

  const askForm = toolbar.querySelector(".paper-askbar__form");
  const askInput = toolbar.querySelector(".paper-askbar__input");

  const commentDialog = document.createElement("div");
  commentDialog.className = "paper-comment-dialog";
  commentDialog.hidden = true;
  commentDialog.innerHTML = `
    <div class="paper-comment-dialog__backdrop" data-comment-cancel></div>
    <section class="paper-comment-dialog__card" role="dialog" aria-modal="true" aria-labelledby="paper-comment-dialog-title">
      <header>
        <div>
          <p class="eyebrow">PERSONAL COMMENT</p>
          <h2 id="paper-comment-dialog-title">写下你的评论</h2>
        </div>
        <button type="button" class="icon-button" data-comment-cancel aria-label="关闭评论窗口">×</button>
      </header>
      <p class="paper-comment-dialog__context" data-comment-context></p>
      <form data-comment-form>
        <label class="field-label">
          <span>署名 <small>可选</small></span>
          <input type="text" name="author" maxlength="200" autocomplete="name" placeholder="我的评论">
        </label>
        <label class="field-label">
          <span>评论</span>
          <textarea name="comment" rows="6" maxlength="10000" required placeholder="记录判断、反驳、联想，或下一步想验证的事情。"></textarea>
        </label>
        <div class="paper-comment-dialog__actions">
          <button type="button" class="button button--quiet" data-comment-cancel>取消</button>
          <button type="submit" class="button button--primary">保存评论</button>
        </div>
      </form>
    </section>
  `;
  document.body.append(commentDialog);
  const commentForm = commentDialog.querySelector("[data-comment-form]");
  const commentContext = commentDialog.querySelector("[data-comment-context]");
  const authorInput = commentForm.elements.author;
  const commentInput = commentForm.elements.comment;

  const hideToolbar = () => {
    toolbar.hidden = true;
    askForm.hidden = true;
    askInput.value = "";
  };

  const selectionSnapshot = () => {
    const selection = window.getSelection();
    const text = selection?.toString().replace(/\s+/g, " ").trim();
    if (!selection || selection.rangeCount === 0 || !text) return null;
    const range = selection.getRangeAt(0);
    const node = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
      ? range.commonAncestorContainer
      : range.commonAncestorContainer.parentElement;
    if (!node || !main.contains(node) || node.closest(".paper-comment, .paper-question-marker, button, input, textarea")) {
      return null;
    }
    const block = node.closest("p, li, h1, h2, h3, h4, .svg-figure, .formula-card") || node;
    const section = node.closest("section[id]") || document.querySelector("#thesis");
    return {
      text: text.slice(0, 4000),
      anchorText: (block.innerText || block.textContent || "").replace(/\s+/g, " ").trim().slice(0, 8000),
      section,
      rect: range.getBoundingClientRect(),
    };
  };

  const showToolbar = (snapshot) => {
    activeSelection = snapshot;
    askForm.hidden = true;
    toolbar.hidden = false;
    const width = Math.min(toolbar.offsetWidth || 620, window.innerWidth - 24);
    const left = Math.max(12, Math.min(snapshot.rect.left + snapshot.rect.width / 2 - width / 2, window.innerWidth - width - 12));
    const preferredTop = snapshot.rect.top - toolbar.offsetHeight - 12;
    const top = preferredTop > 12 ? preferredTop : snapshot.rect.bottom + 12;
    toolbar.style.left = `${left}px`;
    toolbar.style.top = `${Math.max(12, top)}px`;
  };

  const openComment = (selection = null) => {
    activeSelection = selection;
    const context = selection?.text
      ? `评论选区：“${selection.text.slice(0, 120)}${selection.text.length > 120 ? "…" : ""}”`
      : `评论章节：${sectionTitle(document.querySelector(`#${CSS.escape(activeSectionId)}`))}`;
    commentContext.textContent = context;
    authorInput.value = readStorage(authorKey, "");
    commentInput.value = "";
    commentDialog.hidden = false;
    document.body.classList.add("has-modal");
    window.setTimeout(() => commentInput.focus(), 0);
    hideToolbar();
  };

  const closeComment = () => {
    commentDialog.hidden = true;
    document.body.classList.remove("has-modal");
  };

  const post = async (endpoint, payload) => {
    const response = await fetch(`${bridgeUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) throw new Error(result.error || `HTTP ${response.status}`);
    return result;
  };

  const pendingItems = () => {
    const value = readStorage(storageKey, []);
    return Array.isArray(value) ? value : [];
  };

  const savePending = (endpoint, payload) => {
    const pending = pendingItems();
    pending.push({ endpoint, payload });
    writeStorage(storageKey, pending);
    renderLocalComments();
  };

  const localCommentsContainer = (() => {
    let container = commentPanel.querySelector("[data-local-comments]");
    if (!container) {
      container = document.createElement("div");
      container.dataset.localComments = "";
      commentPanel.append(container);
    }
    return container;
  })();

  function renderLocalComments() {
    const localComments = pendingItems().filter((item) => item.endpoint === "/__paper_comment");
    localCommentsContainer.replaceChildren();
    localComments.forEach(({ payload }) => {
      const article = document.createElement("article");
      article.className = "paper-comment paper-comment--local";
      article.dataset.localComment = payload.id;
      const header = document.createElement("header");
      header.className = "paper-comment__header";
      const author = document.createElement("strong");
      author.textContent = payload.author || "我的评论";
      const badge = document.createElement("span");
      badge.className = "paper-comment__local-badge";
      badge.textContent = "仅此浏览器";
      const body = document.createElement("p");
      body.className = "paper-comment__body";
      body.textContent = payload.comment;
      header.append(author, badge);
      article.append(header, body);
      localCommentsContainer.append(article);
    });

    const countNode = commentPanel.querySelector("[data-comment-count]");
    if (countNode) {
      const persisted = document.querySelectorAll(".paper-comment:not(.paper-comment--local)").length;
      countNode.textContent = String(persisted + localComments.length);
    }
  }

  const flushPending = async () => {
    const pending = pendingItems();
    if (!bridgeOnline || pending.length === 0) return;
    const remaining = [];
    let reload = false;
    for (const item of pending) {
      try {
        const result = await post(item.endpoint, item.payload);
        reload ||= Boolean(result.reload);
      } catch (flushError) {
        console.warn("paper-reading pending item not written", flushError);
        remaining.push(item);
      }
    }
    writeStorage(storageKey, remaining);
    renderLocalComments();
    if (reload) {
      window.location.reload();
    }
  };

  const healthCheck = async () => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 900);
    try {
      const response = await fetch(`${bridgeUrl}/healthz`, {
        cache: "no-store",
        signal: controller.signal,
      });
      const payload = await response.json();
      setBridgeStatus(Boolean(response.ok && payload.ok));
    } catch {
      setBridgeStatus(false);
    } finally {
      window.clearTimeout(timer);
    }
    if (bridgeOnline) await flushPending();
  };

  const saveOrQueue = async (endpoint, payload, queuedMessage) => {
    if (bridgeOnline) {
      try {
        const result = await post(endpoint, payload);
        notify("已写入 HTML");
        if (result.reload) window.location.reload();
        return;
      } catch (postError) {
        console.warn(postError);
        setBridgeStatus(false);
      }
    }
    savePending(endpoint, payload);
    notify(queuedMessage);
  };

  toolbar.addEventListener("click", (event) => {
    const kindButton = event.target.closest("[data-kind]");
    if (kindButton) {
      activeKind = kindButton.dataset.kind;
      askInput.placeholder = `可补充“${kindLabels[activeKind]}”的具体问题`;
      askForm.hidden = false;
      askInput.focus();
      return;
    }
    if (event.target.closest("[data-action='comment']")) {
      openComment(activeSelection);
      return;
    }
    if (event.target.closest(".paper-askbar__cancel")) hideToolbar();
  });

  askForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!activeSelection) return;
    const id = makeId("mark");
    const payload = {
      id,
      anchorId: `paper-anchor-${id}`,
      kind: activeKind,
      question: askInput.value.trim(),
      ...commonPayload(activeSelection),
    };
    hideToolbar();
    window.getSelection()?.removeAllRanges();
    await saveOrQueue("/__paper_annotation", payload, "解释请求已暂存在此浏览器");
  });

  commentDialog.addEventListener("click", (event) => {
    if (event.target.closest("[data-comment-cancel]")) closeComment();
  });

  commentForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const comment = commentInput.value.trim();
    if (!comment) return;
    const id = makeId("comment");
    const author = authorInput.value.trim();
    writeStorage(authorKey, author);
    const payload = {
      id,
      anchorId: `paper-comment-anchor-${id}`,
      author,
      comment,
      ...commonPayload(activeSelection),
    };
    closeComment();
    window.getSelection()?.removeAllRanges();
    await saveOrQueue("/__paper_comment", payload, "评论已保存，仅在此浏览器可见");
  });

  document.addEventListener("mouseup", (event) => {
    if (toolbar.contains(event.target) || commentDialog.contains(event.target)) return;
    window.setTimeout(() => {
      const snapshot = selectionSnapshot();
      if (snapshot) showToolbar(snapshot);
      else if (!askForm.contains(document.activeElement)) hideToolbar();
    }, 0);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    hideToolbar();
    closeComment();
  });

  document.querySelectorAll(".paper-comment-new").forEach((button) => {
    button.addEventListener("click", () => openComment(null));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
      if (visible[0]?.target.id) activeSectionId = visible[0].target.id;
    },
    { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.1] },
  );
  main.querySelectorAll(":scope > section[id]").forEach((section) => observer.observe(section));

  renderLocalComments();
  healthCheck();

  window.paperReadingMarks = {
    bridgeUrl,
    load: pendingItems,
    render: renderLocalComments,
  };
  window.paperReadingComments = {
    bridgeUrl,
    load: () => pendingItems().filter((item) => item.endpoint === "/__paper_comment"),
    render: renderLocalComments,
    create: () => openComment(null),
  };
})();
