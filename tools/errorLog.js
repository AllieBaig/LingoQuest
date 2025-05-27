
/**
 * Error Logging Utility for LingoQuest
 * Captures, timestamps, and optionally stores error logs
 * Called by any script that catches or throws errors
 * Related: utils/errorHandler.js, utils/debugTools.js
 * Supports console output and LocalStorage fallback (UI-link optional)
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-27 17:40 | File: scripts/tools/errorLog.js
 */

const LOG_KEY = 'lingoquest_error_log';

/**
 * Log a new error with context
 * @param {string} source - file or module where error occurred
 * @param {string} message - the error message or description
 * @param {any} [details] - optional extra info (e.g., err.stack)
 */
export function logError(source, message, details = null) {
  const timestamp = new Date().toISOString();
  const entry = {
    timestamp,
    source,
    message,
    details
  };

  console.error(`[${timestamp}] [${source}] ${message}`, details || '');

  try {
    const existing = JSON.parse(localStorage.getItem(LOG_KEY)) || [];
    existing.push(entry);
    localStorage.setItem(LOG_KEY, JSON.stringify(existing));
  } catch (storageErr) {
    console.warn('LocalStorage error log failed:', storageErr);
  }
}

/**
 * Retrieve all logged errors
 * @returns {Array<Object>} error entries
 */
export function getErrorLog() {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY)) || [];
  } catch {
    return [];
  }
}

/**
 * Clear all logged errors
 */
export function clearErrorLog() {
  localStorage.removeItem(LOG_KEY);
}
