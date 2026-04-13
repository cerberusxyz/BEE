let emails = {};
let currentEmails = [];
let currentIndex = -1;

let strikes = 0;
let score = 0;
let pointsPerQuestion = 10;

let answered = [];
let awaitingNext = false;
let darkMode = false;

/* ================= RANDOM DOMAINS ================= */
function randomDomain() {
  const domains = [
    "northironridge.com",
    "valewoodtech.net",
    "bluecorefinance.org",
    "halcyonlogistics.io",
    "evercrestsolutions.com",
    "silverpeakenterprises.com",
    "westfieldsolutions.net"
  ];
  return domains[Math.floor(Math.random() * domains.length)];
}

/* ================= EMAIL DATA (5 CORRECT / 5 INCORRECT EACH) ================= */
emails = {
  novice: [
    // ✅ CORRECT (5)
    {
      from: `Emily Carter <ecarter@${randomDomain()}>`,
      subject: "Meeting Request",
      body: "Dear Team,\n\nI would like to schedule a meeting this week.\n\nBest regards,\nEmily Carter",
      correct: true,
      explanation: "Clear, polite, and properly structured professional email."
    },
    {
      from: `Daniel Brooks <dbrooks@${randomDomain()}>`,
      subject: "Project Update",
      body: "Hello Team,\n\nThe project is progressing as planned.\n\nRegards,\nDaniel",
      correct: true,
      explanation: "Concise and professional update."
    },
    {
      from: `Sarah Lee <slee@${randomDomain()}>`,
      subject: "Weekly Check-In",
      body: "Dear Team,\n\nPlease share your weekly progress updates.\n\nThank you,\nSarah",
      correct: true,
      explanation: "Clear request with appropriate tone."
    },
    {
      from: `Michael Tan <mtan@${randomDomain()}>`,
      subject: "Schedule Confirmation",
      body: "Hi,\n\nConfirming our meeting for Thursday at 2 PM.\n\nBest,\nMichael",
      correct: true,
      explanation: "Professional and direct communication."
    },
    {
      from: `HR Team <hr@${randomDomain()}>`,
      subject: "Policy Reminder",
      body: "Dear Staff,\n\nPlease review the updated company policy.\n\nRegards,\nHR",
      correct: true,
      explanation: "Formal HR communication is appropriate."

    },

    // ❌ INCORRECT (5)
    {
      from: `unknown@${randomDomain()}`,
      subject: "meeting",
      body: "hey can we meet now",
      correct: false,
      explanation: "Too informal and lacks structure."
    },
    {
      from: `bossman@${randomDomain()}`,
      subject: "do this",
      body: "fix it asap",
      correct: false,
      explanation: "Unprofessional tone and unclear instruction."
    },
    {
      from: `random@${randomDomain()}`,
      subject: "hi",
      body: "what's up",
      correct: false,
      explanation: "Not appropriate for business communication."
    },
    {
      from: `team@${randomDomain()}`,
      subject: "URGENT",
      body: "respond!!!!",
      correct: false,
      explanation: "Aggressive tone and lacks context."
    },
    {
      from: `user@${randomDomain()}`,
      subject: "question",
      body: "idk what to do",
      correct: false,
      explanation: "Unclear and unprofessional communication."
    }
  ],

  intermediate: [
    // ✅ CORRECT (5)
    {
      from: `Karen Mitchell <kmitchell@${randomDomain()}>`,
      subject: "Weekly Report",
      body: "Dear Team,\n\nPlease find the weekly report summary below.\n\nRegards,\nKaren",
      correct: true,
      explanation: "Professional internal reporting style."
    },
    {
      from: `Ops Team <ops@${randomDomain()}>`,
      subject: "System Update",
      body: "System maintenance completed successfully.\n\nThank you.",
      correct: true,
      explanation: "Clear operational update."
    },
    {
      from: `Finance Dept <finance@${randomDomain()}>`,
      subject: "Budget Review",
      body: "Please review the updated budget proposal.\n\nBest regards.",
      correct: true,
      explanation: "Appropriate formal tone."
    },
    {
      from: `Project Lead <lead@${randomDomain()}>`,
      subject: "Milestone Update",
      body: "We have reached phase 2 of the project timeline.",
      correct: true,
      explanation: "Clear and professional status update."
    },
    {
      from: `Support Team <support@${randomDomain()}>`,
      subject: "Ticket Resolution",
      body: "Your support ticket has been resolved successfully.",
      correct: true,
      explanation: "Standard customer support communication."

    },

    // ❌ INCORRECT (5)
    {
      from: `manager@${randomDomain()}`,
      subject: "Update",
      body: "I already told you this.",
      correct: false,
      explanation: "Dismissive and unprofessional tone."
    },
    {
      from: `admin@${randomDomain()}`,
      subject: "fix it",
      body: "this is wrong, fix now",
      correct: false,
      explanation: "Lacks professionalism and clarity."
    },
    {
      from: `staff@${randomDomain()}`,
      subject: "??",
      body: "why not done",
      correct: false,
      explanation: "Unclear and inappropriate tone."
    },
    {
      from: `lead@${randomDomain()}`,
      subject: "status",
      body: "update???",
      correct: false,
      explanation: "Aggressive and unclear request."
    },
    {
      from: `office@${randomDomain()}`,
      subject: "hello",
      body: "ok",
      correct: false,
      explanation: "Too vague for professional communication."
    }
  ],

  expert: [
    // ✅ CORRECT (5)
    {
      from: `Angela Foster <afoster@${randomDomain()}>`,
      subject: "Quarterly Report",
      body: "Dear Board Members,\n\nPlease review the quarterly financial report.\n\nKind regards,\nAngela Foster",
      correct: true,
      explanation: "Executive-level formal communication."
    },
    {
      from: `CFO Office <cfo@${randomDomain()}>`,
      subject: "Financial Summary",
      body: "Attached is the financial summary for Q3 review.",
      correct: true,
      explanation: "Concise and professional executive reporting."
    },
    {
      from: `Legal Dept <legal@${randomDomain()}>`,
      subject: "Compliance Update",
      body: "Please review updated compliance requirements.",
      correct: true,
      explanation: "Appropriate formal legal communication."
    },
    {
      from: `Board Secretary <board@${randomDomain()}>`,
      subject: "Meeting Agenda",
      body: "The agenda for the upcoming board meeting is attached.",
      correct: true,
      explanation: "Proper executive-level communication."
    },
    {
      from: `Strategy Team <strategy@${randomDomain()}>`,
      subject: "Market Analysis",
      body: "The latest market analysis has been completed.",
      correct: true,
      explanation: "Clear and professional reporting."

    },

    // ❌ INCORRECT (5)
    {
      from: `exec@${randomDomain()}`,
      subject: "Financials",
      body: "here are the numbers",
      correct: false,
      explanation: "Too vague for executive communication."
    },
    {
      from: `board@${randomDomain()}`,
      subject: "read this",
      body: "important stuff",
      correct: false,
      explanation: "Lacks professionalism and detail."
    },
    {
      from: `ceo@${randomDomain()}`,
      subject: "???",
      body: "why is this late",
      correct: false,
      explanation: "Unclear and unprofessional tone."
    },
    {
      from: `office@${randomDomain()}`,
      subject: "update",
      body: "fix now",
      correct: false,
      explanation: "Commanding tone without context."
    },
    {
      from: `admin@${randomDomain()}`,
      subject: "report",
      body: "send it",
      correct: false,
      explanation: "Too minimal and unprofessional."
    }
  ]
};

