# 🗂️ Life Dashboard

A personal productivity dashboard you open in any web browser — no installation, no account, no internet required. Everything is saved automatically on your device.

---

## 📋 Table of Contents

1. [What is this?](#-what-is-this)
2. [How to open the dashboard](#-how-to-open-the-dashboard)
3. [First-time setup](#-first-time-setup)
4. [Features & how to use them](#-features--how-to-use-them)
   - [Clock & Date](#1-clock--date)
   - [Greeting & Your Name](#2-greeting--your-name)
   - [Light / Dark Mode](#3-light--dark-mode)
   - [Focus Timer](#4-focus-timer)
   - [To-Do List](#5-to-do-list)
   - [Quick Links](#6-quick-links)
5. [Keyboard shortcuts](#-keyboard-shortcuts)
6. [Your data & privacy](#-your-data--privacy)
7. [Browser compatibility](#-browser-compatibility)
8. [Project structure](#-project-structure)

---

## 💡 What is this?

Life Dashboard is a lightweight, single-page web app that helps you stay organized throughout the day. It includes:

- A **live clock and date** so you always know what time it is
- A **personalized greeting** that changes with the time of day
- A **Pomodoro-style focus timer** to help you work in focused sessions
- A **to-do list** with full task management and sorting
- A **quick links panel** for your most-visited websites

No login needed. No data ever leaves your computer.

---

## 🚀 How to open the dashboard

1. Download or clone this repository to your computer.
2. Open the project folder.
3. Double-click **`index.html`** — it will open in your default web browser.

That's it. The dashboard is ready to use immediately.

> **Tip:** Drag `index.html` onto a pinned browser tab or set it as your browser's homepage so it opens automatically every time.

---

## 🛠️ First-time setup

When you open the dashboard for the very first time, a small pop-up will appear asking for your name. This name is used in the greeting at the top of the page.

1. Type your name in the text box.
2. Press **Save** (or hit `Enter`).

Your name is saved locally and will be remembered every time you return. You can change it at any time — see [Greeting & Your Name](#2-greeting--your-name) below.

---

## ✨ Features & how to use them

### 1. Clock & Date

Located in the **top-left corner** of the header.

- Displays the current time in `HH:MM:SS` format, updating every second.
- Shows the full date below it (e.g., `Wednesday, July 15, 2026`).

No interaction needed — it just works automatically.

---

### 2. Greeting & Your Name

Located in the **center of the header**.

The greeting changes automatically based on the time of day:

| Time of day | Greeting shown |
|---|---|
| 5:00 AM – 11:59 AM | Good morning! 👋 |
| 12:00 PM – 4:59 PM | Good afternoon! 👋 |
| 5:00 PM – 8:59 PM | Good evening! 👋 |
| 9:00 PM – 4:59 AM | Good night! 👋 |

**To change your name:**

1. Click the small ✏️ pencil icon next to your name.
2. A pop-up will appear with a text field.
3. Type your new name and click **Save** (or press `Enter`).
4. Click **Cancel** or press `Escape` to close without saving.

---

### 3. Light / Dark Mode

Located in the **top-right corner** of the header.

- Click the **🌙 moon button** to switch to Dark mode.
- Click the **☀️ sun button** to switch back to Light mode.

The dashboard automatically detects your operating system's color preference the first time you open it. Your choice is then saved and remembered for future visits.

---

### 4. Focus Timer

Located in the **left card** of the dashboard.

The focus timer helps you work in timed sessions (based on the Pomodoro technique).

#### Choosing a session type

Click one of the three mode buttons at the top of the timer card:

| Button | Duration | Best for |
|---|---|---|
| **Focus 25m** | 25 minutes | Deep work |
| **Short 5m** | 5 minutes | Short break |
| **Long 15m** | 15 minutes | Longer break |

Switching modes resets the timer automatically.

#### Running the timer

| Button | What it does |
|---|---|
| **Start** | Begins the countdown |
| **Stop** | Pauses the countdown (you can resume with Start) |
| **Reset** | Stops the timer and resets it back to the full duration |

- While running, the timer display turns **green** and gently pulses.
- When the time is up, a soft beep plays and the display turns **amber**.
- The status text below the timer tells you what's happening at each stage.

> **Tip:** Press the `Space` bar anywhere on the page to start or pause the timer without reaching for the mouse.

---

### 5. To-Do List

Located in the **center card** of the dashboard.

#### Adding a task

1. Click the text field that says *"Add a new task…"*
2. Type your task (up to 120 characters).
3. Press **Enter** or click the **Add** button.

The task appears in the list immediately.

#### Completing a task

- Click the **checkbox** on the left side of any task to mark it as done.
- Completed tasks appear with a strikethrough and fade slightly.
- Click the checkbox again to unmark it.

#### Editing a task

1. Hover over the task — two small icons appear on the right.
2. Click the **✏️ pencil icon**.
3. A pop-up appears with the current task text ready to edit.
4. Make your changes and click **Save** (or press `Enter`).
5. Click **Cancel** or press `Escape` to discard changes.

#### Deleting a task

1. Hover over the task.
2. Click the **🗑️ trash icon** on the right.
3. The task is removed immediately.

#### Clearing all completed tasks

Click the **"Clear done"** button in the bottom-right of the task list to remove all checked-off tasks at once.

#### Sorting tasks

Use the **Sort** dropdown in the top-right corner of the To-Do card to reorder your list:

| Sort option | What it does |
|---|---|
| **Default** | Tasks in the order you added them |
| **A → Z** | Alphabetical ascending |
| **Z → A** | Alphabetical descending |
| **Done Last** | Incomplete tasks shown first |
| **Done First** | Completed tasks shown first |

The task count at the bottom shows your progress (e.g., `2/5 done`).

---

### 6. Quick Links

Located in the **right card** of the dashboard.

Quick Links are shortcut buttons to your most-visited websites. Four default links are included when you first open the dashboard (Google, YouTube, GitHub, Wikipedia). You can replace them with anything you like.

#### Opening a link

Click any link tile to open that website in a new tab.

#### Adding a new link

1. Click the **+ Add Link** button at the top of the Quick Links card.
2. A pop-up appears with three fields:
   - **Name** — a short label, e.g. `Gmail`
   - **URL** — the website address, e.g. `https://mail.google.com`
   - **Emoji / Icon** — an optional emoji to show on the tile, e.g. `📧`
3. Click **Save** (or press `Enter`).

> **Tip:** You don't need to type `https://` — the dashboard adds it automatically if you forget.

#### Editing an existing link

1. Hover over any link tile — a small **✏️** icon appears in the top-left corner.
2. Click it to open the edit pop-up.
3. Change whatever you need and click **Save**.

#### Deleting a link

1. Hover over any link tile — a small **✕** icon appears in the top-right corner.
2. Click it to remove the link.

---

## ⌨️ Keyboard shortcuts

| Key | Action |
|---|---|
| `Space` | Start or pause the Focus Timer (when not typing in a field) |
| `Enter` | Confirm / save in any open pop-up |
| `Escape` | Close any open pop-up without saving |

---

## 🔒 Your data & privacy

- All your data (name, tasks, links, theme preference) is stored in your browser's **Local Storage**.
- Nothing is sent to any server or third party — ever.
- Your data stays on your device and is specific to the browser you use.

**To clear all data:** Open your browser's developer tools (`F12`), go to **Application → Local Storage**, and delete the entries starting with `dashboard_`. Alternatively, clearing your browser's site data will reset the dashboard to its defaults.

---

## 🌐 Browser compatibility

The dashboard works in all modern browsers:

| Browser | Supported |
|---|---|
| Google Chrome 90+ | ✅ |
| Mozilla Firefox 88+ | ✅ |
| Microsoft Edge 90+ | ✅ |
| Safari 14+ | ✅ |

No plugins or extensions required.

---

## 📁 Project structure

```
project-folder/
│
├── index.html        ← Main page (open this in your browser)
├── css/
│   └── style.css     ← All styling, light/dark themes, responsive layout
├── js/
│   └── script.js     ← All interactivity and localStorage logic
└── README.md         ← This file
```

---

*Built with HTML, CSS, and Vanilla JavaScript. No frameworks, no dependencies, no build step required.* 
