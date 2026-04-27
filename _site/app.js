(function () {
  const data = window.SITE_DATA;
  const pageById = new Map(data.pages.map((page) => [page.id, page]));
  const groupStateKey = "linktree:collapsed-groups";
  const sidebarStateKey = "linktree:sidebar-collapsed";
  const themeStateKey = "linktree:theme";
  const expandedSidebarWidth = 260;

  const dom = {
    body: document.body,
    navGroups: document.getElementById("navGroups"),
    pageMount: document.getElementById("pageMount"),
    breadcrumb: document.getElementById("breadcrumb"),
    sidebarToggle: document.getElementById("sidebarToggle"),
    mobileSidebarToggle: document.getElementById("mobileSidebarToggle"),
    sectionsToggle: document.getElementById("sectionsToggle"),
    sectionsToggleIcon: document.querySelector(".sections-toggle-icon"),
    themeToggle: document.getElementById("themeToggle"),
    themeIcon: document.querySelector(".theme-icon"),
    homeIcon: document.querySelector("[data-home-icon]")
  };

  const state = {
    collapsedGroups: readSet(groupStateKey),
    expandedSections: new Set(),
    pageId: "home",
    sectionId: "",
    columnCount: getColumnCount(),
    sidebarCollapsed: localStorage.getItem(sidebarStateKey) === "true"
  };

  function readSet(key) {
    try {
      return new Set(JSON.parse(localStorage.getItem(key) || "[]"));
    } catch {
      return new Set();
    }
  }

  function writeSet(key, set) {
    localStorage.setItem(key, JSON.stringify([...set]));
  }

  function iconSvg(name) {
    return data.icons[name] || data.icons.home;
  }

  function setSvg(target, svg) {
    target.innerHTML = svg || iconSvg("home");
  }

  function createSvgIcon(path) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"></path></svg>`;
  }

  function escapeAttr(value) {
    return String(value || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  }

  function setSidebarCollapsed(collapsed, persist = true) {
    state.sidebarCollapsed = collapsed;
    dom.body.classList.toggle("sidebar-collapsed", collapsed);
    dom.sidebarToggle.setAttribute("aria-expanded", String(!collapsed));
    dom.mobileSidebarToggle.setAttribute("aria-expanded", String(!collapsed));
    if (persist) localStorage.setItem(sidebarStateKey, String(collapsed));
  }

  function applyAutoSidebar() {
    if (expandedSidebarWidth / Math.max(window.innerWidth, 1) > 0.3) {
      setSidebarCollapsed(true, false);
    }
  }

  function currentRoute() {
    const raw = window.location.hash.replace(/^#/, "");
    if (!raw || raw === "home") return { pageId: "home", sectionId: "" };
    const params = new URLSearchParams(raw);
    return {
      pageId: params.get("page") || "home",
      sectionId: params.get("section") || ""
    };
  }

  function routeTo(pageId, sectionId = "") {
    const params = new URLSearchParams();
    params.set("page", pageId);
    if (sectionId) params.set("section", sectionId);
    return `#${params.toString()}`;
  }

  function renderSidebar() {
    setSvg(dom.homeIcon, iconSvg("home"));
    dom.navGroups.innerHTML = "";

    data.groups.forEach((group) => {
      const groupEl = document.createElement("section");
      groupEl.className = "nav-group";
      groupEl.dataset.group = group.id;
      groupEl.classList.toggle("is-collapsed", state.collapsedGroups.has(group.id));

      const toggle = document.createElement("button");
      toggle.className = "group-toggle";
      toggle.type = "button";
      toggle.innerHTML = `<span class="chevron">${createSvgIcon("m8 5 8 7-8 7")}</span><span class="group-title">${group.title}</span>`;
      toggle.addEventListener("click", () => {
        if (state.collapsedGroups.has(group.id)) state.collapsedGroups.delete(group.id);
        else state.collapsedGroups.add(group.id);
        writeSet(groupStateKey, state.collapsedGroups);
        groupEl.classList.toggle("is-collapsed");
      });

      const body = document.createElement("div");
      body.className = "group-body";

      group.pageIds.forEach((pageId) => {
        const page = pageById.get(pageId);
        if (page) body.appendChild(navLink(page, routeTo(page.id), page.icon, page.title));
      });

      groupEl.append(toggle, body);
      dom.navGroups.appendChild(groupEl);
    });
  }

  function navLink(page, href, icon, label, sectionShortcut = false) {
    const link = document.createElement("a");
    link.className = `nav-link${sectionShortcut ? " section-shortcut" : ""}`;
    link.href = href;
    link.dataset.pageId = page.id;
    if (!sectionShortcut) {
      const iconSpan = document.createElement("span");
      iconSpan.className = "nav-icon";
      setSvg(iconSpan, icon);
      link.appendChild(iconSpan);
    }
    const text = document.createElement("span");
    text.className = "nav-text";
    text.textContent = label;
    link.appendChild(text);
    return link;
  }

  function updateActiveNav() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      const linkUrl = new URL(link.href, window.location.href);
      link.classList.toggle("is-active", linkUrl.hash === window.location.hash || (!window.location.hash && link.hasAttribute("data-home-link")));
    });
  }

  function renderHome() {
    document.title = `${data.meta.title} | ${data.meta.subtitle}`;
    dom.breadcrumb.textContent = "首页";
    dom.pageMount.className = "page home-blank";
    dom.pageMount.innerHTML = "";
    updateSectionsToggle(null);
    applyAutoSidebar();
  }

  function renderPage(page, sectionId) {
    document.title = `${page.pageTitle} | ${data.meta.title}`;
    dom.breadcrumb.textContent = page.pageTitle;
    dom.pageMount.className = "page";
    dom.pageMount.innerHTML = "";

    const header = document.createElement("header");
    header.className = "page-header";
    const icon = document.createElement("div");
    icon.className = "page-icon";
    setSvg(icon, page.icon);
    const text = document.createElement("div");
    text.innerHTML = `<h1 class="page-title">${page.pageTitle}</h1><p class="page-intro">${page.intro}</p>`;
    header.append(icon, text);
    dom.pageMount.appendChild(header);

    if (!page.sections.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "内容预留中。";
      dom.pageMount.appendChild(empty);
      updateSectionsToggle(page);
      return;
    }

    const board = document.createElement("div");
    board.className = "board";
    renderBoard(board, page);
    dom.pageMount.appendChild(board);
    updateSectionsToggle(page);

    if (sectionId) {
      requestAnimationFrame(() => {
        const target = document.getElementById(sectionDomId(page.id, sectionId));
        if (target) {
          target.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" });
        }
      });
    }
  }

  function renderBoard(board, page) {
    const columns = Array.from({ length: getColumnCount() }, () => {
      const column = document.createElement("div");
      column.className = "board-column";
      return column;
    });

    page.sections.forEach((section, index) => {
      columns[index % columns.length].appendChild(sectionPanel(page, section, index));
    });

    board.replaceChildren(...columns);
  }

  function sectionPanel(page, section, index) {
    const panel = document.createElement("article");
    panel.className = "section-panel";
    panel.id = sectionDomId(page.id, section.id);
    const key = sectionKey(page.id, section.id);
    panel.classList.toggle("is-collapsed", !state.expandedSections.has(key));

    const toggle = document.createElement("button");
    toggle.className = "section-toggle";
    toggle.type = "button";
    toggle.innerHTML = `
      <span class="section-heading">
        <span class="section-icon" style="color:${sectionColor(index)}">${section.icon || page.icon || iconSvg("home")}</span>
        <span class="section-title">${section.title}</span>
      </span>
      <span class="section-count">${section.items.length}</span>
      <span class="chevron">${createSvgIcon("m8 5 8 7-8 7")}</span>
    `;
    toggle.addEventListener("click", () => {
      panel.classList.toggle("is-collapsed");
      if (panel.classList.contains("is-collapsed")) state.expandedSections.delete(key);
      else state.expandedSections.add(key);
      updateSectionsToggle(page);
    });

    const items = document.createElement("div");
    items.className = "section-items";
    section.items.forEach((item) => items.appendChild(itemCard(item)));
    panel.append(toggle, items);
    return panel;
  }

  function itemCard(item) {
    const card = document.createElement("div");
    card.className = "link-card";

    const icon = document.createElement("span");
    icon.className = "item-icon";
    if (item.image) {
      icon.innerHTML = `<img src="${escapeAttr(item.image)}" alt="" loading="lazy" width="32" height="32">`;
    } else {
      setSvg(icon, item.svg || iconSvg("home"));
    }

    const title = document.createElement(item.url ? "a" : "span");
    title.className = "item-title";
    title.textContent = item.title;
    if (item.url) {
      title.href = item.url;
      title.target = "_blank";
      title.rel = "noopener noreferrer";
    }

    const status = document.createElement("span");
    status.className = `status${/worldwide/i.test(item.status) ? " is-worldwide" : ""}`;
    status.innerHTML = `<span class="status-dot"></span><span>${item.status || "NoGFW"}</span>`;

    card.append(icon, title, status);
    return card;
  }

  function sectionKey(pageId, sectionId) {
    return `${pageId}:${sectionId}`;
  }

  function sectionDomId(pageId, sectionId) {
    return `section-${pageId}-${sectionId}`.replace(/[^a-zA-Z0-9_-]/g, "-");
  }

  function sectionColor(index) {
    const colors = ["#9b72cf", "#d99626", "#2f80ed", "#43a16d", "#d25d5d", "#6f8fcb"];
    return colors[index % colors.length];
  }

  function getColumnCount() {
    const width = window.innerWidth;
    if (width <= 620) return 1;
    if (width <= 900) return 2;
    if (width <= 1180) return 3;
    return 4;
  }

  function render() {
    const route = currentRoute();
    state.pageId = route.pageId;
    state.sectionId = route.sectionId;
    if (route.pageId === "home") renderHome();
    else renderPage(pageById.get(route.pageId) || pageById.get("site-IT"), route.sectionId);
    document.documentElement.scrollLeft = 0;
    document.body.scrollLeft = 0;
    updateActiveNav();
    applyAutoSidebar();
  }

  function initTheme() {
    const stored = localStorage.getItem(themeStateKey);
    const theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.body.dataset.theme = theme;
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const dark = document.body.dataset.theme === "dark";
    dom.themeIcon.innerHTML = dark
      ? createSvgIcon("M12 3v2m0 14v2m9-9h-2M5 12H3m15.4-6.4-1.4 1.4M7 17l-1.4 1.4M18.4 18.4 17 17M7 7 5.6 5.6M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8")
      : createSvgIcon("M21 12.8A8.5 8.5 0 1 1 11.2 3 6.8 6.8 0 0 0 21 12.8Z");
  }

  function areAllSectionsExpanded(page) {
    return page.sections.length > 0 && page.sections.every((section) => state.expandedSections.has(sectionKey(page.id, section.id)));
  }

  function updateSectionsToggle(page) {
    const hasSections = page && page.sections.length > 0;
    dom.sectionsToggle.hidden = !hasSections;
    if (!hasSections) return;

    const allExpanded = areAllSectionsExpanded(page);
    const label = allExpanded ? "收缩全部瀑布框" : "展开全部瀑布框";
    dom.sectionsToggle.setAttribute("aria-label", label);
    dom.sectionsToggle.title = label;
    dom.sectionsToggleIcon.innerHTML = allExpanded
      ? createSvgIcon("M7 4l5 5 5-5M7 20l5-5 5 5")
      : createSvgIcon("M7 8l5-5 5 5M7 16l5 5 5-5");
  }

  function toggleCurrentSections() {
    if (state.pageId === "home") return;
    const page = pageById.get(state.pageId) || pageById.get("site-IT");
    if (!page || !page.sections.length) return;

    const collapseAll = areAllSectionsExpanded(page);
    page.sections.forEach((section) => {
      const key = sectionKey(page.id, section.id);
      if (collapseAll) state.expandedSections.delete(key);
      else state.expandedSections.add(key);
    });
    renderPage(page, state.sectionId);
    updateActiveNav();
  }

  function bindEvents() {
    dom.sidebarToggle.addEventListener("click", () => setSidebarCollapsed(!state.sidebarCollapsed));
    dom.mobileSidebarToggle.addEventListener("click", () => setSidebarCollapsed(false));
    dom.sectionsToggle.addEventListener("click", toggleCurrentSections);
    dom.themeToggle.addEventListener("click", () => {
      const next = document.body.dataset.theme === "dark" ? "light" : "dark";
      document.body.dataset.theme = next;
      localStorage.setItem(themeStateKey, next);
      updateThemeIcon();
    });
    window.addEventListener("hashchange", render);
    window.addEventListener("resize", () => {
      applyAutoSidebar();
      const nextColumns = getColumnCount();
      if (state.columnCount !== nextColumns) {
        state.columnCount = nextColumns;
        render();
      }
    });
  }

  initTheme();
  renderSidebar();
  setSidebarCollapsed(state.sidebarCollapsed, false);
  bindEvents();
  render();
})();
