let emails = {};
let current = [];
let index = 0;
let strikes = 0;
let answered = [];
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
   EMAIL DATASET
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
explanation: { points: ["Clear and polite.", "Standard workplace tone.", "Simple structure."] }
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
explanation: { points: ["Clear status update.", "Neutral tone.", "Professional format."] }
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
explanation: { points: ["Clear information.", "Standard HR communication.", "No ambiguity."] }
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
explanation: { points: ["Direct confirmation.", "Professional tone.", "Clear intent."] }
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
explanation: { points: ["Clear request.", "Normal tone.", "Direct instruction."] }
},

/* INAPPROPRIATE (CLEAR BUT NOT OBVIOUS) */
{
subject: "Project update",
from: "operations@northfieldadmin.net",
time: "Mon 9:20 AM",
body:
`Hi team,

Just checking in—do we have an updated timeline for completion? We may need it for planning next steps.

Thanks,
Operations`,
correct: false,
explanation: { points: ["Premature request for updates.", "Assumes uncertainty.", "No clear reason provided."] }
},
{
subject: "Quick question",
from: "manager@clearviewops.com",
time: "Mon 10:40 AM",
body:
`Hi,

Are we still on track for delivery this week?

Regards,
Manager`,
correct: false,
explanation: { points: ["Assumes possible delay.", "No context.", "Creates unnecessary pressure."] }
},
{
subject: "Follow-up",
from: "lead@northbridgeconsulting.net",
time: "Mon 11:30 AM",
body:
`Hello,

Just following up on the current status of the task.

Best,
Lead`,
correct: false,
explanation: { points: ["Redundant follow-up.", "No added value.", "Slight impatience implied."] }
},
{
subject: "Update request",
from: "hr@silverlinecorp.net",
time: "Mon 1:45 PM",
body:
`Hi,

Can you send a quick update when you have time?

Thanks,
HR`,
correct: false,
explanation: { points: ["Unnecessary interruption.", "No urgency context.", "Poor timing."] }
},
{
subject: "Checking in",
from: "support@clearviewops.com",
time: "Mon 2:30 PM",
body:
`Hello,

Just checking in on progress.

Regards,
Support Team`,
correct: false,
explanation: { points: ["Too vague.", "No purpose.", "Unhelpful request."] }
}
],

/* ================= INTERMEDIATE ================= */
intermediate: [
{
subject: "Deployment Update",
from: "Daniel Reed <daniel.reed@corelinksystems.io>",
time: "Tue 2:30 PM",
body:
`Hello team,

Deployment was completed successfully and everything is running normally.

Kind regards,
Daniel Reed`,
correct: true,
explanation: { points: ["Clear update.", "No ambiguity.", "Professional tone."] }
},
{
subject: "Milestone Update",
from: "Emily Carter <emily.carter@brightwave-solutions.com>",
time: "Tue 11:00 AM",
body:
`Hello,

We have completed milestone 2 and are moving into testing.

Regards,
Emily Carter`,
correct: true,
explanation: { points: ["Clear progress.", "Simple structure.", "Professional tone."] }
},
{
subject: "Client Follow-Up",
from: "Mark Evans <mark.evans@northbridgeconsulting.net>",
time: "Tue 1:00 PM",
body:
`Dear client,

Following up on our previous discussion about project scope.

Best regards,
Mark Evans`,
correct: true,
explanation: { points: ["Standard follow-up.", "Clear intent.", "Neutral tone."] }
},
{
subject: "Meeting Notes",
from: "Olivia Grant <olivia.grant@clearviewops.com>",
time: "Tue 3:00 PM",
body:
`Hi all,

Please see attached notes from today’s meeting.

Regards,
Olivia Grant`,
correct: true,
explanation: { points: ["Clear summary.", "Professional tone.", "Normal structure."] }
},
{
subject: "Task Update",
from: "HR Ops <hr.ops@silverlinecorp.net>",
time: "Tue 4:00 PM",
body:
`Hello team,

Tasks have been updated based on workload.

Thanks,
HR`,
correct: true,
explanation: { points: ["Simple HR update.", "Clear meaning.", "No issues."] }
},

/* INAPPROPRIATE */
{
subject: "Progress check",
from: "operations@brightwave-solutions.com",
time: "Tue 9:10 AM",
body:
`Hi,

Can you confirm everything is still on schedule? Just want to make sure nothing has changed.

Regards,
Operations`,
correct: false,
explanation: { points: ["Premature check-in.", "Assumes instability.", "No reason for concern provided."] }
},
{
subject: "Status question",
from: "lead@northbridgeconsulting.net",
time: "Tue 10:20 AM",
body:
`Hello,

What is the current status of this task?

Best,
Lead`,
correct: false,
explanation: { points: ["Too vague.", "No context.", "No clear purpose."] }
},
{
subject: "Update request",
from: "manager@clearviewops.com",
time: "Tue 11:40 AM",
body:
`Hi team,

Can someone provide an update when possible?

Regards,
Manager`,
correct: false,
explanation: { points: ["Unnecessary interruption.", "No urgency.", "No specificity."] }
},
{
subject: "Milestone check",
from: "pm@corelinksystems.io",
time: "Tue 1:30 PM",
body:
`Hello,

Are we aligned on milestone completion?

Thanks,
PM`,
correct: false,
explanation: { points: ["Assumes misalignment.", "No evidence.", "Unneeded doubt."] }
},
{
subject: "Execution question",
from: "strategy@brightwave-solutions.com",
time: "Tue 3:15 PM",
body:
`Hi,

Is everything being handled correctly so far?

Regards,
Strategy Team`,
correct: false,
explanation: { points: ["Implied suspicion.", "No context.", "Vague concern."] }
}
],

