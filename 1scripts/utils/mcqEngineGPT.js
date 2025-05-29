
// MIT License | LingoQuest | mcqEngine.js | Created: 2025-05-27

/**
 * MCQ Engine
 * Generates multiple choice options for a given correct answer
 * Supports Easy, Medium, Hard levels
 */

const distractorBank = {
  easy: ['banana', 'table', 'run', 'blue', 'cat'],
  medium: ['manger', 'jouer', 'chanter', 'dormir'],
  hard: ['voudrais', 'pourrais', 'devrais', 'aurais']
};

export function generateMCQ(correct, level = 'easy') {
  const options = new Set();
  options.add(correct);

  const pool = distractorBank[level] || distractorBank.easy;

  while (options.size < (level === 'hard' ? 4 : 3)) {
    const word = pool[Math.floor(Math.random() * pool.length)];
    options.add(word);
  }

  // Shuffle options
  return Array.from(options).sort(() => Math.random() - 0.5);
}
