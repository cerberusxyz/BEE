let emails = {};
let currentEmails = [];
let currentIndex = -1;

let strikes = 0;
let score = 0;
let pointsPerQuestion = 10;

let answered = [];
let awaitingNext = false;
let darkMode = false;

/* ================= INIT SAFETY ================= */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-screen").style.display = "flex";
  document.getElementById("app").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
});

/* ================= DOMAINS ================= */
function randomDomain() {
  const domains = [
    "northironridge.com",
    "valewoodtech.net",
    "bluecorefinance.org",
    "halcyonlogistics.io",
    "evercrestsolutions.com"
  ];
  return domains[Math.floor(Math.random() * domains.length)];
}

/* ================= FULL DATASET ================= */
emails = {
  novice: [
    // 5 correct
    { from: `Emily <e@${randomDomain()}>`, subject: "Meeting Request", body: "Please schedule a meeting.", correct: true, explanation: "Professional and clear." },
    { from: `Dan <d@${randomDomain()}>`, subject: "Update", body: "Project is on track.", correct: true, explanation: "Concise update." },
    { from: `Sarah <s@${randomDomain()}>`, subject: "Report", body: "Weekly report attached.", correct: true, explanation: "Proper structure." },
    { from: `Mike <m@${randomDomain()}>`, subject: "Schedule", body: "Meeting confirmed for Thursday.", correct: true, explanation: "Clear confirmation." },
    { from: `HR <hr@${randomDomain()}>`, subject: "Policy", body: "Please review policy update.", correct: true, explanation: "Formal HR tone." },

    // 5 incorrect
    { from: `u@${randomDomain()}`, subject: "meeting", body: "hey meet now", correct: false, explanation: "Too informal." },
    { from: `x@${randomDomain()}`, subject: "do this", body: "fix it", correct: false, explanation: "Unprofessional tone." },
    { from: `y@${randomDomain()}`, subject: "hi", body: "what", correct: false, explanation: "No structure." },
    { from: `z@${randomDomain()}`, subject: "URGENT", body: "respond!!!", correct: false, explanation: "Aggressive tone." },
    { from: `a@${randomDomain()}`, subject: "??", body: "idk", correct: false, explanation: "Unclear communication." }
  ]
};

/* ================= START ================= */
function startGame(level) {
  currentEmails = shuffle([...emails[level]]);

  strikes = 0;
  score = 0;
  answered = new Array(currentEmails.length).fill(false);

  pointsPerQuestion = Math.floor(100 / currentEmails.length);

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("app").style.display = "flex";

  updateUI();
  renderInbox();
  openNextEmail();
}

/* ================= INBOX ================= */
function renderInbox() {
  const list = document.getElementById("email-list");
  list.innerHTML = "";

  currentEmails.forEach((email, i) => {
    const li = document.createElement("li");
    li.textContent = email.subject;
    if (!answered[i]) li.onclick = () => openEmail(i);
    list.appendChild(li);
  });
}

/* ================= OPEN ================= */
function openEmail(i) {
  if (awaitingNext || answered[i]) return;

  currentIndex = i;
  const email = currentEmails[i];

  document.getElementById("email-subject").textContent = email.subject;
  document.getElementById("email-body").textContent =
`From: ${email.from}
Subject: ${email.subject}

${email.body}`;

  document.getElementById("actions").classList.remove("hidden");
  clearFeedback();
}

/* ================= ANSWER ================= */
function answer(choice) {
  if (awaitingNext) return;

  const email = currentEmails[currentIndex];
  const correct = choice === email.correct;

  if (correct) score += pointsPerQuestion;
  else if (++strikes >= 3) return gameOver(false);

  answered[currentIndex] = true;
  awaitingNext = true;

  showFeedback(correct, email.explanation);
  renderInbox();
  updateUI();

  document.getElementById("actions").classList.add("hidden");
}

/* ================= FEEDBACK ================= */
function showFeedback(correct, text) {
  const box = document.getElementById("feedback");
  box.classList.remove("hidden");

  box.innerHTML = `
    <div class="feedback-box ${correct ? "good-box" : "bad-box"}">
      ${text}
    </div>
  `;

  const btn = document.createElement("button");
  btn.textContent = "Next Email";
  btn.onclick = nextEmail;
  box.appendChild(btn);
}

function clearFeedback() {
  const box = document.getElementById("feedback");
  box.classList.add("hidden");
  box.innerHTML = "";
}

/* ================= NEXT ================= */
function nextEmail() {
  awaitingNext = false;
  clearFeedback();

  const next = currentEmails.findIndex((e, i) => !answered[i]);
  if (next === -1) return gameOver(true);

  openEmail(next);
}

/* ================= UI ================= */
function updateUI() {
  document.getElementById("strikes").textContent = `Strikes: ${strikes} / 3`;
}

/* ================= GAME OVER ================= */
function gameOver(win) {
  document.getElementById("app").style.display = "none";
  document.getElementById("end-screen").style.display = "flex";

  const grade =
    score >= 90 ? "A" :
    score >= 80 ? "B" :
    score >= 70 ? "C" :
    score >= 60 ? "D" : "F";

  document.getElementById("end-message").textContent =
    win ? "Inbox Cleared!" : "Game Over";

  document.getElementById("final-score").innerHTML =
    `Score: ${score}/100<br>Grade: ${grade}`;
}

/* ================= DARK MODE ================= */
function toggleMode() {
  darkMode = !darkMode;
  document.body.classList.toggle("dark", darkMode);
}

/* ================= UTIL ================= */
function shuffle(a) {
  return a.sort(() => Math.random() - 0.5);
}
