// =========================
// CONTACT FORM VALIDATION
// =========================

const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    document.querySelectorAll(".error").forEach(el => el.innerText = "");

    document.querySelectorAll(".contact-form input, .contact-form textarea").forEach(el => {
      el.classList.remove("invalid", "valid");
    });

    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    const nameRegex = /^[A-Za-zÀ-ÿ\s-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (firstnameValue === "") {
      document.getElementById("errFirstname").innerText =
        "Firstname is required.";
      firstname.classList.add("invalid");
      valid = false;
    } else if (firstnameValue.length > 20) {
      document.getElementById("errFirstname").innerText =
        "Firstname can have a maximum of 20 characters.";
      firstname.classList.add("invalid");
      valid = false;
    } else if (!nameRegex.test(firstnameValue)) {
      document.getElementById("errFirstname").innerText =
        "Firstname may only contain letters, spaces or hyphens.";
      firstname.classList.add("invalid");
      valid = false;
    } else {
      firstname.classList.add("valid");
    }

    if (lastnameValue === "") {
      document.getElementById("errLastname").innerText =
        "Lastname is required.";
      lastname.classList.add("invalid");
      valid = false;
    } else if (lastnameValue.length > 20) {
      document.getElementById("errLastname").innerText =
        "Lastname can have a maximum of 20 characters.";
      lastname.classList.add("invalid");
      valid = false;
    } else if (!nameRegex.test(lastnameValue)) {
      document.getElementById("errLastname").innerText =
        "Lastname may only contain letters, spaces or hyphens.";
      lastname.classList.add("invalid");
      valid = false;
    } else {
      lastname.classList.add("valid");
    }

    if (emailValue === "") {
      document.getElementById("errEmail").innerText =
        "Email address is required.";
      email.classList.add("invalid");
      valid = false;
    } else if (!emailValue.includes("@")) {
      document.getElementById("errEmail").innerText =
        "Email address must contain an @ sign.";
      email.classList.add("invalid");
      valid = false;
    } else if (!emailRegex.test(emailValue)) {
      document.getElementById("errEmail").innerText =
        "Please use the format name@example.com.";
      email.classList.add("invalid");
      valid = false;
    } else {
      email.classList.add("valid");
    }

    if (messageValue === "") {
      document.getElementById("errMessage").innerText =
        "Please enter a message.";
      message.classList.add("invalid");
      valid = false;
    } else if (messageValue.length > 200) {
      document.getElementById("errMessage").innerText =
        "Your message can have a maximum of 200 characters.";
      message.classList.add("invalid");
      valid = false;
    } else {
      message.classList.add("valid");
    }

    if (valid) {
      form.submit();
    }
  });
}

// =========================
// HAMBURGER MENU
// =========================

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

// =========================
// ACTION PAGE GAME (DINO)
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const gameArea = document.getElementById("gameArea");
  const startBtn = document.getElementById("startGame");
  const scoreEl = document.getElementById("score");

  if (!gameArea || !startBtn || !scoreEl) return;

  let gameRunning = false;
  let score = 0;
  let speed = 6;

  let dino;
  let dinoY = 0;
  let velocityY = 0;
  let isJumping = false;

  let obstacles = [];
  let gameInterval;
  let spawnInterval;

  startBtn.addEventListener("click", startGame);
  gameArea.addEventListener("click", jump);
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    jump(e);
  }
});

  function startGame() {
    if (gameRunning) return;

    resetGame();
    gameRunning = true;
    startBtn.textContent = "Running...";

    dino = document.createElement("div");
    dino.classList.add("dino");
    dino.textContent = "💎";
    gameArea.appendChild(dino);

    gameInterval = setInterval(updateGame, 20);
    spawnInterval = setInterval(spawnObstacle, 1400);
  }

  function resetGame() {
    gameArea.innerHTML = "";

    obstacles = [];
    score = 0;
    speed = 6;
    velocityY = 0;
    dinoY = 0;
    isJumping = false;

    scoreEl.textContent = "0";
  }

  function jump(e) {
    if (!gameRunning) return;

    if (e.code === "Space") {
      e.preventDefault();

      if (!isJumping) {
        velocityY = -14;
        isJumping = true;
      }
    }

    if (e.type === "click") {
      if (!isJumping) {
        velocityY = -14;
        isJumping = true;
      }
    }
  }

  function updateGame() {
    velocityY += 0.8;
    dinoY += velocityY;

    if (dinoY >= 0) {
      dinoY = 0;
      isJumping = false;
    }

    if (dino) {
      dino.style.transform = `translateY(${dinoY}px)`;
    }

    obstacles.forEach((obs, i) => {
      let x = parseInt(obs.style.left);
      x -= speed;
      obs.style.left = x + "px";

if (x < 120 && x > 50 && dinoY > -60) {
  endGame();
}

      if (x < -50) {
        obs.remove();
        obstacles.splice(i, 1);

        score++;
        scoreEl.textContent = score;

        if (score % 5 === 0) {
          speed += 0.5;
        }
      }
    });
  }

  function spawnObstacle() {
    if (!gameRunning) return;

    const obs = document.createElement("div");
    obs.classList.add("obstacle");

    const items = ["🪸", "🌳"];
    obs.textContent = items[Math.floor(Math.random() * items.length)];

    obs.style.left = gameArea.offsetWidth + "px";
    gameArea.appendChild(obs);
    obstacles.push(obs);
  }

  function endGame() {
const treeCount = document.getElementById("treeCount");
const coralCount = document.getElementById("coralCount");
const totalImpact = document.getElementById("totalImpact");

if (treeCount && coralCount && totalImpact) {
  const trees = Math.floor(score / 3);
  const corals = Math.floor(score / 5);

  treeCount.textContent = trees;
  coralCount.textContent = corals;
  totalImpact.textContent = trees + corals;
}
    
  gameRunning = false;

  clearInterval(gameInterval);
  clearInterval(spawnInterval);

  gameInterval = null;
  spawnInterval = null;

  startBtn.textContent = "Restart";

 

  setTimeout(() => {
    alert("Game Over 🌍 Score: " + score);
  }, 100);

}
});
