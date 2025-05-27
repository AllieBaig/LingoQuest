/**
 * Script Version Monitor for LingoQuest
 * Handles current version display, override, and version drift detection
 * Imported by main.js and debug panels
 * Related: tools/buildInfo.js, tools/versionRegistry.js
 * UI-linked, fallback-aware, and localStorage compatible
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-27 19:40 | File: scripts/utils/version.js
 */

import { versionMap } from '../../tools/versionRegistry.js';

const VERSION_KEY = 'lingoquest_script_version';
export const scriptVersion = '1.0.0';

/**
 * Get the current active version (with override support)
 */
export function getCurrentVersion() {
  return localStorage.getItem(VERSION_KEY) || scriptVersion;
}

/**
 * Override script version (for debug/testing)
 * @param {string} version
 */
export function setVersionOverride(version) {
  localStorage.setItem(VERSION_KEY, version);
}

/**
 * Remove manual version override
 */
export function clearVersionOverride() {
  localStorage.removeItem(VERSION_KEY);
}

/**
 * Show current version in footer or debug UI
 * @param {string} elementId - e.g., "versionLabel"
 */
export function showVersion(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = `Version: ${getCurrentVersion()}`;
  }
}

/**
 * Compare registered versions against previous session
 * Logs drift if any files have changed
 */
export function checkVersionChanges() {
  const stored = JSON.parse(localStorage.getItem('lingoquest_script_versions') || '{}');
  const changes = [];

  for (const [path, version] of Object.entries(versionMap)) {
    if (stored[path] && stored[path] !== version) {
      changes.push({ path, old: stored[path], new: version });
    }
  }

  if (changes.length) {
    console.warn('[LingoQuest] Version drift detected:', changes);
  }

  localStorage.setItem('lingoquest_script_versions', JSON.stringify(versionMap));
}
