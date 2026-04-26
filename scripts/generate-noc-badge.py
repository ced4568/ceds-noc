import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NOC_FILE = ROOT / "data" / "noc-status.json"
BADGE_FILE = ROOT / "data" / "noc-badge.json"

with open(NOC_FILE, "r", encoding="utf-8") as file:
    data = json.load(file)

status = data.get("status", "Unknown")
summary = data.get("summary", {})

online = summary.get("online", "?")
offline = summary.get("offline", "?")
services = summary.get("services", f"{online}/?")

if status == "All Systems Online":
    color = "brightgreen"
elif status == "Degraded":
    color = "yellow"
else:
    color = "red"

badge = {
    "schemaVersion": 1,
    "label": "Ced's NOC",
    "message": f"{status} | {services} online | {offline} offline",
    "color": color
}

BADGE_FILE.parent.mkdir(parents=True, exist_ok=True)

with open(BADGE_FILE, "w", encoding="utf-8") as file:
    json.dump(badge, file, indent=2)

print(f"NOC badge written to {BADGE_FILE}")
print(badge["message"])