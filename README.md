<h1>Hi, I'm Chase! <br/>
Digital Systems | Infrastructure | RF Edge Systems
</h1>

<h3>
I build real-world systems that combine data, automation, and infrastructure. 
From monitoring platforms and dashboards to full infrastructure environments, everything I create is designed to solve practical problems and scale.
</h3>

<img align="right" alt="Coding Gorilla" width="400px" style="padding-right:10px;" src="https://gifdb.com/images/thumbnail/monkey-laptop-coding-miys12p5izw3s11s.gif" />

<ul>
 <li>🚀 Currently building system monitoring platforms & dashboards</li>
 <li>🖥️ Running a full homelab (Proxmox HA Cluster, Kubernetes, Docker)</li> 
 <li>⚙️ Focused on infrastructure, automation, and observability</li>
 <li>🧠 Ask me about K3s clusters, system monitoring, or homelab design</li>
 <li>📫 Reach me: Chasedumphord@gmail.com</li>
</ul>

---

# 🧠 Ced’s NOC System

👉 **Portfolio Site:** https://chasedumphord.com  
👉 **Live NOC Dashboard:** https://noc.chasedumphord.com  

This repository represents a **live Network Operations Center (NOC) system**, not just a static portfolio.

It showcases:

* 📊 **Ced’s NOC Dashboard** (real system monitoring)
* 🧠 **HomeLab Infrastructure** (HA virtualization, VLANs, services)
* ☸️ **K3s Cluster** (distributed compute)
* 📡 **APRS iGate (RF Edge System)**

---

# 📊 Ced’s NOC Dashboard

A central visibility layer for all systems.

This dashboard includes real Grafana, Prometheus, and Blackbox Exporter monitoring for live HomeLab services.

---

## 🔍 What it shows:

* Infrastructure health
* Service availability
* Network segmentation
* RF edge system status

---

## 🧠 Why it matters:

This demonstrates:

* System monitoring mindset
* Operational visibility
* Real-world infrastructure awareness
* Ability to translate data into actionable insights

---

## 🖼️ Live Dashboard Preview

### 📊 Metrics Overview

![NOC Metrics](./screenshots/noc-metrics.png)

### 🖥️ Systems Overview

![NOC Systems](./screenshots/noc-systems.png)

---

## 🔴 Live System Status

