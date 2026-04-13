let emails = {};
let currentEmails = [];
let currentIndex = -1;
let strikes = 0;
let answered = [];
let awaitingNext = false;

/* ================= DATA ================= */
emails = {
  novice: [
    {
      from: "Emily Carter <ecarter@northironridge.com>",
      subject: "Meeting Request",
      body: "Dear Mr. Thompson,\n\nI would like to schedule a meeting this week.\n\nBest regards,\nEmily Carter",
      correct: true,
      explanation: "Clear, polite, and properly structured business email."
    },
    {
      from: "unknown@unknown.com",
      subject: "meeting",
      body: "hey can we meet",
      correct: false,
      explanation: "Too informal and missing professional structure."
    }
  ],

  intermediate: [
    {
      from: "Karen Mitchell <kmitchell@bluecorefinance.com>",
      subject: "Weekly Update",
      body: "Dear Team,\n\nWe are on track with the project timeline.\n\nBest regards,\nKaren Mitchell",
      correct: true,
      explanation: "Professional, concise, and appropriate tone."
    },
    {
      from: "manager@company.com",
      subject: "Update",
      body: "I already told you this.",
      correct: false,
      explanation: "Dismissive tone is unprofessional in workplace communication."
    }
  ],

  expert: [
    {
      from: "Angela Foster <afoster@bluecorefinance.com>",
      subject: "Quarterly Summary",
      body: "Dear Board Members,\n\nPlease review the quarterly report.\n\nKind regards,\nAngela Foster",
      correct: true,
      explanation: "Appropriate executive-level clarity and tone."
    },
    {
      from: "exec@company.com",
      subject: "Financials",
      body: "Here are the numbers.",
      correct: false,
      explanation: "Too vague and lacks executive-level communication detail."
    }
  ]
};

/* ================= START ================= */
function startGame(level) {
  currentEmails = shuffle([...emails[level]]);
  strikes = 0;
  answered = new Array(currentEmails.length).fill(false);
  awaitingNext = false;

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("end-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  updateStrikes();
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

    if (answered[i]) {
      li.style.opacity = "0.4";
    } else {
      li.onclick = () => openEmail(i);
    }

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
  clearFeedback();
  highlight(i);
}

/* ================= ANSWER ================= */
function answer(choice) {
  if (awaitingNext) return;

  const email = currentEmails[currentIndex];
  const correct = choice === email.correct;

  if (!correct) {
    strikes++;
    updateStrikes();
    if (strikes >= 3) return gameOver(false);
  }

  answered[currentIndex] = true;
  awaitingNext = true;

  showFeedback(correct, email.explanation);

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

/* ================= FEEDBACK ================= */
function showFeedback(correct, explanation) {
  const box = document.getElementById("feedback");
  box.classList.remove("hidden");

  box.innerHTML = `
    <b>${correct ? "Correct" : "Incorrect"}</b>
    <p>${explanation}</p>
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

/* ================= UI ================= */
function updateStrikes() {
  document.getElementById("strikes").textContent = `Strikes: ${strikes} / 3`;
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

  const done = answered.filter(Boolean).length;
  const total = currentEmails.length;

  document.getElementById("end-message").innerHTML =
    `${win ? "🎉 Inbox Cleared!" : "💀 Game Over"}<br><br>
     Completed: ${done}/${total}<br>
     Strikes: ${strikes}/3<br><br>
     ${win
       ? "Excellent business email etiquette."
       : "Too many communication errors. Focus on tone, clarity, and professionalism."}`;
}

/* ================= UTIL ================= */
function shuffle(a) {
  return a.sort(() => Math.random() - 0.5);
}
