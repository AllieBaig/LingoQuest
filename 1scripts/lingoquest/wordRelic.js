
/**
 * Word Relic – Normal UI
 * Solve 4 category-based MCQ riddles to unlock an emoji relic reward
 * Matches Minimal UI, supports daily streaks and difficulty logic
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-28 00:20 | File: scripts/lingoquest/wordRelic.js
 */

import { generateMCQ } from '../utils/mcqEngine.js';

export function initWordRelicMode(level = 'easy') {
  const clueEl = document.getElementById('sentenceClue');
  const builder = document.getElementById('sentenceBuilderArea');
  const result = document.getElementById('resultSummary');
  const submitBtn = document.getElementById('submitSentence');

  const categories = ['Name', 'Place', 'Animal', 'Thing'];
  const relic = '🏺';
  const clues = [
    { clue: "This is a common girl's name in many cultures.", answer: "Sofia" },
    { clue: "Capital city known for its Eiffel tower.", answer: "Paris" },
    { clue: "Large striped jungle predator.", answer: "Tiger" },
    { clue: "Object used to tell time on your wrist.", answer: "Watch" }
  ];

  let current = 0;
  let correctCount = 0;

  clueEl.textContent = '';
  result.hidden = true;

  renderStep();

  submitBtn.onclick = () => {
    const selected = builder.querySelector('.mcq-option.selected')?.textContent;
    result.hidden = false;

    if (!selected) {
      result.textContent = "Please choose an answer.";
      return;
    }

    const expected = clues[current].answer;
    const isCorrect = selected === expected;

    if (isCorrect) {
      correctCount++;
      result.textContent = `Correct! (${categories[current]})`;
    } else {
      result.textContent = `Incorrect. It was: ${expected}`;
    }

    current++;
    if (current < clues.length) {
      setTimeout(() => {
        result.hidden = true;
        renderStep();
      }, 1200);
    } else {
      renderRelic();
    }
  };

  function renderStep() {
    clueEl.textContent = `${categories[current]} Clue: ${clues[current].clue}`;
    builder.innerHTML = '';

    const options = generateMCQ(clues[current].answer, level);
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

  function renderRelic() {
    builder.innerHTML = `<div class="relic-unlocked" style="text-align:center;font-size:2rem;">${relic}</div>`;
    clueEl.textContent = correctCount === 4
      ? `You unlocked the Relic! (${relic}) +20 XP`
      : `You found part of the relic! (${relic}) +${correctCount * 5} XP`;
  }
}
