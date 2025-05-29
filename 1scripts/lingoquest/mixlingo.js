// File: scripts/lingoquest/mixlingo.js
// Purpose: MixLingo mode handler for LingoQuest
// MIT License — https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
// Timestamp: 2025-05-27 21:42 | File: scripts/lingoquest/mixlingo.js

import { hideMenu } from '../utils/menuVisibility.js';
import { addXP } from '../utils/xpTracker.js';
import { updateStreak } from '../utils/streak.js';
import { getDailyPrompt } from '../utils/dailyPrompt.js';

export function init({ showMenu }) {
  hideMenu();
  const game = document.getElementById('game');
  if (!game) return;

  const { word, language, meaning, tip } = getDailyPrompt('mixlingo');

  game.innerHTML = `
    <section class="game-mode">
      <h2>🌍 MixLingo Challenge (${language || 'Language'})</h2>
      <p><strong>Word:</strong> <span class="word">${word}</span></p>
      <p><strong>Meaning:</strong> ${meaning || 'N/A'}</p>
      <p><em>Tip:</em> ${tip || 'N/A'}</p>
      <textarea id="sentenceInput" placeholder="Use the word in a sentence..."></textarea>
      <div class="btn-row">
        <button id="submitBtn">Submit</button>
        <button id="hintBtn">Hint</button>
        <button class="back-btn">⬅️ Back</button>
      </div>
      <div id="feedback" class="feedback"></div>
    </section>
  `;

  document.querySelector('.back-btn')?.addEventListener('click', showMenu);

  document.getElementById('submitBtn')?.addEventListener('click', () => {
    const input = document.getElementById('sentenceInput').value.trim();
    const feedback = document.getElementById('feedback');
    if (!input) return (feedback.textContent = '❌ Please write something.');
    if (!input.toLowerCase().includes(word.toLowerCase()))
      return (feedback.innerHTML = `❌ Your sentence must include "<strong>${word}</strong>".`);

    feedback.innerHTML = `✅ Nice! Sentence accepted. +10 XP`;
    addXP(10, 'MixLingo Sentence', 'mixlingo');
    updateStreak();
  });

  document.getElementById('hintBtn')?.addEventListener('click', () => {
    alert(`Hint: Try using "${word}" in a sentence about travel, feelings, or food.`);
  });
}

export default { init };
