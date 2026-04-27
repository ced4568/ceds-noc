import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NOC_FILE = ROOT / "data" / "noc-status.json"
BADGE_FILE = ROOT / "data" / "noc-badge.json"

with open(NOC_FILE, "r", encoding="utf-8") as file:
    data = json.load(file)

status = data.get("status", "Unknown")
summary = data.get("summary", {})

online = int(summary.get("online", 0))
offline = int(summary.get("offline", 0))
total = online + offline

# 🔥 Determine severity
if offline == 0:
    severity = "Healthy"
    color = "brightgreen"
elif offline <= 2:
    severity = "Degraded"
    color = "yellow"
else:
    severity = "Critical"
    color = "red"

# 🔥 Build message
message = f"{severity} | {online}/{total} online | {offline} offline"

badge = {
    "schemaVersion": 1,
    "label": "Ced's NOC",
    "message": message,
    "color": color
}

with open(BADGE_FILE, "w", encoding="utf-8") as file:
    json.dump(badge, file, indent=2)

print(f"NOC badge updated: {message}")