// inside scripts/ascii/lingoquest/mixlingo.js
import {
  renderHeader, renderClueBlock, renderMCQOptions,
  renderResult, renderFooterHUD, printAscii
} from '../../utils/asciiRenderer.js';

export function initMixLingoAscii() {
  const clue = "Complete the sentence with the correct foreign word:";
  const sentence = `"I want to ___ an apple."`;
  const options = ["manger", "dormir", "parler"];
  const correct = "manger";
  let selectedIndex = null;

  const asciiOut = document.getElementById('asciiOutput');
  asciiOut.hidden = false;

  render();

  // Touch-friendly selection
  asciiOut.addEventListener('click', (e) => {
    if (!e.target.dataset.index) return;
    selectedIndex = parseInt(e.target.dataset.index);
    render();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= String(options.length)) {
      selectedIndex = parseInt(e.key) - 1;
      render();
    } else if (e.key === 'Enter' && selectedIndex !== null) {
      checkAnswer();
    }
  });

  function checkAnswer() {
    const selectedWord = options[selectedIndex];
    const isCorrect = selectedWord === correct;
    const msg = isCorrect
      ? `Correct! "${correct}" means "to eat" in French.`
      : `Incorrect. The correct word was "${correct}".`;

    printAscii(
      renderHeader(),
      renderClueBlock("MixLingo (ASCII)", [clue, sentence]),
      renderMCQOptions(options, selectedIndex),
      renderResult(msg),
      renderFooterHUD(40, "4 Days", "1.0.1")
    );
  }

  function render() {
    printAscii(
      renderHeader(),
      renderClueBlock("MixLingo (ASCII)", [clue, sentence]),
      renderMCQOptions(options, selectedIndex),
      renderFooterHUD(40, "4 Days", "1.0.1")
    );

    // Make [1] etc. tappable
    makeTappable(options);
  }

  function makeTappable(opts) {
    const lines = asciiOut.textContent.split('\n');
    const mcqLineIndex = lines.findIndex(l => l.includes('[1]'));
    if (mcqLineIndex === -1) return;

    asciiOut.innerHTML = lines.map((line, i) => {
      if (i !== mcqLineIndex) return line;
      return opts.map((opt, idx) =>
        `<span data-index="${idx}">[${idx + 1}] ${opt}</span>`
      ).join('   ');
    }).join('<br>');
  }
}
