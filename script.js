// ═══════════════════════════════════════════════
//  Ced's Portfolio — script.js
//  NOC data loads from data/noc-status.json
//  Refreshes every 30s. Graceful fallback on fail.
// ═══════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", () => {
  // Set copyright year
  const yearSpan = document.querySelector("[data-year]");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // NOC data
  loadNocStatus();
  setInterval(loadNocStatus, 30000);

  // GitHub pinned repos
  loadGithubRepos();
});

// Track consecutive failures so we can show the fallback
let failCount = 0;
const MAX_FAILS = 3;

async function loadNocStatus() {
  const dot        = document.getElementById("noc-dot");
  const statusText = document.getElementById("noc-status-text");
  const badge      = document.getElementById("noc-refresh-badge");
  const nodes      = document.getElementById("metric-nodes");
  const services   = document.getElementById("metric-services");
  const vlans      = document.getElementById("metric-vlans");
  const edge       = document.getElementById("metric-edge");
  const grid       = document.getElementById("noc-system-grid");
  const alertList  = document.getElementById("noc-alert-list");
  const fallback   = document.getElementById("noc-fallback");

  try {
    // Cache-bust to always get fresh data
    // Use absolute URL when on NOC subdomain, relative when on main portfolio
    const nocDataUrl = window.location.hostname === 'noc.chasedumphord.com'
      ? `https://chasedumphord.com/data/noc-status.json?t=${Date.now()}`
      : `data/noc-status.json?t=${Date.now()}`;

    const res = await fetch(nocDataUrl);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    // Reset fail counter on success
    failCount = 0;

    // ── Status bar ──
    if (dot) {
      dot.className = "status-dot live";
    }
    if (statusText) {
      const d = new Date(data.lastUpdated);
      const formatted = d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
      statusText.textContent = `${data.nocName} — ${data.status} — Last updated: ${formatted}`;
    }
    if (badge) {
      badge.textContent = `Auto-refresh: 30s`;
    }

    // Hide fallback if it was showing
    if (fallback) fallback.style.display = "none";

    // ── Metrics ──
    if (nodes)    animateMetric(nodes,    data.summary.nodes);
    if (services) animateMetric(services, data.summary.services);
    if (vlans)    animateMetric(vlans,    data.summary.vlans);
    if (edge)     animateMetric(edge,     data.summary.edgeSystems);

    // ── System cards ──
    if (grid) {
      grid.innerHTML = "";
      data.systems.forEach((system) => {
        const card = document.createElement("article");
        card.className = "noc-system-card";

        const rawStatus = system.status.toLowerCase();
        const statusClass =
          rawStatus.includes("online") || rawStatus.includes("operational") ? "online"
          : rawStatus.includes("building") || rawStatus.includes("tuning") || rawStatus.includes("active") ? "warning"
          : "offline";

        card.innerHTML = `
          <div class="noc-system-top">
            <span class="mini-status ${statusClass}"></span>
            <span>${system.layer}</span>
          </div>
          <div class="system-label">${system.label || "System"}</div>
          <div class="severity-pill ${(system.severity || "unknown").toLowerCase()}">
            ${system.severity || "Unknown"}
          </div>
          <h3>${system.name}</h3>
          <p>${system.type}</p>
          <code>${system.address}</code>
          <div class="system-meta">
            <small>Status: ${system.status}</small>
            <small>Latency: ${system.latency || "N/A"}</small>
            <small>Last Check: ${system.lastCheck || "Manual"}</small>
          </div>
        `;

        grid.appendChild(card);
      });
    }

    // ── Alerts ──
    if (alertList) renderAlerts(data.systems, alertList);

  } catch (err) {
    failCount++;
    console.warn(`[NOC] Fetch failed (${failCount}/${MAX_FAILS}):`, err.message);

    // Update dot to error state
    if (dot) dot.className = "status-dot error";

    if (statusText) {
      statusText.textContent = failCount >= MAX_FAILS
        ? "NOC feed offline — view live dashboard at noc.chasedumphord.com"
        : `NOC data unavailable — retrying... (${failCount}/${MAX_FAILS})`;
    }

    if (badge) badge.textContent = "";

    // After MAX_FAILS attempts, show the fallback block
    if (failCount >= MAX_FAILS && fallback) {
      fallback.style.display = "block";
    }
  }
}

