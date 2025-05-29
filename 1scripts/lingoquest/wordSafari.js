
/**
 * Word Safari – Normal UI/
 * Players explore themed categories and answer MCQs to progress
 * Uses shuffled word sets, tracks score, and unlocks safari badges
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-28 00:30 | File: scripts/lingoquest/wordSafari.js
 */

import { generateMCQ } from '../utils/mcqEngine.js';

export function initWordSafariMode(level = 'easy', lang = 'en') {
  const clueEl = document.getElementById('sentenceClue');
  const builder = document.getElementById('sentenceBuilderArea');
  const result = document.getElementById('resultSummary');
  const submitBtn = document.getElementById('submitSentence');

  const safariWords = [
    { category: 'Animals', sentence: ['The', '___', 'roars loudly.'], answer: 'lion' },
    { category: 'Food', sentence: ['I', 'love', 'spicy', '___', '.'], answer: 'tacos' },
    { category: 'Travel', sentence: ['We', 'booked', 'a', 'flight', 'to', '___', '.'], answer: 'Tokyo' },
    { category: 'Nature', sentence: ['The', '___', 'blooms in spring.'], answer: 'flower' }
  ];

  let currentIndex = 0;
  let correctCount = 0;

  result.hidden = true;
  clueEl.textContent = '';
  builder.innerHTML = '';

  renderStep();

  submitBtn.onclick = () => {
    const selected = builder.querySelector('.mcq-option.selected')?.textContent;
    result.hidden = false;

    const expected = safariWords[currentIndex].answer;
    const isCorrect = selected === expected;

    if (!selected) {
      result.textContent = "Please select an option.";
      return;
    }

    if (isCorrect) {
      correctCount++;
      result.textContent = `Correct! (${expected})`;
    } else {
      result.textContent = `Incorrect. The answer was: ${expected}`;
    }

    currentIndex++;

    if (currentIndex < safariWords.length) {
      setTimeout(() => {
        result.hidden = true;
        renderStep();
      }, 1200);
    } else {
      renderSummary();
    }
  };

  function renderStep() {
    const word = safariWords[currentIndex];
    clueEl.textContent = `Category: ${word.category}`;

    builder.innerHTML = '';
    const sentenceP = document.createElement('p');
    sentenceP.innerHTML = word.sentence
      .map(w => (w === word.answer ? "<strong>[ ? ]</strong>" : w))
      .join(' ');
    builder.appendChild(sentenceP);

    const options = generateMCQ(word.answer, level, lang);
    const group = document.createElement('div');
    group.className = 'mcq-wrapper';

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'mcq-option';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        group.querySelectorAll('.mcq-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
      group.appendChild(btn);
    });

    builder.appendChild(group);
  }

  function renderSummary() {
    builder.innerHTML = `<div class="relic-unlocked" style="text-align:center;font-size:2rem;">🦁</div>`;
    clueEl.textContent = `Safari Complete! You got ${correctCount}/${safariWords.length} correct.`;
  }
}
