/**
 * MCQ Renderer with Auto Evaluation
 * Displays multiple choice buttons and auto-checks selected answer
 * Used by: mixlingo.js, solo.js, wordsafari.js
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-28 03:55 | File: scripts/utils/mcqAutoCheck.js
 */

export function renderMCQAutoCheck(containerId, correctAnswer, options, onResult, vertical = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  const wrapper = document.createElement('div');
  wrapper.className = `mcq-wrapper${vertical ? ' vertical' : ''}`;

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'mcq-option';
    btn.textContent = opt;

    btn.addEventListener('click', () => {
      const isCorrect = opt === correctAnswer;
      btn.classList.add(isCorrect ? 'correct' : 'wrong');

      [...wrapper.children].forEach(b => {
        if (b !== btn) b.disabled = true;
      });

      setTimeout(() => {
        onResult(isCorrect);
      }, 600);
    });

    wrapper.appendChild(btn);
  });

  container.appendChild(wrapper);
}
