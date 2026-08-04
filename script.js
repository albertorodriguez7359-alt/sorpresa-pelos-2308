/* =========================================================
   PERSONALIZA ESTOS DATOS
   ========================================================= */
const CONFIG = {
  nombreNovia: "Mi amor",
  tuNombre: "Alberto",
  fechaCumpleanos: "0508", // Formato DDMM. Ejemplo: 15 de agosto = 1508
  mensajePrincipal:
    "Gracias por llenar mis días de alegría, ternura y momentos que siempre quiero guardar. Deseo que este nuevo año de vida te regale todo lo bonito que mereces.",
  carta:
    "Hoy no solo celebro tu cumpleaños; celebro la suerte de coincidir contigo. Me encanta compartir mi vida a tu lado, acompañarte en tus sueños y admirar la persona tan hermosa que eres. Espero que nunca olvides cuánto te quiero y lo importante que eres para mí. Que este nuevo año esté lleno de aventuras, metas cumplidas, risas y muchísimos momentos juntos."
};

const screens = [...document.querySelectorAll(".screen")];
const dateDisplay = document.getElementById("dateDisplay");
const statusMessage = document.getElementById("statusMessage");
const lockWrap = document.getElementById("lockWrap");
const music = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");
let typedDate = "";

function applyConfig() {
  document.getElementById("girlfriendName").textContent = CONFIG.nombreNovia;
  document.getElementById("senderName").textContent = CONFIG.tuNombre;
  document.getElementById("mainMessage").textContent = CONFIG.mensajePrincipal;
  document.getElementById("letterText").textContent = CONFIG.carta;
  document.title = `Feliz cumpleaños, ${CONFIG.nombreNovia}`;
}

function showScreen(id) {
  screens.forEach(screen => screen.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function formattedDate(value) {
  const day = value.slice(0, 2).padEnd(2, "D");
  const month = value.slice(2, 4).padEnd(2, "M");
  return `${day} / ${month}`;
}

function updateDisplay() {
  dateDisplay.textContent = typedDate ? formattedDate(typedDate) : "DD / MM";
}

document.querySelectorAll("[data-number]").forEach(button => {
  button.addEventListener("click", () => {
    if (typedDate.length < 4) {
      typedDate += button.dataset.number;
      updateDisplay();
      statusMessage.textContent = "";
    }
  });
});

document.getElementById("clearButton").addEventListener("click", () => {
  typedDate = typedDate.slice(0, -1);
  updateDisplay();
  statusMessage.textContent = "";
});

function unlockSurprise(force = false) {
  if (typedDate === CONFIG.fechaCumpleanos || force) {
    statusMessage.textContent = "¡Correcto! Preparando tu sorpresa...";
    statusMessage.className = "status-message success";
    lockWrap.classList.add("unlocked");
    createConfetti(55);
    tryPlayMusic();
    setTimeout(() => showScreen("birthdayScreen"), 1000);
  } else {
    statusMessage.textContent = typedDate.length < 4
      ? "Escribe los cuatro números de la fecha."
      : "Esa fecha no abre el corazón. Inténtalo otra vez ♥";
    statusMessage.className = "status-message error";
    lockWrap.classList.remove("wrong");
    void lockWrap.offsetWidth;
    lockWrap.classList.add("wrong");
  }
}

document.getElementById("confirmButton").addEventListener("click", () => unlockSurprise());
document.getElementById("demoButton").addEventListener("click", () => unlockSurprise(true));

document.getElementById("continueButton").addEventListener("click", () => showScreen("memoriesScreen"));
document.getElementById("letterButton").addEventListener("click", () => showScreen("letterScreen"));
document.getElementById("finalButton").addEventListener("click", () => {
  createConfetti(80);
  showScreen("finalScreen");
});
document.getElementById("restartButton").addEventListener("click", () => {
  typedDate = "";
  updateDisplay();
  lockWrap.classList.remove("unlocked");
  document.getElementById("envelope").classList.remove("open");
  document.getElementById("finalButton").classList.add("hidden");
  document.getElementById("tapHint").textContent = "Toca el sobre para abrirlo";
  showScreen("lockScreen");
});

document.querySelectorAll(".reason").forEach(item => {
  item.addEventListener("click", () => {
    item.textContent = item.dataset.reason;
    item.classList.add("revealed");
  });
});

const envelope = document.getElementById("envelope");
envelope.addEventListener("click", () => {
  if (!envelope.classList.contains("open")) {
    envelope.classList.add("open");
    document.getElementById("tapHint").textContent = "Esta carta es solo para ti ♥";
    setTimeout(() => document.getElementById("finalButton").classList.remove("hidden"), 900);
  }
});

function createBackgroundHearts() {
  const container = document.getElementById("backgroundHearts");
  for (let i = 0; i < 24; i++) {
    const heart = document.createElement("span");
    heart.className = "bg-heart";
    heart.textContent = Math.random() > .45 ? "♡" : "♥";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${18 + Math.random() * 42}px`;
    heart.style.animationDuration = `${7 + Math.random() * 9}s`;
    heart.style.animationDelay = `${-Math.random() * 12}s`;
    container.appendChild(heart);
  }
}

function createCardHearts() {
  const container = document.querySelector(".floating-hearts");
  for (let i = 0; i < 16; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = "♥";
    heart.style.left = `${3 + Math.random() * 92}%`;
    heart.style.top = `${4 + Math.random() * 88}%`;
    heart.style.fontSize = `${8 + Math.random() * 15}px`;
    heart.style.animationDelay = `${Math.random() * 4}s`;
    container.appendChild(heart);
  }
}

function createConfetti(amount = 50) {
  const symbols = ["♥", "♡", "✦", "●"];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.color = ["#fff", "#ffd1df", "#ff477f", "#ffe36e"][Math.floor(Math.random() * 4)];
    piece.style.fontSize = `${9 + Math.random() * 18}px`;
    piece.style.animationDuration = `${2.8 + Math.random() * 2}s`;
    piece.style.animationDelay = `${Math.random() * .45}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5200);
  }
}

async function tryPlayMusic() {
  try {
    await music.play();
    musicButton.classList.add("playing");
    document.getElementById("musicIcon").textContent = "♫";
  } catch {
    // El navegador puede bloquear la reproducción automática.
  }
}

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    await tryPlayMusic();
  } else {
    music.pause();
    musicButton.classList.remove("playing");
    document.getElementById("musicIcon").textContent = "♪";
  }
});

applyConfig();
createBackgroundHearts();
createCardHearts();
updateDisplay();
