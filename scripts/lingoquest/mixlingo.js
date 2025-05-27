/**
 * MixLingo Game Mode (Normal UI)
 * Loads a random language file and presents multilingual MCQ challenge
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-28 02:15 | File: scripts/lingoquest/mixlingo.js
 */

import { renderMCQAutoCheck } from '../utils/mcqAutoCheck.js';
import { loadQuestionPool, getNextQuestion, markAnswered } from '../utils/questionPool.js';
import { awardXP } from '../utils/xpTracker.js';

const langFiles = [
  'lang/mixlingo-fr.json',
  'lang/mixlingo-es.json',
  'lang/mixlingo-de.json',
  'lang/mixlingo-it.json'
];

export async function initMixLingoMode() {
  const file = langFiles[Math.floor(Math.random() * langFiles.length)];
  const data = await fetch(file).then(res => res.json());

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
