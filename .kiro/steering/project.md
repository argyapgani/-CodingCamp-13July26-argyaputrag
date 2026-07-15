# Life Dashboard — Project Steering

## Project Overview
A personal productivity dashboard built with plain HTML, CSS, and Vanilla JavaScript.
No frameworks, no build tools, no backend. Everything runs in the browser.

## Tech Stack
- **HTML** — structure (`index.html`)
- **CSS** — styling with CSS custom properties (`css/style.css`)
- **JavaScript** — all interactivity (`js/script.js`)
- **LocalStorage** — all data persistence (no server)

## Code Conventions
- Use `'use strict'` at the top of all JS files
- Use `const $ = (id) => document.getElementById(id)` for element lookups
- Use the `store.get` / `store.set` helpers for all LocalStorage access
- Use `escapeHtml()` whenever injecting user-supplied strings into the DOM
- Use `uid()` to generate unique IDs for new todos and links
- No external libraries or CDN imports — keep it dependency-free

## File Structure
```
index.html          ← single page, all markup here
css/style.css       ← all styles, light/dark theme via data-theme attribute
js/script.js        ← all logic, split into numbered sections
.kiro/steering/     ← Kiro project instructions
README.md           ← user-facing documentation
```

## CSS Conventions
- All colors and spacing use CSS custom properties defined in `:root`
- Dark mode is handled by `[data-theme="dark"]` overrides — never hardcode colors
- Responsive breakpoints: 1024px (tablet), 720px (mobile), 420px (small mobile)
- Section comments use `/* ── Section Name ── */` format

## Features
- Live clock and date (updates every second)
- Time-based greeting (morning / afternoon / evening / night)
- Custom username saved to LocalStorage
- Light / Dark mode toggle (respects OS preference on first load)
- Focus Timer with Focus 25m, Short 5m, Long 15m, and Custom modes
- To-Do List with add, edit, complete, delete, sort, and clear done
- Quick Links panel with add, edit, delete, and default links
- All data persisted to LocalStorage under `dashboard_*` keys

## LocalStorage Keys
| Key | Contents |
|---|---|
| `dashboard_username` | User's display name |
| `dashboard_theme` | `"light"` or `"dark"` |
| `dashboard_todos` | Array of todo objects |
| `dashboard_links` | Array of quick link objects |
| `dashboard_custom_timer` | Custom timer duration in seconds |
