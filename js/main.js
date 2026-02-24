/**
 * js/main.js - Inicijalizacija i globalne varijable
 */

window.APP_ID = "beb2d2e844954540847d8bf07648926e";
const params = new URLSearchParams(window.location.search);
let baseName = params.get("name") || "Gost";

window.myUsername = `${baseName}_${Math.floor(10000 + Math.random() * 9000)}`;
window.wakeLock = null;

window.animals = [
  "🦁",
  "🦊",
  "🐨",
  "🐘",
  "🐯",
  "🐼",
  "🐙",
  "🦉",
  "🐸",
  "🦓",
  "🦄",
  "🐝",
  "🦒",
  "🦘",
  "🦥",
  "🦔",
  "🐇",
  "🐈",
  "🐕",
  "🐒",
  "🦍",
  "🦌",
  "🦬",
  "🐄",
  "🐳",
  "🐬",
  "🦈",
  "🐡",
  "🐢",
  "🦞",
  "🦀",
  "🐧",
  "🦜",
  "🦆",
  "🦅",
  "🦚",
  "🦋",
  "🐞",
  "🦂",
  "🐜",
];
window.myIcon =
  window.animals[Math.floor(Math.random() * window.animals.length)];
