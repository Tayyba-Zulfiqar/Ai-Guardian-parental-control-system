# 🌸✨ AI Guardian — Parent Dashboard 💻🎀

Welcome to the **Parent Dashboard** of the *AI Guardian* system 🛡️💖🧸
This beautiful web app helps parents stay aware, informed, and gracefully in control of their child’s digital world 🌍📱🌷

---

## 🧁 About This Project 💜✨

The Parent Dashboard is a comprehensive and comforting web app where parents can monitor, analyze, and manage their child's digital safety in real-time. It presents complex data in a clean, calm, and incredibly friendly interface 🌈☁️🪄

---

## 🏗️ Project Architecture 🧩✨

We've built this app with a modern, modular, and scalable architecture to ensure everything stays organized and "cute" forever:

*   **📂 `components/common/`**: Highly reusable elements like our beautiful `StatsCard` 🧁🪄
*   **📂 `components/ui/dashboard/`**: Specialized components including `ChildStatusCard`, `TopApps`, and `AISummary` 📱💖
*   **📂 `data/Dashboard/`**: A centralized "Source of Truth" for all dashboard metrics, app lists, and AI insights 📂🌸
*   **🎨 `src/index.css`**: A centralized design system using CSS variables for a consistent pastel theme 🌈✨

---

## 📑 Dashboard Sections & Features 🌸🩰

Here is a delightful breakdown of the structure and features, categorized by their respective pages:

#### 1️⃣ 🏠🎀 Intelligence Dashboard (`Dashboard.jsx`)
*   **✨ Today's Overview**: A bold, high-visibility section featuring **Stats Cards** for Screen Time, Safety Scores, Risk Levels, and Alert counts 📊🧁
*   **📱 Top Apps Used Today**: A clean, distraction-free list of the child's most used applications with precise usage time 🌷🧸
*   **🧠 Daily Behavior AI Insights**: A standalone, premium "Intelligence Card" that provides parents with a simple, 2-3 line summary of their child's day 🎀✨
*   **👶 Child Status Card**: Real-time status tracker showing age, online/offline status, and last active time ☁️💖

#### 2️⃣ 🔔💖 Live Alerts (`Alerts.jsx`)
* **Live Notifications**: Real-time alerts for any harmful events 🚨🧸
* **Detailed Context**: Shows the threat type, app name, severity, and timestamp ⏰🌷
* **AI Actions Taken**: Summarizes system actions (e.g., "Content blocked", "App access restricted", "Parent notified", "Device locked") 🛡️🎀

#### 3️⃣ 📱☁️ Child Activity (`ChildActivity.jsx`)
* **App Usage Tracking**: Lists all apps used today and the top 5 frequently used apps monthly with average time 💖📈
* **Usage Distribution**: Visual pie charts showing app distribution daily, weekly, or monthly 🥧✨

#### 4️⃣ ⏱️🪄 Screen Time (`ScreenTime.jsx`)
* **Visual Charts**: Beautiful daily, weekly, and monthly screen time tracking charts 📊🌸
* **Averages & Breakdown**: Average screen time metrics and app-wise breakdowns (e.g., YouTube → 2h 30m, Instagram → 1h 10m) ⏳🧸

#### 5️⃣ 🧩🍓 Content Reports (`ContentReports.jsx`)
* **Threat Intelligence**: Analyzes patterns over time (Threat Timeline Analysis) 🕵️‍♀️🎀
* **Category Analysis**: Classifies risks (Violence, Adult content, Harmful behavior, etc.) 🚫🌷
* **Risk Score Trends**: Up/down trend graphs for risk scores over time 📈✨
* **AI Summary**: Natural language summaries of blocked threats (e.g., "Violence-related content has increased over the last 7 days") 🤖💖

#### 6️⃣ 👤🩰 Child Profile (`ChildProfile.jsx`)
* **Link Child Device**: Generate unique pairing/QR codes with an expiry time and regenerate options 🔗🌸
* **Child Roster**: List of connected children with name, age, device info, connection status (online/offline/linked), and last active time 🧸💖

#### 7️⃣ 🚪🎀 Controls (`Controls.jsx`)
* **Logout Policies**: Configure how the child app gracefully handles logouts 🔒☁️
  * 💚✨ *Approval Mode (Recommended)*: Child requests logout, parent approves/denies remotely 
  * ❤️🌷 *PIN Mode (Strict)*: Child must enter the persistent Parent Control PIN to log out 
  * 🤍☁️ *Free Mode*: Unrestricted logout (Not recommended) 

#### 8️⃣ ⚙️🧁 Settings (`Settings.jsx`)
* **Parent Profile**: Manage name, email, password, and account deletion (Identity Layer) 👤✨
* **System Controls**: Change active logout modes (Approval vs. PIN Mode) 🛡️💖
* **Notification Settings**: Toggle alerts ON/OFF and choose alert types (harmful content only vs. daily summaries) 🔔🎀
* **Monitoring Toggle**: Enable, pause temporarily, or stop tracking completely (Data Collection Layer) 🛑🌷

---

## 🛠️ Tech Stack 🌼🪄

*   ⚛️ **React (Vite)** – Fast and modern frontend 🌸
*   🎨 **Vanilla CSS** – Custom-crafted pastel design system 🎀
*   🪄 **Lucide-React** – Elegant and minimalist iconography 💐
*   📂 **Data-Driven UI** – Centralized state management for easy updates ☁️

---

## 🌼 Current Status 🏗️✅

✅ **Intelligence Dashboard Page Completed** 🏠🎀
✅ **Reusable Stats Component System** 📊✨
✅ **Standalone AI Summary Card** 🧠💖
✅ **Modular File Architecture** 📂🩰
🚧 UI development for Alerts and Reports in progress... 🎀✨

---

## ▶️ How to Run 💻💖

```bash
npm install
npm run dev
```

Then open 👉 http://localhost:5173/ 💫🧁

---

## 🌷 Future Plans 🎀

* 📈 Beautiful, colorful charts for screen time and activity
* 🔔 Real-time alerts via gentle push notifications
* 🤖 Smart AI-based behavior monitoring and summaries
* 🔐 Secure authentication and session management

---

## 💕 Vision 🕊️✨

To create a safe and supportive digital environment for children — while giving parents absolute peace of mind 🕊️💖🌸

---
