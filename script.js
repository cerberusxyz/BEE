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
      body: "Dear Mr. Thompson,\n\nI would like to schedule a meeting this week to discuss the project timeline.\n\nBest regards,\nEmily Carter",
      correct: true,
      explanation: "Professional tone, clear purpose, and proper structure."
    },
    {
      from: "unknown@unknown.com",
      subject: "meeting",
      body: "hey can we meet",
      correct: false,
      explanation: "Too informal and lacks professional structure and tone."
    }
  ],

  intermediate: [
    {
      from: "Karen Mitchell <kmitchell@bluecorefinance.com>",
      subject: "Weekly Update",
      body: "Dear Team,\n\nWe are on track with the project timeline.\n\nBest regards,\nKaren Mitchell",
      correct: true,
      explanation: "Clear, structured, and appropriate professional communication."
    },
    {
      from: "manager@halcyonlogistics.com",
      subject: "Update",
      body: "I already told you this. Please check.",
      correct: false,
      explanation: "Dismissive tone that is not appropriate for workplace communication."
    }
  ],

  expert: [
    {
      from: "Angela Foster <afoster@bluecorefinance.com>",
      subject: "Quarterly Financial Summary",
      body: "Dear Board Members,\n\nPlease review the quarterly summary below.\n\nKind regards,\nAngela Foster",
      correct: true,
      explanation: "Formal, concise, and appropriate for executive-level communication."
    },
    {
      from: "exec@halcyonlogistics.com",
      subject: "Financials",
      body: "Here are the numbers.",
      correct: false,
      explanation: "Too vague and lacks clarity required for executive communication."
    }
  ]
};

// ================= START GAME =================
function startGame(level) {
  currentEmails = shuffle([...emails[level]]);
  strikes = 0;
  answered = new Array(currentEmails.length).fill(false);
  awaitingNext = false;

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("end-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  document.getElementById("strikes").innerText = "Strikes: 0 / 3";

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
      li.style.pointerEvents = "none";
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

  document.getElementById("actions").classList.remove("hidden");

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
    document.getElementById("strikes").innerText = `Strikes: ${strikes} / 3`;

    if (strikes >= 3) return gameOver(false);
  }

  answered[currentIndex] = true;
  awaitingNext = true;

  showFeedback(correct, email.explanation);

  renderInbox();
  document.getElementById("actions").classList.add("hidden");
}

// ================= NEXT EMAIL =================
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

    <div style="line-height:1.5;margin-bottom:10px;">
      ${explanation}
    </div>
  `;

  const btn = document.createElement("button");
  btn.innerText = "Next Email";
  btn.onclick = nextEmail;

  box.appendChild(btn);
  box.classList.remove("hidden");
}

function clearFeedback() {
  const box = document.getElementById("feedback");
  box.innerHTML = "";
  box.classList.add("hidden");
}

// ================= UI =================
function highlight(i) {
  document.querySelectorAll("#email-list li").forEach((el, idx) => {
    el.classList.toggle("selected", idx === i);
  });
}

// ================= GAME OVER =================
function gameOver(win) {
  document.getElementById("app").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");

  const done = answered.filter(Boolean).length;
  const total = currentEmails.length;

  document.getElementById("end-message").innerHTML = `
    <h2>${win ? "🎉 Inbox Cleared!" : "💀 Game Over"}</h2>

    <p><b>Completed:</b> ${done}/${total}</p>
    <p><b>Strikes:</b> ${strikes}/3</p>

    <br>

    <p style="max-width:520px;margin:auto;">
      ${
        win
          ? "Great job. You demonstrated strong business email etiquette."
          : "You reached the maximum number of communication errors. Focus on tone, clarity, and professionalism."
      }
    </p>
  `;
}

// ================= UTIL =================
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
