import json
import socket
import time
from datetime import datetime
from pathlib import Path

OUTPUT_FILE = Path(__file__).resolve().parent.parent / "data" / "noc-status.json"

SYSTEMS = [
    {
        "name": "Proxmox VE",
        "type": "Virtualization Platform",
        "host": "10.10.30.250",
        "port": 8006,
        "address": "10.10.30.250:8006",
        "layer": "Core Infrastructure",
        "label": "Hypervisor"
    },
    {
        "name": "TrueNAS",
        "type": "Storage Platform",
        "host": "10.10.30.143",
        "port": 80,
        "address": "10.10.30.143",
        "layer": "Storage",
        "label": "NAS"
    },
    {
        "name": "Nginx Proxy Manager",
        "type": "Reverse Proxy",
        "host": "10.10.30.210",
        "port": 81,
        "address": "10.10.30.210:81",
        "layer": "Access Layer",
        "label": "Proxy"
    },
    {
        "name": "Dashy",
        "type": "Service Dashboard",
        "host": "10.10.30.61",
        "port": 4000,
        "address": "10.10.30.61:4000",
        "layer": "Dashboard",
        "label": "Portal"
    },
    {
        "name": "Jellyfin",
        "type": "Media Service",
        "host": "10.10.30.143",
        "port": 30013,
        "address": "10.10.30.143:30013",
        "layer": "Application Service",
        "label": "App"
    },
    {
        "name": "K3s API",
        "type": "Kubernetes API",
        "host": "10.10.30.72",
        "port": 6443,
        "address": "10.10.30.72:6443",
        "layer": "Compute Cluster",
        "label": "Cluster"
    },
    {
        "name": "APRS-IS",
        "type": "APRS Internet Service",
        "host": "noam.aprs2.net",
        "port": 14580,
        "address": "noam.aprs2.net:14580",
        "layer": "Edge / RF",
        "label": "External"
    }
]


def check_tcp(host, port, timeout=2):
    start = time.perf_counter()

    try:
        with socket.create_connection((host, port), timeout=timeout):
            latency_ms = round((time.perf_counter() - start) * 1000)
            return True, latency_ms
    except OSError:
        return False, None


def severity_from_status(online, latency):
    if not online:
        return "Critical"

    if latency is None:
        return "Unknown"

    if latency < 50:
        return "Healthy"

    if latency <= 150:
        return "Degraded"

    return "Critical"


def health_label(online_count, total):
    if online_count == total:
        return "All Systems Online"

    if online_count >= max(1, total - 2):
        return "Degraded"

    return "Action Required"


def main():
    checked_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    systems = []
    online_count = 0
    offline_count = 0

    for system in SYSTEMS:
        online, latency = check_tcp(system["host"], system["port"])

        if online:
            status = "Online"
            online_count += 1
            latency_value = f"{latency} ms"
        else:
            status = "Offline"
            offline_count += 1
            latency_value = "N/A"

        systems.append({
            "name": system["name"],
            "type": system["type"],
            "address": system["address"],
            "status": status,
            "severity": severity_from_status(online, latency),
            "layer": system["layer"],
            "label": system["label"],
            "latency": latency_value,
            "lastCheck": checked_at
        })

    total_systems = len(SYSTEMS)

    data = {
        "nocName": "Ced's NOC",
        "status": health_label(online_count, total_systems),
        "lastUpdated": checked_at,
        "summary": {
            "nodes": "12+",
            "services": f"{online_count}/{total_systems}",
            "online": str(online_count),
            "offline": str(offline_count),
            "vlans": "4",
            "edgeSystems": "2"
        },
        "systems": systems
    }

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=2)

    print(f"NOC status written to {OUTPUT_FILE}")
    print(f"Online systems: {online_count}/{total_systems}")
    print(f"Offline systems: {offline_count}/{total_systems}")


if __name__ == "__main__":
    main()