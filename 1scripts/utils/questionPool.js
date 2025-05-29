
/**
 * Question Pool Utility
 * Loads, shuffles, and tracks answered questions across game modes
 * Used in: mixlingo.js, solo.js, wordrelic.js, etc.
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-28 04:10 | File: scripts/utils/questionPool.js
 */

let pool = [];
let answeredIds = new Set();

export function loadQuestionPool(data = [], shuffle = true) {
  pool = shuffle ? shuffleArray(data.slice()) : data.slice();
  answeredIds = new Set();
}

export function getNextQuestion() {
  return pool.find(q => !answeredIds.has(q.id || JSON.stringify(q)));
}

export function markAnswered(q) {
  const id = q.id || JSON.stringify(q);
  answeredIds.add(id);
}

export function resetPool() {
  pool = [];
  answeredIds.clear();
}

export function getRemainingCount() {
  return pool.filter(q => !answeredIds.has(q.id || JSON.stringify(q))).length;
}

// Fisher-Yates Shuffle
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
