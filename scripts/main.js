/**
 * Main Entry Script for LingoQuest
 * Initializes the app, handles UI/mode selection, and loads game modules
 * Uses: utils/version.js, tools/buildInfo.js, ascii/lingoquest/, lingoquest/
 * Dynamically routes modes via buttons or ?mode=&ui= URL params
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-27 19:30 | File: scripts/main.js
 */

import { showVersion } from './utils/version.js';
import { logBuildInfo } from '../tools/buildInfo.js';
import { checkVersionChanges } from './utils/version.js';

document.addEventListener('DOMContentLoaded', async () => {
  showVersion('versionLabel');
  logBuildInfo();
  checkVersionChanges();

  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');       // solo or mixlingo
  const uiMode = params.get('ui') || 'normal'; // normal or ascii
  const language = params.get('lang') || 'fr';

  console.log(`[LingoQuest] Mode: ${mode || 'interactive'} | UI: ${uiMode} | Lang: ${language}`);

  const soloBtn = document.getElementById('startSolo');
  const mixBtn = document.getElementById('startMixLingo');

  if (soloBtn) {
    soloBtn.addEventListener('click', async () => {
      await launchSolo(uiMode, language);
    });
  }

  if (mixBtn) {
    mixBtn.addEventListener('click', async () => {
      await launchMixLingo(uiMode);
    });
  }

  // Auto-launch if params are passed
  if (mode === 'solo') soloBtn?.click();
  if (mode === 'mixlingo') mixBtn?.click();
});

// --- Mode Launchers ---

async function launchSolo(uiMode, lang) {
  clearUI();

  if (uiMode === 'ascii') {
    const { initSoloMode } = await import('./ascii/lingoquest/solo.js');
    initSoloMode('easy');
  } else {
    const { initSoloModeFR } = await import('./lingoquest/solo/fr.js');
    initSoloModeFR();
  }
}

async function launchMixLingo(uiMode) {
  clearUI();

  if (uiMode === 'ascii') {
    const { initMixLingoAscii } = await import('./ascii/lingoquest/mixlingo.js');
    initMixLingoAscii();
  } else {
    const { initMixLingoMode } = await import('./lingoquest/mixlingo.js');
    initMixLingoMode();
  }
}

// --- Helpers ---

function clearUI() {
  document.getElementById('sentenceClue').textContent = '';
  document.getElementById('sentenceBuilderArea').innerHTML = '';
  document.getElementById('resultSummary').hidden = true;
  document.getElementById('asciiOutput').hidden = true;
}
