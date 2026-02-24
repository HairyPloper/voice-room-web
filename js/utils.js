/**
 * js/utils.js - Pomoćne funkcije
 */

window.sanitizeForAgora = (name) => {
  const map = {
    š: "sh", Š: "Sh", ć: "ch", Ć: "Ch", č: "ch", Č: "Ch", ž: "zh", Ž: "Zh", đ: "dj", Đ: "Dj",
  };
  return name
    .replace(/[šćčžđ]/gi, (m) => map[m])
    .replace(/\s+/g, "")
    .replace(/[^a-zA-Z0-9!#$%&()+-:;<=.>?@[\]^_{|}~,]/g, "");
};

window.getDisplayName = (uid) => {
  return typeof uid === "string" && uid.includes("_")
    ? uid.substring(0, uid.lastIndexOf("_"))
    : String(uid);
};

window.requestWakeLock = async () => {
  try {
    if ("wakeLock" in navigator) {
      window.wakeLock = await navigator.wakeLock.request("screen");
    }
  } catch (err) {
    console.error("WakeLock greška:", err);
  }
};

window._playTone = (freq, duration = 0.5) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = freq;
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + duration);
  } catch (e) {
    console.error("AudioTone greška:", e);
  }
};

// Universal HTML escaper to prevent XSS when inserting user data into the DOM
window.escapeHtml = (str) => {
  if (str === null || typeof str === "undefined") return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
};