/**
 * Main Entry Script for LingoQuest
 * Handles mode loading, UI setup, and profile init
 * Applies Minimal UI and Dark Mode preferences, loads selected game mode
 * Uses: utils/version.js, tools/buildInfo.js, utils/uiModeManager.js, utils/profileManager.js, utils/xpTracker.js
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-28 01:50 | File: scripts/main.js
 */

import { showVersion } from './utils/version.js';
import { logBuildInfo } from '../tools/buildInfo.js';
import { applyMinimalUI, toggleDarkMode } from './utils/uiModeManager.js';
import { getOrCreateProfile } from './utils/profileManager.js';
import { initXPBar } from './utils/xpTracker.js';

document.addEventListener('DOMContentLoaded', async () => {
  showVersion('versionLabel');
  logBuildInfo();

  const params = new URLSearchParams(window.location.search);
  const uiMode = params.get('ui') || 'normal';
  const mode = params.get('mode') || null;
  const lang = params.get('lang') || 'fr';

  applyMinimalUI(uiMode);
  
  // Detect PWA standalone mode
const isStandalone = window.matchMedia('(display-mode: standalone)').matches
  || window.navigator.standalone === true;

if (isStandalone) {
  console.log('[PWA] Running in standalone mode');
  document.body.classList.add('standalone-mode');
}


  // Load profile
  const profile = await getOrCreateProfile();
  document.getElementById('profileName').textContent = profile.nickname;

  // Init XP bar
  initXPBar(profile.id);

  // Dark mode toggle
  document.getElementById('darkModeToggle')?.addEventListener('click', toggleDarkMode, { passive: true });

  // UI mode selector
  const uiSelector = document.getElementById('uiModeSelector');
  if (uiSelector) {
    uiSelector.value = uiMode;
    uiSelector.addEventListener('change', () => {
      const newUI = uiSelector.value;
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('ui', newUI);
      window.location.href = newUrl.toString();
    }, { passive: true });
  }

  // Mode buttons
  document.getElementById('startSolo')?.addEventListener('click', () => {
    launchMode('solo', uiMode, lang);
  }, { passive: true });

  document.getElementById('startMixLingo')?.addEventListener('click', () => {
    launchMode('mixlingo', uiMode, lang);
  }, { passive: true });

  document.getElementById('startwordRelic')?.addEventListener('click', () => {
    launchMode('wordrelic', uiMode, lang);
  }, { passive: true });

  document.getElementById('startwordSafari')?.addEventListener('click', () => {
    launchMode('safari', uiMode, lang);
  }, { passive: true });

  // Auto-launch mode from URL
  if (mode) {
    setTimeout(() => launchMode(mode, uiMode, lang), 50);
  }
});

async function launchMode(mode, ui, lang) {
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
      const { initWordRelic } = await import('./lingoquest/wordrelic.js');
      initWordRelic();
    } else if (mode === 'safari') {
      const { initWordSafari } = await import('./lingoquest/wordsafari.js');
      initWordSafari();
    }
  }
}

function clearUI() {
  document.getElementById('sentenceClue').textContent = '';
  document.getElementById('sentenceBuilderArea').innerHTML = '';
  document.getElementById('resultSummary').hidden = true;
  document.getElementById('asciiOutput').hidden = true;
}

