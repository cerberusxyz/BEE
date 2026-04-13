let emails = {};
let currentEmails = [];
let currentIndex = -1;

let strikes = 0;
let answered = [];

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-screen").style.display = "flex";
  document.getElementById("app").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
});

/* DARK MODE */
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

/* DATA */
emails = {
  novice: [
    { subject: "Meeting Request", from: "A", body: "text", correct: true, explanation: "Good structure." },
    { subject: "Fix this asap", from: "B", body: "text", correct: false, explanation: "Too aggressive." },
    { subject: "Update", from: "C", body: "text", correct: true, explanation: "Clear update." }
  ],
  intermediate: [
    { subject: "System Update", from: "A", body: "text", correct: true, explanation: "Professional update." },
    { subject: "??", from: "B", body: "text", correct: false, explanation: "Unclear." }
  ],
  expert: [
    { subject: "Q3 Report", from: "A", body: "text", correct: true, explanation: "Executive clarity." },
    { subject: "why late", from: "B", body: "text", correct: false, explanation: "Unprofessional." }
  ]
};

/* START GAME */
function startGame(level) {
  currentEmails = [...emails[level]];

  strikes = 0;
  answered = new Array(currentEmails.length).fill(false);
  currentIndex = -1;

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("app").style.display = "flex";

  renderInbox();
  openNext();
}

/* INBOX */
function renderInbox() {
  const list = document.getElementById("email-list");
  list.innerHTML = "";

  currentEmails.forEach((email, i) => {
    const li = document.createElement("li");
    li.textContent = email.subject;

    if (answered[i]) {
      li.classList.add("completed-email");
    } else {
      li.onclick = () => openEmail(i);
    }

    list.appendChild(li);
  });
}

/* OPEN EMAIL */
function openEmail(i) {
  currentIndex = i;

  const email = currentEmails[i];

  document.getElementById("email-subject").textContent = email.subject;
  document.getElementById("email-body").textContent =
`From: ${email.from}

${email.body}`;

  document.getElementById("actions").classList.remove("hidden");
  document.getElementById("feedback").classList.add("hidden");
}

/* ANSWER */
function answer(choice) {
  const email = currentEmails[currentIndex];

  const correct = choice === email.correct;

  if (!correct) strikes++;

  answered[currentIndex] = true;

  showFeedback(correct, email.explanation);

  document.getElementById("actions").classList.add("hidden");

  updateUI();

  renderInbox();
}

/* FEEDBACK */
function showFeedback(correct, text) {
  const box = document.getElementById("feedback");

  box.className = correct ? "good-box" : "bad-box";
  box.classList.remove("hidden");

  box.innerHTML = text + `<br><br><button onclick="openNext()">Next Email</button>`;
}

/* NEXT */
function openNext() {
  const next = answered.findIndex(a => a === false);

  if (next === -1) return gameOver(true);

  openEmail(next);
}

/* UI */
function updateUI() {
  document.getElementById("strikes").textContent = `Strikes: ${strikes} / 3`;

  if (strikes >= 3) gameOver(false);
}

/* GAME OVER */
function gameOver(win) {
  document.getElementById("app").style.display = "none";
  document.getElementById("end-screen").style.display = "flex";

  document.getElementById("end-message").textContent =
    win ? "Inbox Cleared!" : "Game Over";
}
