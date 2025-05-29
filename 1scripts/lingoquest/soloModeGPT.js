
// MIT License | LingoQuest | soloMode.js | Created: 2025-05-27

import { generateMCQ } from '../utils/mcqEngine.js';

/**
 * Solo Mode Entry Point
 * Shows a sentence clue with per-word MCQs (Easy/Medium/Hard)
 */

export function initSoloMode(difficulty = 'easy') {
  const clueElement = document.getElementById('sentenceClue');
  const builderArea = document.getElementById('sentenceBuilderArea');
  const submitButton = document.getElementById('submitSentence');

  const sentenceData = {
    clue: "Translate: 'I want to eat an apple.'",
    words: ["Je", "veux", "manger", "une", "pomme"],
    correctOrder: [0, 1, 2, 3, 4]
  };

  clueElement.textContent = sentenceData.clue;

  // Render MCQ interface per word slot
  renderMCQBuilder(sentenceData, builderArea, difficulty);

  submitButton.addEventListener('click', () => {
    const selectedWords = Array.from(
      builderArea.querySelectorAll('.mcq-option.selected')
    ).map(el => el.textContent);

    validateSentence(selectedWords, sentenceData);
  });
}

// Render MCQs for each word in sentence (based on correct order)
function renderMCQBuilder(sentenceData, container, level) {
  container.innerHTML = '';

  sentenceData.correctOrder.forEach(index => {
    const correctWord = sentenceData.words[index];
    const mcqOptions = generateMCQ(correctWord, level);

    const wrapper = document.createElement('div');
    wrapper.className = 'mcq-wrapper';

    mcqOptions.forEach(option => {
      const btn = document.createElement('button');
      btn.textContent = option;
      btn.className = 'mcq-option';
      btn.addEventListener('click', () => {
        wrapper.querySelectorAll('.mcq-option').forEach(opt =>
          opt.classList.remove('selected')
        );
        btn.classList.add('selected');
      });
      wrapper.appendChild(btn);
    });

    container.appendChild(wrapper);
  });
}

function validateSentence(selected, sentenceData) {
  const correctWords = sentenceData.correctOrder.map(i => sentenceData.words[i]);
  const isCorrect = selected.join(' ') === correctWords.join(' ');

  const result = document.getElementById('resultSummary');
  result.hidden = false;
  result.textContent = isCorrect
    ? 'Correct! +10 XP'
    : 'Oops! Try again.';
}
