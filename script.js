let emails = {};
let currentEmails = [];
let currentIndex = -1;
let strikes = 0;
let answered = [];
let awaitingNext = false;

// ================= DATA =================
emails = {
  novice: [
    {
      from: "Emily Carter <ecarter@northironridge.com>",
      subject: "Request to Schedule Meeting",
      body: "Dear Mr. Thompson,\n\nI would like to schedule a meeting this week.\n\nBest regards,\nEmily Carter",
      correct: true,
      explanation: "Professional tone, clear structure, and appropriate closing."
    },
    {
      from: "unknown@unknown.com",
      subject: "meeting",
      body: "hey can we meet",
      correct: false,
      explanation: "Too informal and missing basic business email structure."
    }
  ],

  intermediate: [
    {
      from: "Karen Mitchell <kmitchell@bluecorefinance.com>",
      subject: "Weekly Update",
      body: "Dear Team,\n\nWe are on track with the project.\n\nBest regards,\nKaren Mitchell",
      correct: true,
      explanation: "Clear and professional update suitable for internal communication."
    },
    {
      from: "manager@halcyonlogistics.com",
      subject: "Update",
      body: "I already told you this.",
      correct: false,
      explanation: "Dismissive tone undermines professional communication."
    }
  ],

  expert: [
    {
      from: "Angela Foster <afoster@bluecorefinance.com>",
      subject: "Quarterly Summary",
      body: "Dear Board Members,\n\nPlease review the attached summary.\n\nKind regards,\nAngela Foster",
      correct: true,
      explanation: "Appropriate executive-level clarity and tone."
    },
    {
      from: "exec@halcyonlogistics.com",
      subject: "Financials",
      body: "Here are the numbers.",
      correct: false,
      explanation: "Too vague for executive communication."
    }
  ]
};

// ================= SCREEN CONTROLLER (FIX FOR OVERLAP) =================
function showScreen(screen) {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("app").style.display = "none";
  document.getElementById("end-screen").style.display = "none";

  document.getElementById(screen).style.display = "block";
}

// ================= START GAME =================
function startGame(level) {
  currentEmails = shuffle([...emails[level]]);
  strikes = 0;
  answered = new Array(currentEmails.length).fill(false);
  awaitingNext = false;

  showScreen("app");

  updateStrikes();
  renderInbox();
  openNextEmail();
}

// ================= INBOX =================
function renderInbox() {
  const list = document.getElementById("email-list");
  list.innerHTML = "";

  currentEmails.forEach((email, i) => {
    const li = document.createElement("li");
    li.innerText = email.subject;

    if (answered[i]) {
      li.style.opacity = "0.4";
    } else {
      li.onclick = () => openEmail(i);
    }

    list.appendChild(li);
  });
}

// ================= OPEN EMAIL =================
function openEmail(i) {
  if (awaitingNext || answered[i]) return;

  currentIndex = i;
  const email = currentEmails[i];

  document.getElementById("email-subject").innerText = email.subject;

  document.getElementById("email-body").innerText =
`From: ${email.from}
Subject: ${email.subject}

${email.body}`;

  document.getElementById("actions").style.display = "block";

  highlight(i);
  clearFeedback();
}

// ================= ANSWER =================
function answer(choice) {
  if (awaitingNext) return;

  const email = currentEmails[currentIndex];
  const correct = choice === email.correct;

  if (!correct) {
    strikes++;
    updateStrikes();

    if (strikes >= 3) {
      return gameOver(false);
    }
  }

  answered[currentIndex] = true;
  awaitingNext = true;

  showFeedback(correct, email.explanation);

  renderInbox();
  document.getElementById("actions").style.display = "none";
}

// ================= NEXT =================
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

// ================= FEEDBACK =================
function showFeedback(correct, explanation) {
  const box = document.getElementById("feedback");

  box.innerHTML = `
    <div style="font-size:18px;font-weight:600;margin-bottom:8px;">
      ${correct ? "✅ Correct" : "❌ Incorrect"}
    </div>

    <div style="line-height:1.5;">
      ${explanation}
    </div>
  `;

  const btn = document.createElement("button");
  btn.innerText = "Next Email";
  btn.onclick = nextEmail;

  box.appendChild(document.createElement("br"));
  box.appendChild(btn);

  box.style.display = "block";
}

function clearFeedback() {
  const box = document.getElementById("feedback");
  box.innerHTML = "";
  box.style.display = "none";
}

// ================= UI =================
function updateStrikes() {
  document.getElementById("strikes").innerText = `Strikes: ${strikes} / 3`;
}

function highlight(i) {
  document.querySelectorAll("#email-list li").forEach((el, idx) => {
    el.classList.toggle("selected", idx === i);
  });
}

// ================= GAME OVER =================
function gameOver(win) {
  showScreen("end-screen");

  const done = answered.filter(Boolean).length;
  const total = currentEmails.length;

  document.getElementById("end-message").innerHTML = `
    <h2>${win ? "🎉 Inbox Cleared!" : "💀 Game Over"}</h2>

    <p><b>Emails Completed:</b> ${done}/${total}</p>
    <p><b>Strikes:</b> ${strikes}/3</p>

    <br>

    <p style="max-width:520px;margin:auto;">
      ${
        win
          ? "Excellent work. You demonstrated strong business email etiquette."
          : "You exceeded the allowed number of communication errors. Focus on tone, clarity, and professionalism in business emails."
      }
    </p>
  `;
}

// ================= UTIL =================
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
