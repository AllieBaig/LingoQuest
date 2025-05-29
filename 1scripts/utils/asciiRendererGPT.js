/**
 * ASCII Renderer Utility (Touch-Friendly)
 * Renders consistent, mobile-responsive ASCII blocks with optional touch actions
 * Works with normal UI width constraints and <pre> container
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-27 20:30 | File: scripts/utils/asciiRenderer.js
 */

export function renderHeader(title = "LingoQuest") {
  return box([
    `                  ${title}                   `,
    `[🌐] Language     [▼] UI: Normal / ASCII     `
  ]);
}

export function renderClueBlock(modeLabel, lines) {
  return box([
    `${modeLabel}`,
    ...lines
  ]);
}

export function renderMCQOptions(options, selectedIndex = null) {
  const line = options
    .map((opt, i) => {
      const mark = (i === selectedIndex) ? '[✔]' : `[${i + 1}]`;
      return `${mark} ${opt}`;
    })
    .join('   ');

  return box([line]);
}

export function renderResult(msg) {
  return [
    '══════════════════════════════════════════════════════',
    `[✓] Result: ${msg}`,
    '══════════════════════════════════════════════════════'
  ].join('\n');
}

export function renderFooterHUD(xp, streak, version) {
  return `XP: ${xp} pts  |  Streak: ${streak}  |  Version: ${version}`;
}

export function printAscii(...blocks) {
  const out = document.getElementById('asciiOutput');
  if (out) {
    out.hidden = false;
    out.textContent = blocks.join('\n\n');
  }
}

// Internal: simple ASCII box
function box(lines) {
  const width = 54;
  const top = '╔' + '═'.repeat(width) + '╗';
  const bottom = '╚' + '═'.repeat(width) + '╝';
  const padded = lines.map(line => {
    return '║ ' + line.padEnd(width - 2) + ' ║';
  });
  return [top, ...padded, bottom].join('\n');
}
