/* ─────────────────────────────────────────────────────────────
   LIFE DASHBOARD — script.js
   Vanilla JS · No frameworks · LocalStorage for persistence
   ───────────────────────────────────────────────────────────── */

'use strict';

/* ═══════════════════════════════════════════════════════════════
   1. UTILITY HELPERS
═══════════════════════════════════════════════════════════════ */

/** Get element by id (shorthand) */
const $ = (id) => document.getElementById(id);

/** LocalStorage helpers */
const store = {
  get: (key, fallback = null) => {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? JSON.parse(val) : fallback;
    } catch {
      return fallback;
    }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota */ }
  },
};

/** Generate a simple unique id */
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

/** Pad a number to two digits */
const pad = (n) => String(n).padStart(2, '0');

/* ═══════════════════════════════════════════════════════════════
   2. CLOCK & GREETING
═══════════════════════════════════════════════════════════════ */

const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

function updateClock() {
  const now  = new Date();
  const h    = now.getHours();
  const m    = now.getMinutes();
  const s    = now.getSeconds();

  $('clock').textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;

  $('date').textContent =
    `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

  // Greeting text
  let greetText;
  if (h >= 5  && h < 12) greetText = 'Good morning';
  else if (h >= 12 && h < 17) greetText = 'Good afternoon';
  else if (h >= 17 && h < 21) greetText = 'Good evening';
  else greetText = 'Good night';

  $('greeting').textContent = `${greetText}! 👋`;
}

setInterval(updateClock, 1000);
updateClock();

/* ═══════════════════════════════════════════════════════════════
   3. USERNAME
═══════════════════════════════════════════════════════════════ */

let username = store.get('dashboard_username', '');

function renderUsername() {
  // Try to use a stored name; browser/OS name is not accessible via JS
  // so we fall back to a friendly prompt on first load
  $('username').textContent = username || 'Friend';
}

function openNameModal() {
  $('name-input').value = username;
  $('name-modal').classList.remove('hidden');
  $('name-input').focus();
}

function closeNameModal() {
  $('name-modal').classList.add('hidden');
}

function saveName() {
  const val = $('name-input').value.trim();
  if (val) {
    username = val;
    store.set('dashboard_username', username);
  }
  renderUsername();
  closeNameModal();
}

$('edit-name-btn').addEventListener('click', openNameModal);
$('name-save').addEventListener('click', saveName);
$('name-cancel').addEventListener('click', closeNameModal);
$('name-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') saveName(); });
$('name-modal').addEventListener('click', (e) => { if (e.target === $('name-modal')) closeNameModal(); });

// First-time: prompt for name automatically
if (!username) {
  setTimeout(openNameModal, 600);
} else {
  renderUsername();
}

/* ═══════════════════════════════════════════════════════════════
   4. THEME (LIGHT / DARK)
═══════════════════════════════════════════════════════════════ */

let currentTheme = store.get('dashboard_theme', 'light');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  $('theme-icon').textContent = theme === 'dark' ? '☀️' : '🌙';
  store.set('dashboard_theme', theme);
  currentTheme = theme;
}

$('theme-toggle').addEventListener('click', () => {
  applyTheme(currentTheme === 'light' ? 'dark' : 'light');
});

// Apply saved theme on load (respect OS preference if no saved choice)
if (!store.get('dashboard_theme')) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
} else {
  applyTheme(currentTheme);
}

/* ═══════════════════════════════════════════════════════════════
   5. FOCUS TIMER
═══════════════════════════════════════════════════════════════ */

const TIMER_MODES = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };

let timerMode      = 'focus';
let timerTotal     = TIMER_MODES.focus;
let timerRemaining = timerTotal;
let timerInterval  = null;
let timerRunning   = false;

// Restore saved custom duration (default 10 min)
let customSeconds = store.get('dashboard_custom_timer', 10 * 60);

const timerDisplay = $('timer-display');
const timerStatus  = $('timer-status');

function formatTime(seconds) {
  return `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`;
}

function renderTimer() {
  timerDisplay.textContent = formatTime(timerRemaining);
}

/** Show / hide the custom duration input row */
function toggleCustomRow(show) {
  const row = $('custom-timer-row');
  row.classList.toggle('hidden', !show);
  if (show) {
    // Populate inputs from saved custom value
    $('custom-min').value = Math.floor(customSeconds / 60);
    $('custom-sec').value = customSeconds % 60;
  }
}

function setTimerMode(mode) {
  stopTimer();
  timerMode = mode;

  if (mode === 'custom') {
    toggleCustomRow(true);
    timerTotal     = customSeconds;
    timerRemaining = timerTotal;
  } else {
    toggleCustomRow(false);
    timerTotal     = TIMER_MODES[mode];
    timerRemaining = timerTotal;
  }

  renderTimer();
  timerDisplay.classList.remove('running', 'finished');
  timerStatus.textContent = 'Ready to focus?';

  document.querySelectorAll('.mode-tab').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
}

/** Called when user clicks "Set" on the custom row */
function applyCustomDuration() {
  let mins = parseInt($('custom-min').value, 10) || 0;
  let secs = parseInt($('custom-sec').value, 10) || 0;

  // Clamp values
  mins = Math.min(Math.max(mins, 0), 99);
  secs = Math.min(Math.max(secs, 0), 59);

  // Must be at least 1 second
  const total = mins * 60 + secs;
  if (total < 1) {
    $('custom-min').style.borderColor = 'var(--danger)';
    $('custom-sec').style.borderColor = 'var(--danger)';
    setTimeout(() => {
      $('custom-min').style.borderColor = '';
      $('custom-sec').style.borderColor = '';
    }, 1500);
    timerStatus.textContent = '⚠️ Enter at least 1 second.';
    return;
  }

  customSeconds  = total;
  store.set('dashboard_custom_timer', customSeconds);

  // Update display values in case they were clamped
  $('custom-min').value = mins;
  $('custom-sec').value = secs;

  stopTimer();
  timerTotal     = customSeconds;
  timerRemaining = timerTotal;
  renderTimer();
  timerDisplay.classList.remove('running', 'finished');
  timerStatus.textContent = `✅ Custom timer set to ${formatTime(customSeconds)}.`;
}

$('custom-set-btn').addEventListener('click', applyCustomDuration);

// Allow Enter key inside custom inputs to trigger Set
[$('custom-min'), $('custom-sec')].forEach((el) => {
  el.addEventListener('keydown', (e) => { if (e.key === 'Enter') applyCustomDuration(); });
});

function startTimer() {
  if (timerRunning || timerRemaining === 0) return;
  timerRunning = true;
  timerDisplay.classList.add('running');
  timerDisplay.classList.remove('finished');
  timerStatus.textContent = (timerMode === 'focus' || timerMode === 'custom')
    ? '🔥 Stay focused!'
    : '☕ Take a break!';

  timerInterval = setInterval(() => {
    timerRemaining--;
    renderTimer();

    if (timerRemaining <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      timerDisplay.classList.remove('running');
      timerDisplay.classList.add('finished');
      timerStatus.textContent = (timerMode === 'focus' || timerMode === 'custom')
        ? '✅ Session complete! Take a break.'
        : '✅ Break over! Back to work.';
      playDoneSound();
    }
  }, 1000);
}

function stopTimer() {
  if (!timerRunning) return;
  clearInterval(timerInterval);
  timerRunning = false;
  timerDisplay.classList.remove('running');
  timerStatus.textContent = '⏸ Paused.';
}

function resetTimer() {
  stopTimer();
  timerRemaining = timerTotal;
  renderTimer();
  timerDisplay.classList.remove('running', 'finished');
  timerStatus.textContent = 'Ready to focus?';
}

/** Simple beep using Web Audio API */
function playDoneSound() {
  try {
    const ctx  = new (window.AudioContext || window.webkitAudioContext)();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);
  } catch { /* AudioContext not available */ }
}

$('timer-start').addEventListener('click', startTimer);
$('timer-stop').addEventListener('click', stopTimer);
$('timer-reset').addEventListener('click', resetTimer);

document.querySelectorAll('.mode-tab').forEach((btn) => {
  btn.addEventListener('click', () => setTimerMode(btn.dataset.mode));
});

renderTimer();

/* ═══════════════════════════════════════════════════════════════
   6. TO-DO LIST
═══════════════════════════════════════════════════════════════ */

/** @type {{ id: string, text: string, done: boolean, createdAt: number }[]} */
let todos     = store.get('dashboard_todos', []);
let editingId = null;
let sortMode  = 'default';

/* ── Persistence ── */
function saveTodos() {
  store.set('dashboard_todos', todos);
}

/* ── Sorting ── */
function getSortedTodos() {
  const list = [...todos];
  switch (sortMode) {
    case 'az':
      return list.sort((a, b) => a.text.localeCompare(b.text));
    case 'za':
      return list.sort((a, b) => b.text.localeCompare(a.text));
    case 'done-last':
      return list.sort((a, b) => Number(a.done) - Number(b.done));
    case 'done-first':
      return list.sort((a, b) => Number(b.done) - Number(a.done));
    default:
      return list; // insertion order
  }
}

/* ── Render ── */
function renderTodos() {
  const listEl  = $('todo-list');
  const emptyEl = $('todo-empty');
  const countEl = $('todo-count');

  listEl.innerHTML = '';

  const sorted = getSortedTodos();

  if (sorted.length === 0) {
    emptyEl.style.display = 'block';
  } else {
    emptyEl.style.display = 'none';
    sorted.forEach((todo) => {
      const li = document.createElement('li');
      li.className = `todo-item${todo.done ? ' done' : ''}`;
      li.dataset.id = todo.id;

      li.innerHTML = `
        <input
          type="checkbox"
          class="todo-checkbox"
          aria-label="Mark task as done"
          ${todo.done ? 'checked' : ''}
        />
        <span class="todo-text">${escapeHtml(todo.text)}</span>
        <div class="todo-actions">
          <button class="icon-btn todo-edit-btn" title="Edit task">&#9998;</button>
          <button class="icon-btn btn-danger todo-delete-btn" title="Delete task">&#128465;</button>
        </div>
      `;

      // Checkbox toggle
      li.querySelector('.todo-checkbox').addEventListener('change', () => toggleTodo(todo.id));
      // Edit
      li.querySelector('.todo-edit-btn').addEventListener('click', () => openEditModal(todo.id));
      // Delete
      li.querySelector('.todo-delete-btn').addEventListener('click', () => deleteTodo(todo.id));

      listEl.appendChild(li);
    });
  }

  // Count
  const total = todos.length;
  const done  = todos.filter((t) => t.done).length;
  countEl.textContent = total === 0
    ? '0 tasks'
    : `${done}/${total} done`;
}

/* ── CRUD ── */
function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  todos.push({ id: uid(), text: trimmed, done: false, createdAt: Date.now() });
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.done = !todo.done;
    saveTodos();
    renderTodos();
  }
}

function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  saveTodos();
  renderTodos();
}

function updateTodo(id, newText) {
  const trimmed = newText.trim();
  if (!trimmed) return;
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.text = trimmed;
    saveTodos();
    renderTodos();
  }
}

function clearDone() {
  todos = todos.filter((t) => !t.done);
  saveTodos();
  renderTodos();
}

/* ── Edit Modal ── */
function openEditModal(id) {
  editingId = id;
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;
  $('edit-input').value = todo.text;
  $('edit-modal').classList.remove('hidden');
  $('edit-input').focus();
  $('edit-input').select();
}

function closeEditModal() {
  $('edit-modal').classList.add('hidden');
  editingId = null;
}

function saveEdit() {
  if (editingId) updateTodo(editingId, $('edit-input').value);
  closeEditModal();
}

$('edit-save').addEventListener('click', saveEdit);
$('edit-cancel').addEventListener('click', closeEditModal);
$('edit-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') saveEdit(); });
$('edit-modal').addEventListener('click', (e) => { if (e.target === $('edit-modal')) closeEditModal(); });

/* ── Form submit ── */
$('todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo($('todo-input').value);
  $('todo-input').value = '';
});

/* ── Sort select ── */
$('sort-select').addEventListener('change', (e) => {
  sortMode = e.target.value;
  renderTodos();
});

/* ── Clear done ── */
$('clear-done').addEventListener('click', clearDone);

/* ── Initial render ── */
renderTodos();

/* ═══════════════════════════════════════════════════════════════
   7. QUICK LINKS
═══════════════════════════════════════════════════════════════ */

/** @type {{ id: string, name: string, url: string, icon: string }[]} */
let links         = store.get('dashboard_links', getDefaultLinks());
let editingLinkId = null;

function getDefaultLinks() {
  return [
    { id: uid(), name: 'Google',    url: 'https://google.com',    icon: '🔍' },
    { id: uid(), name: 'YouTube',   url: 'https://youtube.com',   icon: '▶️' },
    { id: uid(), name: 'GitHub',    url: 'https://github.com',    icon: '🐙' },
    { id: uid(), name: 'Wikipedia', url: 'https://wikipedia.org', icon: '📖' },
  ];
}

function saveLinks() {
  store.set('dashboard_links', links);
}

function renderLinks() {
  const grid    = $('links-grid');
  const emptyEl = $('links-empty');
  grid.innerHTML = '';

  if (links.length === 0) {
    emptyEl.style.display = 'block';
    return;
  }

  emptyEl.style.display = 'none';

  links.forEach((link) => {
    const item = document.createElement('div');
    item.className = 'link-item';
    item.title     = link.url;

    item.innerHTML = `
      <button class="link-edit-btn" title="Edit link" aria-label="Edit ${escapeHtml(link.name)}">&#9998;</button>
      <span class="link-icon">${escapeHtml(link.icon || '🔗')}</span>
      <span class="link-label">${escapeHtml(link.name)}</span>
      <button class="link-delete-btn" title="Remove link" aria-label="Remove ${escapeHtml(link.name)}">&#10005;</button>
    `;

    // Open link on main area click (not on buttons)
    item.addEventListener('click', (e) => {
      if (e.target.closest('.link-delete-btn') || e.target.closest('.link-edit-btn')) return;
      window.open(link.url, '_blank', 'noopener,noreferrer');
    });

    item.querySelector('.link-delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteLink(link.id);
    });

    item.querySelector('.link-edit-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      openLinkModal(link.id);
    });

    grid.appendChild(item);
  });
}

function deleteLink(id) {
  links = links.filter((l) => l.id !== id);
  saveLinks();
  renderLinks();
}

/* ── Link Modal ── */
function openLinkModal(id = null) {
  editingLinkId = id;
  if (id) {
    const link = links.find((l) => l.id === id);
    if (!link) return;
    $('link-modal-title').textContent   = 'Edit Quick Link';
    $('link-name-input').value          = link.name;
    $('link-url-input').value           = link.url;
    $('link-icon-input').value          = link.icon;
  } else {
    $('link-modal-title').textContent   = 'Add Quick Link';
    $('link-name-input').value          = '';
    $('link-url-input').value           = '';
    $('link-icon-input').value          = '';
  }
  $('link-modal').classList.remove('hidden');
  $('link-name-input').focus();
}

function closeLinkModal() {
  $('link-modal').classList.add('hidden');
  editingLinkId = null;
}

function saveLink() {
  const name = $('link-name-input').value.trim();
  let   url  = $('link-url-input').value.trim();
  const icon = $('link-icon-input').value.trim() || '🔗';

  if (!name || !url) {
    // Highlight empty fields
    if (!name) $('link-name-input').style.borderColor = 'var(--danger)';
    if (!url)  $('link-url-input').style.borderColor  = 'var(--danger)';
    setTimeout(() => {
      $('link-name-input').style.borderColor = '';
      $('link-url-input').style.borderColor  = '';
    }, 1500);
    return;
  }

  // Auto-prepend https if missing
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

  if (editingLinkId) {
    const link = links.find((l) => l.id === editingLinkId);
    if (link) { link.name = name; link.url = url; link.icon = icon; }
  } else {
    links.push({ id: uid(), name, url, icon });
  }

  saveLinks();
  renderLinks();
  closeLinkModal();
}

$('add-link-btn').addEventListener('click', () => openLinkModal());
$('link-save').addEventListener('click', saveLink);
$('link-cancel').addEventListener('click', closeLinkModal);
$('link-modal').addEventListener('click', (e) => { if (e.target === $('link-modal')) closeLinkModal(); });

// Allow Enter to save in link modal
[$('link-name-input'), $('link-url-input'), $('link-icon-input')].forEach((el) => {
  el.addEventListener('keydown', (e) => { if (e.key === 'Enter') saveLink(); });
});

renderLinks();

/* ═══════════════════════════════════════════════════════════════
   8. KEYBOARD SHORTCUTS
═══════════════════════════════════════════════════════════════ */

document.addEventListener('keydown', (e) => {
  // Escape closes any open modal
  if (e.key === 'Escape') {
    closeNameModal();
    closeLinkModal();
    closeEditModal();
  }

  // Space bar = start/stop timer (only when not focused on an input)
  if (e.key === ' ' && document.activeElement.tagName !== 'INPUT' &&
      document.activeElement.tagName !== 'TEXTAREA' &&
      document.activeElement.tagName !== 'SELECT') {
    e.preventDefault();
    timerRunning ? stopTimer() : startTimer();
  }
});

/* ═══════════════════════════════════════════════════════════════
   9. SECURITY HELPER
═══════════════════════════════════════════════════════════════ */

/** Escape HTML to prevent XSS when injecting user-supplied strings */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
