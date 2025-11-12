# 🗺️ OAG Smart Zone

_A BLE-powered indoor navigation prototype for the Ottawa Art Gallery._

---

## 🎯 Project Overview

**OAG Smart Zone** is a full-stack prototype that demonstrates a digital wayfinding system designed for the **Ottawa Art Gallery (OAG)**.  
It leverages **Bluetooth Low Energy (BLE) beacons** to identify a visitor’s current location and deliver contextual information such as exhibit descriptions, amenities, and navigation hints.

---

## 🧩 Key Features

- 🔹 Detect nearby BLE beacons using a mobile app
- 🔹 Display contextual location info (e.g., “Lobby”, “Gallery A”)
- 🔹 Retrieve beacon metadata from a MongoDB-powered backend
- 🔹 RESTful API built with **Node.js + Express**
- 🔹 Frontend app built with **React Native (Expo)**
- 🔹 GitHub-managed collaboration with PR reviews, branch protections, and CI integration

---

## 🧱 Tech Stack

| Layer               | Technology                 | Description                                  |
| ------------------- | -------------------------- | -------------------------------------------- |
| **Frontend**        | React Native (Expo)        | BLE scanning, UI rendering                   |
| **Backend**         | Node.js + Express          | REST API for zone info                       |
| **Database**        | MongoDB Atlas              | Stores beacon metadata                       |
| **Hardware**        | 2 BLE Beacons              | Simulated or physical units                  |
| **Version Control** | GitHub                     | PR reviews, branch protection, and templates |
| **Deployment**      | Render / Railway (Planned) | Lightweight backend hosting                  |

---
