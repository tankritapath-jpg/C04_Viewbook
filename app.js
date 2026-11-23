/* ==========================================================================
   app.js — CPE102 // Group C04 Studio Workbench
   4-View App-Shell: Overview (SVG Donut), Weekly Archive (Master-Detail +
   Scroll All + Search), Projects Lab (Stepper + Kanban), and Team Directory.
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
  const allWeeks = [...completedWeeks, ...upcomingWeeks];
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

  // Build deterministic, deduplicated gallery list for the Lightbox
  const galleryItems = [];
  const galleryIndexByKey = new Map();

  function registerAllGalleryItems() {
    allWeeks.forEach((wk) => {
      (wk.photos || []).forEach((ph, i) => {
        const key = `${wk.id}-${i}`;
        galleryIndexByKey.set(key, galleryItems.length);
        galleryItems.push({
          src: ph.src || "",
          placeholderPath: ph.placeholderPath || "",
          label: ph.label || `${wk.code} Photo ${i + 1}`,
          caption: ph.caption || "",
          contextTitle: `${wk.code} · ${wk.title}`
        });
      });
    });

    if (projects.project1) {
      (projects.project1.photos || []).forEach((ph, i) => {
        const key = `p1-${i}`;
        galleryIndexByKey.set(key, galleryItems.length);
        galleryItems.push({
          src: ph.src || "",
          placeholderPath: ph.placeholderPath || "",
          label: ph.label || `Project 1 Photo ${i + 1}`,
          caption: ph.caption || "",
          contextTitle: projects.project1.title
        });
      });
    }

    if (projects.project2) {
      (projects.project2.photos || []).forEach((ph, i) => {
        const key = `p2-${i}`;
        galleryIndexByKey.set(key, galleryItems.length);
        galleryItems.push({
          src: ph.src || "",
          placeholderPath: ph.placeholderPath || "",
          label: ph.label || `Project 2 Photo ${i + 1}`,
          caption: ph.caption || "",
          contextTitle: projects.project2.title
        });
      });
    }
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderPhotoCard(photo, accentColor, key, frameCode) {
    const idx = galleryIndexByKey.has(key) ? galleryIndexByKey.get(key) : 0;
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

  function renderBentoPhotos(photos, accentColor, keyPrefix, codePrefix) {
    if (!Array.isArray(photos) || photos.length === 0) return "";
    let gridClass = "bento-photos";
    if (photos.length === 1) gridClass += " bento-single";
    else if (photos.length === 2) gridClass += " bento-two";

    const cards = photos
      .map((ph, i) =>
        renderPhotoCard(ph, accentColor, `${keyPrefix}-${i}`, `${codePrefix}-0${i + 1}`)
      )
      .join("");
    return `<div class="${gridClass}">${cards}</div>`;
  }

  /* ========================================================================
     Sidebar Quick-Track Links
     ======================================================================== */
  function renderSidebarTracks() {
    const el = document.getElementById("sidebar-tracks");
    if (!el) return;

    const counts = {};
    allWeeks.forEach((wk) => {
      counts[wk.category] = (counts[wk.category] || 0) + 1;
    });

    const buttons = disciplines
      .map(
        (d) => `
        <button type="button" class="sidebar-track-btn" data-jump-track="${escapeHtml(d.id)}">
          <span class="sidebar-track-left">
            <span class="disc-dot" style="--disc-color: ${escapeHtml(d.color)}" aria-hidden="true"></span>
            <span>${escapeHtml(d.label)}</span>
          </span>
          <span class="sidebar-track-count">${counts[d.id] || 0}w</span>
        </button>
      `
      )
      .join("");

    el.innerHTML = `<p class="sidebar-tracks-label">Skill Tracks</p>${buttons}`;
  }

  /* ========================================================================
     View 1: Overview (Masthead, Track Cards, Course Dossier, SVG Grading Donut)
     ======================================================================== */
  function renderGradingDonutSVG(items) {
    const r = 46;
    const circumference = 2 * Math.PI * r;
    let offset = 0;

    const circles = items
      .map((item, idx) => {
        const pct = Number(item.pct) || 0;
        const dash = (pct / 100) * circumference;
        const gap = Math.min(1.5, dash * 0.15);
        const color = SEGMENT_PALETTE[idx % SEGMENT_PALETTE.length];
        const svgCircle = `<circle cx="60" cy="60" r="${r}" fill="none" stroke="${color}" stroke-width="18" stroke-dasharray="${Math.max(0.5, dash - gap).toFixed(2)} ${circumference.toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}" />`;
        offset += dash;
        return svgCircle;
      })
      .join("");

    return `
      <svg viewBox="0 0 120 120" role="img" aria-label="Course grading weight distribution donut chart">
        <circle cx="60" cy="60" r="${r}" fill="none" stroke="var(--bg-subtle)" stroke-width="18" />
        ${circles}
      </svg>
    `;
  }

  function renderOverview() {
    const el = document.getElementById("view-overview");
    if (!el || !site.hero || !site.about) return;

    const h = site.hero;
    const a = site.about;

    const counts = {};
    allWeeks.forEach((wk) => {
      counts[wk.category] = (counts[wk.category] || 0) + 1;
    });

    const trackCards = disciplines
      .map(
        (d) => `
        <button type="button" class="track-launch-card" data-jump-track="${escapeHtml(d.id)}" style="--disc-color: ${escapeHtml(d.color)}">
          <span class="track-launch-count">${counts[d.id] || 0}</span>
          <span class="track-launch-label">${escapeHtml(d.label)}</span>
          <span class="track-launch-hint">Filter archive →</span>
        </button>
      `
      )
      .join("");

    const paragraphs = (a.overviewParagraphs || [])
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");

    const workflow = (a.workflow || [])
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

    const keyRows = (a.studyLegend || [])
      .map(
        (item) => `
        <div class="notebook-key-row">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.desc)}</span>
        </div>
      `
      )
      .join("");

    const gradingLegend = (a.grading || [])
      .map((g, idx) => {
        const color = SEGMENT_PALETTE[idx % SEGMENT_PALETTE.length];
        return `
          <div class="stacked-legend-row">
            <span class="stacked-legend-left">
              <span class="disc-dot" style="--disc-color: ${color}" aria-hidden="true"></span>
              <span>${escapeHtml(g.label)}</span>
            </span>
            <span class="stacked-legend-pct">${escapeHtml(g.pct)}%</span>
          </div>
        `;
      })
      .join("");

    const rules = (a.rules || [])
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
      <div class="overview-masthead">
        <span><strong>${escapeHtml(h.eyebrow)}</strong></span>
        <span>${escapeHtml(site.section || "Section C")} · ROOM ${escapeHtml(site.room || "CPE 1114")} · ${escapeHtml(site.groupName || "Group C04")}</span>
      </div>

      <div class="overview-hero">
        <div>
          <div class="section-eyebrow">${escapeHtml(a.eyebrow)}</div>
          <h1 class="view-title">${escapeHtml(h.title)}</h1>
          <p class="section-lead" style="margin-bottom: 1.25rem;">${escapeHtml(h.subtitle)}</p>
          <div class="hero-ctas">
            <button type="button" class="btn btn-primary" data-nav-view="archive">Browse 16-Week Archive →</button>
            <button type="button" class="btn" data-nav-view="projects">Open Projects Lab</button>
            <button type="button" class="btn" data-nav-view="team">Team &amp; Reflection</button>
          </div>
        </div>

        <div>
          <p class="sub-heading">Jump by Engineering Track</p>
          <div class="track-cards-grid">${trackCards}</div>
        </div>
      </div>

      <div class="overview-split">
        <div>
          <h2 class="section-title">${escapeHtml(a.title)}</h2>
          <p class="section-lead">${escapeHtml(a.lead)}</p>
          <div class="editorial-prose">${paragraphs}</div>

          <p class="sub-heading" style="margin-top: 2rem;">${escapeHtml(a.workflowTitle || "How Our Lab Weeks Run")}</p>
          <div class="workflow-rail">${workflow}</div>

          <p class="sub-heading">Inside Each Week Dossier</p>
          <div class="notebook-key">${keyRows}</div>
        </div>

        <div>
          <div class="donut-block">
            <p class="sub-heading">Course Grading Split</p>
            <div class="donut-wrap">
              <div class="donut-svg-box">
                ${renderGradingDonutSVG(a.grading || [])}
                <div class="donut-center">
                  <strong>100%</strong>
                  <small>TOTAL</small>
                </div>
              </div>
              <div class="donut-summary-copy">
                Half the semester grade comes from hands-on team projects (20% Robot + 30% Capstone), with weekly labs and exams covering the rest.
              </div>
            </div>
            <div class="stacked-legend">${gradingLegend}</div>
          </div>

          <p class="sub-heading">Studio Habits &amp; Lab Safety</p>
          <div class="hairline-rules">${rules}</div>
        </div>
      </div>
    `;
  }

  /* ========================================================================
     View 2: Weekly Archive (Master-Detail Split + Search + Scroll All Mode)
     ======================================================================== */
  let archiveMode = "focused";
  let archiveFilter = "all";
  let archiveQuery = "";
  let selectedWeekId = allWeeks[0] ? allWeeks[0].id : "w1";
  let savedCheckIds = new Set();

  function loadSavedChecks() {
    try {
      const raw = localStorage.getItem(CHECKS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) savedCheckIds = new Set(parsed);
      }
    } catch (_) {
      savedCheckIds = new Set();
    }
  }

  function renderConceptItem(c) {
    let tableHtml = "";
    if (Array.isArray(c.table) && c.table.length > 0) {
      const rows = c.table
        .map((row) => `<tr><th>${escapeHtml(row[0])}</th><td>${escapeHtml(row[1])}</td></tr>`)
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

  function renderWeekDossierContent(wk, options) {
    const showNavBar = Boolean(options && options.showNavBar);
    const navPrevDisabled = options && options.prevDisabled ? "disabled" : "";
    const navNextDisabled = options && options.nextDisabled ? "disabled" : "";
    const posText = options && options.posText ? options.posText : "";

    const navBarHtml = showNavBar
      ? `
        <div class="dossier-nav-bar">
          <button type="button" class="dossier-step-btn" id="dossier-prev-btn" ${navPrevDisabled}>← Previous Week</button>
          <span class="dossier-pos">${escapeHtml(posText)}</span>
          <button type="button" class="dossier-step-btn" id="dossier-next-btn" ${navNextDisabled}>Next Week →</button>
        </div>
      `
      : "";

    if (wk.note && !wk.whatWeDid) {
      return `
        <div style="--wk-color: ${escapeHtml(wk.color)}">
          ${navBarHtml}
          <div class="dossier-head">
            <span class="dossier-big-code">${escapeHtml(wk.code)}</span>
            <span class="dossier-meta-line">${escapeHtml(wk.date)} · ${escapeHtml(wk.categoryLabel || "Milestone")} · UPCOMING</span>
          </div>
          <h2 class="dossier-title">${escapeHtml(wk.title)}</h2>
          <p class="week-sub">${escapeHtml(wk.subtitle)}</p>
          <div class="before-class-strip">
            <p class="sub-heading" style="margin-bottom: 0.35rem;">Upcoming Milestone</p>
            <p style="margin: 0; font-size: 0.94rem; color: var(--text-muted);">${escapeHtml(wk.note)}</p>
          </div>
        </div>
      `;
    }

    const photosHtml = renderBentoPhotos(wk.photos, wk.color, wk.id, wk.code);
    const whatWeDidHtml = (wk.whatWeDid || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    const extraLinkHtml = wk.extraLink
      ? `<div style="margin-top: 1rem;"><a class="btn" href="${escapeHtml(wk.extraLink.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(wk.extraLink.label)}</a></div>`
      : "";

    const conceptsHtml = (wk.concepts || []).length
      ? `
        <div class="dossier-section">
          <p class="sub-heading">Key Concepts</p>
          <div class="concept-list">${wk.concepts.map(renderConceptItem).join("")}</div>
        </div>
      `
      : "";

    const beforeClassHtml =
      Array.isArray(wk.beforeClass) && wk.beforeClass.length
        ? `
        <div class="before-class-strip">
          <p class="sub-heading" style="margin-bottom: 0.4rem;">Before Class, Have Ready</p>
          <ul class="editorial-bullets">${wk.beforeClass.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
        </div>
      `
        : "";

    const checklistHtml = (wk.checklist || [])
      .map((chk) => {
        const checkedAttr = savedCheckIds.has(chk.id) ? "checked" : "";
        return `
          <label class="check-item">
            <input type="checkbox" class="review-checkbox" data-check-id="${escapeHtml(chk.id)}" data-week-id="${escapeHtml(wk.id)}" ${checkedAttr}>
            <span>${escapeHtml(chk.text)}</span>
          </label>
        `;
      })
      .join("");

    const tipHtml = wk.tip
      ? `<aside class="freshmen-callout"><strong>Field Note</strong>${escapeHtml(wk.tip)}</aside>`
      : "";

    return `
      <div style="--wk-color: ${escapeHtml(wk.color)}">
        ${navBarHtml}
        <div class="dossier-head">
          <span class="dossier-big-code">${escapeHtml(wk.code)}</span>
          <span class="dossier-meta-line">${escapeHtml(wk.date)} · ${escapeHtml(wk.categoryLabel || "")} · ${escapeHtml(wk.lecturer)}</span>
        </div>
        <h2 class="dossier-title">${escapeHtml(wk.title)}</h2>
        <p class="week-sub">${escapeHtml(wk.subtitle)}</p>
        <p class="week-summary">${escapeHtml(wk.summary)}</p>

        ${photosHtml}

        <div class="dossier-section">
          <p class="sub-heading">Activities</p>
          <ul class="editorial-bullets">${whatWeDidHtml}</ul>
          ${extraLinkHtml}
        </div>

        ${conceptsHtml}

        <div class="dossier-section">
          ${beforeClassHtml}
          <p class="sub-heading">Self-Check Before Exams</p>
          <div class="checklist">${checklistHtml}</div>
          ${tipHtml}
        </div>
      </div>
    `;
  }

  function getFilteredWeeks() {
    const q = archiveQuery.trim().toLowerCase();
    return allWeeks.filter((wk) => {
      if (archiveFilter !== "all" && wk.category !== archiveFilter) return false;
      if (!q) return true;
      const haystack = [
        wk.code,
        wk.title,
        wk.subtitle,
        wk.summary,
        wk.lecturer,
        wk.categoryLabel,
        ...(wk.whatWeDid || []),
        ...(wk.concepts || []).map((c) => `${c.title} ${c.body}`)
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  function updateArchiveViewContent() {
    const masterEl = document.getElementById("archive-master-list");
    const detailEl = document.getElementById("archive-detail");
    const splitWrap = document.getElementById("archive-split");
    const allWrap = document.getElementById("archive-all-list");
    if (!masterEl || !detailEl || !splitWrap || !allWrap) return;

    const filtered = getFilteredWeeks();

    if (archiveMode === "focused") {
      splitWrap.hidden = false;
      allWrap.hidden = true;

      if (filtered.length === 0) {
        masterEl.innerHTML = `<div class="archive-empty">No weeks match "${escapeHtml(archiveQuery)}".</div>`;
        detailEl.innerHTML = `<div class="archive-empty">Try clearing your search or switching skill track filters.</div>`;
        return;
      }

      if (!filtered.some((w) => w.id === selectedWeekId)) {
        selectedWeekId = filtered[0].id;
      }

      const activeIdx = filtered.findIndex((w) => w.id === selectedWeekId);
      const activeWeek = filtered[activeIdx] || filtered[0];

      masterEl.innerHTML = filtered
        .map((wk) => {
          const checks = wk.checklist || [];
          const doneCount = checks.filter((c) => savedCheckIds.has(c.id)).length;
          const countLabel = checks.length > 0 ? `${doneCount}/${checks.length}` : "Soon";
          return `
            <button type="button"
                    class="week-list-item ${wk.id === activeWeek.id ? "active" : ""}"
                    data-select-week="${escapeHtml(wk.id)}"
                    style="--wk-color: ${escapeHtml(wk.color)}">
              <span class="wli-code">${escapeHtml(wk.code)}</span>
              <span style="min-width: 0;">
                <span class="wli-title" style="display: block;">${escapeHtml(wk.title)}</span>
                <span class="wli-sub">${escapeHtml(wk.date)} · ${escapeHtml(wk.categoryLabel || "")}</span>
              </span>
              <span class="wli-count" data-week-check-count="${escapeHtml(wk.id)}">${escapeHtml(countLabel)}</span>
            </button>
          `;
        })
        .join("");

      detailEl.innerHTML = renderWeekDossierContent(activeWeek, {
        showNavBar: true,
        prevDisabled: activeIdx <= 0,
        nextDisabled: activeIdx >= filtered.length - 1,
        posText: `${activeIdx + 1} / ${filtered.length} MATCHING WEEKS`
      });

      masterEl.querySelectorAll("[data-select-week]").forEach((btn) => {
        btn.addEventListener("click", () => {
          selectedWeekId = btn.dataset.selectWeek;
          updateArchiveViewContent();
        });
      });

      const prevBtn = document.getElementById("dossier-prev-btn");
      const nextBtn = document.getElementById("dossier-next-btn");
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          if (activeIdx > 0) {
            selectedWeekId = filtered[activeIdx - 1].id;
            updateArchiveViewContent();
          }
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          if (activeIdx < filtered.length - 1) {
            selectedWeekId = filtered[activeIdx + 1].id;
            updateArchiveViewContent();
          }
        });
      }
    } else {
      splitWrap.hidden = true;
      allWrap.hidden = false;

      if (filtered.length === 0) {
        allWrap.innerHTML = `<div class="archive-empty">No weeks match "${escapeHtml(archiveQuery)}".</div>`;
        return;
      }

      allWrap.innerHTML = filtered
        .map((wk) => {
          let block = `<article class="archive-all-entry">${renderWeekDossierContent(wk, { showNavBar: false })}</article>`;
          if (wk.id === "w9" && archiveFilter === "all" && !archiveQuery.trim() && midtermBreak) {
            block += `
              <div style="padding: 1rem 0; border-top: 1px dashed var(--border-strong); border-bottom: 1px dashed var(--border-strong); font-size: 0.9rem; color: var(--text-muted);">
                <strong style="font-family: var(--font-mono); color: var(--text);">${escapeHtml(midtermBreak.date)} · ${escapeHtml(midtermBreak.title)}:</strong> ${escapeHtml(midtermBreak.text)}
              </div>
            `;
          }
          return block;
        })
        .join("");
    }
  }

  function renderArchive() {
    const el = document.getElementById("view-archive");
    if (!el) return;

    const counts = {};
    allWeeks.forEach((wk) => {
      counts[wk.category] = (counts[wk.category] || 0) + 1;
    });

    const filterBtns = [
      `<button type="button" class="filter-pill ${archiveFilter === "all" ? "active" : ""}" data-filter="all">All (${allWeeks.length})</button>`,
      ...disciplines.map(
        (d) => `
        <button type="button" class="filter-pill ${archiveFilter === d.id ? "active" : ""}" data-filter="${escapeHtml(d.id)}">
          <span class="disc-dot" style="--disc-color: ${escapeHtml(d.color)}" aria-hidden="true"></span>
          <span>${escapeHtml(d.label)} (${counts[d.id] || 0})</span>
        </button>
      `
      )
    ].join("");

    el.innerHTML = `
      <div class="archive-header">
        <div>
          <div class="section-eyebrow">02 // WEEKLY FIELD ARCHIVE</div>
          <h1 class="view-title" style="margin-bottom: 0.25rem;">Weeks 01 to 16</h1>
          <p class="section-lead" style="margin-bottom: 0;">Search topics, switch skill tracks, or toggle between Focused Dossier and Scroll-All mode.</p>
        </div>

        <div class="mode-switcher" role="group" aria-label="Archive layout mode">
          <button type="button" class="mode-btn active" data-archive-mode="focused">Focused View</button>
          <button type="button" class="mode-btn" data-archive-mode="all">Scroll All (16)</button>
        </div>
      </div>

      <div class="archive-controls">
        <input type="search" id="archive-search" class="archive-search" placeholder="Search weeks, tools, concepts..." aria-label="Search weekly archive">
        <div class="filter-bar" id="archive-filter-bar" role="group" aria-label="Filter by skill track">${filterBtns}</div>
      </div>

      <div class="archive-split" id="archive-split">
        <aside class="archive-master" id="archive-master-list" aria-label="Week index"></aside>
        <div class="archive-detail" id="archive-detail"></div>
      </div>

      <div class="archive-all-list" id="archive-all-list" hidden></div>
    `;

    updateArchiveViewContent();
  }

  /* ========================================================================
     View 3: Projects Lab (Dark Studio Canvas + Stepper + 3-Column Kanban)
     ======================================================================== */
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

  function renderProjects() {
    const el = document.getElementById("view-projects");
    const p1 = projects.project1;
    const p2 = projects.project2;
    if (!el || !p1 || !p2) return;

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

    const rubricSegs = (p1.rubric || [])
      .map((r, idx) => {
        const color = SEGMENT_PALETTE[idx % SEGMENT_PALETTE.length];
        return `<div class="stacked-seg" style="width: ${Number(r.pct) || 0}%; background: ${color};" title="${escapeHtml(r.label)}: ${escapeHtml(r.pct)}%"></div>`;
      })
      .join("");

    const rubricLegend = (p1.rubric || [])
      .map((r, idx) => {
        const color = SEGMENT_PALETTE[idx % SEGMENT_PALETTE.length];
        return `
          <div class="stacked-legend-row">
            <span class="stacked-legend-left">
              <span class="disc-dot" style="--disc-color: ${color}" aria-hidden="true"></span>
              <span>${escapeHtml(r.label)}</span>
            </span>
            <span class="stacked-legend-pct">${escapeHtml(r.pct)}%</span>
          </div>
        `;
      })
      .join("");

    // Project 2 Kanban grouping
    const doneFeatures = (p2.features || []).filter((f) => f.status === "done");
    const progFeatures = (p2.features || []).filter((f) => f.status === "progress");
    const todoFeatures = (p2.features || []).filter((f) => f.status !== "done" && f.status !== "progress");

    const renderKanbanCol = (title, colClass, items) => `
      <div class="kanban-col ${colClass}">
        <div class="kanban-col-head">
          <span>${escapeHtml(title)}</span>
          <span>${items.length}</span>
        </div>
        ${items.map((f) => `<div class="kanban-card">${escapeHtml(f.name)}</div>`).join("") || `<div style="font-size: 0.8rem; color: var(--text-soft);">None</div>`}
      </div>
    `;

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

    const liveBtn = p2.liveLink
      ? `<a class="btn btn-primary" href="${escapeHtml(p2.liveLink.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(p2.liveLink.label)}</a>`
      : "";

    el.innerHTML = `
      <div class="section-eyebrow">03 // PROJECTS LAB</div>
      <h1 class="view-title" style="margin-bottom: 1.5rem;">Hardware &amp; Capstone Builds</h1>

      <div class="projects-lab-surface">
        <div class="project-switcher" role="tablist" aria-label="Select project">
          <button type="button" class="proj-switch-btn active" role="tab" aria-selected="true" data-project-tab="p1">
            01 · Gemstone Sorting Robot
          </button>
          <button type="button" class="proj-switch-btn" role="tab" aria-selected="false" data-project-tab="p2">
            02 · Final Group Capstone
          </button>
        </div>

        <div id="project-panel-p1" class="project-subpanel" role="tabpanel">
          <div class="project-intro-grid">
            <div>
              <div class="section-eyebrow">${escapeHtml(p1.eyebrow)}</div>
              <h2 class="section-title">${escapeHtml(p1.title)}</h2>
              <p class="week-sub">${escapeHtml(p1.subtitle)}</p>
              <p style="margin: 0; color: var(--text-muted); max-width: 62ch;">${escapeHtml(p1.summary)}</p>
              <div class="gem-swatches" aria-label="Gemstone colors">${gemsHtml}</div>
            </div>
            <div>${reportBtn}</div>
          </div>

          ${renderBentoPhotos(p1.photos, "var(--cat-hardware)", "p1", "BOT")}

          <div class="interactive-lab-box">
            <p class="sub-heading">Design Evolution Stepper</p>
            <div class="stepper-tabs" id="p1-evo-tabs">${evoButtons}</div>
            <div id="p1-evo-panel">${renderEvolutionPanelMarkup((p1.evolution || [])[0])}</div>
          </div>

          <div class="interactive-lab-box">
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

          <div style="padding-top: 1.25rem; border-top: 1px solid var(--border);">
            <p class="sub-heading">Competition Scoring Rubric (100%)</p>
            <div class="stacked-bar" role="img" aria-label="Project 1 scoring rubric">${rubricSegs}</div>
            <div class="stacked-legend">${rubricLegend}</div>
          </div>
        </div>

        <div id="project-panel-p2" class="project-subpanel" role="tabpanel" hidden>
          <div class="project-intro-grid">
            <div>
              <div class="section-eyebrow">${escapeHtml(p2.eyebrow)}</div>
              <h2 class="section-title">${escapeHtml(p2.title)}</h2>
              <p class="week-sub">${escapeHtml(p2.subtitle)}</p>
              <p style="margin: 0; color: var(--text-muted); max-width: 62ch;">${escapeHtml(p2.summary)}</p>
            </div>
            <div>${liveBtn}</div>
          </div>

          <p class="sub-heading">Release 1 Feature Kanban</p>
          <div class="kanban-board">
            ${renderKanbanCol("Done", "col-done", doneFeatures)}
            ${renderKanbanCol("In Progress", "col-progress", progFeatures)}
            ${renderKanbanCol("To Do", "col-todo", todoFeatures)}
          </div>

          <div class="spec-columns">
            <div>
              <p class="sub-heading">Delivery Timeline</p>
              <div class="timeline">${timelineHtml}</div>
            </div>
            <div>
              <p class="sub-heading">Slides &amp; UI Previews</p>
              ${renderBentoPhotos(p2.photos, "var(--cat-milestone)", "p2", "CAP")}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* ========================================================================
     View 4: Retrospective, Team Directory & Course Credits
     ======================================================================== */
  function renderTeamView() {
    const el = document.getElementById("view-team");
    if (!el) return;

    const parasHtml = (reflection.paragraphs || []).map((p) => `<p>${escapeHtml(p)}</p>`).join("");
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

    const membersHtml = (team.members || [])
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

    const f = site.footer || {};
    const sourcesHtml = (f.sources || []).map((s) => `<li>${escapeHtml(s)}</li>`).join("");
    const toolsHtml = (f.tools || [])
      .map(
        (t) =>
          `<a class="tool-chip" href="${escapeHtml(t.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t.name)} ↗</a>`
      )
      .join("");

    el.innerHTML = `
      <div class="section-eyebrow">04 // ${escapeHtml(reflection.eyebrow || "RETROSPECTIVE")}</div>
      <h1 class="view-title" style="margin-bottom: 1.5rem;">${escapeHtml(reflection.title || "Retrospective & Group C04")}</h1>

      <blockquote class="quote-callout">“${escapeHtml(reflection.quote || "")}”</blockquote>
      <div class="essay-columns">${parasHtml}</div>

      <p class="sub-heading">${escapeHtml(reflection.lessonsTitle || "Five Lessons From the Workbench")}</p>
      <div class="numbered-ledger">${adviceRows}</div>

      <div class="section-eyebrow">${escapeHtml(team.eyebrow || "GROUP DIRECTORY")}</div>
      <h2 class="section-title">${escapeHtml(team.title || "Group C04 · Section C")}</h2>
      <p class="section-lead">${escapeHtml(team.subtitle || "")}</p>

      <div class="team-directory">${membersHtml}</div>
      <p class="ta-credits">${escapeHtml(team.taCredits || "")}</p>

      <div class="credits-footer-grid">
        <div>
          <p class="sub-heading">Sources &amp; Credits</p>
          <ul class="footer-sources">${sourcesHtml}</ul>
        </div>
        <div>
          <p class="sub-heading">Tools Used in CPE102</p>
          <div class="tool-chips">${toolsHtml}</div>
          <p style="margin: 1rem 0 0; font-size: 0.78rem; color: var(--text-soft);">${escapeHtml(f.copyright || "")}</p>
        </div>
      </div>
    `;
  }

  /* ========================================================================
     Interactive Controllers & State Synchronization
     ======================================================================== */
  function closeMobileSidebar() {
    const sidebar = document.getElementById("sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");
    const toggle = document.getElementById("sidebar-toggle");
    if (sidebar) sidebar.classList.remove("open");
    if (backdrop) backdrop.classList.remove("open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  function switchView(viewId, updateHash) {
    const validViews = new Set(["overview", "archive", "projects", "team"]);
    const target = validViews.has(viewId) ? viewId : "overview";

    document.querySelectorAll(".nav-view-btn[data-view]").forEach((btn) => {
      const isMatch = btn.dataset.view === target;
      btn.classList.toggle("active", isMatch);
      if (isMatch) btn.setAttribute("aria-current", "page");
      else btn.removeAttribute("aria-current");
    });

    document.querySelectorAll(".view-panel").forEach((panel) => {
      const match = panel.id === `view-${target}`;
      panel.hidden = !match;
      panel.classList.toggle("active", match);
    });

    if (updateHash) {
      try {
        history.replaceState(null, "", `#${target}`);
      } catch (_) {}
    }

    closeMobileSidebar();
    window.scrollTo(0, 0);
  }

  function switchProjectTab(tabKey) {
    const p1Panel = document.getElementById("project-panel-p1");
    const p2Panel = document.getElementById("project-panel-p2");
    if (!p1Panel || !p2Panel) return;

    document.querySelectorAll("[data-project-tab]").forEach((btn) => {
      const active = btn.dataset.projectTab === tabKey;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", String(active));
    });

    p1Panel.hidden = tabKey !== "p1";
    p2Panel.hidden = tabKey !== "p2";
  }

  function applyHashRoute() {
    const raw = (window.location.hash || "").replace(/^#/, "").toLowerCase();
    if (!raw || raw === "overview" || raw === "top" || raw === "about") {
      switchView("overview", false);
      return;
    }
    if (raw === "archive" || raw === "weeks" || raw === "journey") {
      switchView("archive", false);
      return;
    }
    const matchedWeek = allWeeks.find((w) => w.id === raw);
    if (matchedWeek) {
      selectedWeekId = matchedWeek.id;
      archiveFilter = "all";
      archiveQuery = "";
      renderArchive();
      bindArchiveEvents();
      switchView("archive", false);
      return;
    }
    if (raw === "projects" || raw === "project-1") {
      switchView("projects", false);
      switchProjectTab("p1");
      return;
    }
    if (raw === "project-2") {
      switchView("projects", false);
      switchProjectTab("p2");
      return;
    }
    if (raw === "team" || raw === "reflection") {
      switchView("team", false);
    }
  }

  function initViewRouter() {
    document.querySelectorAll(".nav-view-btn[data-view]").forEach((btn) => {
      btn.addEventListener("click", () => switchView(btn.dataset.view, true));
    });

    document.addEventListener("click", (e) => {
      const navTrigger = e.target.closest("[data-nav-view]");
      if (navTrigger) {
        e.preventDefault();
        switchView(navTrigger.dataset.navView, true);
        return;
      }

      const trackTrigger = e.target.closest("[data-jump-track]");
      if (trackTrigger) {
        const trackId = trackTrigger.dataset.jumpTrack || "all";
        archiveFilter = trackId;
        archiveQuery = "";
        const searchEl = document.getElementById("archive-search");
        if (searchEl) searchEl.value = "";
        document.querySelectorAll("#archive-filter-bar .filter-pill").forEach((pill) => {
          pill.classList.toggle("active", pill.dataset.filter === trackId);
        });
        updateArchiveViewContent();
        switchView("archive", true);
      }
    });

    window.addEventListener("hashchange", applyHashRoute);
    applyHashRoute();
  }

  function bindArchiveEvents() {
    const searchEl = document.getElementById("archive-search");
    const filterBar = document.getElementById("archive-filter-bar");
    const modeButtons = document.querySelectorAll("[data-archive-mode]");

    if (searchEl) {
      searchEl.value = archiveQuery;
      searchEl.addEventListener("input", () => {
        archiveQuery = searchEl.value;
        updateArchiveViewContent();
      });
    }

    if (filterBar) {
      filterBar.querySelectorAll(".filter-pill").forEach((btn) => {
        btn.addEventListener("click", () => {
          archiveFilter = btn.dataset.filter || "all";
          filterBar.querySelectorAll(".filter-pill").forEach((b) => {
            b.classList.toggle("active", b === btn);
          });
          updateArchiveViewContent();
        });
      });
    }

    modeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        archiveMode = btn.dataset.archiveMode || "focused";
        modeButtons.forEach((b) => b.classList.toggle("active", b === btn));
        updateArchiveViewContent();
      });
    });
  }

  function initProjectControls() {
    document.querySelectorAll("[data-project-tab]").forEach((btn) => {
      btn.addEventListener("click", () => switchProjectTab(btn.dataset.projectTab));
    });

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

  function syncReviewCounters() {
    const counterEl = document.getElementById("review-counter");
    const fillEl = document.getElementById("review-bar-fill");

    let totalChecks = 0;
    let doneChecks = 0;
    allWeeks.forEach((wk) => {
      const checks = wk.checklist || [];
      totalChecks += checks.length;
      const wkDone = checks.filter((c) => savedCheckIds.has(c.id)).length;
      doneChecks += wkDone;

      const countSpan = document.querySelector(`[data-week-check-count="${wk.id}"]`);
      if (countSpan && checks.length > 0) {
        countSpan.textContent = `${wkDone}/${checks.length}`;
      }
    });

    if (counterEl) {
      counterEl.textContent = `${doneChecks}/${totalChecks}`;
    }
    if (fillEl) {
      const pct = totalChecks > 0 ? Math.round((doneChecks / totalChecks) * 100) : 0;
      fillEl.style.width = `${pct}%`;
    }
  }

  function initReviewChecklist() {
    syncReviewCounters();

    document.addEventListener("change", (e) => {
      const cb = e.target;
      if (!cb || !cb.classList || !cb.classList.contains("review-checkbox")) return;
      const id = cb.dataset.checkId;
      if (!id) return;

      if (cb.checked) savedCheckIds.add(id);
      else savedCheckIds.delete(id);

      try {
        localStorage.setItem(CHECKS_STORAGE_KEY, JSON.stringify(Array.from(savedCheckIds)));
      } catch (_) {}

      // Sync duplicate checkboxes (if switching between Focused and Scroll-All)
      document.querySelectorAll(`.review-checkbox[data-check-id="${id}"]`).forEach((other) => {
        other.checked = cb.checked;
      });

      syncReviewCounters();
    });
  }

  function initThemeToggle() {
    const desktopBtn = document.getElementById("theme-toggle");
    const mobileBtn = document.getElementById("mobile-theme-toggle");
    const root = document.documentElement;

    function applyTheme(theme) {
      root.dataset.theme = theme;
      const isDark = theme === "dark";
      [desktopBtn, mobileBtn].forEach((btn) => {
        if (!btn) return;
        const icon = btn.querySelector(".theme-icon");
        const label = btn.querySelector(".theme-label");
        if (icon) icon.textContent = isDark ? "☀" : "☾";
        if (label) label.textContent = isDark ? "Light Mode" : "Dark Mode";
      });
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

    function toggleTheme() {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch (_) {}
    }

    if (desktopBtn) desktopBtn.addEventListener("click", toggleTheme);
    if (mobileBtn) mobileBtn.addEventListener("click", toggleTheme);
  }

  function initMobileSidebar() {
    const sidebar = document.getElementById("sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");
    const toggle = document.getElementById("sidebar-toggle");
    if (!sidebar || !backdrop || !toggle) return;

    toggle.addEventListener("click", () => {
      const open = sidebar.classList.toggle("open");
      backdrop.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });

    backdrop.addEventListener("click", closeMobileSidebar);
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
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }

    function closeLightbox() {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }

    document.addEventListener("click", (e) => {
      const card = e.target.closest("[data-lightbox-index]");
      if (card) openLightbox(Number(card.dataset.lightboxIndex));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const card = e.target.closest ? e.target.closest("[data-lightbox-index]") : null;
      if (card) {
        e.preventDefault();
        openLightbox(Number(card.dataset.lightboxIndex));
      }
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

  // Boot
  loadSavedChecks();
  registerAllGalleryItems();

  renderSidebarTracks();
  renderOverview();
  renderArchive();
  renderProjects();
  renderTeamView();

  bindArchiveEvents();
  initProjectControls();
  initReviewChecklist();
  initThemeToggle();
  initMobileSidebar();
  initLightbox();
  initViewRouter();
})();
