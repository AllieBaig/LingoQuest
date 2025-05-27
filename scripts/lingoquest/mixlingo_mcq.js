
/**
 * MixLingo – Normal UI with MCQ
 * Shows an English sentence with one missing word (foreign-language MCQ)
 * Called by main.js when MixLingo is launched in normal UI
 * Uses: utils/mcqEngine.js for distractor generation
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-27 20:45 | File: scripts/lingoquest/mixlingo_mcq.js
 */

import { generateMCQ } from '../utils/mcqEngine.js';

export function initMixLingoMCQ(level = 'easy', lang = 'fr') {
  const clueEl = document.getElementById('sentenceClue');
  const builderArea = document.getElementById('sentenceBuilderArea');
  const resultEl = document.getElementById('resultSummary');
  const submitBtn = document.getElementById('submitSentence');

  const sentenceData = {
    clue: "Which foreign word best completes the sentence?",
    sentenceTemplate: ["We", "___", "you."],
    correctWord: "aimons", // French for "love"
    distractorLevel: level,
    fact: "‘Aimons’ is the French verb for ‘love’ (1st person plural)."
  };

  // Initialize
  clueEl.textContent = sentenceData.clue;
  builderArea.innerHTML = '';

  const sentenceP = document.createElement('p');
  sentenceP.innerHTML = sentenceData.sentenceTemplate
    .map(word => (word === "___" ? "<strong>[ ? ]</strong>" : word))
    .join(' ');
  builderArea.appendChild(sentenceP);

  const options = generateMCQ(sentenceData.correctWord, sentenceData.distractorLevel);
  const optionGroup = document.createElement('div');
  optionGroup.className = 'mcq-wrapper';

  options.forEach(word => {
    const btn = document.createElement('button');
    btn.className = 'mcq-option';
    btn.textContent = word;
    btn.addEventListener('click', () => {
      optionGroup.querySelectorAll('.mcq-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
    optionGroup.appendChild(btn);
  });

  builderArea.appendChild(optionGroup);
  resultEl.hidden = true;

  submitBtn.onclick = () => {
    const selected = builderArea.querySelector('.mcq-option.selected')?.textContent;
    resultEl.hidden = false;

    if (!selected) {
      resultEl.textContent = "Please select an answer.";
      return;
    }

    if (selected === sentenceData.correctWord) {
      resultEl.textContent = `Correct! ${sentenceData.fact} +10 XP`;
    } else {
      resultEl.textContent = `Incorrect. ${sentenceData.fact}`;
    }
  };
}
