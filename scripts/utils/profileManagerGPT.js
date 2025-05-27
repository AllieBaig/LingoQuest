
/**
 * Progressive Profile Creation + ID Management
 * Generates and stores profile ID based on device + nickname strategy
 * Used in: All game modes (XP, streaks, leaderboards)
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2025-05-28 01:30 | File: scripts/utils/profileManager.js
 */

import { getDeviceFingerprint } from './fingerprint.js';
import { generateWordPair } from './wordPair.js';

const PROFILE_KEY = 'lingoquest_profile';

export async function getOrCreateProfile() {
  let profile = loadProfile();
  if (profile) return profile;

  const fingerprint = await getDeviceFingerprint();

  // Method 1 — Auto Device ID
  const autoID = `dev-${fingerprint}`;
  profile = {
    id: autoID,
    nickname: `Guest-${fingerprint.slice(0, 5)}`,
    created: Date.now(),
  };

  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    return profile;
  } catch (e) {
    // Method 2 — Manual Nickname (storage blocked)
    const nickname = prompt('Pick a fun nickname (e.g. SunnyJane):');
    const id = `nick-${nickname}-${fingerprint.slice(0, 4)}`;

    if (await checkNicknameTaken(nickname)) {
      alert('Nickname taken! Falling back...');
      return fallbackToWordPair(fingerprint);
    }

    profile = { id, nickname, created: Date.now() };
    return profile;
  }
}

export function loadProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY));
  } catch {
    return null;
  }
}

export function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

async function fallbackToWordPair(fingerprint) {
  const wordPair = generateWordPair(); // e.g., "BlueTiger"
  const id = `auto-${wordPair}-${fingerprint.slice(0, 4)}`;
  const profile = { id, nickname: wordPair, created: Date.now() };
  saveProfile(profile);
  return profile;
}

// Stub for nickname check — replace with server check if needed
async function checkNicknameTaken(nick) {
  return false; // always allow for now
}