![Ced's NOC](https://img.shields.io/endpoint?url=https://ced4568.github.io/ced-portfolio/data/noc-badge.json&style=for-the-badge)

![Edge](https://img.shields.io/badge/Edge-RF%20Active-orange?style=for-the-badge)
![Portfolio](https://img.shields.io/badge/Portfolio-Live-blue?style=for-the-badge)

---

# 🧠 Featured System — Ced’s NOC (Network Operations Center)

A real-time monitoring and observability platform built on top of my homelab infrastructure.

---

## 🔍 What it demonstrates:

* Live system monitoring (services, nodes, edge systems)
* Infrastructure visibility across VLANs and clusters
* Service health tracking (latency, uptime, status)
* Real data ingestion (NOT simulated)
* Dashboard design for operational awareness

---

## ⚙️ Monitoring Stack:

* Grafana (Visualization)
* Prometheus (Metrics collection)
* Blackbox Exporter (Service uptime & latency checks)
* Uptime Kuma (External monitoring layer)

👉 This is the **core system** that ties everything together.

---

# 🧱 Foundation — Ced’s Home Lab (Infrastructure + Monitoring)

Real-world environment used to simulate production systems and host services.

This is the backbone of Ced’s NOC — where all systems, services, and monitoring originate.

---

## ⚙️ Core Infrastructure

* **Proxmox HA Cluster (High Availability Virtualization)**
* K3s Kubernetes cluster (Raspberry Pi - 12 nodes)
* TrueNAS storage system
* Docker / containerized workloads

---

## 🌐 Networking Layer

* VLAN segmentation  
  - Main Network  
  - IoT Network  
  - HomeLab Network (10.10.30.0/24)  
  - Guest Network  

* Nginx Proxy Manager (external access layer)
* Cloudflare Tunnels (secure remote access)

---

## 📊 Monitoring Stack (LIVE)

* Grafana (Dashboards)
* Prometheus (Metrics)
* Blackbox Exporter (Service Monitoring)
* Uptime Kuma (External Monitoring)

👉 The NOC dashboard is built directly on top of this environment.

---

# 📡 Edge System — APRS iGate (RF → Internet Gateway)

A real-world RF system that feeds live data into infrastructure.

---

## ⚙️ System Components

* Raspberry Pi + Direwolf APRS TNC
* Audio chain tuning (critical for decode accuracy)
* APRS-IS integration
* Real beacon ingestion from handheld radios

🔗 **Project:**
https://github.com/ced4568/ceds-aprs-igate

---

## 🔥 Key Insight

This system bridges:

```text
RF radio signals → Raspberry Pi / Direwolf → APRS-IS → Digital Infrastructure
```

---

## 🎯 Key Tuning Insight

* Target audio level: **~50–60**
* Too high → clipping / decode failure
* Too low → missed packets

This was tuned using:

* Direwolf audio level output
* Real beacon testing from handheld radios

---

# 🧠 Featured Systems

<ul>
 <li>
  <b>📊 Ced’s NOC Dashboard</b><br/>
  Enterprise-style monitoring platform providing real-time visibility into infrastructure, services, and edge systems.<br/>
  <b>Highlights:</b> Prometheus metrics, Blackbox monitoring, service health tracking, Grafana dashboards.<br/>
 </li>

 <br/>

 <li>
  <b>🧱 Ced’s Home Lab</b><br/>
  Full infrastructure environment simulating production systems using virtualization and Kubernetes.<br/>
  <b>Highlights:</b> Proxmox HA cluster, 12-node K3s cluster, VLAN segmentation, reverse proxy, monitoring stack.<br/>
 </li>

 <br/>

 <li>
  <b>📡 APRS iGate (RF Edge System)</b><br/>
  RF-to-internet gateway ingesting real-world radio data into digital systems.<br/>
  <b>Highlights:</b> Audio tuning, Direwolf APRS TNC, APRS-IS integration, live beacon ingestion.<br/>
 </li>
</ul>

---

# 🧰 Tech Stack

## ⚡ Core Technologies

<img align="left" alt="TypeScript" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg" />
<img align="left" alt="Git" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" />
<img align="left" alt="Linux" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" />
<img align="left" alt="HTML" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" />
<img align="left" alt="JavaScript" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" />
<img align="left" alt="React" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
<img align="left" alt="NodeJS" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" />
<img align="left" alt="Python" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-plain.svg" />
<img align="left" alt="Docker" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />
<img align="left" alt="Kubernetes" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" />
<img align="left" alt="Grafana" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" />
<img align="left" alt="Prometheus" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg" />
<img align="left" alt="Bash" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" />

<br /><br />

## 🖥️ Infrastructure & Systems

* Proxmox HA Cluster (Virtualization)
* K3s Kubernetes (Raspberry Pi Cluster)
* Docker / Containerized Services
* TrueNAS (Storage)

## 📊 Monitoring & Observability

* Grafana (Dashboards)
* Prometheus (Metrics)
* Blackbox Exporter (Service Monitoring)
* Uptime Kuma (External Monitoring)

## 🌐 Networking & Access

* Nginx Proxy Manager (Reverse Proxy)
* Cloudflare Tunnels (Secure External Access)
* VLAN Segmentation (UniFi Network)

## 📡 Edge & RF Systems

* Direwolf (APRS TNC)
* APRS-IS Integration
* Raspberry Pi iGate Systems
* Audio Signal Processing / Tuning

## 💻 Development

* Python (Automation / Data Collection)
* JavaScript (Frontend Dashboard UI)
* HTML / CSS (UI Design)
* Bash (System Automation)
* Git / GitHub (Version Control)

# 📈 Roadmap

* [x] Grafana + Prometheus deployed
* [x] Real service monitoring (Blackbox)
* [ ] Response time dashboards
* [ ] Alerting system (Prometheus alerts)
* [ ] Full NOC dashboard layout (v2)
* [ ] Mobile APRS iGate deployment

# 👤 Connect With Me

[LinkedIn](https://www.linkedin.com/in/toochase-dumphord/)

[GitHub](https://github.com/ced4568)

## ⚡ Final Note

This is not a static portfolio — it is a live representation of real infrastructure, monitoring, and edge systems working together.