/* ================= EXPERT ================= */
expert: [
{
subject: "Q3 Update",
from: "Olivia Bennett <olivia.bennett@aurorafinancialgroup.com>",
time: "Wed 8:00 AM",
body:
`Dear Team,

Q3 results are stable and within expected range.

Sincerely,
Olivia Bennett`,
correct: true,
explanation: { points: ["Neutral report.", "Clear tone.", "No ambiguity."] }
},
{
subject: "Strategy Update",
from: "Henry Collins <henry.collins@northfieldstrategy.com>",
time: "Wed 9:00 AM",
body:
`Dear colleagues,

We will proceed with updated Q4 priorities.

Regards,
Henry Collins`,
correct: true,
explanation: { points: ["Clear direction.", "Simple tone.", "No issues."] }
},
{
subject: "Board Summary",
from: "Executive Office <exec@aurorafinancialgroup.com>",
time: "Wed 10:00 AM",
body:
`Dear Board Members,

Please review today’s summary.

Sincerely,
Executive Office`,
correct: true,
explanation: { points: ["Formal message.", "Clear intent.", "Concise."] }
},
{
subject: "Risk Update",
from: "Rachel Moore <rachel.moore@corelinksystems.io>",
time: "Wed 11:00 AM",
body:
`Hello,

Risk data has been updated.

Regards,
Rachel Moore`,
correct: true,
explanation: { points: ["Neutral update.", "Clear message.", "No issues."] }
},
{
subject: "Annual Review",
from: "HR Executive <hr.exec@silverlinecorp.net>",
time: "Wed 1:00 PM",
body:
`Dear colleagues,

Please prepare annual review materials.

Regards,
HR Executive`,
correct: true,
explanation: { points: ["Clear instruction.", "Professional tone.", "Standard message."] }
},

/* INAPPROPRIATE */
{
subject: "Performance update",
from: "exec@aurorafinancialgroup.com",
time: "Wed 8:20 AM",
body:
`Team,

Some areas are not meeting expectations and may need review.

Executive Office`,
correct: false,
explanation: { points: ["Negative generalization.", "No detail.", "Unfair grouping."] }
},
{
subject: "Strategy concern",
from: "strategy@northfieldstrategy.com",
time: "Wed 9:40 AM",
body:
`Hello,

I think we should reconsider the current strategy.

Regards,
Strategy`,
correct: false,
explanation: { points: ["No reasoning.", "Undermines plan.", "Unhelpful tone."] }
},
{
subject: "Execution issue",
from: "pm@corelinksystems.io",
time: "Wed 10:20 AM",
body:
`Hi,

There seems to be an issue with execution.

Regards,
PM`,
correct: false,
explanation: { points: ["Too vague.", "No specifics.", "Unhelpful feedback."] }
},
{
subject: "Process review",
from: "board@aurorafinancialgroup.com",
time: "Wed 11:50 AM",
body:
`Dear team,

We may need to review our current processes.

Sincerely,
Board`,
correct: false,
explanation: { points: ["Unnecessary doubt.", "No trigger provided.", "Too generic."] }
},
{
subject: "Decision question",
from: "ceo@northfieldstrategy.com",
time: "Wed 2:10 PM",
body:
`Team,

Why was this decision made?

Regards,
CEO`,
correct: false,
explanation: { points: ["Implied criticism.", "No context.", "Poor framing."] }
}
]
};

/* =========================
   GAME START
========================= */
window.startGame = function (difficulty) {
  current = shuffle([...emails[difficulty]]);
  index = 0;
  strikes = 0;
  answered = [];
  locked = false;

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  document.getElementById("difficulty").innerText = difficulty.toUpperCase();
  document.getElementById("strikes").innerText = "Strikes: 0 / 3";

  loadEmail();
};

/* =========================
   ANSWER LOGIC
========================= */
window.answer = function (isCorrect) {
  if (locked) return;
  locked = true;

  const email = current[index];

  if (isCorrect !== email.correct) {
    strikes++;
    document.getElementById("strikes").innerText = `Strikes: ${strikes} / 3`;
  }

  setTimeout(nextEmail, 400);
};

/* =========================
   LOAD EMAIL
========================= */
function loadEmail() {
  const email = current[index];

  if (!email) {
    endGame();
    return;
  }

  locked = false;

  document.getElementById("email-subject").innerText = email.subject;

  document.getElementById("email-body").innerText =
`From: ${email.from}
Time: ${email.time}

${email.body}`;

  document.getElementById("actions").classList.remove("hidden");
}

/* =========================
   NEXT EMAIL
========================= */
function nextEmail() {
  index++;

  if (strikes >= 3 || index >= current.length) {
    endGame();
    return;
  }

  loadEmail();
}

/* =========================
   END GAME
========================= */
function endGame() {
  document.getElementById("app").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");

  document.getElementById("end-message").innerText =
    strikes >= 3 ? "Game Over" : "Completed!";
}
