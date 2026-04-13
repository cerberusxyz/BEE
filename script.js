let emails = {};
let currentEmails = [];
let currentIndex = -1;

let strikes = 0;
let score = 0;
let pointsPerQuestion = 10;

let answered = [];
let awaitingNext = false;
let darkMode = false;

/* ================= EMAIL DATA ================= */
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

emails = {
  novice: [
    {
      from: `Emily Carter <ecarter@${randomDomain()}>`,
      subject: "Meeting Request",
      body: "Dear Team,\n\nPlease schedule a meeting.\n\nBest regards,\nEmily Carter",
      correct: true,
      explanation: "This email is professional, polite, and clearly structured."
    },
    {
      from: `unknown@${randomDomain()}`,
      subject: "meeting",
      body: "hey can we meet",
      correct: false,
      explanation: "This email is too informal and lacks professional structure."
    }
  ]
};

/* ================= START GAME ================= */
function startGame(level) {
  currentEmails = shuffle([...emails[level]]);

  strikes = 0;
  score = 0;
  answered = new Array(currentEmails.length).fill(false);
  awaitingNext = false;

  // IMPORTANT: dynamic scoring system
  pointsPerQuestion = Math.floor(100 / currentEmails.length);

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("end-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

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
    else li.style.opacity = "0.4";

    list.appendChild(li);
  });
}

/* ================= OPEN EMAIL ================= */
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

  highlight(i);
  clearFeedback();
}

/* ================= ANSWER ================= */
function answer(choice) {
  if (awaitingNext) return;

  const email = currentEmails[currentIndex];
  const correct = choice === email.correct;

  if (correct) {
    score += pointsPerQuestion;
  } else {
    strikes++;
    if (strikes >= 3) return gameOver(false);
  }

  answered[currentIndex] = true;
  awaitingNext = true;

  showFeedback(correct, email.explanation);

  updateUI();
  renderInbox();

  document.getElementById("actions").classList.add("hidden");
}

/* ================= NEXT ================= */
function nextEmail() {
  awaitingNext = false;
  clearFeedback();
  openNextEmail();
}

function openNextEmail() {
  const next = currentEmails.findIndex((e, i) => !answered[i]);
  if (next === -1) return gameOver(true);
  openEmail(next);
}

/* ================= FEEDBACK (GREEN / RED BOX FIX) ================= */
function showFeedback(correct, text) {
  const box = document.getElementById("feedback");
  box.classList.remove("hidden");

  box.innerHTML = `
    <div class="feedback-box ${correct ? "good-box" : "bad-box"}">
      <div class="feedback-title">
        ${correct ? "✔ Correct" : "✖ Incorrect"}
      </div>
      <div class="feedback-text">
        ${text}
      </div>
    </div>
  `;

  const btn = document.createElement("button");
  btn.textContent = "Next Email";
  btn.onclick = nextEmail;

  box.appendChild(btn);
}

function clearFeedback() {
  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("feedback").innerHTML = "";
}

/* ================= UI ================= */
function updateUI() {
  document.getElementById("strikes").textContent = `Strikes: ${strikes} / 3`;
  document.getElementById("score").textContent = `Score: ${score}/100`;

  const grade =
    score >= 90 ? "A" :
    score >= 80 ? "B" :
    score >= 70 ? "C" :
    score >= 50 ? "D" : "F";

  document.getElementById("grade").textContent = `Grade: ${grade}`;
}

function highlight(i) {
  document.querySelectorAll("#email-list li").forEach((el, idx) => {
    el.classList.toggle("selected", idx === i);
  });
}

/* ================= GAME OVER ================= */
function gameOver(win) {
  document.getElementById("app").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");

  const grade =
    score >= 90 ? "A" :
    score >= 80 ? "B" :
    score >= 70 ? "C" :
    score >= 50 ? "D" : "F";

  document.getElementById("end-message").innerHTML =
    win ? "🎉 Inbox Cleared!" : "💀 Game Over";

  document.getElementById("final-score").innerHTML =
    `Score: ${score}/100<br>Grade: ${grade}<br>Strikes: ${strikes}/3`;
}

/* ================= UTIL ================= */
function shuffle(a) {
  return a.sort(() => Math.random() - 0.5);
}
