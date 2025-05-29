
export async function getDeviceFingerprint() {
  const parts = [
    navigator.userAgent,
    screen.width,
    screen.height,
    new Date().getTimezoneOffset(),
  ];
  const raw = parts.join('|');
  return sha256(raw).slice(0, 16); // mock fingerprint
}

// Use built-in hashing (not cryptographic, lightweight)
function sha256(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}
