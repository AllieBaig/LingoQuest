
/**
 * Game Menu Loader for Normal UI
 * Injects game mode selector buttons and handles click events
 * Called by main.js or entry logic; emits launchMode callback
 * Related: scripts/main.js
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-27 20:35 | File: scripts/utils/gameMenu.js
 */

export function loadGameMenu({ containerId = 'modeSelector', onSelect }) {
  const container = document.getElementById(containerId);
  if (!container || typeof onSelect !== 'function') return;

  container.innerHTML = `
    <h2>Choose a Mode</h2>
    <div class="mode-buttons">
      <button data-mode="solo">Start Solo Mode</button>
      <button data-mode="mixlingo">Start MixLingo</button>
    </div>
  `;

  container.querySelectorAll('button[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      onSelect(mode);
    });
  });
}