// Animate a number metric with a quick pop
function animateMetric(el, value) {
  el.classList.remove("metric-pop");
  el.textContent = value;
  void el.offsetWidth; // force reflow
  el.classList.add("metric-pop");
}

// ═══════════════════════════════════════════════
//  GitHub Repos — fetches public repos for ced4568
//  Sorted by last pushed, capped at 6 cards
// ═══════════════════════════════════════════════

// Language → color map (subset of GitHub's palette)
const LANG_COLORS = {
  Python:     "#3572A5",
  JavaScript: "#f1e05a",
  Shell:      "#89e051",
  HTML:       "#e34c26",
  CSS:        "#563d7c",
  Dockerfile: "#384d54",
  YAML:       "#cb171e",
  Makefile:   "#427819",
};

async function loadGithubRepos() {
  const container = document.getElementById("github-repos");
  if (!container) return;

  try {
    const res = await fetch(
      "https://api.github.com/users/ced4568/repos?sort=pushed&per_page=6",
      { headers: { Accept: "application/vnd.github+json" } }
    );

    if (!res.ok) throw new Error(`GitHub API ${res.status}`);

    const repos = await res.json();

    // Filter out forks for cleaner display
    const ownRepos = repos.filter((r) => !r.fork).slice(0, 6);

    if (ownRepos.length === 0) {
      container.innerHTML = `<p class="noc-loading">No public repositories found.</p>`;
      return;
    }

    container.innerHTML = ownRepos.map((repo) => {
      const langColor = LANG_COLORS[repo.language] || "var(--accent-2)";
      const desc = repo.description
        ? repo.description
        : "No description provided.";

      const updatedDate = new Date(repo.pushed_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

      return `
        <div class="repo-card">
          <div class="repo-card-top">
            <span class="repo-icon">📁</span>
            <a
              class="repo-name"
              href="${repo.html_url}"
              target="_blank"
              rel="noopener noreferrer"
              title="${repo.name}"
            >${repo.name}</a>
            <span class="repo-visibility">${repo.private ? "private" : "public"}</span>
          </div>

          <p class="repo-desc">${desc}</p>

          <div class="repo-meta">
            ${repo.language
              ? `<span>
                  <span class="repo-lang-dot" style="background:${langColor}"></span>
                  ${repo.language}
                </span>`
              : ""}
            <span>★ ${repo.stargazers_count}</span>
            <span>Updated ${updatedDate}</span>
          </div>
        </div>
      `;
    }).join("");

  } catch (err) {
    console.warn("[GitHub] Failed to load repos:", err.message);
    if (container) {
      container.innerHTML = `
        <div class="repo-loading">
          <p class="noc-loading">
            Could not load repositories. 
            <a href="https://github.com/ced4568" target="_blank" rel="noopener noreferrer">
              View on GitHub →
            </a>
          </p>
        </div>
      `;
    }
  }
}
// Build the alert panel from system data
function renderAlerts(systems, alertList) {
  const scored = systems
    .map((sys) => {
      const sev    = (sys.severity || "").toLowerCase();
      const status = (sys.status   || "").toLowerCase();

      let score = 0;
      if (sev.includes("critical") || status.includes("offline")) score = 3;
      else if (sev.includes("degraded"))                           score = 2;
      else if (sev.includes("unknown"))                           score = 1;

      return { ...sys, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (scored.length === 0) {
    alertList.innerHTML = `
      <div class="noc-alert healthy">
        <strong>All monitored systems nominal</strong>
        <span>No critical or degraded systems detected.</span>
      </div>
    `;
    return;
  }

  alertList.innerHTML = scored.map((sys) => {
    const cls =
      sys.score === 3 ? "critical"
      : sys.score === 2 ? "degraded"
      : "unknown";

    return `
      <div class="noc-alert ${cls}">
        <strong>${sys.name}</strong>
        <span>${sys.severity || sys.status} • ${sys.layer} • Latency: ${sys.latency || "N/A"}</span>
      </div>
    `;
  }).join("");
}