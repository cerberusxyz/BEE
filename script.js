let emails = {};
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
   GOOD BALANCED DATASET (CLEAN VERSION)
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
correct: true
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
correct: true
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
correct: true
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
correct: true
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
correct: true
},

/* INAPPROPRIATE (SUBTLE, REALISTIC) */
{
subject: "Project update",
from: "operations@northfieldadmin.net",
time: "Mon 9:20 AM",
body:
`Hi team,

Just checking if there are any updates to the project timeline for planning purposes.

Thanks,
Operations`,
correct: false
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
correct: false
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
correct: false
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
correct: false
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
correct: false
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

Deployment was completed successfully and all systems are operating normally.

Kind regards,
Daniel Reed`,
correct: true
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
correct: true
},
{
subject: "Client Follow-Up",
from: "Mark Evans <mark.evans@northbridgeconsulting.net>",
time: "Tue 1:00 PM",
body:
`Dear client,

Following up on our previous discussion regarding scope.

Best regards,
Mark Evans`,
correct: true
},
{
subject: "Meeting Notes",
from: "Olivia Grant <olivia.grant@clearviewops.com>",
time: "Tue 3:00 PM",
body:
`Hi all,

Please find attached notes from today’s meeting.

Regards,
Olivia Grant`,
correct: true
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
correct: true
},

/* INAPPROPRIATE */
{
subject: "Progress check",
from: "operations@brightwave-solutions.com",
time: "Tue 9:10 AM",
body:
`Hi,

Can you confirm everything is still on track?

Regards,
Operations`,
correct: false
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
correct: false
},
{
subject: "Update request",
from: "manager@clearviewops.com",
time: "Tue 11:40 AM",
body:
`Hi team,

Can someone provide an update?

Regards,
Manager`,
correct: false
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
correct: false
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
correct: false
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
correct: true
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
correct: true
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
correct: true
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
correct: true
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
correct: true
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
correct: false
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
correct: false
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
correct: false
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
correct: false
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
correct: false
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
   RENDER INBOX
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

  document.getElementById("actions").style.display = "block";
}

/* =========================
   ANSWER
========================= */
window.answer = function (isCorrect) {
  if (!selectedEmail || locked) return;
  locked = true;

  if (isCorrect !== selectedEmail.correct) {
    strikes++;
    document.getElementById("strikes").innerText = `Strikes: ${strikes} / 3`;
  }

  currentEmails = currentEmails.filter(e => e !== selectedEmail);
  selectedEmail = null;

  document.getElementById("email-subject").innerText = "Select an email";
  document.getElementById("email-body").innerText = "";

  renderInbox();

  locked = false;

  if (strikes >= 3 || currentEmails.length === 0) {
    endGame();
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
