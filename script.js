let emails = {};
let currentEmails = [];
let currentIndex = -1;

let strikes = 0;
let score = 0;

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
      body: "Dear Team,\n\nI would like to schedule a meeting this week.\n\nBest regards,\nEmily Carter",
      correct: true,
      explanation: "Professional tone, clear intent, and proper structure."
    },
    {
      from: `unknown@${randomDomain()}`,
      subject: "meeting",
      body: "hey can we meet",
      correct: false,
      explanation: "Too informal and lacks professional communication standards."
    }
  ],

  intermediate: [
    {
      from: `Karen Mitchell <kmitchell@${randomDomain()}>`,
      subject: "Weekly Update",
      body: "Dear Team,\n\nProject is on track.\n\nRegards,\nKaren",
      correct: true,
      explanation: "Clear, concise, and appropriate for workplace communication."
    },
    {
      from: `manager@${randomDomain()}`,
      subject: "Update",
      body: "I already told you this.",
      correct: false,
      explanation: "Dismissive tone is unprofessional."
    }
  ],

  expert: [
    {
      from: `Angela Foster <afoster@${randomDomain()}>`,
      subject: "Quarterly Report",
      body: "Dear Board Members,\n\nPlease review attached summary.\n\nKind regards,\nAngela Foster",
      correct: true,
      explanation: "Executive-level clarity and professional structure."
    },
    {
      from: `exec@${randomDomain()}`,
      subject: "Financials",
      body: "Here are the numbers.",
      correct: false,
      explanation: "Too vague for executive communication."
    }
  ]
};

/* ================= GAME ================= */
function startGame(level) {
  currentEmails = shuffle([...emails[level]]);
  strikes = 0;
  score = 0;
  answered = new Array(currentEmails.length).fill(false);
  awaitingNext = false;

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

/* ================= OPEN ================= */
function openEmail(i) {
  if (awaitingNext || answered[i]) return;

  currentIndex = i;
  const email = currentEmails[i];

  document.getElementById("email-body").textContent =
`From: ${email.from}
Subject: ${email.subject}

${email.body}`;

  document.getElementById("email-subject").textContent = email.subject;

  document.getElementById("actions").classList.remove("hidden");

  highlight(i);
  clearFeedback();
}

/* ================= ANSWER ================= */
function answer(choice) {
  if (awaitingNext) return;

  const email = currentEmails[currentIndex];
  const correct = choice === email.correct;

  if (correct) score += 10;
  else {
    strikes++;
    if (strikes >= 3) return gameOver(false);
  }

  answered[currentIndex] = true;
  awaitingNext = true;

  showFeedback(correct, email.explanation);
  updateUI();

  document.getElementById("actions").classList.add("hidden");
  renderInbox();
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

/* ================= FEEDBACK ================= */
function showFeedback(correct, text) {
  const box = document.getElementById("feedback");
  box.classList.remove("hidden");

  box.innerHTML = `
    <div class="${correct ? "good" : "bad"}">
      ${correct ? "Correct" : "Incorrect"}
    </div>
    <p>${text}</p>
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
  document.getElementById("score").textContent = `Score: ${score}`;

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

/* ================= DARK MODE ================= */
function toggleMode() {
  darkMode = !darkMode;
  document.body.classList.toggle("dark", darkMode);
  document.getElementById("modeToggle").textContent =
    darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
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
    `Score: ${score}<br>Grade: ${grade}<br>Strikes: ${strikes}/3`;
}

/* ================= UTIL ================= */
function shuffle(a) {
  return a.sort(() => Math.random() - 0.5);
}
