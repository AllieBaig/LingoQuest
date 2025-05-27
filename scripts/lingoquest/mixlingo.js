/**
 * MixLingo Mode (Normal UI - FR only)
 * Shows English sentences with blanks and French MCQ answers
 * Depends on: lang/mixlingo-fr.json, utils/mcqAutoCheck.js, xpTracker.js
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-28 00:20 | File: scripts/lingoquest/mixlingo.js
 */

import { renderMCQAutoCheck } from '../utils/mcqAutoCheck.js';
import { loadQuestionPool, getNextQuestion, markAnswered } from '../utils/questionPool.js';
import { awardXP } from '../utils/xpTracker.js';

export async function initMixLingoMode() {
  const data = await fetch('lang/mixlingo-fr.json').then(res => res.json());

  loadQuestionPool(data, true);
  nextQuestion();
}

function nextQuestion() {
  const q = getNextQuestion();
  if (!q) return showCompletion();

  document.getElementById('sentenceClue').textContent = q.sentence;

  renderMCQAutoCheck(
    'sentenceBuilderArea',
    q.answer,
    q.options,
    (correct) => {
      markAnswered(q);
      if (correct) awardXP(15);
      nextQuestion();
    }
  );
}

function showCompletion() {
  const result = document.getElementById('resultSummary');
  result.textContent = 'MixLingo complete! Well done!';
  result.hidden = false;
}

