let emails = [];
let currentEmails = [];
let selectedEmail = null;
let strikes = 0;
let locked = false;

/* =========================
   SHUFFLE
========================= */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* =========================
   FULL EMAIL POOL (NO DIFFICULTY SPLIT)
========================= */

emails = [
{
subject: "Team Meeting Reminder",
from: "Laura Bennett <laura.bennett@northfieldadmin.net>",
time: "Mon 9:00 AM",
body: `Hello team,\n\nReminder that we have a meeting tomorrow at 10 AM.\n\nBest regards,\nLaura Bennett`,
correct: true,
explanation: "Clear, professional meeting reminder with appropriate tone and structure."
},
{
subject: "Weekly Update",
from: "James Carter <james.carter@clearviewops.com>",
time: "Mon 10:00 AM",
body: `Hello,\n\nProject is progressing as expected.\n\nRegards,\nJames Carter`,
correct: true,
explanation: "Concise and professional status update with no ambiguity."
},
{
subject: "Office Hours",
from: "HR Team <hr@silverlinecorp.net>",
time: "Mon 11:00 AM",
body: `Hi all,\n\nOffice hours are 9 AM to 5 PM.\n\nThanks,\nHR`,
correct: true,
explanation: "Clear informational HR communication."
},
{
subject: "Meeting Confirmation",
from: "Sophie Turner <sophie.turner@brightpathconsulting.io>",
time: "Mon 1:00 PM",
body: `Hello,\n\nConfirming our meeting on Thursday at 2 PM.\n\nBest,\nSophie`,
correct: true,
explanation: "Direct confirmation with professional tone."
},
{
subject: "Monthly Reports",
from: "Daniel Scott <daniel.scott@northbridgeconsulting.net>",
time: "Mon 3:00 PM",
body: `Hi team,\n\nPlease send reports by Friday.\n\nRegards,\nDaniel`,
correct: true,
explanation: "Clear instruction with deadline."
},

{
subject: "Project update?",
from: "ops@northfieldadmin.net",
time: "Mon 9:20 AM",
body: `Hi team,\n\nAny updates on timeline?\n\nThanks`,
correct: false,
explanation: "Unnecessary check-in without context or justification."
},
{
subject: "Quick question",
from: "manager@clearviewops.com",
time: "Mon 10:40 AM",
body: `Hi,\n\nAre we still on track this week?\n\nRegards`,
correct: false,
explanation: "Creates doubt without evidence or context."
},
{
subject: "Follow-up",
from: "lead@northbridgeconsulting.net",
time: "Mon 11:30 AM",
body: `Hello,\n\nFollowing up on progress.\n\nBest`,
correct: false,
explanation: "Generic follow-up with no actionable detail."
},
{
subject: "Update request",
from: "hr@silverlinecorp.net",
time: "Mon 1:45 PM",
body: `Hi,\n\nSend status update when possible.\n\nThanks`,
correct: false,
explanation: "Vague and unnecessary interruption."
},
{
subject: "Checking in",
from: "support@clearviewops.com",
time: "Mon 2:30 PM",
body: `Hello,\n\nChecking in on progress.\n\nRegards`,
correct: false,
explanation: "Non-specific and redundant request."
}
];

/* =========================
   START GAME
========================= */
window.startGame = function () {

  currentEmails = shuffle([...emails]);
  strikes = 0;
  locked = false;
  selectedEmail = null;

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("app").style.display = "block";

  document.getElementById("strikes").innerText = "Strikes: 0 / 3";

  renderInbox();
};

/* =========================
   INBOX RENDER
========================= */
function renderInbox() {
  const list = document.getElementById("email-list");
  list.innerHTML = "";

  currentEmails.forEach((email) => {
    const li = document.createElement("li");
    li.textContent = email.subject;

    li.onclick = () => {
      selectedEmail = email;
      loadEmail(email);
    };

    list.appendChild(li);
  });
}

/* =========================
   LOAD EMAIL
========================= */
function loadEmail(email) {
  document.getElementById("email-subject").innerText = email.subject;

  document.getElementById("email-body").innerText =
`From: ${email.from}
Time: ${email.time}

${email.body}`;

  const feedback = document.getElementById("feedback");
  if (feedback) {
    feedback.innerHTML = "";
    feedback.className = "";
  }

  document.getElementById("actions").style.display = "block";
}

/* =========================
   ANSWER
========================= */
window.answer = function (isCorrect) {
  if (!selectedEmail || locked) return;
  locked = true;

  const feedback = document.getElementById("feedback");

  const correct = isCorrect === selectedEmail.correct;

  if (!correct) {
    strikes++;
    document.getElementById("strikes").innerText = `Strikes: ${strikes} / 3`;
  }

  if (feedback) {
    feedback.className = correct ? "correct-box" : "incorrect-box";
    feedback.innerHTML = `
      <strong>${correct ? "Correct" : "Incorrect"}</strong><br><br>
      ${selectedEmail.explanation}
    `;
  }

  currentEmails = currentEmails.filter(e => e !== selectedEmail);
  selectedEmail = null;

  renderInbox();

  locked = false;

  if (strikes >= 3 || currentEmails.length === 0) {
    setTimeout(endGame, 700);
  }
};

/* =========================
   END GAME
========================= */
function endGame() {
  document.getElementById("app").style.display = "none";
  document.getElementById("end-screen").style.display = "block";

  document.getElementById("end-message").innerText =
    strikes >= 3 ? "Game Over" : "Inbox Cleared!";
}
