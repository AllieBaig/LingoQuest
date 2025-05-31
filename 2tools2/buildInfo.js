/**
 * Build Info Generator for LingoQuest
 * Stores current script version, build timestamp, and environment flags
 * Imported by main.js or debug panels for diagnostics and display
 * Related: utils/version.js, tools/versionRegistry.js
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-27 19:35 | File: tools/buildInfo.js
 */

export const buildInfo = {
  version: '1.0.0',
  timestamp: '2025-05-27 19:35',
  environment: 'development' // or 'production'
};

/**
 * Logs current build info to the console
 */
export function logBuildInfo() {
  console.info(
    `[LingoQuest] Build ${buildInfo.version} (${buildInfo.environment}) @ ${buildInfo.timestamp}`
  );
}
