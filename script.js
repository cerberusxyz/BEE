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
subject: "Project Kickoff Schedule",
from: "Laura Bennett <laura.bennett@northfieldadmin.net>",
time: "Mon 9:00 AM",
body: `Hello team,

The project kickoff meeting is scheduled for tomorrow at 10 AM. Please review the attached agenda beforehand.

Best regards,
Laura Bennett`,
correct: true,
explanation: { points: ["Clear scheduling and intent.", "Professional tone.", "Actionable instruction included."] }
},

{
subject: "Weekly Progress Update",
from: "James Carter <james.carter@clearviewops.com>",
time: "Mon 10:00 AM",
body: `Hi,

Progress remains steady this week, and we are on track to meet the upcoming milestone.

Regards,
James Carter`,
correct: true,
explanation: { points: ["Concise reporting.", "Neutral tone.", "No ambiguity."] }
},

{
subject: "Office Policy Reminder",
from: "HR Team <hr@silverlinecorp.net>",
time: "Mon 11:00 AM",
body: `Hi all,

A reminder that office hours are 9 AM to 5 PM, Monday through Friday. Please ensure attendance records are updated accordingly.

Thank you,
HR Team`,
correct: true,
explanation: { points: ["Clear policy communication.", "Professional tone.", "Structured formatting."] }
},

{
subject: "Client Meeting Confirmation",
from: "Sophie Turner <sophie.turner@brightpathconsulting.io>",
time: "Mon 1:00 PM",
body: `Hello,

This is to confirm our client meeting scheduled for Thursday at 2 PM. Let me know if any adjustments are needed.

Best,
Sophie Turner`,
correct: true,
explanation: { points: ["Clear confirmation.", "Professional courtesy.", "Open communication."] }
},

{
subject: "Monthly Reporting Deadline",
from: "Daniel Scott <daniel.scott@northbridgeconsulting.net>",
time: "Mon 3:00 PM",
body: `Dear team,

Please ensure all monthly reports are submitted by Friday 5 PM for consolidation.

Regards,
Daniel Scott`,
correct: true,
explanation: { points: ["Clear deadline.", "Respectful tone.", "Action-oriented."] }
},

{
subject: "System Maintenance Notice",
from: "IT Support <it.support@corelinksystems.io>",
time: "Tue 8:00 AM",
body: `Hello,

Scheduled system maintenance will occur tonight between 11 PM and 1 AM. Services may be temporarily unavailable.

Regards,
IT Support`,
correct: true,
explanation: { points: ["Clear notice.", "Appropriate warning.", "Professional clarity."] }
},

{
subject: "Team Availability Check",
from: "Operations Lead <ops.lead@clearviewops.com>",
time: "Tue 10:30 AM",
body: `Hi team,

Please confirm your availability for next week’s planning session by end of day.

Thanks,
Operations Lead`,
correct: true,
explanation: { points: ["Simple request.", "Clear deadline.", "Professional tone."] }
},

{
subject: "Document Review Request",
from: "Mark Evans <mark.evans@northbridgeconsulting.net>",
time: "Tue 1:15 PM",
body: `Dear colleague,

Could you please review the attached document and provide feedback by Thursday?

Best regards,
Mark Evans`,
correct: true,
explanation: { points: ["Polite request.", "Clear expectation.", "Structured communication."] }
},

{
subject: "Quarterly Summary Draft",
from: "Emily Carter <emily.carter@brightwave-solutions.com>",
time: "Wed 9:00 AM",
body: `Hello,

Attached is the draft quarterly summary for your review. Please suggest any edits before final submission.

Regards,
Emily Carter`,
correct: true,
explanation: { points: ["Clear purpose.", "Collaborative tone.", "Actionable request."] }
},

{
subject: "Training Session Reminder",
from: "HR Training <training@silverlinecorp.net>",
time: "Wed 11:30 AM",
body: `Hi all,

This is a reminder for tomorrow’s mandatory training session at 2 PM in Conference Room B.

Thank you,
HR Training`,
correct: true,
explanation: { points: ["Clear reminder.", "Specific details.", "Professional tone."] }
},

/* =========================
   INCORRECT EMAILS (10)
========================= */

{
subject: "why isn't this done yet",
from: "unknown@temp-mail.xyz",
time: "Mon 9:10 AM",
body: `this should have been finished already`,
correct: false,
explanation: { points: ["Blaming tone.", "No context or clarity.", "Unprofessional phrasing."] }
},

{
subject: "URGENT FIX THIS",
from: "boss@randommail.biz",
time: "Mon 10:20 AM",
body: `fix it now`,
correct: false,
explanation: { points: ["Excessive urgency.", "No structure.", "Commanding tone."] }
},

{
subject: "???",
from: "user@unknown.io",
time: "Mon 11:05 AM",
body: `what is going on`,
correct: false,
explanation: { points: ["Unclear intent.", "No context.", "Informal complaint style."] }
},

{
subject: "send update NOW",
from: "manager@fakecorp.net",
time: "Mon 1:00 PM",
body: `send update immediately`,
correct: false,
explanation: { points: ["Demanding tone.", "No greeting.", "Lacks professionalism."] }
},

{
subject: "this makes no sense",
from: "user@spamdomain.xyz",
time: "Mon 2:30 PM",
body: `fix your work`,
correct: false,
explanation: { points: ["Vague criticism.", "No constructive feedback.", "Unprofessional tone."] }
},

{
subject: "respond!!!!",
from: "admin@randommail.xyz",
time: "Tue 9:00 AM",
body: `answer me now`,
correct: false,
explanation: { points: ["Aggressive urgency.", "No structure.", "Poor communication style."] }
},

{
subject: "why delay",
from: "boss@temp-mail.io",
time: "Tue 10:15 AM",
body: `this is taking too long`,
correct: false,
explanation: { points: ["Passive-aggressive tone.", "No detail.", "Unprofessional framing."] }
},

{
subject: "fix immediately",
from: "unknown@trashmail.net",
time: "Tue 11:45 AM",
body: `broken fix now`,
correct: false,
explanation: { points: ["Commanding tone.", "No clarity.", "No professionalism."] }
},

{
subject: "status???",
from: "user@fake.io",
time: "Wed 9:20 AM",
body: `update?`,
correct: false,
explanation: { points: ["Too vague.", "No context.", "Non-professional communication."] }
},

{
subject: "do better",
from: "manager@spamcorp.net",
time: "Wed 1:40 PM",
body: `this is unacceptable`,
correct: false,
explanation: { points: ["Blunt criticism.", "No explanation.", "Unconstructive feedback."] }
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
