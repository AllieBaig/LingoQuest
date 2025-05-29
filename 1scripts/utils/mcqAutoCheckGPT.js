
/**
 * Shared MCQ Auto-Check Utility for LingoQuest
 * Instantly evaluates selected answer and proceeds without Submit button
 * Used by: solo.js, mixlingo.js, wordSafari.js, etc.
 * Requires: nextQuestion() function in caller context
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-28 01:10 | File: scripts/utils/mcqAutoCheck.js
 */

export function renderMCQAutoCheck(targetId, correctAnswer, options = [], nextCallback = null) {
  const container = document.getElementById(targetId);
  if (!container) return;

  container.innerHTML = '';

  const group = document.createElement('div');
  group.className = 'mcq-wrapper';

  options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'mcq-option';
    btn.textContent = option;

    btn.addEventListener('click', () => {
      // Disable all buttons
      group.querySelectorAll('.mcq-option').forEach(b => {
        b.disabled = true;
        b.classList.remove('selected');
      });

      const isCorrect = option === correctAnswer;
      btn.classList.add('selected');
      btn.classList.add(isCorrect ? 'correct' : 'incorrect');

      const result = document.getElementById('resultSummary');
      if (result) {
        result.hidden = false;
        result.textContent = isCorrect
          ? `Correct! (${correctAnswer})`
          : `Wrong — Answer: ${correctAnswer}`;
      }

      setTimeout(() => {
        if (result) result.hidden = true;
        if (typeof nextCallback === 'function') nextCallback(isCorrect);
      }, 1200);
    });

    group.appendChild(btn);
  });

  container.appendChild(group);
}
