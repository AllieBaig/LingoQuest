
/**
 * Main Entry Script for LingoQuest
 * Initializes UI, detects mode + language, and routes to game modules
 * Imports version, build info, and UI mode logic
 * Related: utils/version.js, tools/buildInfo.js, ascii/lingoquest/solo.js, lingoquest/solo/fr.js
 * Supports UI toggle (Normal/ASCII), modular import, and footer feedback
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-27 18:20 | File: scripts/main.js
 */

import { showVersion } from './utils/version.js';
import { logBuildInfo } from '../tools/buildInfo.js';

document.addEventListener('DOMContentLoaded', async () => {
  showVersion('versionLabel');
  logBuildInfo();

  const uiMode = document.getElementById('uiModeSelector')?.value || 'normal';
  const language = 'fr'; // Later: load from localStorage or settings

  console.log(`[LingoQuest] UI Mode: ${uiMode} | Language: ${language}`);

  if (uiMode === 'ascii') {
    // ASCII Solo Mode
    const { initSoloMode } = await import('./ascii/lingoquest/solo.js');
    initSoloMode('easy');
  } else {
    // Normal UI, French Solo
    const { initSoloModeFR } = await import('./lingoquest/solo/fr.js');
    initSoloModeFR();
  }
});
