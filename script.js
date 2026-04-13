let emails = {};
let currentEmails = [];
let selectedEmail = null;
let strikes = 0;
let locked = false;

/* =========================
   DATASET (WITH EXPLANATIONS RESTORED)
========================= */

emails = {

/* ================= NOVICE ================= */
novice: [
{
subject: "Team Meeting Reminder",
from: "Laura Bennett <laura.bennett@northfieldadmin.net>",
time: "Mon 9:00 AM",
body:
`Hello team,

Reminder that we have a meeting tomorrow at 10 AM to discuss project updates.

Best regards,
Laura Bennett`,
correct: true,
explanation: "Clear, polite, and professionally structured communication with a specific time and purpose."
},
{
subject: "Weekly Update",
from: "James Carter <james.carter@clearviewops.com>",
time: "Mon 10:00 AM",
body:
`Hello,

Project is progressing as expected this week.

Regards,
James Carter`,
correct: true,
explanation: "Concise progress update with neutral tone and no ambiguity or unnecessary detail."
},
{
subject: "Office Hours",
from: "HR Team <hr@silverlinecorp.net>",
time: "Mon 11:00 AM",
body:
`Hi all,

Office hours are 9 AM to 5 PM, Monday through Friday.

Thanks,
HR Team`,
correct: true,
explanation: "Straightforward informational message with clear structure and no informal language."
},
{
subject: "Meeting Confirmation",
from: "Sophie Turner <sophie.turner@brightpathconsulting.io>",
time: "Mon 1:00 PM",
body:
`Hello,

Confirming our meeting on Thursday at 2 PM.

Best,
Sophie Turner`,
correct: true,
explanation: "Direct confirmation email with proper tone and no extraneous content."
},
{
subject: "Monthly Reports",
from: "Daniel Scott <daniel.scott@northbridgeconsulting.net>",
time: "Mon 3:00 PM",
body:
`Hi team,

Please send monthly reports by Friday.

Regards,
Daniel Scott`,
correct: true,
explanation: "Clear instruction with deadline and professional phrasing."
},

/* INAPPROPRIATE */
{
subject: "Project update",
from: "operations@northfieldadmin.net",
time: "Mon 9:20 AM",
body:
`Hi team,

Just checking if there are any updates to the project timeline for planning purposes.

Thanks,
Operations`,
correct: false,
explanation: "Unnecessary check-in that assumes uncertainty and pressures for updates without cause."
},
{
subject: "Quick question",
from: "manager@clearviewops.com",
time: "Mon 10:40 AM",
body:
`Hi,

Are we still aligned with delivery expectations for this week?

Regards,
Manager`,
correct: false,
explanation: "Introduces doubt about delivery without context, creating unnecessary concern."
},
{
subject: "Follow-up",
from: "lead@northbridgeconsulting.net",
time: "Mon 11:30 AM",
body:
`Hello,

Just following up on current progress when you have a moment.

Best,
Lead`,
correct: false,
explanation: "Generic follow-up that adds no value or actionable information."
},
{
subject: "Update request",
from: "hr@silverlinecorp.net",
time: "Mon 1:45 PM",
body:
`Hi,

Could you share a brief status update when available?

Thanks,
HR`,
correct: false,
explanation: "Redundant request lacking urgency or justification for interruption."
},
{
subject: "Checking in",
from: "support@clearviewops.com",
time: "Mon 2:30 PM",
body:
`Hello,

Checking in on current progress.

Regards,
Support Team`,
correct: false,
explanation: "Vague and non-actionable message that does not specify what is needed."
}
]

};

/* =========================
   START GAME
========================= */
window.startGame = function (difficulty) {
  currentEmails = shuffle([...emails[difficulty]]);
  strikes = 0;
  locked = false;
  selectedEmail = null;

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("app").style.display = "block";

  document.getElementById("strikes").innerText = "Strikes: 0 / 3";

  renderInbox();
};

/* =========================
   INBOX
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
   LOAD EMAIL + EXPLANATION BOX RESET
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
   ANSWER + EXPLANATION BOX
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
    setTimeout(endGame, 800);
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
