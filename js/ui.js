/**
 * js/ui.js - Korisnički interfejs, video pozadine i particle efekti
 */

const bgVideo = document.getElementById("bgVideo");
const videoToggle = document.getElementById("videoToggle");
const audio = document.getElementById("myAudio");
const audioBtn = document.getElementById("audioToggle");
const snowToggle = document.getElementById("snowToggle");

if (audio) audio.volume = 0.1;

if (videoToggle && bgVideo) {
  videoToggle.onclick = () => {
    if (bgVideo.paused) {
      bgVideo.play();
      videoToggle.innerText = "🎬";
    } else {
      bgVideo.pause();
      videoToggle.innerText = "🚫";
    }
  };
}

if (audioBtn && audio) {
  audioBtn.onclick = () => {
    if (audio.paused) {
      audio.play();
      audioBtn.innerText = "🔊";
      audioBtn.classList.add("playing");
    } else {
      audio.pause();
      audioBtn.innerText = "🎵";
      audioBtn.classList.remove("playing");
    }
  };
}

if (snowToggle) {
  snowToggle.onclick = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) canvas.style.display = canvas.style.display === "none" ? "block" : "none";
  };
}

// Crtanje korisnika u Grid
window.drawUser = (uid, username, icon, isMe = false) => {
  if (document.getElementById(`user-${uid}`)) return;

  const displayIcon = isMe ? icon : window.animals[Math.floor(Math.random() * window.animals.length)];
  const grid = document.getElementById("user-grid");
  if (!grid) return;

  const card = document.createElement("div");
  card.id = `user-${uid}`;
  card.className = "user-card";
  card.onclick = isMe ? () => window.toggleMute() : () => card.classList.toggle("active");

  // Avatar container
  const avatarContainer = document.createElement("div");
  avatarContainer.className = "avatar-container";
  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.id = `avatar-${uid}`;
  avatar.textContent = displayIcon;
  avatarContainer.appendChild(avatar);
  card.appendChild(avatarContainer);

  // Username (escaped)
  const nameDiv = document.createElement("div");
  nameDiv.className = "username";
  nameDiv.textContent = `${window.escapeHtml ? window.escapeHtml(username) : username}${isMe ? " (Ti)" : ""}`;
  card.appendChild(nameDiv);

  // Volume controls
  if (!isMe) {
    const vc = document.createElement("div");
    vc.className = "volume-controls";
    vc.addEventListener("click", (e) => e.stopPropagation());

    const input = document.createElement("input");
    input.type = "range";
    input.className = "volume-slider";
    input.min = 0; input.max = 100; input.value = 100;
    input.addEventListener("input", function () {
      window.adjustVolume(uid, this.value);
    });

    vc.appendChild(input);
    card.appendChild(vc);
  }

  grid.appendChild(card);
};

window.playVideoInCard = (uid, track) => {
  const container = document.querySelector(`#user-${uid} .avatar-container`);
  if (!container) return;
  container.querySelector(".avatar").style.display = "none";
  let videoDiv = document.getElementById(`video-wrapper-${uid}`) || document.createElement("div");
  videoDiv.id = `video-wrapper-${uid}`;
  videoDiv.className = "video-container";
  videoDiv.onclick = (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) videoDiv.requestFullscreen?.();
    else document.exitFullscreen?.();
  };
  container.appendChild(videoDiv);
  track.play(videoDiv.id);
};

window.removeVideoFromCard = (uid) => {
  document.getElementById(`video-wrapper-${uid}`)?.remove();
  const avatar = document.querySelector(`#user-${uid} .avatar`);
  if (avatar) avatar.style.display = "flex";
};

// Particle efekat (Sneg/Srca)
(function () {
  const canvas = document.createElement("canvas");
  Object.assign(canvas.style, {
    position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh", pointerEvents: "none", zIndex: "-1",
  });
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  let particles = [];
  const isPako = window.myUsername.startsWith("Pako");
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.5 + Math.random(),
      size: isPako ? 15 : 3,
      symbol: isPako ? "❤" : "❄",
    }));
  }
  
  window.addEventListener("resize", resize);
  resize();
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      ctx.fillStyle = isPako ? "red" : "white";
      ctx.font = `${p.size * 2}px serif`;
      ctx.fillText(p.symbol, p.x, p.y);
      p.y += p.speed;
      if (p.y > canvas.height) p.y = -20;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();