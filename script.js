let emails = [];
let current = [];
let index = 0;
let strikes = 0;
let answered = [];
let locked = false;

/* =========================
   SHUFFLE FUNCTION
========================= */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/* =========================
   EMAIL DATASET (5 CORRECT / 5 INCORRECT)
========================= */

emails = [
{
subject: "Team Meeting Reminder",
from: "Laura Bennett <laura.bennett@northfieldadmin.net>",
time: "Mon 9:00 AM",
body: `Hello team,

Please join us tomorrow at 10 AM for a brief meeting to review project goals.

Best regards,
Laura Bennett`,
correct: true,
explanation: { points: ["Clear purpose and structure.", "Professional tone.", "Proper greeting and closing."] }
},
{
subject: "Weekly Status Update",
from: "James Carter <james.carter@clearviewops.com>",
time: "Mon 10:00 AM",
body: `Hello,

Project progress remains on track and milestones are being met.

Regards,
James Carter`,
correct: true,
explanation: { points: ["Concise update.", "Neutral tone.", "Professional clarity."] }
},
{
subject: "Office Hours Reminder",
from: "HR Team <hr@silverlinecorp.net>",
time: "Mon 11:00 AM",
body: `Hi all,

Office hours are 9 AM to 5 PM, Monday through Friday.

Thank you,
HR Team`,
correct: true,
explanation: { points: ["Clear informational message.", "No unnecessary detail.", "Professional format."] }
},
{
subject: "Meeting Confirmation",
from: "Sophie Turner <sophie.turner@brightpathconsulting.io>",
time: "Mon 1:00 PM",
body: `Hello,

Confirming our meeting scheduled for Thursday at 2 PM.

Best,
Sophie Turner`,
correct: true,
explanation: { points: ["Simple confirmation.", "Professional tone.", "Clear scheduling."] }
},
{
subject: "Monthly Reports Request",
from: "Daniel Scott <daniel.scott@northbridgeconsulting.net>",
time: "Mon 3:00 PM",
body: `Dear team,

Please submit monthly reports by end of week.

Regards,
Daniel Scott`,
correct: true,
explanation: { points: ["Clear instruction.", "Respectful tone.", "Unambiguous deadline."] }
},

/* =========================
   INCORRECT EMAILS
========================= */

{
subject: "DO THIS NOW",
from: "unknown@temp-mail.xyz",
time: "Mon 9:15 AM",
body: `fix this immediately`,
correct: false,
explanation: { points: ["Aggressive tone.", "No greeting or structure.", "Unprofessional communication."] }
},
{
subject: "Why is this not done?",
from: "boss@randommail.biz",
time: "Mon 10:30 AM",
body: `this should already be finished`,
correct: false,
explanation: { points: ["Blaming tone.", "No context.", "Unprofessional phrasing."] }
},
{
subject: "URGENT!!!",
from: "admin@spamdomain.xyz",
time: "Mon 11:45 AM",
body: `fix it now`,
correct: false,
explanation: { points: ["Excessive urgency.", "No structure.", "No professionalism."] }
},
{
subject: "???",
from: "user@unknown.io",
time: "Mon 1:30 PM",
body: `why is this wrong`,
correct: false,
explanation: { points: ["Unclear intent.", "No context.", "Informal complaint style."] }
},
{
subject: "Send it now!!!!",
from: "manager@fakecorp.net",
time: "Mon 2:00 PM",
body: `send it now`,
correct: false,
explanation: { points: ["Commanding tone.", "No structure.", "Unprofessional urgency."] }
}
];

/* =========================
   START GAME
========================= */
function startGame() {
  current = shuffle([...emails]);
  strikes = 0;
  index = 0;
  locked = false;
  answered = new Array(current.length).fill(false);

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("app").style.display = "block";

  document.getElementById("strikes").textContent = "Strikes: 0 / 3";

  renderInbox();
  openEmail(0);
}

/* =========================
   INBOX
========================= */
function renderInbox() {
  const list = document.getElementById("email-list");
  list.innerHTML = "";

  current.forEach((e, i) => {
    const li = document.createElement("li");
    li.textContent = e.subject;

    if (answered[i]) li.style.opacity = "0.4";

    li.onclick = () => openEmail(i);

    list.appendChild(li);
  });
}

/* =========================
   OPEN EMAIL
========================= */
function openEmail(i) {
  index = i;
  locked = false;

  const e = current[i];

  document.getElementById("email-subject").innerHTML = `
    <div style="font-size:20px; font-weight:600;">${e.subject}</div>
    <div style="font-size:13px; color:#666; margin-top:4px;">
      From: ${e.from} | Time: ${e.time}
    </div>
  `;

  document.getElementById("email-body").textContent = e.body;

  const fb = document.getElementById("feedback");
  fb.className = "";
  fb.innerHTML = "";
}

/* =========================
   ANSWER
========================= */
function answer(choice) {
  if (locked) return;
  locked = true;

  const e = current[index];
  const correct = choice === e.correct;

  if (!correct) strikes++;

  answered[index] = true;

  const fb = document.getElementById("feedback");
  fb.className = correct ? "good" : "bad";

  fb.innerHTML = `
    <div style="font-weight:700; margin-bottom:10px;">
      ${correct ? "CORRECT" : "INCORRECT"}
    </div>
    <ul style="margin:0; padding-left:18px;">
      ${e.explanation.points.map(p => `<li>${p}</li>`).join("")}
    </ul>
    <br>
    <button onclick="nextEmail()">Next Email</button>
  `;

  document.getElementById("strikes").textContent = `Strikes: ${strikes} / 3`;

  renderInbox();

  if (strikes >= 3) gameOver(false);
}

/* =========================
   NEXT EMAIL
========================= */
function nextEmail() {
  const next = answered.findIndex(a => a === false);
  if (next === -1) return gameOver(true);
  openEmail(next);
}

/* =========================
   GAME OVER
========================= */
function gameOver(win) {
  document.getElementById("app").style.display = "none";
  document.getElementById("end-screen").style.display = "flex";

  document.getElementById("end-message").textContent =
    win ? "Inbox Cleared!" : "Game Over";
}
