let currentEmails = [];
let currentIndex = 0;
let strikes = 0;
let answered = [];
let awaitingNext = false;

// ================= EMAIL DATA =================
const emails = {
  novice: [
    {from:"Emily Carter <ecarter@northironridge.com>",subject:"Request to Schedule Meeting",body:"Dear Mr. Thompson,\n\nI hope you are doing well. I would like to schedule a meeting this week to discuss the project timeline.\n\nPlease let me know your availability.\n\nBest regards,\nEmily Carter",correct:true,explanation:"The email uses a polite tone and clearly states its purpose. It includes a proper greeting and professional closing."},
    {from:"Daniel Lee <dlee@valewoodtech.com>",subject:"Thank You",body:"Hello Ms. Rivera,\n\nThank you for your assistance earlier today. I appreciate your support.\n\nSincerely,\nDaniel Lee",correct:true,explanation:"This message expresses appreciation clearly and maintains a professional tone. It is concise and well-structured."},

    {from:"unknown@unknown.com",subject:"meeting",body:"hey can we meet",correct:false,explanation:"The message is too informal and lacks proper capitalization. It does not follow basic professional email structure."},
    {from:"manager@northironridge.com",subject:"URGENT",body:"WHY HAVENT YOU DONE THIS",correct:false,explanation:"Using all caps makes the message appear aggressive. Professional emails should maintain a calm and respectful tone."}
  ],

  intermediate: [
    {from:"Karen Mitchell <kmitchell@bluecorefinance.com>",subject:"Weekly Project Update",body:"Dear Team,\n\nI wanted to provide a brief update. We are currently on track and progressing as scheduled.\n\nBest regards,\nKaren Mitchell",correct:true,explanation:"The email is clear, neutral, and informative. It communicates updates professionally without unnecessary detail."},

    {from:"manager@halcyonlogistics.com",subject:"Update",body:"I already explained this earlier. Please check.",correct:false,explanation:"The tone is dismissive and may frustrate the recipient. Professional emails should remain courteous and helpful."}
  ],

  expert: [
    {from:"Angela Foster <afoster@bluecorefinance.com>",subject:"Quarterly Financial Summary",body:"Dear Board Members,\n\nBelow is a summary of our financial performance for the past quarter.\n\nKind regards,\nAngela Foster\nChief Financial Officer",correct:true,explanation:"This email is appropriately formal for an executive audience. It is concise while maintaining professionalism."},

    {from:"exec@halcyonlogistics.com",subject:"Financials",body:"Here are the numbers.",correct:false,explanation:"The message is too vague and lacks context. Executive communication should be more detailed and structured."}
  ]
};

// ================= GAME LOGIC =================

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
}

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

function openEmail(index) {
  if (awaitingNext) return;

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

// ================= IMPROVED FEEDBACK =================
function showFeedback(correct, explanation) {
  const content = document.getElementById("content");

  let feedback = document.getElementById("feedback");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.id = "feedback";
    content.appendChild(feedback);
  }

  feedback.innerHTML = `
    <div style="font-weight:bold; font-size:18px; margin-bottom:10px;">
      ${correct ? "✅ Correct" : "❌ Incorrect"}
    </div>

    <hr style="margin:10px 0;">

    <div style="line-height:1.5; margin-bottom:15px;">
      ${explanation}
    </div>
  `;

  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Next Email";
  nextBtn.onclick = nextEmail;

  feedback.appendChild(nextBtn);

  feedback.style.marginTop = "20px";
  feedback.style.padding = "20px";
  feedback.style.borderRadius = "8px";
  feedback.style.background = correct ? "#e6f4ea" : "#fdecea";
  feedback.style.border = correct ? "1px solid #b7e1cd" : "1px solid #f5c6cb";
}

function nextEmail() {
  awaitingNext = false;

  if (answered.every(a => a)) {
    endGame(true);
    return;
  }

  document.getElementById("email-subject").innerText = "Select an email";
  document.getElementById("email-body").innerText = "";
  clearFeedback();
}

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
