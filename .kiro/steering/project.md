# Life Dashboard — Project Steering

## Project Overview
A personal productivity dashboard built with HTML, Tailwind CSS (CDN), and Vanilla JavaScript.
No backend, no build tools required. Everything runs directly in the browser.

## Tech Stack
- **HTML** — structure (`index.html`)
- **Tailwind CSS (CDN)** — layout, spacing, colors, typography, hover states, responsive design
- **Vanilla CSS** — only for things Tailwind cannot do (`css/style.css`)
- **JavaScript** — all interactivity (`js/script.js`)
- **LocalStorage** — all data persistence (no server)

## Tailwind Setup
- Tailwind is loaded via CDN: `https://cdn.tailwindcss.com`
- Custom color tokens are defined in the `tailwind.config` block inside `index.html`
- Custom colors: `bg`, `bg-card`, `bg-input`, `bg-hover`, `border-col`, `txt-primary`, `txt-secondary`, `txt-muted`, `accent`, `accent-h`, `accent-light`, `danger`, `danger-light`, `success`, `success-light`, `warn`
- Custom shadows: `card`, `card-hover`, `modal`
- Custom border-radius: `card` (18px), `input` (6px), `tile` (12px)
- Dark mode is NOT handled by Tailwind — it is driven by `[data-theme="dark"]` on `<html>` via vanilla CSS overrides

## What Goes in style.css (Vanilla CSS only)
Keep `css/style.css` minimal. Only add styles here for things Tailwind cannot handle:
- `[data-theme="dark"]` overrides for dark mode color switching
- `@keyframes` animations (pulse, slideIn, slideUp, fadeIn)
- Custom checkbox styling (`appearance: none` + `::after` pseudo-element)
- `.hidden`, `.active`, `.done`, `.running`, `.finished` state classes toggled by JS
- Hover-reveal for todo action buttons and link overlay buttons
- Scrollbar styling (`::-webkit-scrollbar`)
- Number input spin arrow removal (`::-webkit-inner-spin-button`)
- `.sr-only` accessibility helper

## What Goes in index.html (Tailwind)
- All layout: grid, flexbox, gap, padding, margin
- All colors: background, text, border, hover
- All typography: font size, weight, tracking, leading
- All borders, shadows, border-radius
- Responsive breakpoints via `max-lg:`, `max-md:` prefixes

## Code Conventions
- Use `'use strict'` at the top of all JS files
- Use `const $ = (id) => document.getElementById(id)` for element lookups
- Use the `store.get` / `store.set` helpers for all LocalStorage access
- Use `escapeHtml()` whenever injecting user-supplied strings into the DOM
- Use `uid()` to generate unique IDs for new todos and links
- When JS builds HTML dynamically (renderTodos, renderLinks), use Tailwind classes inline
- Hardcode hex colors in JS validation errors (not CSS vars) e.g. `'#ef4444'`

## File Structure
```
index.html            ← single page, Tailwind classes + config block
css/style.css         ← animations, dark mode overrides, Tailwind-impossible styles only
js/script.js          ← all logic, split into numbered sections
.kiro/steering/       ← Kiro project instructions
README.md             ← user-facing documentation
```

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
