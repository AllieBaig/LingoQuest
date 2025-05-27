/**
 * Main Entry Script for LingoQuest
 * Handles mode loading, UI selection, profile init, PWA behavior
 * Uses: version.js, buildInfo.js, uiModeManager.js, profileManager.js
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-28 03:50 | File: scripts/main.js
 */

import { showVersion, checkVersionChanges } from './utils/version.js';
import { logBuildInfo } from '../tools/buildInfo.js';
import { applyMinimalUI, toggleDarkMode } from './utils/uiModeManager.js';
import { ensureProfile } from '../tools/profileManager.js';

document.addEventListener('DOMContentLoaded', async () => {
  showVersion('versionLabel');
  logBuildInfo();
  checkVersionChanges();
  await ensureProfile();

  const params = new URLSearchParams(location.search);
  const uiMode = params.get('ui') || 'normal';
  const mode = params.get('mode') || null;
  const lang = params.get('lang') || 'fr';

  console.log(`[LingoQuest] Mode: ${mode || 'none'} | UI: ${uiMode} | Lang: ${lang}`);
  applyMinimalUI(uiMode);

  // Dark Mode Toggle
  document.getElementById('darkModeToggle')?.addEventListener('click', () => toggleDarkMode());

  // UI Mode Selector
  const uiSelector = document.getElementById('uiModeSelector');
  if (uiSelector) {
    uiSelector.value = uiMode;
    uiSelector.addEventListener('change', () => {
      const newUI = uiSelector.value;
      const url = new URL(location.href);
      url.searchParams.set('ui', newUI);
      location.href = url.toString();
    });
  }

  // Mode buttons
  document.getElementById('startSolo')?.addEventListener('click', () => launchMode('solo', uiMode, lang));
  document.getElementById('startMixLingo')?.addEventListener('click', () => launchMode('mixlingo', uiMode, lang));
  document.getElementById('startwordRelic')?.addEventListener('click', () => launchMode('wordrelic', uiMode, lang));
  document.getElementById('startwordSafari')?.addEventListener('click', () => launchMode('wordsafari', uiMode, lang));

  // Auto-launch
  if (mode) launchMode(mode, uiMode, lang);
});

async function launchMode(mode, ui, lang) {
  console.log(`[LingoQuest] Launching ${mode} (${ui})`);
  clearUI();

  if (ui === 'ascii') {
    if (mode === 'solo') {
      const { initSoloMode } = await import('./ascii/lingoquest/solo.js');
      initSoloMode('easy');
    } else if (mode === 'mixlingo') {
      const { initMixLingoAscii } = await import('./ascii/lingoquest/mixlingo.js');
      initMixLingoAscii();
    }
  } else {
    if (mode === 'solo') {
      const { initSoloModeFR } = await import('./lingoquest/solo/fr.js');
      initSoloModeFR();
    } else if (mode === 'mixlingo') {
      const { initMixLingoMode } = await import('./lingoquest/mixlingo.js');
      initMixLingoMode();
    } else if (mode === 'wordrelic') {
      const { initWordRelicMode } = await import('./lingoquest/wordrelic.js');
      initWordRelicMode();
    } else if (mode === 'wordsafari') {
      const { initWordSafariMode } = await import('./lingoquest/wordsafari.js');
      initWordSafariMode();
    }
  }
}

function clearUI() {
  document.getElementById('sentenceClue').textContent = '';
  document.getElementById('sentenceBuilderArea').innerHTML = '';
  document.getElementById('resultSummary').hidden = true;
  document.getElementById('asciiOutput').hidden = true;
}
