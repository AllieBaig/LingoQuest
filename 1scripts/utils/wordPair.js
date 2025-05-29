
// wordPair.js — Generates readable fun nicknames

const adjectives = ['Happy', 'Blue', 'Fast', 'Clever', 'Sunny'];
const animals = ['Owl', 'Tiger', 'Fox', 'Koala', 'Penguin'];

export function generateWordPair() {
  const a = adjectives[Math.floor(Math.random() * adjectives.length)];
  const b = animals[Math.floor(Math.random() * animals.length)];
  return `${a}${b}`;
}
