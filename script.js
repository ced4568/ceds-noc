document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.querySelector("[data-year]");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  loadNocStatus();

  // Auto-refresh NOC dashboard every 30 seconds
  setInterval(loadNocStatus, 30000);
});

async function loadNocStatus() {
  try {
    const response = await fetch("data/noc-status.json");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    const statusText = document.getElementById("noc-status-text");
    const nodes = document.getElementById("metric-nodes");
    const services = document.getElementById("metric-services");
    const vlans = document.getElementById("metric-vlans");
    const edge = document.getElementById("metric-edge");
    const grid = document.getElementById("noc-system-grid");

    if (!statusText || !nodes || !services || !vlans || !edge || !grid) {
      return;
    }

    statusText.textContent = `${data.nocName} — ${data.status} — Last updated: ${data.lastUpdated}`;

    nodes.textContent = data.summary.nodes;
    services.textContent = data.summary.services;
    vlans.textContent = data.summary.vlans;
    edge.textContent = data.summary.edgeSystems;

    grid.innerHTML = "";

    data.systems.forEach((system) => {
      const card = document.createElement("article");
      card.className = "noc-system-card";

      const status = system.status.toLowerCase();

      const statusClass =
        status.includes("online") || status.includes("operational")
          ? "online"
          : status.includes("building") || status.includes("tuning") || status.includes("active")
          ? "warning"
          : "offline";

      card.innerHTML = `
        <div class="noc-system-top">
          <span class="mini-status ${statusClass}"></span>
          <span>${system.layer}</span>
        </div>

        <div class="system-label">${system.label || "System"}</div>

        <div class="severity-pill ${system.severity?.toLowerCase() || "unknown"}">
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
  } catch (error) {
    const statusText = document.getElementById("noc-status-text");

    if (statusText) {
      statusText.textContent = "Ced’s NOC data unavailable";
    }

    console.error("Failed to load NOC status:", error);
  }
}