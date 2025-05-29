
/**
 * XP and Level Tracker for LingoQuest
 * Manages XP bar, levels, and progress based on profile ID
 * Called from main.js and game modes to award XP
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-28 01:55 | File: scripts/utils/xpTracker.js
 */

let currentXP = 0;
let currentLevel = 1;
let currentProfileID = null;

const LEVELS = [0, 100, 250, 500, 800, 1200, 1700, 2300]; // Add more as needed

export function initXPBar(profileID) {
  currentProfileID = profileID;
  const key = `xp_${profileID}`;
  currentXP = parseInt(localStorage.getItem(key) || '0', 10);
  updateXPUI();
}

export function awardXP(amount = 10) {
  if (!currentProfileID) return;
  const key = `xp_${currentProfileID}`;
  currentXP += amount;
  localStorage.setItem(key, currentXP);
  updateXPUI();
}

function updateXPUI() {
  const xpFill = document.getElementById('xpFill');
  const xpLabel = document.getElementById('xpLevelLabel');
  if (!xpFill || !xpLabel) return;

  currentLevel = getLevelForXP(currentXP);
  const xpForNext = LEVELS[currentLevel] || (LEVELS[LEVELS.length - 1] + 500);
  const xpForCurrent = LEVELS[currentLevel - 1] || 0;
  const progress = ((currentXP - xpForCurrent) / (xpForNext - xpForCurrent)) * 100;

  xpFill.style.width = `${Math.min(progress, 100)}%`;
  xpLabel.textContent = `Level ${currentLevel}`;
}

function getLevelForXP(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i]) return i + 1;
  }
  return 1;
}
