let currentEmails = [];
let currentIndex = 0;
let strikes = 0;
let answered = [];

// 👉 KEEP YOUR EMAIL DATA FROM PREVIOUS VERSION HERE
// (Paste the full emails object from earlier — unchanged)


// START GAME
function startGame(level) {
  currentEmails = shuffle([...emails[level]]);
  currentIndex = 0;
  strikes = 0;
  answered = new Array(currentEmails.length).fill(false);

  document.getElementById("difficulty").innerText = "Difficulty: " + level;
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  document.getElementById("strikes").innerText = "Strikes: 0 / 3";

  renderEmailList();
}

// RENDER SIDEBAR
function renderEmailList() {
  const list = document.getElementById("email-list");
  list.innerHTML = "";

  currentEmails.forEach((email, index) => {
    const li = document.createElement("li");
    li.innerText = email.subject || "(No Subject)";
    
    li.onclick = () => openEmail(index);

    if (answered[index]) {
      li.style.opacity = "0.5";
    }

    list.appendChild(li);
  });
}

// OPEN EMAIL
function openEmail(index) {
  if (answered[index]) return;

  currentIndex = index;

  const email = currentEmails[index];

  document.getElementById("email-subject").innerText = email.subject || "(No Subject)";
  document.getElementById("email-body").innerText = email.body;

  document.getElementById("actions").classList.remove("hidden");

  highlightSelected(index);
}

// HIGHLIGHT
function highlightSelected(index) {
  const items = document.querySelectorAll("#email-list li");
  items.forEach((li, i) => {
    li.classList.toggle("selected", i === index);
  });
}

// ANSWER
function answer(choice) {
  const email = currentEmails[currentIndex];

  if (answered[currentIndex]) return;

  if (choice !== email.correct) {
    strikes++;
    document.getElementById("strikes").innerText = "Strikes: " + strikes + " / 3";

    if (strikes >= 3) {
      endGame(false);
      return;
    }
  }

  answered[currentIndex] = true;

  renderEmailList();
  checkWin();

  document.getElementById("actions").classList.add("hidden");
}

// CHECK WIN
function checkWin() {
  if (answered.every(a => a)) {
    endGame(true);
  }
}

// END GAME
function endGame(win) {
  document.getElementById("app").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");

  document.getElementById("end-message").innerText =
    win ? "🎉 Congratulations! Inbox Cleared!" : "💀 Game Over!";
}

// SHUFFLE
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
