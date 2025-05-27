/**
 * MixLingo Mode – Normal UI
 * Builds a mixed-language sentence with foreign word immersion
 * Called by main.js when MixLingo + Normal UI is selected
 * Uses DOM from index.html; supports manual tile selection
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-27 19:50 | File: scripts/lingoquest/mixlingo.js
 */

export function initMixLingoMode() {
  const clueElement = document.getElementById('sentenceClue');
  const builderArea = document.getElementById('sentenceBuilderArea');
  const submitButton = document.getElementById('submitSentence');

  const sentenceData = {
    clue: "Build this sentence using a mix of English and French:",
    words: ["I", "want", "to", "manger", "an", "apple"],
    correctOrder: [0, 1, 2, 3, 4, 5],
    foreignWord: "manger", // French for "to eat"
    language: "fr"
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
  const correct = sentenceData.correctOrder.map(i => sentenceData.words[i]);
  const isCorrect = selected.join(' ') === correct.join(' ');

  const result = document.getElementById('resultSummary');
  result.hidden = false;

  if (isCorrect) {
    result.textContent = `Perfect! "${sentenceData.foreignWord}" means "to eat" in ${sentenceData.language}. +10 XP`;
  } else {
    result.textContent = `Incorrect. Try again. Hint: "${sentenceData.foreignWord}" is the key.`;
  }
}
