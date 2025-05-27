
/**
 * MixLingo – ASCII UI
 * Renders mixed-language sentence with MCQ using asciiRenderer module
 * Called by main.js when ?mode=mixlingo&ui=ascii
 * Uses: utils/asciiRenderer.js
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-27 20:00 | File: scripts/ascii/lingoquest/mixlingo.js
 */

import {
  renderHeader,
  renderClueBlock,
  renderMCQOptions,
  renderResult,
  renderFooterHUD,
  printAscii
} from '../../utils/asciiRenderer.js';

export function initMixLingoAscii() {
  const clue = "Complete the sentence with the correct foreign word:";
  const sentence = '"I want to ___ an apple."';
  const options = ["manger", "dormir", "parler"];
  const correctAnswer = "manger";
  let selected = null;

  // Unhide ASCII panel
  const out = document.getElementById('asciiOutput');
  out.hidden = false;

  // Initial Render
  render();

  // Global listener for key selection (1, 2, 3)
  document.addEventListener('keydown', onKey);

  function onKey(e) {
    if (e.key >= '1' && e.key <= String(options.length)) {
      selected = options[parseInt(e.key) - 1];
      render();
    } else if (e.key === 'Enter' && selected) {
      const resultMsg = selected === correctAnswer
        ? `Correct! “${correctAnswer}” means “to eat” in French.`
        : `Incorrect. Hint: “${correctAnswer}” means “to eat.”`;

      printAscii(
        renderHeader("LingoQuest"),
        renderClueBlock("MixLingo (ASCII)", [clue, sentence]),
        renderMCQOptions(options, options.indexOf(selected)),
        renderResult(resultMsg),
        renderFooterHUD(40, "4 Days", "1.0.1")
      );

      document.removeEventListener('keydown', onKey); // prevent re-submit
    }
  }

  function render() {
    printAscii(
      renderHeader("LingoQuest"),
      renderClueBlock("MixLingo (ASCII)", [clue, sentence]),
      renderMCQOptions(options, selected ? options.indexOf(selected) : null),
      renderFooterHUD(40, "4 Days", "1.0.1")
    );
  }
}
