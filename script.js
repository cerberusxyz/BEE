let emails = {};
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
   EMAIL DATASET (IMPROVED DIFFICULTY SCALING)
   ========================= */

emails = {

/* ================= NOVICE ================= */
novice: [

/* APPROPRIATE (5) */
{
subject: "Team Introduction Meeting",
from: "Laura Bennett <laura.bennett@northfieldadmin.net>",
time: "Mon 9:00 AM",
body:
`Hello team,

Please join us tomorrow at 10 AM for a brief introduction meeting to review project goals.

Best regards,
Laura Bennett`,
correct: true,
explanation: { points: ["Clear purpose and structure.", "Professional tone throughout.", "Appropriate greeting and closing."] }
},
{
subject: "Weekly Status Update",
from: "James Carter <james.carter@clearviewops.com>",
time: "Mon 10:00 AM",
body:
`Hello,

Project progress remains on track and milestones are being met.

Regards,
James Carter`,
correct: true,
explanation: { points: ["Concise and neutral update.", "No emotional language.", "Appropriate workplace tone."] }
},
{
subject: "Office Hours Reminder",
from: "HR Team <hr@silverlinecorp.net>",
time: "Mon 11:00 AM",
body:
`Hi all,

Office hours are 9 AM to 5 PM, Monday through Friday.

Thank you,
HR Team`,
correct: true,
explanation: { points: ["Clear informational message.", "No unnecessary detail.", "Professional formatting."] }
},
{
subject: "Meeting Confirmation",
from: "Sophie Turner <sophie.turner@brightpathconsulting.io>",
time: "Mon 1:00 PM",
body:
`Hello,

Confirming our meeting scheduled for Thursday at 2 PM.

Best,
Sophie Turner`,
correct: true,
explanation: { points: ["Simple confirmation.", "Appropriate tone.", "Professional clarity."] }
},
{
subject: "Monthly Reports",
from: "Daniel Scott <daniel.scott@northbridgeconsulting.net>",
time: "Mon 3:00 PM",
body:
`Dear team,

Please submit monthly reports by end of week.

Regards,
Daniel Scott`,
correct: true,
explanation: { points: ["Clear instruction.", "Respectful tone.", "No ambiguity."] }
},

/* INAPPROPRIATE (5) */
{
subject: "do this NOW",
from: "unknown@temp-mail.xyz",
time: "Mon 9:15 AM",
body:`fix this immediately`,
correct: false,
explanation: { points: ["Aggressive tone.", "No greeting or structure.", "Unprofessional workplace behavior."] }
},
{
subject: "why not done yet",
from: "boss@randommail.biz",
time: "Mon 10:30 AM",
body:`this should already be finished`,
correct: false,
explanation: { points: ["Blaming tone.", "No context.", "Missing professionalism."] }
},
{
subject: "FIX IT",
from: "admin@spamdomain.xyz",
time: "Mon 11:45 AM",
body:`its broken fix it now`,
correct: false,
explanation: { points: ["Commanding tone.", "No structure.", "Not appropriate communication."] }
},
{
subject: "???",
from: "user@unknown.io",
time: "Mon 1:30 PM",
body:`why is this wrong`,
correct: false,
explanation: { points: ["Unclear message.", "No context.", "Informal complaint style."] }
},
{
subject: "send it now!!!!",
from: "manager@fakecorp.net",
time: "Mon 2:00 PM",
body:`send it now`,
correct: false,
explanation: { points: ["Excessive urgency.", "No formatting.", "Unprofessional tone."] }
}
],

/* ================= INTERMEDIATE ================= */
intermediate: [

/* APPROPRIATE (5) */
{
subject: "System Deployment Summary",
from: "Daniel Reed <daniel.reed@corelinksystems.io>",
time: "Tue 2:30 PM",
body:
`Hello team,

Deployment completed successfully and all services are stable.

Kind regards,
Daniel Reed`,
correct: true,
explanation: { points: ["Professional technical summary.", "Clear and concise.", "Neutral tone maintained."] }
},
{
subject: "Milestone Progress Update",
from: "Emily Carter <emily.carter@brightwave-solutions.com>",
time: "Tue 11:00 AM",
body:
`Hello,

We have completed milestone 2 and are moving into testing.

Regards,
Emily Carter`,
correct: true,
explanation: { points: ["Clear project status.", "Structured communication.", "Professional tone."] }
},
{
subject: "Client Follow-Up",
from: "Mark Evans <mark.evans@northbridgeconsulting.net>",
time: "Tue 1:00 PM",
body:
`Dear client,

Following up on our previous discussion regarding project scope.

Best regards,
Mark Evans`,
correct: true,
explanation: { points: ["Professional follow-up.", "Appropriate tone.", "Clear intent."] }
},
{
subject: "Meeting Summary",
from: "Olivia Grant <olivia.grant@clearviewops.com>",
time: "Tue 3:00 PM",
body:
`Hi all,

Please find a summary of today's discussion and action items.

Regards,
Olivia Grant`,
correct: true,
explanation: { points: ["Clear summary format.", "Professional tone.", "Structured communication."] }
},
{
subject: "Task Redistribution Notice",
from: "HR Ops <hr.ops@silverlinecorp.net>",
time: "Tue 4:00 PM",
body:
`Hello team,

Tasks have been redistributed based on current workload and availability.

Thanks,
HR`,
correct: true,
explanation: { points: ["Neutral HR communication.", "Clear intent.", "Professional structure."] }
},

/* INAPPROPRIATE (SUBTLE / PASSIVE AGGRESSIVE) */
{
subject: "Quick question about timeline",
from: "unknown@tempmail.xyz",
time: "Tue 9:00 AM",
body:`this is taking longer than expected`,
correct: false,
explanation: { points: ["Passive-aggressive tone.", "Lacks context.", "Unclear request intent."] }
},
{
subject: "Follow-up on previous work",
from: "user@random.biz",
time: "Tue 10:00 AM",
body:`just checking why this is delayed`,
correct: false,
explanation: { points: ["Implied blame.", "No constructive framing.", "Unprofessional undertone."] }
},
{
subject: "Urgent clarification needed",
from: "boss@fakecorp.io",
time: "Tue 11:30 AM",
body:`you need to respond immediately`,
correct: false,
explanation: { points: ["Commanding tone.", "Pressure-based wording.", "Lacks diplomacy."] }
},
{
subject: "Project concern",
from: "admin@spamcorp.net",
time: "Tue 1:15 PM",
body:`this is not going as planned`,
correct: false,
explanation: { points: ["Vague dissatisfaction.", "No actionable detail.", "Unclear expectation."] }
},
{
subject: "Response required",
from: "unknown@trashmail.io",
time: "Tue 2:45 PM",
body:`answer this now`,
correct: false,
explanation: { points: ["Demanding tone.", "No context.", "Unprofessional brevity."] }
}
],

/* ================= EXPERT ================= */
expert: [

/* APPROPRIATE (REALISTIC CORPORATE AMBIGUITY) */
{
subject: "Q3 Performance Overview",
from: "Olivia Bennett <olivia.bennett@aurorafinancialgroup.com>",
time: "Wed 8:00 AM",
body:
`Dear Team,

Q3 performance remains within expected variance, with modest efficiency gains observed in select departments.

Sincerely,
Olivia Bennett`,
correct: true,
explanation: { points: ["Executive neutrality.", "Appropriate ambiguity.", "Professional tone maintained."] }
},
{
subject: "Strategic Direction Update",
from: "Henry Collins <henry.collins@northfieldstrategy.com>",
time: "Wed 9:00 AM",
body:
`Dear colleagues,

We will proceed with revised Q4 priorities aligned to current market conditions.

Regards,
Henry Collins`,
correct: true,
explanation: { points: ["Strategic framing.", "Corporate tone.", "No informal language."] }
},
{
subject: "Board Summary Notes",
from: "Executive Office <exec@aurorafinancialgroup.com>",
time: "Wed 10:00 AM",
body:
`Dear Board Members,

Please find summarized outcomes from today's session for your review.

Sincerely,
Executive Office`,
correct: true,
explanation: { points: ["Formal executive communication.", "Appropriate vagueness.", "Concise structure."] }
},
{
subject: "Risk Review Update",
from: "Rachel Moore <rachel.moore@corelinksystems.io>",
time: "Wed 11:00 AM",
body:
`Hello,

Risk indicators have been updated to reflect recent market adjustments.

Regards,
Rachel Moore`,
correct: true,
explanation: { points: ["Professional analytical tone.", "Neutral wording.", "Appropriate abstraction level."] }
},
{
subject: "Annual Review Guidance",
from: "HR Executive <hr.exec@silverlinecorp.net>",
time: "Wed 1:00 PM",
body:
`Dear colleagues,

Please proceed with preparing annual review materials as outlined in the internal guidelines.

Regards,
HR Executive`,
correct: true,
explanation: { points: ["Formal HR communication.", "Indirect instruction style.", "Professional tone."] }
},

/* INAPPROPRIATE (SUBTLE EXECUTIVE MISSTEPS) */
{
subject: "FYI on performance notes",
from: "staff@internal-temp-mail.net",
time: "Wed 8:10 AM",
body:`some teams are underperforming based on recent metrics`,
correct: false,
explanation: { points: ["Unstructured internal critique.", "No proper escalation context.", "Risk of inappropriate informal reporting."] }
},
{
subject: "Quick alignment check",
from: "exec@randommail.xyz",
time: "Wed 9:30 AM",
body:`this direction doesn't seem optimal anymore`,
correct: false,
explanation: { points: ["Undermines prior decisions indirectly.", "No constructive alternative.", "Weak executive framing."] }
},
{
subject: "Need clarity on this",
from: "unknown@spam.io",
time: "Wed 10:15 AM",
body:`this approach is questionable`,
correct: false,
explanation: { points: ["Vague criticism.", "No actionable request.", "Unprofessional framing."] }
},
{
subject: "Concerns raised",
from: "manager@fakecorp.net",
time: "Wed 11:45 AM",
body:`this may not be the best direction`,
correct: false,
explanation: { points: ["Passive disagreement.", "Lacks justification.", "No clear recommendation."] }
},
{
subject: "Follow-up required",
from: "ceo@tempmail.biz",
time: "Wed 2:00 PM",
body:`why was this approach chosen`,
correct: false,
explanation: { points: ["Interrogative executive tone.", "Implied criticism.", "Lacks diplomatic framing."] }
}
]
};

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
   GAME LOGIC
   ========================= */

function toggleTheme() {
  document.body.classList.toggle("dark");
}

function startGame(level) {
  current = shuffle([...emails[level]]);
  strikes = 0;
  answered = new Array(current.length).fill(false);
  index = 0;

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("app").style.display = "block";

  renderInbox();
  openEmail(0);
}

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

function nextEmail() {
  const next = answered.findIndex(a => a === false);
  if (next === -1) return gameOver(true);
  openEmail(next);
}

function gameOver(win) {
  document.getElementById("app").style.display = "none";
  document.getElementById("end-screen").style.display = "flex";

  document.getElementById("end-message").textContent =
    win ? "Inbox Cleared!" : "Game Over";
}
