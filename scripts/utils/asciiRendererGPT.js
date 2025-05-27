
/**
 * ASCII Renderer Utility
 * Renders consistent ASCII blocks for all UI modes in fallback/terminal views
 * Imported by ASCII-compatible game modes or debug views
 * No external dependencies; updates content via #asciiOutput
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-27 20:05 | File: scripts/utils/asciiRenderer.js
 */

export function renderHeader(title = "LingoQuest") {
  return [
    "╔══════════════════════════════════════════════════════╗",
    `║                  ${title.padEnd(45)}║`,
    "║  [🌐] Language      [▼] UI: Normal / ASCII           ║",
    "╚══════════════════════════════════════════════════════╝"
  ].join('\n');
}

export function renderClueBlock(modeLabel, clueLines) {
  const lines = [
    "╔══════════════════════════════════════════════════════╗",
    `║ ${modeLabel.padEnd(52)}║`,
    ...clueLines.map(line => `║ ${line.padEnd(52)}║`),
    "╚══════════════════════════════════════════════════════╝"
  ];
  return lines.join('\n');
}

export function renderMCQOptions(options, selectedIndex = null) {
  const parts = options.map((opt, i) => {
    const prefix = selectedIndex === i ? '[✔]' : `[${i + 1}]`;
    return `${prefix} ${opt}`;
  });
  return [
    "╔══════════════════════════════════════════════════════╗",
    `║ ${parts.join('   ').padEnd(52)}║`,
    "╚══════════════════════════════════════════════════════╝"
  ].join('\n');
}

export function renderWordTiles(words, selectedIndices = []) {
  const tiles = words.map((word, i) => {
    const selected = selectedIndices.includes(i);
    return selected ? `[ ${word}* ]` : `[ ${word} ]`;
  });
  return [
    "╔══════════════════════════════════════════════════════╗",
    `║ ${tiles.join(' ').padEnd(52)}║`,
    "╚══════════════════════════════════════════════════════╝"
  ].join('\n');
}

export function renderResult(message) {
  return [
    "════════════════════════════════════════════════════════",
    `[✓] Result: ${message}`,
    "════════════════════════════════════════════════════════"
  ].join('\n');
}

export function renderFooterHUD(xp, streak, version) {
  return `XP: ${xp} pts     |     Streak: ${streak}     |     Version: ${version}`;
}

/**
 * Renders all assembled blocks into #asciiOutput
 * @param  {...string} blocks - ASCII string blocks
 */
export function printAscii(...blocks) {
  const output = document.getElementById('asciiOutput');
  if (output) {
    output.hidden = false;
    output.textContent = blocks.join('\n\n');
  } else {
    console.warn('[asciiRenderer] #asciiOutput not found.');
  }
}
