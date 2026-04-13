let emails = {};
let currentEmails = [];
let currentIndex = -1;

let strikes = 0;
let score = 0;
let answered = [];
let awaitingNext = false;

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-screen").style.display = "flex";
  document.getElementById("app").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
});

/* ================= DOMAINS ================= */
function domain() {
  const d = [
    "northironridge.com",
    "valewoodtech.net",
    "bluecorefinance.org",
    "halcyonlogistics.io",
    "evercrestsolutions.com"
  ];
  return d[Math.floor(Math.random() * d.length)];
}

/* ================= DATA ================= */
emails = {
  novice: [
    {
      from: `Emily Carter <ecarter@northironridge.com>`,
      subject: "Meeting Request",
      body: "Good morning,\n\nCould we schedule a brief meeting this week?\n\nKind regards,\nEmily Carter",
      correct: true,
      explanation: "Professional tone, clear request, and appropriate structure."
    },
    {
      from: `boss@valewoodtech.net`,
      subject: "do this",
      body: "fix it asap",
      correct: false,
      explanation: "Too aggressive and lacks clarity or professionalism."
    },
    {
      from: `Daniel Brooks <dbrooks@valewoodtech.net>`,
      subject: "Weekly Update",
      body: "Hello team,\n\nProject is on track.\n\nRegards,\nDaniel",
      correct: true,
      explanation: "Clear and concise professional update."
    },
    {
      from: `team@halcyonlogistics.io`,
      subject: "URGENT",
      body: "respond!!!",
      correct: false,
      explanation: "Aggressive tone with no context."
    },
    {
      from: `HR Team <hr@evercrestsolutions.com>`,
      subject: "Policy Reminder",
      body: "Please review updated policy by Friday.",
      correct: true,
      explanation: "Clear HR communication with proper tone."
    }
  ],

  intermediate: [
    {
      from: `Ops <ops@valewoodtech.net>`,
      subject: "System Update",
      body: "Maintenance completed successfully.",
      correct: true,
      explanation: "Professional operational update."
    },
    {
      from: `manager@northironridge.com`,
      subject: "Update",
      body: "I already told you this.",
      correct: false,
      explanation: "Dismissive and unprofessional tone."
    },
    {
      from: `Finance <finance@bluecorefinance.org>`,
      subject: "Budget Review",
      body: "Please review before Friday deadline.",
      correct: true,
      explanation: "Clear instruction and professional tone."
    },
    {
      from: `staff@bluecorefinance.org`,
      subject: "??",
      body: "why not done yet",
      correct: false,
      explanation: "Confrontational and unclear."
    },
    {
      from: `Support <support@evercrestsolutions.com>`,
      subject: "Ticket Closed",
      body: "Your issue has been resolved.",
      correct: true,
      explanation: "Clear and professional closure message."
    }
  ],

  expert: [
    {
      from: `CFO <cfo@bluecorefinance.org>`,
      subject: "Q3 Report",
      body: "Revenue shows steady growth across divisions.",
      correct: true,
      explanation: "Executive-level concise financial reporting."
    },
    {
      from: `ceo@valewoodtech.net`,
      subject: "???",
      body: "why is this late",
      correct: false,
      explanation: "Unprofessional and lacks constructive feedback."
    },
    {
      from: `Legal <legal@valewoodtech.net>`,
      subject: "Compliance Update",
      body: "Please review updated compliance requirements.",
      correct: true,
      explanation: "Formal regulatory communication."
    },
    {
      from: `board@bluecorefinance.org`,
      subject: "read this",
      body: "important",
      correct: false,
      explanation: "Too vague for executive communication."
    },
    {
      from: `Strategy <strategy@halcyonlogistics.io>`,
      subject: "Expansion Plan",
      body: "Three regions identified for growth.",
      correct: true,
      explanation: "Clear strategic communication."
    }
  ]
};

/* ================= START GAME (FIXED FLOW) ================= */
function startGame(level) {
  currentEmails = shuffle([...emails[level]]);

  strikes = 0;
  score = 0;
  answered = new Array(currentEmails.length).fill(false);
  awaitingNext = false;
  currentIndex = -1;

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("app").style.display = "flex";

  renderInbox();
  updateUI();
  openNextEmail();
}

/* ================= INBOX ================= */
function renderInbox() {
  const list = document.getElementById("email-list");
  list.innerHTML = "";

  currentEmails.forEach((email, i) => {
    const li = document.createElement("li");
    li.textContent = email.subject;

    if (!answered[i]) {
      li.onclick = () => openEmail(i);
    } else {
      li.style.opacity = "0.5";
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
}

/* ================= NEXT EMAIL AUTO ================= */
function openNextEmail() {
  const next = currentEmails.findIndex((e, i) => !answered[i]);
  if (next !== -1) openEmail(next);
}

/* ================= ANSWER ================= */
function answer(choice) {
  if (awaitingNext || currentIndex === -1) return;

  const email = currentEmails[currentIndex];
  const correct = choice === email.correct;

  if (correct) {
    score += Math.floor(100 / currentEmails.length);
  } else {
    strikes++;
    if (strikes >= 3) return gameOver(false);
  }

  answered[currentIndex] = true;
  awaitingNext = true;

  showFeedback(correct, email.explanation);

  document.getElementById("actions").classList.add("hidden");

  renderInbox();
  updateUI();
}

/* ================= FEEDBACK ================= */
function showFeedback(correct, text) {
  const box = document.getElementById("feedback");
  box.classList.remove("hidden");

  box.innerHTML = `
    <div class="feedback-box ${correct ? "good-box" : "bad-box"}">
      <div class="feedback-title">${correct ? "Correct" : "Incorrect"}</div>
      <div>${text}</div>
    </div>
  `;

  const btn = document.createElement("button");
  btn.textContent = "Next Email";

  btn.onclick = () => {
    awaitingNext = false;
    clearFeedback();

    const next = currentEmails.findIndex((e, i) => !answered[i]);
    if (next === -1) return gameOver(true);

    openEmail(next);
  };

  box.appendChild(btn);
}

/* ================= CLEAR ================= */
function clearFeedback() {
  const box = document.getElementById("feedback");
  box.classList.add("hidden");
  box.innerHTML = "";
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

/* ================= UTIL ================= */
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
