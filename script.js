let emails = {};
let current = [];
let index = 0;
let strikes = 0;
let answered = [];
let locked = false;

/* =========================
   EXPANDED CORPORATE EMAIL DATASET
   ========================= */

emails = {

  /* ================= NOVICE ================= */
  novice: [

    // APPROPRIATE (5)
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
      explanation: { points: ["Clear and polite introduction.", "Professional tone and structure.", "Proper greeting and closing."] }
    },
    {
      subject: "Weekly Update",
      from: "James Carter <james.carter@clearviewops.com>",
      time: "Mon 10:00 AM",
      body:
`Hello,

The project is progressing as planned and remains on schedule.

Regards,
James Carter`,
      correct: true,
      explanation: { points: ["Concise status update.", "Neutral professional tone.", "Clear communication."] }
    },
    {
      subject: "Office Schedule Reminder",
      from: "HR Team <hr@silverlinecorp.net>",
      time: "Mon 11:00 AM",
      body:
`Hi all,

This is a reminder that office hours are 9 AM to 5 PM Monday through Friday.

Thank you,
HR Team`,
      correct: true,
      explanation: { points: ["Clear informational message.", "Professional formatting.", "No unnecessary language."] }
    },
    {
      subject: "Client Meeting Confirmation",
      from: "Sophie Turner <sophie.turner@brightpathconsulting.io>",
      time: "Mon 1:00 PM",
      body:
`Hello,

Confirming our client meeting scheduled for Thursday at 2 PM.

Best,
Sophie Turner`,
      correct: true,
      explanation: { points: ["Clear confirmation.", "Professional tone.", "Proper structure."] }
    },
    {
      subject: "Monthly Report Submission",
      from: "Daniel Scott <daniel.scott@northbridgeconsulting.net>",
      time: "Mon 3:00 PM",
      body:
`Dear team,

Please submit your monthly reports by end of week.

Regards,
Daniel Scott`,
      correct: true,
      explanation: { points: ["Clear request.", "Professional wording.", "Respectful tone."] }
    },

    // INAPPROPRIATE (5)
    {
      subject: "do this NOW",
      from: "unknown@temp-mail.xyz",
      time: "Mon 9:15 AM",
      body:`fix this immediately`,
      correct: false,
      explanation: { points: ["Aggressive tone.", "No greeting or structure.", "Unprofessional communication."] }
    },
    {
      subject: "why not done yet",
      from: "boss@randommail.biz",
      time: "Mon 10:30 AM",
      body:`this should already be finished. explain`,
      correct: false,
      explanation: { points: ["Demanding tone.", "No context or greeting.", "Unprofessional phrasing."] }
    },
    {
      subject: "FIX IT",
      from: "admin@spamdomain.xyz",
      time: "Mon 11:45 AM",
      body:`its broken. fix it now`,
      correct: false,
      explanation: { points: ["No structure or politeness.", "Commanding language.", "Not workplace appropriate."] }
    },
    {
      subject: "???",
      from: "user@unknown.io",
      time: "Mon 1:30 PM",
      body:`why is this still wrong`,
      correct: false,
      explanation: { points: ["Unclear communication.", "No professional tone.", "Missing context."] }
    },
    {
      subject: "send it now!!!!",
      from: "manager@fakecorp.net",
      time: "Mon 2:00 PM",
      body:`send it now`,
      correct: false,
      explanation: { points: ["Excessive urgency and aggression.", "No formatting.", "Unprofessional tone."] }
    }
  ],

  /* ================= INTERMEDIATE ================= */
  intermediate: [

    // APPROPRIATE (5)
    {
      subject: "System Deployment Update",
      from: "Daniel Reed <daniel.reed@corelinksystems.io>",
      time: "Tue 2:30 PM",
      body:
`Hello team,

The deployment was completed successfully at 3:00 PM. All systems are operational.

Kind regards,
Daniel Reed`,
      correct: true,
      explanation: { points: ["Clear technical update.", "Professional tone.", "Well structured communication."] }
    },
    {
      subject: "Project Milestone Review",
      from: "Emily Carter <emily.carter@brightwave-solutions.com>",
      time: "Tue 11:00 AM",
      body:
`Hello,

We have completed milestone 2 and are moving into testing.

Regards,
Emily Carter`,
      correct: true,
      explanation: { points: ["Clear progress update.", "Professional formatting.", "Concise communication."] }
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
      explanation: { points: ["Professional follow-up.", "Respectful tone.", "Clear intent."] }
    },
    {
      subject: "Meeting Summary",
      from: "Olivia Grant <olivia.grant@clearviewops.com>",
      time: "Tue 3:00 PM",
      body:
`Hi all,

Attached summary of today's meeting highlights and action items.

Regards,
Olivia Grant`,
      correct: true,
      explanation: { points: ["Clear summary communication.", "Professional tone.", "Structured content."] }
    },
    {
      subject: "Task Allocation Update",
      from: "HR Ops <hr.ops@silverlinecorp.net>",
      time: "Tue 4:00 PM",
      body:
`Hello team,

Tasks have been redistributed based on current workload.

Thanks,
HR`,
      correct: true,
      explanation: { points: ["Clear internal update.", "Professional tone.", "Concise message."] }
    },

    // INAPPROPRIATE (5)
    {
      subject: "WHY IS THIS STILL BROKEN",
      from: "unknown@tempmail.xyz",
      time: "Tue 9:00 AM",
      body:`fix this now`,
      correct: false,
      explanation: { points: ["Aggressive tone.", "No structure.", "Unprofessional communication."] }
    },
    {
      subject: "explain yourself",
      from: "user@random.biz",
      time: "Tue 10:00 AM",
      body:`this makes no sense`,
      correct: false,
      explanation: { points: ["Vague complaint.", "No context.", "Unprofessional tone."] }
    },
    {
      subject: "fix or else",
      from: "boss@fakecorp.io",
      time: "Tue 11:30 AM",
      body:`you need to fix this immediately`,
      correct: false,
      explanation: { points: ["Threatening tone.", "No structure.", "Inappropriate workplace behavior."] }
    },
    {
      subject: "this is unacceptable",
      from: "admin@spamcorp.net",
      time: "Tue 1:15 PM",
      body:`redo everything`,
      correct: false,
      explanation: { points: ["Overly harsh tone.", "No constructive feedback.", "Unprofessional."] }
    },
    {
      subject: "??? URGENT",
      from: "unknown@trashmail.io",
      time: "Tue 2:45 PM",
      body:`answer me`,
      correct: false,
      explanation: { points: ["Lacks clarity.", "Aggressive urgency.", "No professionalism."] }
    }
  ],

  /* ================= EXPERT ================= */
  expert: [

    // APPROPRIATE (5)
    {
      subject: "Q3 Financial Summary",
      from: "Olivia Bennett <olivia.bennett@aurorafinancialgroup.com>",
      time: "Wed 8:00 AM",
      body:
`Dear Executive Team,

Revenue remains stable with a 3% increase in operational efficiency.

Sincerely,
Olivia Bennett`,
      correct: true,
      explanation: { points: ["Executive-level tone.", "Concise reporting.", "Professional structure."] }
    },
    {
      subject: "Strategic Planning Update",
      from: "Henry Collins <henry.collins@northfieldstrategy.com>",
      time: "Wed 9:00 AM",
      body:
`Dear team,

We will proceed with revised Q4 strategic objectives as discussed.

Regards,
Henry Collins`,
      correct: true,
      explanation: { points: ["Strategic communication.", "Formal tone.", "Clear intent."] }
    },
    {
      subject: "Board Meeting Notes",
      from: "Executive Office <exec@aurorafinancialgroup.com>",
      time: "Wed 10:00 AM",
      body:
`Dear Board Members,

Please find the summarized notes from today’s session.

Sincerely,
Executive Office`,
      correct: true,
      explanation: { points: ["Formal executive communication.", "Concise summary.", "Proper structure."] }
    },
    {
      subject: "Risk Assessment Update",
      from: "Rachel Moore <rachel.moore@corelinksystems.io>",
      time: "Wed 11:00 AM",
      body:
`Hello,

Risk analysis has been updated following recent market changes.

Regards,
Rachel Moore`,
      correct: true,
      explanation: { points: ["Professional analysis update.", "Clear structure.", "Concise tone."] }
    },
    {
      subject: "Annual Review Preparation",
      from: "HR Executive <hr.exec@silverlinecorp.net>",
      time: "Wed 1:00 PM",
      body:
`Dear colleagues,

Please begin preparing annual performance review documentation.

Regards,
HR Executive`,
      correct: true,
      explanation: { points: ["Formal HR communication.", "Clear directive.", "Professional tone."] }
    },

    // INAPPROPRIATE (5)
    {
      subject: "late report??",
      from: "staff@internal-temp-mail.net",
      time: "Wed 8:10 AM",
      body:`this report is late. explain now.`,
      correct: false,
      explanation: { points: ["Unprofessional tone.", "Demanding language.", "Not executive appropriate."] }
    },
    {
      subject: "FIX THIS IMMEDIATELY",
      from: "exec@randommail.xyz",
      time: "Wed 9:30 AM",
      body:`this is unacceptable behavior`,
      correct: false,
      explanation: { points: ["Aggressive tone.", "No structure.", "Poor executive communication."] }
    },
    {
      subject: "??? URGENT RESPONSE",
      from: "unknown@spam.io",
      time: "Wed 10:15 AM",
      body:`answer now`,
      correct: false,
      explanation: { points: ["No context.", "Aggressive tone.", "Unprofessional."] }
    },
    {
      subject: "this is a disaster",
      from: "manager@fakecorp.net",
      time: "Wed 11:45 AM",
      body:`redo everything immediately`,
      correct: false,
      explanation: { points: ["Emotional language.", "No structure.", "Not professional."] }
    },
    {
      subject: "explain NOW",
      from: "ceo@tempmail.biz",
      time: "Wed 2:00 PM",
      body:`why is this wrong`,
      correct: false,
      explanation: { points: ["Commanding tone.", "No detail.", "Unprofessional executive communication."] }
    }
  ]
};

/* =========================
   GAME LOGIC (UNCHANGED)
   ========================= */

function toggleTheme() {
  document.body.classList.toggle("dark");
}

function startGame(level) {
  current = [...emails[level]];
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

  const title = correct ? "CORRECT" : "INCORRECT";

  fb.innerHTML = `
    <div style="font-weight:700; margin-bottom:10px;">
      ${title}
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

  if (next === -1) {
    gameOver(true);
    return;
  }

  openEmail(next);
}

function gameOver(win) {
  document.getElementById("app").style.display = "none";
  document.getElementById("end-screen").style.display = "flex";

  document.getElementById("end-message").textContent =
    win ? "Inbox Cleared!" : "Game Over";
}
