import json
import socket
from datetime import datetime
from pathlib import Path

OUTPUT_FILE = Path(__file__).resolve().parent.parent / "data" / "noc-status.json"

SYSTEMS = [
    {
        "name": "Proxmox VE",
        "type": "Virtualization",
        "host": "10.10.30.250",
        "port": 8006,
        "address": "10.10.30.250:8006",
        "layer": "Infrastructure"
    },
    {
        "name": "TrueNAS",
        "type": "Storage",
        "host": "10.10.30.143",
        "port": 80,
        "address": "10.10.30.143",
        "layer": "Storage"
    },
    {
        "name": "Nginx Proxy Manager",
        "type": "Reverse Proxy",
        "host": "10.10.30.210",
        "port": 81,
        "address": "10.10.30.210:81",
        "layer": "Access"
    },
    {
        "name": "Dashy",
        "type": "Dashboard",
        "host": "10.10.30.61",
        "port": 4000,
        "address": "10.10.30.61:4000",
        "layer": "Monitoring"
    },
    {
        "name": "Jellyfin",
        "type": "Media Service",
        "host": "10.10.30.143",
        "port": 30013,
        "address": "10.10.30.143:30013",
        "layer": "Services"
    },
    {
        "name": "K3s API",
        "type": "Kubernetes API",
        "host": "10.10.30.72",
        "port": 6443,
        "address": "10.10.30.72:6443",
        "layer": "Compute"
    },
    {
        "name": "APRS-IS",
        "type": "APRS Internet Service",
        "host": "noam.aprs2.net",
        "port": 14580,
        "address": "noam.aprs2.net:14580",
        "layer": "Edge"
    }
]


def check_tcp(host, port, timeout=2):
    try:
        with socket.create_connection((host, port), timeout=timeout):
            return True
    except OSError:
        return False


def main():
    checked_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    systems = []
    online_count = 0

    for system in SYSTEMS:
        online = check_tcp(system["host"], system["port"])

        if online:
            status = "Online"
            online_count += 1
        else:
            status = "Offline"

        systems.append({
            "name": system["name"],
            "type": system["type"],
            "address": system["address"],
            "status": status,
            "layer": system["layer"],
            "lastCheck": checked_at
        })

    data = {
        "nocName": "Ced's NOC",
        "status": "Operational Build",
        "lastUpdated": checked_at,
        "summary": {
            "nodes": "12+",
            "services": f"{online_count}/{len(SYSTEMS)}",
            "vlans": "4",
            "edgeSystems": "2"
        },
        "systems": systems
    }

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=2)

    print(f"NOC status written to {OUTPUT_FILE}")
    print(f"Online systems: {online_count}/{len(SYSTEMS)}")


if __name__ == "__main__":
    main()