
/**
 * Solo Mode – Normal UI (French)
 * Displays sentence clue and allows manual selection (no MCQ)
 * Called by main.js or gameNavigation.js when Normal UI + French selected
 * Uses DOM elements from index.html, local French word set
 * UI-linked, language-aware, fallback supported
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-27 17:20 | File: scripts/lingoquest/solo/fr.js
 */

export function initSoloModeFR() {
  const clueElement = document.getElementById('sentenceClue');
  const builderArea = document.getElementById('sentenceBuilderArea');
  const submitButton = document.getElementById('submitSentence');

  const sentenceData = {
    clue: "Traduisez : « Je veux manger une pomme. »",
    words: ["Je", "veux", "manger", "une", "pomme"],
    correctOrder: [0, 1, 2, 3, 4]
  };

  clueElement.textContent = sentenceData.clue;

  renderWordTiles(sentenceData.words, builderArea);

  submitButton.addEventListener('click', () => {
    const selectedWords = Array.from(
      builderArea.querySelectorAll('.word-tile.selected')
    ).map(el => el.textContent);

    validateSentence(selectedWords, sentenceData);
  });
}

function renderWordTiles(words, container) {
  container.innerHTML = '';
  words.forEach((word, index) => {
    const tile = document.createElement('div');
    tile.textContent = word;
    tile.className = 'word-tile';
    tile.dataset.index = index;
    tile.addEventListener('click', () => {
      tile.classList.toggle('selected');
    });
    container.appendChild(tile);
  });
}

function validateSentence(selected, sentenceData) {
  const correctWords = sentenceData.correctOrder.map(i => sentenceData.words[i]);
  const isCorrect = selected.join(' ') === correctWords.join(' ');

  const result = document.getElementById('resultSummary');
  result.hidden = false;
  result.textContent = isCorrect
    ? 'Correct! +10 XP'
    : 'Oops! Essayez encore.';
}
