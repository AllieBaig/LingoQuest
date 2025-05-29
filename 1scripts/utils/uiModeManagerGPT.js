/**
 * UI Mode Manager for LingoQuest
 * Handles minimal UI, optional minimal-only mode, and dark mode persistence
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-27 23:55 | File: scripts/utils/uiModeManager.js
 */

const STYLE_IDS = {
  main: 'main-css',
  lingoquest: 'lingoquest-css',
  minimal: 'minimal-ui-style'
};

export function applyMinimalUI(uiMode) {
  const minimalOnly = localStorage.getItem('minimalOnly') === 'true';

  if (uiMode === 'normal') {
    if (minimalOnly) {
      loadCSS('styles/minimal-ui.css', STYLE_IDS.minimal);
      removeCSS(STYLE_IDS.main);
      removeCSS(STYLE_IDS.lingoquest);
    } else {
      loadCSS('styles/main.css', STYLE_IDS.main);
      loadCSS('styles/lingoquest.css', STYLE_IDS.lingoquest);
      loadCSS('styles/minimal-ui.css', STYLE_IDS.minimal);
    }

    document.body.classList.add('minimal-ui');

    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark');
    }
  } else {
    document.body.classList.remove('minimal-ui', 'dark');
    removeCSS(STYLE_IDS.main);
    removeCSS(STYLE_IDS.lingoquest);
    removeCSS(STYLE_IDS.minimal);
  }
}

export function toggleDarkMode(force = null) {
  const isDark = document.body.classList.contains('dark');
  const next = force !== null ? force : !isDark;

  document.body.classList.toggle('dark', next);
  localStorage.setItem('darkMode', next.toString());
}

export function toggleMinimalOnly(force = null) {
  const current = localStorage.getItem('minimalOnly') === 'true';
  const next = force !== null ? force : !current;

  localStorage.setItem('minimalOnly', next.toString());
  window.location.reload(); // reload to reapply CSS
}

// Helpers
function loadCSS(href, id) {
  if (!document.getElementById(id)) {
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
}

function removeCSS(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}
