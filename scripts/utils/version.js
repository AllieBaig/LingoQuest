
/**
 * Script Version Monitor
 * Displays and optionally switches between primary and fallback script versions
 * Imported by main.js or debugPanel.js for diagnostics
 * Related: tools/buildInfo.js, tools/debugPanel.js
 * UI-linked; supports local and backup version switching
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-27 18:00 | File: scripts/utils/version.js
 */

const VERSION_KEY = 'lingoquest_script_version';

export const scriptVersion = '1.0.0'; // Update this manually on script changes

/**
 * Get the current script version (from constant or local override)
 */
export function getCurrentVersion() {
  return localStorage.getItem(VERSION_KEY) || scriptVersion;
}

/**
 * Set a custom override version (for debug/fallback)
 * @param {string} version
 */
export function setVersionOverride(version) {
  localStorage.setItem(VERSION_KEY, version);
}

/**
 * Clear version override and revert to default
 */
export function clearVersionOverride() {
  localStorage.removeItem(VERSION_KEY);
}

/**
 * Display version in footer or debug UI
 * @param {string} elementId - ID of DOM element (e.g. #versionLabel)
 */
export function showVersion(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = `Version: ${getCurrentVersion()}`;
  }
}