/* ================= GAME START ================= */
function startGame(level) {
  currentEmails = shuffle([...emails[level]]);

  strikes = 0;
  score = 0;
  answered = new Array(currentEmails.length).fill(false);
  awaitingNext = false;

  pointsPerQuestion = Math.floor(100 / currentEmails.length);

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("end-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  updateStrikesOnly();
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

  if (correct) score += pointsPerQuestion;
  else {
    strikes++;
    if (strikes >= 3) return gameOver(false);
  }

  answered[currentIndex] = true;
  awaitingNext = true;

  showFeedback(correct, email.explanation);

  renderInbox();
  updateStrikesOnly();

  document.getElementById("actions").classList.add("hidden");
}

/* ================= FEEDBACK ================= */
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
  const box = document.getElementById("feedback");
  box.classList.add("hidden");
  box.innerHTML = "";
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

/* ================= UI (NO SCORE/GRADE DURING GAME) ================= */
function updateStrikesOnly() {
  document.getElementById("strikes").textContent = `Strikes: ${strikes} / 3`;
}

/* ================= HIGHLIGHT ================= */
function highlight(i) {
  document.querySelectorAll("#email-list li").forEach((el, idx) => {
    el.classList.toggle("selected", idx === i);
  });
}

/* ================= GAME OVER ================= */
function gameOver(win) {
  document.getElementById("app").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");

  const grade = getGrade(score);

  document.getElementById("end-message").innerHTML =
    win ? "🎉 Inbox Cleared!" : "💀 Game Over";

  document.getElementById("final-score").innerHTML =
    `Final Score: ${score}/100<br>Grade: ${grade}<br>Strikes: ${strikes}/3`;
}

/* ================= GRADE SYSTEM ================= */
function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

/* ================= DARK MODE ================= */
function toggleMode() {
  darkMode = !darkMode;
  document.body.classList.toggle("dark", darkMode);

  document.getElementById("modeToggle").textContent =
    darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
}

/* ================= UTIL ================= */
function shuffle(a) {
  return a.sort(() => Math.random() - 0.5);
}
