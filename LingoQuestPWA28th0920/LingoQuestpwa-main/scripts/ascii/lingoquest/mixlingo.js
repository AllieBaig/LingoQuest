/**
 * ASCII MixLingo — Modular + Classic ASCII Feel
 * Replaces a blank in an English sentence with foreign MCQ options.
 * Uses: shared asciiRenderer with expressive ASCII status formatting
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-28 20:20 | File: scripts/ascii/lingoquest/mixlingo.js
 */

import { loadQuestionsForMode } from '../../utils/questionPool.js';
import { renderClue, renderMCQ, renderSummary } from '../../utils/asciiRenderer.js';
import { awardXP } from '../../utils/xpTracker.js';

export async function initAsciiMixLingo(lang = 'fr') {
  const questions = await loadQuestionsForMode('mixlingo', lang);
  let index = 0;

  function formatSentence(q) {
    return q.sentence.replace(q.blank, '____');
  }

  function next() {
    if (index >= questions.length) {
      renderSummary('[✔] You’ve completed all MixLingo challenges!');
      return;
    }

    const q = questions[index];
    const lineTop = `╭────[ Sentence ${index + 1} ]`;
    const lineBody = `│ ${formatSentence(q)}`;
    const lineBottom = '╰─────────────────────────────';
    renderClue(`${lineTop}\n${lineBody}\n${lineBottom}`);

    renderMCQ(q.options, q.answer, (correct) => {
      if (correct) {
        renderSummary('[+] Bravo! You earned 10 XP!');
        awardXP(10);
      } else {
        renderSummary('[-] Oops! Wrong word.');
      }
      index++;
      setTimeout(() => {
        renderSummary('');
        next();
      }, 1400);
    });
  }

  next();
}
