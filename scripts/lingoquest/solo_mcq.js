
/**
 * Solo Mode – Normal UI with MCQ
 * Presents a sentence with one missing word and multiple choices
 * Called by main.js when Solo mode is launched in MCQ mode
 * Uses: utils/mcqEngine.js for difficulty-aware distractors
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-27 20:50 | File: scripts/lingoquest/solo_mcq.js
 */

import { generateMCQ } from '../utils/mcqEngine.js';

export function initSoloMCQ(level = 'easy', lang = 'en') {
  const clueEl = document.getElementById('sentenceClue');
  const builderArea = document.getElementById('sentenceBuilderArea');
  const resultEl = document.getElementById('resultSummary');
  const submitBtn = document.getElementById('submitSentence');

  const sentenceData = {
    clue: "Fill in the blank: I ___ to school every day.",
    sentenceTemplate: ["I", "___", "to", "school", "every", "day."],
    correctWord: "go",
    distractorLevel: level,
    langCode: lang,
    fact: "‘Go’ is the simple present tense verb matching subject ‘I’."
  };

  clueEl.textContent = sentenceData.clue;
  builderArea.innerHTML = '';

  const sentenceP = document.createElement('p');
  sentenceP.innerHTML = sentenceData.sentenceTemplate
    .map(w => (w === "___" ? "<strong>[ ? ]</strong>" : w))
    .join(' ');
  builderArea.appendChild(sentenceP);

  const options = generateMCQ(sentenceData.correctWord, sentenceData.distractorLevel, sentenceData.langCode);
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
