/**
 * Solo Mode – ASCII UI
 * Lets user select correct sentence order from shuffled words
 * Called by main.js when ?mode=solo&ui=ascii
 * Uses: asciiRenderer.js for layout and display
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-27 20:40 | File: scripts/ascii/lingoquest/solo.js
 */

import {
  renderHeader, renderClueBlock, renderWordTiles,
  renderResult, renderFooterHUD, printAscii
} from '../../utils/asciiRenderer.js';

export function initSoloMode(difficulty = 'easy') {
  const sentenceData = {
    clue: "Rebuild this sentence in correct order:",
    words: ["Je", "veux", "manger", "une", "pomme"],
    correctOrder: [0, 1, 2, 3, 4]
  };

  const asciiOut = document.getElementById('asciiOutput');
  asciiOut.hidden = false;

  let selectedIndices = [];

  render();

  asciiOut.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    if (index !== undefined) {
      toggleSelect(parseInt(index));
      render();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= String(sentenceData.words.length)) {
      const idx = parseInt(e.key) - 1;
      toggleSelect(idx);
      render();
    }
    if (e.key === 'Enter') {
      checkAnswer();
    }
  });

  function toggleSelect(index) {
    if (selectedIndices.includes(index)) {
      selectedIndices = selectedIndices.filter(i => i !== index);
    } else {
      selectedIndices.push(index);
    }
  }

  function checkAnswer() {
    const correctWords = sentenceData.correctOrder.map(i => sentenceData.words[i]);
    const selectedWords = selectedIndices.map(i => sentenceData.words[i]);
    const isCorrect = selectedWords.join(' ') === correctWords.join(' ');

    printAscii(
      renderHeader(),
      renderClueBlock("Solo Mode (ASCII)", [sentenceData.clue]),
      renderWordTiles(sentenceData.words, selectedIndices),
      renderResult(isCorrect ? "Correct! +10 XP" : "Incorrect. Try again."),
      renderFooterHUD(50, "2 Days", "1.0.0")
    );
  }

  function render() {
    printAscii(
      renderHeader(),
      renderClueBlock("Solo Mode (ASCII)", [sentenceData.clue]),
      renderWordTiles(sentenceData.words, selectedIndices),
      renderFooterHUD(50, "2 Days", "1.0.0")
    );

    makeWordsTouchable(sentenceData.words);
  }

  function makeWordsTouchable(words) {
    const lines = asciiOut.textContent.split('\n');
    const tileLineIndex = lines.findIndex(l => l.includes('[') && l.includes(']') && l.includes(words[0]));

    if (tileLineIndex === -1) return;

    asciiOut.innerHTML = lines.map((line, i) => {
      if (i !== tileLineIndex) return line;
      return words.map((word, idx) => {
        const isSelected = selectedIndices.includes(idx);
        const mark = isSelected ? `*` : '';
        return `<span data-index="${idx}">[ ${word}${mark} ]</span>`;
      }).join(' ');
    }).join('<br>');
  }
}
