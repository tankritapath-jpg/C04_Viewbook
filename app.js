/* ==========================================================================
   app.js — CPE102 Viewbook Editorial Renderer & Interactive Controls
   "Warm Hardware Studio" edition: sticky-rail week entries, bento contact-sheet
   photos, week Field Notes / Prep & Review tabs, Project 1 interactive steppers,
   unified stacked bars, and zero-scroll-hijack navigation.
   ========================================================================== */

(function () {
  "use strict";

  const DATA = window.VIEWBOOK || {};
  const site = DATA.site || {};
  const weeksPart1 = Array.isArray(DATA.weeksPart1) ? DATA.weeksPart1 : [];
  const weeksPart2 = Array.isArray(DATA.weeksPart2) ? DATA.weeksPart2 : [];
  const upcomingWeeks = Array.isArray(DATA.upcomingWeeks) ? DATA.upcomingWeeks : [];
  const midtermBreak = DATA.midtermBreak || null;
  const projects = DATA.projects || {};
  const reflection = DATA.reflection || {};
  const team = DATA.team || {};

  const completedWeeks = [...weeksPart1, ...weeksPart2];
  const allRoadmapWeeks = [...completedWeeks, ...upcomingWeeks];
  const disciplines = Array.isArray(site.disciplines) ? site.disciplines : [];

  const THEME_STORAGE_KEY = "cpe102-theme";
  const CHECKS_STORAGE_KEY = "cpe102-checks";

  const SEGMENT_PALETTE = [
    "var(--cat-foundation)",
    "var(--cat-hardware)",
    "var(--cat-systems)",
    "var(--cat-milestone)",
    "#e11d48",
    "#64748b"
  ];

  const galleryItems = [];

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function registerPhoto(photo, contextTitle) {
    const idx = galleryItems.length;
    galleryItems.push({
      src: photo.src || "",
      placeholderPath: photo.placeholderPath || "",
      label: photo.label || contextTitle || "Photo",
      caption: photo.caption || "",
      contextTitle: contextTitle || ""
    });
    return idx;
  }

  function renderPhotoCard(photo, accentColor, contextTitle, frameCode) {
    const idx = registerPhoto(photo, contextTitle);
    const hasSrc = Boolean(photo.src && photo.src.trim());
    const mediaHtml = hasSrc
      ? `<img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.caption || photo.label)}" loading="lazy">`
      : `<div class="contact-sheet-ph">
           <span class="crop-mark crop-tl" aria-hidden="true"></span>
           <span class="crop-mark crop-tr" aria-hidden="true"></span>
           <span class="crop-mark crop-bl" aria-hidden="true"></span>
           <span class="crop-mark crop-br" aria-hidden="true"></span>
           <div class="cs-top">
             <span>${escapeHtml(frameCode || "FRAME")}</span>
             <span>CLICK TO PREVIEW</span>
           </div>
           <div class="cs-center">${escapeHtml(photo.label || "Photo Placeholder")}</div>
           <div class="cs-path">${escapeHtml(photo.placeholderPath || "assets/img/photo.jpg")}</div>
         </div>`;

    return `
      <figure class="photo-card" role="button" tabindex="0"
              style="--wk-color: ${escapeHtml(accentColor || "var(--accent)")}"
              data-lightbox-index="${idx}"
              aria-label="Open photo viewer: ${escapeHtml(photo.label || photo.caption)}">
        <div class="photo-thumb">${mediaHtml}</div>
        <figcaption>${escapeHtml(photo.caption || "")}</figcaption>
      </figure>
    `;
  }

  function renderBentoPhotos(photos, accentColor, contextTitle, codePrefix) {
    if (!Array.isArray(photos) || photos.length === 0) return "";
    let gridClass = "bento-photos";
    if (photos.length === 1) gridClass += " bento-single";
    else if (photos.length === 2) gridClass += " bento-two";

    const cards = photos
      .map((ph, i) =>
        renderPhotoCard(ph, accentColor, contextTitle, `${codePrefix || "IMG"}-0${i + 1}`)
      )
      .join("");
    return `<div class="${gridClass}">${cards}</div>`;
  }

  function renderStackedBreakdown(items) {
    if (!Array.isArray(items) || items.length === 0) return "";
    const segs = items
      .map((item, idx) => {
        const color = SEGMENT_PALETTE[idx % SEGMENT_PALETTE.length];
        return `<div class="stacked-seg" style="width: ${Number(item.pct) || 0}%; background: ${color};" title="${escapeHtml(item.label)}: ${escapeHtml(item.pct)}%"></div>`;
      })
      .join("");

    const legendRows = items
      .map((item, idx) => {
        const color = SEGMENT_PALETTE[idx % SEGMENT_PALETTE.length];
        return `
          <div class="stacked-legend-row">
            <span class="stacked-legend-left">
              <span class="disc-dot" style="--disc-color: ${color}" aria-hidden="true"></span>
              <span>${escapeHtml(item.label)}</span>
            </span>
            <span class="stacked-legend-pct">${escapeHtml(item.pct)}%</span>
          </div>
        `;
      })
      .join("");

    return `
      <div class="stacked-bar-wrap">
        <div class="stacked-bar" role="img" aria-label="Percentage breakdown bar">${segs}</div>
        <div class="stacked-legend">${legendRows}</div>
      </div>
    `;
  }

  function renderWeekNavStrip() {
    const strip = document.getElementById("week-nav-strip");
    if (!strip) return;
    strip.innerHTML = allRoadmapWeeks
      .map(
        (wk) => `
        <a href="#${escapeHtml(wk.id)}" class="week-pill" data-week-id="${escapeHtml(wk.id)}" style="--wk-color: ${escapeHtml(wk.color)}">
          <span class="week-pill-dot" aria-hidden="true"></span>
          <span>${escapeHtml(wk.code)}</span>
        </a>
      `
      )
      .join("");
  }

  function renderConsoleReadoutMarkup(wk) {
    if (!wk) return "";
    const blurb = wk.summary || wk.subtitle || wk.note || "";
    return `
      <div>
        <div class="console-readout-meta">
          <span class="console-badge" style="--wk-color: ${escapeHtml(wk.color)}">${escapeHtml(wk.code)}</span>
          <span>${escapeHtml(wk.date)}</span>
          <span>·</span>
          <span>${escapeHtml(wk.categoryLabel || "Track")}</span>
        </div>
        <h3>${escapeHtml(wk.title)}</h3>
        <p>${escapeHtml(blurb)}</p>
      </div>
      <div>
        <a href="#${escapeHtml(wk.id)}" class="console-jump">Jump to ${escapeHtml(wk.code)} log →</a>
      </div>
    `;
  }

  function renderHeroConsole(h) {
    const matrixHtml = allRoadmapWeeks
      .map(
        (wk, i) => `
        <button type="button"
                class="console-cell ${i === 0 ? "selected" : ""}"
                data-console-index="${i}"
                style="--wk-color: ${escapeHtml(wk.color)}"
                aria-label="Preview ${escapeHtml(wk.code)}: ${escapeHtml(wk.title)}">
          <span class="console-cell-code">${escapeHtml(wk.code)}</span>
          <span class="console-cell-date">${escapeHtml(wk.date)}</span>
        </button>
      `
      )
      .join("");

    const specsHtml = (h.specs || [])
      .map(
        (s) => `
        <div class="spec-cell">
          <span>${escapeHtml(s.label)}</span>
          <strong>${escapeHtml(s.value)}</strong>
        </div>
      `
      )
      .join("");

    return `
      <aside class="hero-console" aria-label="Interactive semester matrix console">
        <div class="console-topbar">
          <span>SEMESTER MATRIX // W01–W16</span>
          <span class="console-status"><span class="console-pulse" aria-hidden="true"></span>HOVER OR TAP A WEEK</span>
        </div>
        <div class="console-matrix" id="console-matrix">${matrixHtml}</div>
        <div class="console-readout" id="console-readout">${renderConsoleReadoutMarkup(allRoadmapWeeks[0])}</div>
        <div class="console-specs">${specsHtml}</div>
      </aside>
    `;
  }

  function renderHero() {
    const el = document.getElementById("top");
    if (!el || !site.hero) return;
    const h = site.hero;

    const legendHtml = disciplines
      .map(
        (d) => `
        <span class="disc-marker">
          <span class="disc-dot" style="--disc-color: ${escapeHtml(d.color)}" aria-hidden="true"></span>
          <span>${escapeHtml(d.label)}</span>
        </span>
      `
      )
      .join("");

    const metricsHtml = (h.stats || [])
      .map(
        (s) => `
        <div class="metric-item">
          <span class="metric-val">${escapeHtml(s.value)}</span>
          <span class="metric-lbl">${escapeHtml(s.label)}</span>
        </div>
      `
      )
      .join("");

    el.innerHTML = `
      <div class="container">
        <div class="hero-masthead-bar">
          <span><strong>${escapeHtml(h.eyebrow)}</strong></span>
          <span>${escapeHtml(site.section || "Section C")} · ROOM ${escapeHtml(site.room || "CPE 1114")} · ${escapeHtml(site.groupName || "Group")}</span>
        </div>
        <div class="hero-grid">
          <div class="hero-copy">
            <h1 class="hero-title">${escapeHtml(h.title)}</h1>
            <p class="hero-subtitle">${escapeHtml(h.subtitle)}</p>
            <div class="discipline-legend" aria-label="Four engineering tracks">${legendHtml}</div>
            <div class="metric-strip">${metricsHtml}</div>
            <div class="hero-ctas">
              <a href="#journey" class="btn btn-primary">Explore 16 weeks ↓</a>
              <a href="#project-1" class="btn">View projects</a>
              <a href="#team" class="btn">Meet the team</a>
            </div>
          </div>
          ${renderHeroConsole(h)}
        </div>
      </div>
    `;
  }

  function renderAbout() {
    const el = document.getElementById("about");
    if (!el || !site.about) return;
    const a = site.about;

    const paragraphsHtml = (a.overviewParagraphs || [])
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");

    const workflowHtml = (a.workflow || [])
      .map(
        (w) => `
        <div class="workflow-node">
          <span class="workflow-node-num">${escapeHtml(w.step)}</span>
          <h4>${escapeHtml(w.title)}</h4>
          <p>${escapeHtml(w.desc)}</p>
        </div>
      `
      )
      .join("");

    const keyHtml = (a.studyLegend || [])
      .map(
        (item) => `
        <div class="notebook-key-row">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.desc)}</span>
        </div>
      `
      )
      .join("");

    const rulesHtml = (a.rules || [])
      .map(
        (r, i) => `
        <div class="hairline-rule-item">
          <span class="hairline-rule-idx">0${i + 1}</span>
          <span>${escapeHtml(r)}</span>
        </div>
      `
      )
      .join("");

    el.innerHTML = `
      <div class="container">
        <div class="section-eyebrow">${escapeHtml(a.eyebrow)}</div>
        <h2 class="section-title">${escapeHtml(a.title)}</h2>
        <p class="section-lead">${escapeHtml(a.lead)}</p>

        <div class="about-spread">
          <div>
            <div class="editorial-prose">${paragraphsHtml}</div>
            <div class="workflow-rail">${workflowHtml}</div>
            <p class="sub-heading">How to Use This Notebook</p>
            <div class="notebook-key">${keyHtml}</div>
          </div>

          <div>
            <p class="sub-heading">Grading Breakdown (100%)</p>
            ${renderStackedBreakdown(a.grading || [])}
            <p class="sub-heading">Studio Habits & Safety Rules</p>
            <div class="hairline-rules">${rulesHtml}</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderJourney() {
    const el = document.getElementById("journey");
    if (!el) return;

    const upcomingIds = new Set(upcomingWeeks.map((w) => w.id));
    const rowsHtml = allRoadmapWeeks
      .map((wk) => {
        const isUp = upcomingIds.has(wk.id);
        return `
          <a href="#${escapeHtml(wk.id)}" class="toc-row ${isUp ? "is-upcoming" : ""}" style="--wk-color: ${escapeHtml(wk.color)}">
            <span class="toc-left">
              <span class="disc-dot" style="--disc-color: ${escapeHtml(wk.color)}" aria-hidden="true"></span>
              <span class="toc-code">${escapeHtml(wk.code)}</span>
              <span class="toc-title">${escapeHtml(wk.title)}</span>
            </span>
            <span class="toc-leader" aria-hidden="true"></span>
            <span class="toc-meta">${escapeHtml(wk.date)}${isUp ? " · Upcoming" : ""}</span>
          </a>
        `;
      })
      .join("");

    el.innerHTML = `
      <div class="container">
        <div class="section-eyebrow">02 // TABLE OF CONTENTS</div>
        <h2 class="section-title">One Semester, Sixteen Stops</h2>
        <p class="section-lead">Jump straight to any week's field notes, lab photos, freshmen survival tips, and exam review checklists.</p>
        <div class="toc-grid">${rowsHtml}</div>
      </div>
    `;
  }

  function renderConceptItem(c) {
    let tableHtml = "";
    if (Array.isArray(c.table) && c.table.length > 0) {
      const rows = c.table
        .map(
          (row) => `
          <tr>
            <th>${escapeHtml(row[0])}</th>
            <td>${escapeHtml(row[1])}</td>
          </tr>
        `
        )
        .join("");
      tableHtml = `<table class="kv-table"><tbody>${rows}</tbody></table>`;
    }

    const terminalHtml = c.terminal
      ? `<div class="terminal-block"><pre>${escapeHtml(c.terminal)}</pre></div>`
      : "";

    return `
      <div class="concept-item">
        <h4>${escapeHtml(c.title)}</h4>
        <p>${escapeHtml(c.body)}</p>
        ${tableHtml}
        ${terminalHtml}
      </div>
    `;
  }

  function renderWeekArticle(wk) {
    const photosHtml = renderBentoPhotos(
      wk.photos,
      wk.color,
      `${wk.code} · ${wk.title}`,
      wk.code
    );

    const whatWeDidHtml = (wk.whatWeDid || [])
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    const extraLinkHtml = wk.extraLink
      ? `<div class="week-extra-link"><a class="btn" href="${escapeHtml(wk.extraLink.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(wk.extraLink.label)}</a></div>`
      : "";

    const conceptsHtml = (wk.concepts || []).length
      ? `
        <p class="sub-heading">What we understood</p>
        <div class="concept-list">${wk.concepts.map(renderConceptItem).join("")}</div>
      `
      : "";

    const beforeClassHtml =
      Array.isArray(wk.beforeClass) && wk.beforeClass.length
        ? `
        <div class="before-class-strip">
          <p class="sub-heading" style="margin-bottom: 0.45rem;">Before class, have ready</p>
          <ul class="editorial-bullets" style="margin-bottom: 0;">${wk.beforeClass.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
        </div>
      `
        : "";

    const checklistItems = Array.isArray(wk.checklist) ? wk.checklist : [];
    const checklistHtml = checklistItems
      .map(
        (chk) => `
        <label class="check-item">
          <input type="checkbox" class="review-checkbox" data-check-id="${escapeHtml(chk.id)}" data-week-id="${escapeHtml(wk.id)}">
          <span>${escapeHtml(chk.text)}</span>
        </label>
      `
      )
      .join("");

    const tipHtml = wk.tip
      ? `<aside class="freshmen-callout"><strong>Tip for freshmen</strong>${escapeHtml(wk.tip)}</aside>`
      : "";

    const notesPanelId = `notes-${wk.id}`;
    const reviewPanelId = `review-${wk.id}`;

    return `
      <article id="${escapeHtml(wk.id)}" class="week-entry" data-category="${escapeHtml(wk.category || "all")}" style="--wk-color: ${escapeHtml(wk.color)}">
        <div class="week-rail">
          <div class="week-big-num">${escapeHtml(wk.num)}</div>
          <div class="rail-rule" aria-hidden="true"></div>
          <div class="rail-meta">
            <span class="rail-track">${escapeHtml(wk.categoryLabel || wk.code)}</span>
            <strong>${escapeHtml(wk.date)}</strong>
            <span>${escapeHtml(wk.lecturer)}</span>
          </div>
        </div>

        <div class="week-main">
          <h3>${escapeHtml(wk.title)}</h3>
          <p class="week-sub">${escapeHtml(wk.subtitle)}</p>
          <p class="week-summary">${escapeHtml(wk.summary)}</p>

          ${photosHtml}

          <div class="week-tabs-wrap">
            <div class="week-tablist" role="tablist" aria-label="${escapeHtml(wk.code)} sections">
              <button type="button" class="week-tab active" role="tab" aria-selected="true" aria-controls="${escapeHtml(notesPanelId)}" data-tab-target="${escapeHtml(notesPanelId)}">
                Field Notes
              </button>
              <button type="button" class="week-tab" role="tab" aria-selected="false" aria-controls="${escapeHtml(reviewPanelId)}" data-tab-target="${escapeHtml(reviewPanelId)}">
                Prep &amp; Review <span data-week-check-count="${escapeHtml(wk.id)}">(0/${checklistItems.length})</span>
              </button>
            </div>

            <div id="${escapeHtml(notesPanelId)}" class="week-tab-panel" role="tabpanel">
              <p class="sub-heading">What we did</p>
              <ul class="editorial-bullets">${whatWeDidHtml}</ul>
              ${extraLinkHtml}
              ${conceptsHtml}
            </div>

            <div id="${escapeHtml(reviewPanelId)}" class="week-tab-panel" role="tabpanel" hidden>
              ${beforeClassHtml}
              <p class="sub-heading">Review at home</p>
              <div class="checklist">${checklistHtml}</div>
              ${tipHtml}
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderWeeks() {
    const el = document.getElementById("weeks");
    if (!el) return;

    const countsByCat = {};
    allRoadmapWeeks.forEach((wk) => {
      const cat = wk.category || "other";
      countsByCat[cat] = (countsByCat[cat] || 0) + 1;
    });

    const filterButtons = [
      `<button type="button" class="filter-pill active" data-filter="all">All (${allRoadmapWeeks.length})</button>`,
      ...disciplines.map(
        (d) => `
        <button type="button" class="filter-pill" data-filter="${escapeHtml(d.id)}">
          <span class="disc-dot" style="--disc-color: ${escapeHtml(d.color)}" aria-hidden="true"></span>
          <span>${escapeHtml(d.label)} (${countsByCat[d.id] || 0})</span>
        </button>
      `
      )
    ].join("");

    const stackItems = completedWeeks.map((wk) => {
      let html = renderWeekArticle(wk);
      if (wk.id === "w9" && midtermBreak) {
        html += `
          <div class="break-banner" id="midterm-break-banner">
            <div><strong>${escapeHtml(midtermBreak.date)}</strong> · ${escapeHtml(midtermBreak.title)}</div>
            <div>${escapeHtml(midtermBreak.text)}</div>
          </div>
        `;
      }
      return html;
    });

    const upcomingHtml = upcomingWeeks
      .map(
        (u) => `
        <article id="${escapeHtml(u.id)}" class="upcoming-card" data-category="${escapeHtml(u.category || "milestone")}" style="--wk-color: ${escapeHtml(u.color)}">
          <div class="upcoming-code">${escapeHtml(u.code)} · ${escapeHtml(u.date)}</div>
          <h4>${escapeHtml(u.title)}</h4>
          <p>${escapeHtml(u.subtitle)}</p>
          <p>${escapeHtml(u.note)}</p>
        </article>
      `
      )
      .join("");

    el.innerHTML = `
      <div class="container">
        <div class="section-eyebrow">03 // WEEKLY FIELD LOG</div>
        <h2 class="section-title">Weeks 01 to 16</h2>
        <p class="section-lead">Filter by skill track, browse contact-sheet photos, or switch each week's tab to check off exam prep items.</p>
        <div class="filter-bar" id="week-filter-bar" role="group" aria-label="Filter weekly logs by track">${filterButtons}</div>
        <div class="weeks-editorial-list">${stackItems.join("")}</div>
        <div class="upcoming-editorial-grid">${upcomingHtml}</div>
      </div>
    `;
  }

  function renderEvolutionPanelMarkup(entry) {
    if (!entry) return "";
    return `
      <div class="evo-focus-grid">
        <div class="evo-focus-col">
          <span>Concept (${escapeHtml(entry.date)})</span>
          <p>${escapeHtml(entry.concept)}</p>
        </div>
        <div class="evo-focus-col">
          <span>Main Problem</span>
          <p>${escapeHtml(entry.problem)}</p>
        </div>
        <div class="evo-focus-col">
          <span>Carried Forward</span>
          <p>${escapeHtml(entry.next)}</p>
        </div>
      </div>
    `;
  }

  function renderPipelinePanelMarkup(pipe) {
    if (!pipe) return "";
    const nodes = (pipe.steps || [])
      .map((step) => `<span class="pipe-node">${escapeHtml(step)}</span>`)
      .join(`<span class="pipe-arrow" aria-hidden="true">→</span>`);
    return `<div class="pipeline-flow">${nodes}</div>`;
  }

  function renderProject1() {
    const el = document.getElementById("project-1");
    const p1 = projects.project1;
    if (!el || !p1) return;

    const gemsHtml = (p1.gemstones || [])
      .map(
        (g) => `
        <span class="gem-swatch">
          <span class="gem-dot" style="background: ${escapeHtml(g.hex)}"></span>
          <span>${escapeHtml(g.name)}</span>
        </span>
      `
      )
      .join("");

    const reportBtn = p1.reportLink
      ? `<a class="btn" href="${escapeHtml(p1.reportLink.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(p1.reportLink.label)}</a>`
      : "";

    const photosHtml = renderBentoPhotos(p1.photos, "var(--cat-hardware)", p1.title, "BOT");

    const evoButtons = (p1.evolution || [])
      .map(
        (e, i) => `
        <button type="button" class="stepper-btn ${i === 0 ? "active" : ""}" data-evo-index="${i}">
          ${escapeHtml(e.draft)} · ${escapeHtml(e.date)}
        </button>
      `
      )
      .join("");

    const pipeButtons = (p1.pipelines || [])
      .map(
        (p, i) => `
        <button type="button" class="stepper-btn ${i === 0 ? "active" : ""}" data-pipe-index="${i}">
          ${escapeHtml(p.title)}
        </button>
      `
      )
      .join("");

    const compRows = (p1.competitionSpecs || [])
      .map((r) => `<tr><th>${escapeHtml(r[0])}</th><td>${escapeHtml(r[1])}</td></tr>`)
      .join("");

    const robotRows = (p1.robotSpecs || [])
      .map((r) => `<tr><th>${escapeHtml(r[0])}</th><td>${escapeHtml(r[1])}</td></tr>`)
      .join("");

    el.innerHTML = `
      <div class="container project-shell">
        <div class="project-intro-grid">
          <div>
            <div class="section-eyebrow">04 // ${escapeHtml(p1.eyebrow)}</div>
            <h2 class="section-title">${escapeHtml(p1.title)}</h2>
            <p class="section-lead" style="margin-bottom: 0.6rem;">${escapeHtml(p1.subtitle)}</p>
            <p style="margin: 0; color: var(--text-muted); max-width: 62ch;">${escapeHtml(p1.summary)}</p>
            <div class="gem-swatches" aria-label="Gemstone colors">${gemsHtml}</div>
          </div>
          <div style="display: flex; justify-content: flex-start;">${reportBtn}</div>
        </div>

        ${photosHtml}

        <div class="interactive-lab-box">
          <p class="sub-heading">Design Evolution Stepper (Select a Iteration)</p>
          <div class="stepper-tabs" id="p1-evo-tabs">${evoButtons}</div>
          <div id="p1-evo-panel">${renderEvolutionPanelMarkup((p1.evolution || [])[0])}</div>
        </div>

        <div class="interactive-lab-box" style="border-top: none; padding-top: 0;">
          <p class="sub-heading">Control Pipeline Switcher</p>
          <div class="stepper-tabs" id="p1-pipe-tabs">${pipeButtons}</div>
          <div id="p1-pipe-panel">${renderPipelinePanelMarkup((p1.pipelines || [])[0])}</div>
        </div>

        <div class="spec-columns">
          <div>
            <p class="sub-heading">Competition Rules</p>
            <table class="kv-table"><tbody>${compRows}</tbody></table>
          </div>
          <div>
            <p class="sub-heading">Our Robot Specs</p>
            <table class="kv-table"><tbody>${robotRows}</tbody></table>
          </div>
        </div>

        <div>
          <p class="sub-heading">Competition Scoring Rubric (100%)</p>
          ${renderStackedBreakdown(p1.rubric || [])}
        </div>
      </div>
    `;
  }

  function renderProject2() {
    const el = document.getElementById("project-2");
    const p2 = projects.project2;
    if (!el || !p2) return;

    const statusClassMap = {
      done: "status-done",
      progress: "status-progress",
      todo: "status-todo"
    };
    const statusLabelMap = {
      done: "Done",
      progress: "In progress",
      todo: "To do"
    };

    const liveBtn = p2.liveLink
      ? `<a class="btn btn-primary" href="${escapeHtml(p2.liveLink.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(p2.liveLink.label)}</a>`
      : "";

    const featureRows = (p2.features || [])
      .map(
        (f) => `
        <div class="feature-row">
          <span>${escapeHtml(f.name)}</span>
          <span class="status-tag ${statusClassMap[f.status] || "status-todo"}">${statusLabelMap[f.status] || "To do"}</span>
        </div>
      `
      )
      .join("");

    const timelineHtml = (p2.timeline || [])
      .map(
        (t) => `
        <div class="timeline-item">
          <div class="timeline-date">${escapeHtml(t.date)}</div>
          <div class="timeline-title">${escapeHtml(t.title)}</div>
          <div class="timeline-desc">${escapeHtml(t.desc)}</div>
        </div>
      `
      )
      .join("");

    const photosHtml = renderBentoPhotos(p2.photos, "var(--cat-milestone)", p2.title, "CAP");

    el.innerHTML = `
      <div class="container project-shell">
        <div class="project-intro-grid">
          <div>
            <div class="section-eyebrow">05 // ${escapeHtml(p2.eyebrow)}</div>
            <h2 class="section-title">${escapeHtml(p2.title)}</h2>
            <p class="section-lead" style="margin-bottom: 0.6rem;">${escapeHtml(p2.subtitle)}</p>
            <p style="margin: 0; color: var(--text-muted); max-width: 62ch;">${escapeHtml(p2.summary)}</p>
          </div>
          <div>${liveBtn}</div>
        </div>

        <div class="spec-columns">
          <div>
            <p class="sub-heading">Release 1 Feature Scope</p>
            <div class="feature-ledger" style="margin-bottom: 2rem;">${featureRows}</div>
            <p class="sub-heading">Delivery Timeline</p>
            <div class="timeline">${timelineHtml}</div>
          </div>
          <div>
            <p class="sub-heading">Slides &amp; UI Previews</p>
            ${photosHtml}
          </div>
        </div>
      </div>
    `;
  }

  function renderReflection() {
    const el = document.getElementById("reflection");
    if (!el || !reflection.title) return;

    const parasHtml = (reflection.paragraphs || [])
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");

    const adviceRows = (reflection.advice || [])
      .map(
        (a) => `
        <div class="ledger-row">
          <span class="ledger-num">${escapeHtml(a.num)}</span>
          <span class="ledger-title">${escapeHtml(a.title)}</span>
          <span class="ledger-body">${escapeHtml(a.body)}</span>
        </div>
      `
      )
      .join("");

    el.innerHTML = `
      <div class="container">
        <div class="section-eyebrow">${escapeHtml(reflection.eyebrow)}</div>
        <h2 class="section-title">${escapeHtml(reflection.title)}</h2>
        <blockquote class="quote-callout">“${escapeHtml(reflection.quote)}”</blockquote>
        <div class="essay-columns">${parasHtml}</div>
        <p class="sub-heading">Five Things We'd Tell Our Week 1 Selves</p>
        <div class="numbered-ledger">${adviceRows}</div>
      </div>
    `;
  }

  function renderTeam() {
    const el = document.getElementById("team");
    if (!el || !team.members) return;

    const membersHtml = team.members
      .map((m) => {
        const avatarContent = m.photo
          ? `<img src="${escapeHtml(m.photo)}" alt="${escapeHtml(m.name)}" loading="lazy">`
          : escapeHtml(m.initials || "TM");
        return `
          <article class="member-row">
            <div class="member-avatar" style="background: ${escapeHtml(m.color || "var(--accent)")}">${avatarContent}</div>
            <div class="member-info">
              <h3>${escapeHtml(m.name)} <small style="color: var(--text-soft); font-weight: 500;">(${escapeHtml(m.nickname)})</small></h3>
              <div class="member-id">${escapeHtml(m.studentId)}</div>
              <div class="member-roles-line"><strong>Viewbook</strong>${escapeHtml(m.viewbookPart)}</div>
              <div class="member-roles-line"><strong>Project</strong>${escapeHtml(m.projectRole)}</div>
            </div>
          </article>
        `;
      })
      .join("");

    el.innerHTML = `
      <div class="container">
        <div class="section-eyebrow">${escapeHtml(team.eyebrow)}</div>
        <h2 class="section-title">${escapeHtml(team.title)}</h2>
        <p class="section-lead">${escapeHtml(team.subtitle)}</p>
        <div class="team-directory">${membersHtml}</div>
        <p class="ta-credits">${escapeHtml(team.taCredits)}</p>
      </div>
    `;
  }

  function renderFooter() {
    const el = document.getElementById("site-footer");
    if (!el || !site.footer) return;
    const f = site.footer;

    const sourcesHtml = (f.sources || []).map((s) => `<li>${escapeHtml(s)}</li>`).join("");
    const toolsHtml = (f.tools || [])
      .map(
        (t) =>
          `<a class="tool-chip" href="${escapeHtml(t.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t.name)} ↗</a>`
      )
      .join("");

    el.innerHTML = `
      <div class="container">
        <div class="footer-inner">
          <div class="footer-col">
            <h4>Sources & Credits</h4>
            <ul class="footer-sources">${sourcesHtml}</ul>
          </div>
          <div class="footer-col">
            <h4>Tools Used in CPE102</h4>
            <div class="tool-chips">${toolsHtml}</div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>${escapeHtml(f.copyright)}</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    `;
  }

  /* ========================================================================
     Interactive Behaviors
     ======================================================================== */
  function initThemeToggle() {
    const btn = document.getElementById("theme-toggle");
    const root = document.documentElement;

    function applyTheme(theme) {
      root.dataset.theme = theme;
      if (btn) {
        const icon = btn.querySelector(".theme-icon");
        const label = btn.querySelector(".theme-label");
        if (theme === "dark") {
          if (icon) icon.textContent = "☀";
          if (label) label.textContent = "Light";
        } else {
          if (icon) icon.textContent = "☾";
          if (label) label.textContent = "Dark";
        }
      }
    }

    let saved = null;
    try {
      saved = localStorage.getItem(THEME_STORAGE_KEY);
    } catch (_) {
      saved = null;
    }
    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));

    if (btn) {
      btn.addEventListener("click", () => {
        const next = root.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(next);
        try {
          localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch (_) {}
      });
    }
  }

  function initHeroConsole() {
    const matrix = document.getElementById("console-matrix");
    const readout = document.getElementById("console-readout");
    if (!matrix || !readout) return;

    const cells = Array.from(matrix.querySelectorAll(".console-cell"));
    function selectWeek(idx) {
      const wk = allRoadmapWeeks[idx];
      if (!wk) return;
      cells.forEach((c, i) => c.classList.toggle("selected", i === idx));
      readout.innerHTML = renderConsoleReadoutMarkup(wk);
    }

    cells.forEach((cell) => {
      const idx = Number(cell.dataset.consoleIndex);
      cell.addEventListener("mouseenter", () => selectWeek(idx));
      cell.addEventListener("focus", () => selectWeek(idx));
      cell.addEventListener("click", () => selectWeek(idx));
    });
  }

  function initWeekFilters() {
    const bar = document.getElementById("week-filter-bar");
    if (!bar) return;

    const buttons = Array.from(bar.querySelectorAll(".filter-pill"));
    const weekEntries = Array.from(document.querySelectorAll(".week-entry[data-category]"));
    const upcomingCards = Array.from(document.querySelectorAll(".upcoming-card[data-category]"));
    const breakBanner = document.getElementById("midterm-break-banner");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter || "all";
        buttons.forEach((b) => b.classList.toggle("active", b === btn));

        weekEntries.forEach((entry) => {
          const match = filter === "all" || entry.dataset.category === filter;
          entry.classList.toggle("is-hidden", !match);
        });

        upcomingCards.forEach((card) => {
          const match = filter === "all" || card.dataset.category === filter;
          card.classList.toggle("is-hidden", !match);
        });

        if (breakBanner) {
          breakBanner.classList.toggle("is-hidden", filter !== "all");
        }
      });
    });
  }

  function initWeekTabs() {
    document.querySelectorAll(".week-tabs-wrap").forEach((wrap) => {
      const tabs = Array.from(wrap.querySelectorAll(".week-tab"));
      const panels = Array.from(wrap.querySelectorAll(".week-tab-panel"));

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          const targetId = tab.dataset.tabTarget;
          tabs.forEach((t) => {
            const active = t === tab;
            t.classList.toggle("active", active);
            t.setAttribute("aria-selected", String(active));
          });
          panels.forEach((panel) => {
            const match = panel.id === targetId;
            panel.hidden = !match;
          });
        });
      });
    });
  }

  function initProject1Tabs() {
    const p1 = projects.project1;
    if (!p1) return;

    const evoTabs = document.getElementById("p1-evo-tabs");
    const evoPanel = document.getElementById("p1-evo-panel");
    if (evoTabs && evoPanel && Array.isArray(p1.evolution)) {
      const btns = Array.from(evoTabs.querySelectorAll("[data-evo-index]"));
      btns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = Number(btn.dataset.evoIndex);
          btns.forEach((b) => b.classList.toggle("active", b === btn));
          evoPanel.innerHTML = renderEvolutionPanelMarkup(p1.evolution[idx]);
        });
      });
    }

    const pipeTabs = document.getElementById("p1-pipe-tabs");
    const pipePanel = document.getElementById("p1-pipe-panel");
    if (pipeTabs && pipePanel && Array.isArray(p1.pipelines)) {
      const btns = Array.from(pipeTabs.querySelectorAll("[data-pipe-index]"));
      btns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = Number(btn.dataset.pipeIndex);
          btns.forEach((b) => b.classList.toggle("active", b === btn));
          pipePanel.innerHTML = renderPipelinePanelMarkup(p1.pipelines[idx]);
        });
      });
    }
  }

  function initProgressAndActiveWeek() {
    const bar = document.getElementById("progress-bar");
    const strip = document.getElementById("week-nav-strip");
    const backToTop = document.getElementById("back-to-top");

    let ticking = false;
    function updateScrollUI() {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) {
        const pct = maxScroll > 0 ? Math.min(100, Math.max(0, (scrollY / maxScroll) * 100)) : 0;
        bar.style.width = `${pct.toFixed(1)}%`;
      }
      if (backToTop) {
        backToTop.classList.toggle("visible", scrollY > 450);
      }
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateScrollUI);
          ticking = true;
        }
      },
      { passive: true }
    );
    updateScrollUI();

    const pills = new Map();
    if (strip) {
      strip.querySelectorAll(".week-pill[data-week-id]").forEach((p) => {
        pills.set(p.dataset.weekId, p);
      });
    }

    if ("IntersectionObserver" in window && pills.size > 0 && strip) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            pills.forEach((pill, key) => {
              const isMatch = key === id;
              pill.classList.toggle("active", isMatch);
              if (isMatch) {
                const targetLeft = pill.offsetLeft - (strip.clientWidth - pill.offsetWidth) / 2;
                strip.scrollLeft = Math.max(0, targetLeft);
              }
            });
          });
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
      );

      allRoadmapWeeks.forEach((wk) => {
        const target = document.getElementById(wk.id);
        if (target) observer.observe(target);
      });
    }
  }

  function initReviewChecklist() {
    const counterEl = document.getElementById("review-counter");
    const checkboxes = Array.from(document.querySelectorAll(".review-checkbox"));
    const weekCounters = Array.from(document.querySelectorAll("[data-week-check-count]"));

    let savedIds = new Set();
    try {
      const raw = localStorage.getItem(CHECKS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) savedIds = new Set(parsed);
      }
    } catch (_) {
      savedIds = new Set();
    }

    function syncCounter() {
      const total = checkboxes.length;
      const checkedCount = checkboxes.filter((cb) => cb.checked).length;
      if (counterEl) {
        counterEl.textContent = `Reviewed ${checkedCount}/${total}`;
        counterEl.classList.toggle("complete", total > 0 && checkedCount === total);
      }

      const byWeek = {};
      checkboxes.forEach((cb) => {
        const wid = cb.dataset.weekId;
        if (!wid) return;
        if (!byWeek[wid]) byWeek[wid] = { done: 0, total: 0 };
        byWeek[wid].total += 1;
        if (cb.checked) byWeek[wid].done += 1;
      });

      weekCounters.forEach((span) => {
        const wid = span.dataset.weekCheckCount;
        const stat = byWeek[wid] || { done: 0, total: 0 };
        span.textContent = `(${stat.done}/${stat.total})`;
      });
    }

    checkboxes.forEach((cb) => {
      const id = cb.dataset.checkId;
      if (id && savedIds.has(id)) {
        cb.checked = true;
      }
      cb.addEventListener("change", () => {
        if (id) {
          if (cb.checked) savedIds.add(id);
          else savedIds.delete(id);
          try {
            localStorage.setItem(CHECKS_STORAGE_KEY, JSON.stringify(Array.from(savedIds)));
          } catch (_) {}
        }
        syncCounter();
      });
    });

    syncCounter();
  }

  function initLightbox() {
    const dialog = document.getElementById("lightbox");
    const stage = document.getElementById("lightbox-stage");
    const counter = document.getElementById("lightbox-counter");
    const titleEl = document.getElementById("lightbox-title");
    const captionEl = document.getElementById("lightbox-caption");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    const closeBtn = document.getElementById("lightbox-close");

    if (!dialog || !stage) return;
    let currentIndex = 0;

    function showSlide(index) {
      if (galleryItems.length === 0) return;
      currentIndex = (index + galleryItems.length) % galleryItems.length;
      const item = galleryItems[currentIndex];

      counter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
      titleEl.textContent = `${item.contextTitle} — ${item.label}`;
      captionEl.textContent = item.caption || "";

      if (item.src && item.src.trim()) {
        stage.innerHTML = `<img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.caption || item.label)}">`;
      } else {
        stage.innerHTML = `
          <div class="lightbox-placeholder">
            <div style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700;">
              ${escapeHtml(item.label)}
            </div>
            <p style="margin: 0.5rem 0 0; font-size: 0.88rem; color: var(--text-muted);">
              No photo linked yet. Place your image file here and set <code>src</code> in the week/project data file:
            </p>
            <code>${escapeHtml(item.placeholderPath || "assets/img/photo.jpg")}</code>
          </div>
        `;
      }
    }

    function openLightbox(index) {
      showSlide(index);
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    }

    function closeLightbox() {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    }

    document.querySelectorAll("[data-lightbox-index]").forEach((card) => {
      const idx = Number(card.dataset.lightboxIndex);
      card.addEventListener("click", () => openLightbox(idx));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(idx);
        }
      });
    });

    if (prevBtn) prevBtn.addEventListener("click", () => showSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => showSlide(currentIndex + 1));
    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) closeLightbox();
    });

    dialog.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") showSlide(currentIndex - 1);
      else if (e.key === "ArrowRight") showSlide(currentIndex + 1);
    });
  }

  function initMobileMenu() {
    const btn = document.getElementById("mobile-menu-btn");
    const nav = document.getElementById("main-nav");
    if (!btn || !nav) return;

    btn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Boot
  renderWeekNavStrip();
  renderHero();
  renderAbout();
  renderJourney();
  renderWeeks();
  renderProject1();
  renderProject2();
  renderReflection();
  renderTeam();
  renderFooter();

  initThemeToggle();
  initHeroConsole();
  initWeekFilters();
  initWeekTabs();
  initProject1Tabs();
  initProgressAndActiveWeek();
  initReviewChecklist();
  initLightbox();
  initMobileMenu();
})();
