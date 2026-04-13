let currentEmails = [];
let currentIndex = 0;
let strikes = 0;
let answered = [];
let awaitingNext = false;

// ================= EMAIL DATA =================
const emails = {
  novice: [
    {from:"Emily Carter <ecarter@northironridge.com>",subject:"Request to Schedule Meeting",body:"Dear Mr. Thompson,\n\nI hope you are doing well. I would like to schedule a meeting this week to discuss the project timeline.\n\nPlease let me know your availability.\n\nBest regards,\nEmily Carter",correct:true,explanation:"The email is polite, structured, and clearly communicates its purpose."},
    {from:"Daniel Lee <dlee@valewoodtech.com>",subject:"Thank You",body:"Hello Ms. Rivera,\n\nThank you for your assistance earlier today.\n\nSincerely,\nDaniel Lee",correct:true,explanation:"This message is professional and appropriately expresses gratitude."},

    {from:"unknown@unknown.com",subject:"meeting",body:"hey can we meet",correct:false,explanation:"The email is too informal and lacks proper structure and professionalism."},
    {from:"manager@northironridge.com",subject:"URGENT",body:"WHY HAVENT YOU DONE THIS",correct:false,explanation:"All caps creates an aggressive tone and is not professional."}
  ],

  intermediate: [
    {from:"Karen Mitchell <kmitchell@bluecorefinance.com>",subject:"Weekly Project Update",body:"Dear Team,\n\nWe are currently on track with the project timeline.\n\nBest regards,\nKaren Mitchell",correct:true,explanation:"Clear and professional update with appropriate tone."},

    {from:"manager@halcyonlogistics.com",subject:"Update",body:"I already told you this. Please check.",correct:false,explanation:"The tone is dismissive and not constructive."}
  ],

  expert: [
    {from:"Angela Foster <afoster@bluecorefinance.com>",subject:"Quarterly Financial Summary",body:"Dear Board Members,\n\nPlease find the quarterly summary below.\n\nKind regards,\nAngela Foster",correct:true,explanation:"Appropriate formal communication for executive audience."},

    {from:"exec@halcyonlogistics.com",subject:"Financials",body:"Here are the numbers.",correct:false,explanation:"Too vague and lacks executive-level clarity."}
  ]
};

// ================= GAME START =================

function startGame(level) {
  currentEmails = shuffle([...emails[level]]);
  strikes = 0;
  answered = new Array(currentEmails.length).fill(false);
  awaitingNext = false;

  document.getElementById("difficulty").innerText = "Difficulty: " + level;
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  document.getElementById("strikes").innerText = "Strikes: 0 / 3";

  renderEmailList();
  openFirstAvailableEmail();
}

// ================= EMAIL LIST =================

function renderEmailList() {
  const list = document.getElementById("email-list");
  list.innerHTML = "";

  currentEmails.forEach((email, index) => {
    const li = document.createElement("li");
    li.innerText = email.subject || "(No Subject)";

    if (!answered[index]) {
      li.onclick = () => openEmail(index);
    } else {
      li.style.opacity = "0.4";
    }

    list.appendChild(li);
  });
}

// ================= OPEN EMAIL =================

function openEmail(index) {
  if (awaitingNext || answered[index]) return;

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

// ================= AUTO OPEN NEXT =================

function openFirstAvailableEmail() {
  const nextIndex = currentEmails.findIndex((_, i) => !answered[i]);

  if (nextIndex === -1) {
    endGame(true);
    return;
  }

  openEmail(nextIndex);
}

// ================= ANSWER =================

function answer(choice) {
  if (awaitingNext) return;

  const email = currentEmails[currentIndex];
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
  awaitingNext = true;

  renderEmailList();
  document.getElementById("actions").classList.add("hidden");
}

// ================= NEXT EMAIL (FIXED) =================

function nextEmail() {
  awaitingNext = false;

  clearFeedback();

  // Remove current email from "active flow"
  const nextIndex = currentEmails.findIndex((_, i) => !answered[i]);

  if (nextIndex === -1) {
    endGame(true);
    return;
  }

  openEmail(nextIndex);
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

  feedback.innerHTML = `
    <div style="font-weight:bold; font-size:18px;">
      ${correct ? "✅ Correct" : "❌ Incorrect"}
    </div>

    <hr style="margin:10px 0;">

    <div style="line-height:1.5;">
      ${explanation}
    </div>
  `;

  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Next Email";
  nextBtn.onclick = nextEmail;

  feedback.appendChild(document.createElement("br"));
  feedback.appendChild(nextBtn);

  feedback.style.marginTop = "20px";
  feedback.style.padding = "18px";
  feedback.style.borderRadius = "8px";
  feedback.style.background = correct ? "#e6f4ea" : "#fdecea";
  feedback.style.border = correct ? "1px solid #b7e1cd" : "1px solid #f5c6cb";
}

// ================= HELPERS =================

function clearFeedback() {
  const feedback = document.getElementById("feedback");
  if (feedback) feedback.remove();
}

function highlightSelected(index) {
  const items = document.querySelectorAll("#email-list li");
  items.forEach((li, i) => {
    li.classList.toggle("selected", i === index);
  });
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
