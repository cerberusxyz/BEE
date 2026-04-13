let emails = {};
let currentEmails = [];
let currentIndex = -1;

let strikes = 0;
let answered = [];
let awaitingNext = false;

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-screen").style.display = "flex";
  document.getElementById("app").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
});

/* ================= DARK MODE ================= */
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

/* ================= DATA ================= */
emails = {
  novice: [
    {
      from: "Emily Carter <ecarter@northironridge.com>",
      subject: "Meeting Request",
      body: "Could we schedule a meeting this week?",
      correct: true,
      explanation: "Clear and professional request."
    },
    {
      from: "boss@valewoodtech.net",
      subject: "do this",
      body: "fix it asap",
      correct: false,
      explanation: "Too aggressive and unclear."
    },
    {
      from: "HR <hr@evercrestsolutions.com>",
      subject: "Policy Reminder",
      body: "Please review policy updates.",
      correct: true,
      explanation: "Appropriate HR communication."
    },
    {
      from: "team@halcyonlogistics.io",
      subject: "URGENT",
      body: "respond!!!",
      correct: false,
      explanation: "Unprofessional tone."
    },
    {
      from: "Daniel <db@valewoodtech.net>",
      subject: "Update",
      body: "Project is on track.",
      correct: true,
      explanation: "Clear update."
    }
  ],

  intermediate: [
    {
      from: "Ops <ops@valewoodtech.net>",
      subject: "System Update",
      body: "Maintenance complete.",
      correct: true,
      explanation: "Professional update."
    },
    {
      from: "manager@northironridge.com",
      subject: "Update",
      body: "I already told you this.",
      correct: false,
      explanation: "Dismissive tone."
    },
    {
      from: "Finance <finance@bluecorefinance.org>",
      subject: "Budget Review",
      body: "Please review before Friday.",
      correct: true,
      explanation: "Clear instruction."
    },
    {
      from: "staff@bluecorefinance.org",
      subject: "??",
      body: "why not done yet",
      correct: false,
      explanation: "Unclear and confrontational."
    },
    {
      from: "Support <support@evercrestsolutions.com>",
      subject: "Ticket Closed",
      body: "Your issue is resolved.",
      correct: true,
      explanation: "Professional closure."
    }
  ],

  expert: [
    {
      from: "CFO <cfo@bluecorefinance.org>",
      subject: "Q3 Report",
      body: "Revenue is stable across divisions.",
      correct: true,
      explanation: "Executive-level clarity."
    },
    {
      from: "ceo@valewoodtech.net",
      subject: "???",
      body: "why is this late",
      correct: false,
      explanation: "Unprofessional tone."
    },
    {
      from: "Legal <legal@valewoodtech.net>",
      subject: "Compliance",
      body: "Review updated requirements.",
      correct: true,
      explanation: "Formal communication."
    },
    {
      from: "board@bluecorefinance.org",
      subject: "read this",
      body: "important",
      correct: false,
      explanation: "Too vague."
    },
    {
      from: "Strategy <strategy@halcyonlogistics.io>",
      subject: "Expansion",
      body: "Three regions identified.",
      correct: true,
      explanation: "Strategic clarity."
    }
  ]
};

/* ================= GAME ================= */
function startGame(level) {
  currentEmails = [...emails[level]];
  shuffle(currentEmails);

  strikes = 0;
  answered = new Array(currentEmails.length).fill(false);
  currentIndex = -1;
  awaitingNext = false;

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
  if (answered[i]) return;

  currentIndex = i;
  const email = currentEmails[i];

  document.getElementById("email-subject").textContent = email.subject;
  document.getElementById("email-body").textContent =
`From: ${email.from}

${email.body}`;

  document.getElementById("actions").classList.remove("hidden");
  document.getElementById("feedback").classList.add("hidden");
}

/* ================= ANSWER ================= */
function answer(choice) {
  if (currentIndex === -1) return;

  const email = currentEmails[currentIndex];
  const correct = choice === email.correct;

  if (!correct) strikes++;

  answered[currentIndex] = true;

  showFeedback(correct, email.explanation);

  document.getElementById("actions").classList.add("hidden");
  updateUI();

  if (strikes >= 3) {
    setTimeout(() => gameOver(false), 800);
  }
}

/* ================= FEEDBACK ================= */
function showFeedback(correct, text) {
  const box = document.getElementById("feedback");

  box.className = correct ? "good-box" : "bad-box";
  box.classList.remove("hidden");

  box.innerHTML = text + `<br><br><button onclick="nextEmail()">Next Email</button>`;
}

/* ================= NEXT ================= */
function nextEmail() {
  const next = answered.findIndex(a => a === false);

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
  document.getElementById("end-screen").style.display = "block";

  document.getElementById("end-message").textContent =
    win ? "Inbox Cleared!" : "Game Over";
}

/* ================= UTIL ================= */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
