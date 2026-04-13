let currentEmails = [];
let currentIndex = 0;
let strikes = 0;
let answered = [];

// ================= EMAIL DATA =================
const emails = {
  novice: [
    // GOOD
    {
      from: "Emily Carter <ecarter@company.com>",
      subject: "Meeting Request",
      body: "Dear Mr. Thompson,\n\nI hope you are doing well. I would like to schedule a meeting this week to discuss the current status of the project.\n\nPlease let me know your availability.\n\nBest regards,\nEmily Carter",
      correct: true,
      explanation: "This email is polite, clearly written, and uses a professional tone with a proper greeting and closing."
    },
    {
      from: "Daniel Lee <dlee@company.com>",
      subject: "Thank You",
      body: "Hello Ms. Rivera,\n\nThank you for your assistance earlier today. I appreciate your time and support.\n\nSincerely,\nDaniel Lee",
      correct: true,
      explanation: "This message uses a respectful tone and expresses gratitude appropriately."
    },

    // BAD
    {
      from: "unknown",
      subject: "meeting",
      body: "hey can we meet sometime",
      correct: false,
      explanation: "This email is too informal, lacks a greeting, proper capitalization, and a professional tone."
    },
    {
      from: "manager@company.com",
      subject: "URGENT",
      body: "WHY HAVENT YOU RESPONDED",
      correct: false,
      explanation: "Using all caps comes across as aggressive and unprofessional."
    }
  ],

  intermediate: [
    // GOOD
    {
      from: "Karen Mitchell <kmitchell@company.com>",
      subject: "Weekly Project Update",
      body: "Dear Team,\n\nI wanted to provide a brief update on the project. We are currently on track and progressing as scheduled.\n\nPlease let me know if you have any questions.\n\nBest regards,\nKaren Mitchell",
      correct: true,
      explanation: "This email is clear, professional, and maintains a neutral and informative tone."
    },

    // BAD
    {
      from: "manager@company.com",
      subject: "Update",
      body: "I already explained this earlier. Please check.",
      correct: false,
      explanation: "The tone is dismissive and unhelpful. Professional emails should remain courteous and constructive."
    }
  ],

  expert: [
    // GOOD
    {
      from: "Angela Foster <afoster@company.com>",
      subject: "Quarterly Financial Review",
      body: "Dear Board Members,\n\nI hope you are doing well. Below is a summary of our financial performance for the past quarter.\n\nPlease let me know if you would like any additional details.\n\nKind regards,\nAngela Foster\nChief Financial Officer",
      correct: true,
      explanation: "This email demonstrates professionalism, clarity, and appropriate tone for a senior audience."
    },

    // BAD
    {
      from: "executive@company.com",
      subject: "Financials",
      body: "Here are the numbers. Let me know what you think.",
      correct: false,
      explanation: "The email is too vague and lacks professionalism for an executive-level communication."
    }
  ]
};

// ================= GAME =================

function startGame(level) {
  currentEmails = shuffle([...emails[level]]);
  strikes = 0;
  answered = new Array(currentEmails.length).fill(false);

  document.getElementById("difficulty").innerText = "Difficulty: " + level;
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  document.getElementById("strikes").innerText = "Strikes: 0 / 3";

  renderEmailList();
}

// ================= SIDEBAR =================
function renderEmailList() {
  const list = document.getElementById("email-list");
  list.innerHTML = "";

  currentEmails.forEach((email, index) => {
    const li = document.createElement("li");
    li.innerText = email.subject || "(No Subject)";

    if (!answered[index]) {
      li.onclick = () => openEmail(index);
    } else {
      li.style.opacity = "0.5";
    }

    list.appendChild(li);
  });
}

// ================= OPEN EMAIL =================
function openEmail(index) {
  currentIndex = index;
  const email = currentEmails[index];

  document.getElementById("email-subject").innerText = email.subject;
  document.getElementById("email-body").innerText =
    "From: " + email.from + "\n" +
    "Subject: " + email.subject + "\n\n" +
    email.body;

  document.getElementById("actions").classList.remove("hidden");

  clearFeedback();
  highlightSelected(index);
}

// ================= ANSWER =================
function answer(choice) {
  const email = currentEmails[currentIndex];

  if (answered[currentIndex]) return;

  let correct = (choice === email.correct);

  if (!correct) {
    strikes++;
    document.getElementById("strikes").innerText = "Strikes: " + strikes + " / 3";

    if (strikes >= 3) {
      endGame(false);
      return;
    }
  }

  showFeedback(correct, email.explanation);

  answered[currentIndex] = true;

  renderEmailList();
  document.getElementById("actions").classList.add("hidden");

  checkWin();
}

// ================= FEEDBACK =================
function showFeedback(correct, explanation) {
  const content = document.getElementById("content");

  let feedback = document.getElementById("feedback");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.id = "feedback";
    content.appendChild(feedback);
  }

  feedback.innerHTML =
    (correct ? "✅ Correct\n\n" : "❌ Incorrect\n\n") +
    explanation;

  feedback.style.marginTop = "20px";
  feedback.style.padding = "15px";
  feedback.style.borderRadius = "6px";
  feedback.style.background = correct ? "#d4edda" : "#f8d7da";
}

function clearFeedback() {
  const feedback = document.getElementById("feedback");
  if (feedback) feedback.remove();
}

// ================= OTHER =================
function highlightSelected(index) {
  const items = document.querySelectorAll("#email-list li");
  items.forEach((li, i) => {
    li.classList.toggle("selected", i === index);
  });
}

function checkWin() {
  if (answered.every(a => a)) {
    endGame(true);
  }
}

function endGame(win) {
  document.getElementById("app").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");

  document.getElementById("end-message").innerText =
    win ? "🎉 Inbox Cleared!" : "💀 Game Over!";
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
