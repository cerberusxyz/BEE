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
      body:
`Hi team,

We will hold the project kickoff meeting tomorrow at 10:00 AM. Please be prepared to review the project scope and initial milestones.

Best regards,
Sarah Mitchell`,
      correct: true,
      explanation: {
        title: "Appropriate Email",
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
      body:
`do this asap. it's not working and i need it fixed immediately`,
      correct: false,
      explanation: {
        title: "Inappropriate Email",
        points: [
          "Unprofessional tone and aggressive language.",
          "No greeting or structured formatting.",
          "Lacks clarity and proper business etiquette."
        ]
      }
    },
    {
      subject: "Weekly Status Update",
      from: "Emily Carter <emily.carter@brightwave-solutions.com>",
      body:
`Hello,

The project is currently on track. We have completed the initial planning phase and are moving into implementation.

Regards,
Emily Carter`,
      correct: true,
      explanation: {
        title: "Appropriate Email",
        points: [
          "Professional and concise status update.",
          "Uses structured business communication format.",
          "Maintains neutral and respectful tone."
        ]
      }
    }
  ],

  intermediate: [
    {
      subject: "System Deployment Update",
      from: "Daniel Reed <daniel.reed@corelinksystems.io>",
      body:
`Hello team,

The deployment was completed successfully at 3:00 PM EST. All services are operational.

Kind regards,
Daniel Reed`,
      correct: true,
      explanation: {
        title: "Appropriate Email",
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
      body:
`why is this still not finished. i asked yesterday.`,
      correct: false,
      explanation: {
        title: "Inappropriate Email",
        points: [
          "Aggressive and accusatory tone.",
          "Lacks professionalism and structure.",
          "No context or clear request provided."
        ]
      }
    }
  ],

  expert: [
    {
      subject: "Q3 Financial Summary",
      from: "Olivia Bennett <olivia.bennett@aurorafinancialgroup.com>",
      body:
`Dear Executive Team,

Attached is the Q3 financial summary. Revenue remains stable with a 3% increase in operational efficiency.

Sincerely,
Olivia Bennett`,
      correct: true,
      explanation: {
        title: "Appropriate Email",
        points: [
          "Executive-level formal tone and structure.",
          "Concise financial reporting language.",
          "Professional closing and formatting."
        ]
      }
    },
    {
      subject: "late report??",
      from: "Staff <staff@internal-temp-mail.net>",
      body:
`this report is late. explain now.`,
      correct: false,
      explanation: {
        title: "Inappropriate Email",
        points: [
          "Unprofessional and demanding tone.",
          "Missing formal structure and greeting.",
          "Not suitable for executive communication."
        ]
      }
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

  document.getElementById("email-subject").textContent = e.subject;
  document.getElementById("email-body").textContent = e.body;

  document.getElementById("feedback").innerHTML = "";
}

/* =========================
   ANSWER FLOW (LOCKED)
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
    <div style="font-weight:600; margin-bottom:8px;">
      ${e.explanation.title}
    </div>

    <div style="margin-bottom:8px;">
      <strong>Key Points:</strong>
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
