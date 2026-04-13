let emails = {};
let current = [];
let index = 0;
let strikes = 0;
let answered = [];
let locked = false;

/* =========================
   CORPORATE EMAIL DATASET
   ========================= */

emails = {
  novice: [
    {
      subject: "Project Kickoff Meeting",
      from: "Sarah Mitchell <sarah.mitchell@northbridgeconsulting.net>",
      time: "Mon 9:00 AM",
      body:
`Hi team,

We will hold the project kickoff meeting tomorrow at 10:00 AM. Please be prepared to review the project scope and initial milestones.

Best regards,
Sarah Mitchell`,
      correct: true,
      explanation: {
        points: [
          "Clear subject line and professional tone.",
          "Proper greeting and closing included.",
          "Request is structured and easy to understand."
        ]
      }
    },
    {
      subject: "URGENT - Fix this now",
      from: "Mark <mark@fasttrackops.biz>",
      time: "Mon 9:15 AM",
      body:
`do this asap. it's not working and i need it fixed immediately`,
      correct: false,
      explanation: {
        points: [
          "Unprofessional tone and aggressive language.",
          "No greeting or structured formatting.",
          "Lacks clarity and proper business etiquette."
        ]
      }
    }
  ],

  intermediate: [
    {
      subject: "System Deployment Update",
      from: "Daniel Reed <daniel.reed@corelinksystems.io>",
      time: "Tue 2:30 PM",
      body:
`Hello team,

The deployment was completed successfully at 3:00 PM EST. All services are operational.

Kind regards,
Daniel Reed`,
      correct: true,
      explanation: {
        points: [
          "Clear operational update with timestamp.",
          "Professional tone and formatting.",
          "No unnecessary or emotional language."
        ]
      }
    },
    {
      subject: "WHY IS THIS NOT DONE",
      from: "Unknown Sender <unknown@randommail.xyz>",
      time: "Tue 2:45 PM",
      body:
`why is this still not finished. i asked yesterday.`,
      correct: false,
      explanation: {
        points: [
          "Aggressive and accusatory tone.",
          "Lacks professional structure.",
          "Not suitable for workplace communication."
        ]
      }
    }
  ],

  expert: [
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
      explanation: {
        points: [
          "Executive-level formal communication.",
          "Concise and structured financial reporting.",
          "Professional tone throughout."
        ]
      }
    },
    {
      subject: "late report??",
      from: "Staff <staff@internal-temp-mail.net>",
      time: "Wed 8:10 AM",
      body:
`this report is late. explain now.`,
      correct: false,
      explanation: {
        points: [
          "Unprofessional and demanding tone.",
          "Missing formal structure.",
          "Not appropriate for executive communication."
        ]
      }
    }
  ]
};

/* =========================
   GAME LOGIC
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

  /* OUTLOOK-STYLE HEADER */
  document.getElementById("email-subject").innerHTML = `
    <div style="font-size:20px; font-weight:600;">${e.subject}</div>
    <div style="font-size:13px; color:#666; margin-top:4px;">
      From: ${e.from} | Time: ${e.time}
    </div>
  `;

  document.getElementById("email-body").textContent = e.body;

  /* FIX: reset feedback completely (removes old color classes) */
  const fb = document.getElementById("feedback");
  fb.className = "";
  fb.innerHTML = "";
}

/* =========================
   ANSWER LOGIC
   ========================= */

function answer(choice) {
  if (locked) return;
  locked = true;

  const e = current[index];
  const correct = choice === e.correct;

  if (!correct) strikes++;

  answered[index] = true;

  const fb = document.getElementById("feedback");

  /* FIX: ALWAYS reset before applying new color */
  fb.className = "";
  fb.classList.add(correct ? "good" : "bad");

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
