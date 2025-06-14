
// Timestamp: 2025-05-27 19:30 | File: scripts/main.js
import { showVersion } from './utils/version.js';
import { logBuildInfo } from '../tools/buildInfo.js';
import { checkVersionChanges } from './utils/version.js';

document.addEventListener('DOMContentLoaded', async () => {
    showVersion('versionLabel');
    logBuildInfo();
    checkVersionChanges();

    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    const uiMode = params.get('ui') || 'normal';
    const language = params.get('lang') || 'fr';

    console.log(`[LingoQuest] Mode: ${mode || 'interactive'} | UI: ${uiMode} | Lang: ${language}`);

    const soloBtn = document.getElementById('startSolo');
    const mixBtn = document.getElementById('startMixLingo');

    // ADD THESE CONSOLE LOGS:
    console.log('Solo Button Element:', soloBtn);
    console.log('MixLingo Button Element:', mixBtn);

    if (soloBtn) {
        soloBtn.addEventListener('click', async () => {
            // ADD THIS CONSOLE LOG:
            console.log('Solo button clicked!');
            await launchSolo(uiMode, language);
        });
    }

    if (mixBtn) {
        mixBtn.addEventListener('click', async () => {
            // ADD THIS CONSOLE LOG:
            console.log('MixLingo button clicked!');
            await launchMixLingo(uiMode);
        });
    }

    // Auto-launch if params are passed
    if (mode === 'solo') soloBtn?.click();
    if (mode === 'mixlingo') mixBtn?.click();
});

async function launchSolo(uiMode, lang) {
    // ADD THIS CONSOLE LOG:
    console.log('launchSolo function called!');
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
    // ADD THIS CONSOLE LOG:
    console.log('launchMixLingo function called!');
    clearUI();
    if (uiMode === 'ascii') {
        const { initMixLingoAscii } = await import('./ascii/lingoquest/mixlingo.js');
        initMixLingoAscii();
    } else {
        const { initMixLingoMode } = await import('./lingoquest/mixlingo.js');
        initMixLingoMode();
    }
}

function clearUI() {
    console.log('clearUI function called!'); // ADD THIS
    document.getElementById('sentenceClue').textContent = '';
    document.getElementById('sentenceBuilderArea').innerHTML = '';
    document.getElementById('resultSummary').hidden = true;
    document.getElementById('asciiOutput').hidden = true;
}
