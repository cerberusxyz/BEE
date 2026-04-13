let emails = {};
let currentEmails = [];
let currentIndex = -1;

let strikes = 0;
let score = 0;
let answered = [];
let awaitingNext = false;

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-screen").style.display = "flex";
  document.getElementById("app").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
});

/* ================= DOMAINS ================= */
function domain() {
  const d = [
    "northironridge.com",
    "valewoodtech.net",
    "bluecorefinance.org",
    "halcyonlogistics.io",
    "evercrestsolutions.com"
  ];
  return d[Math.floor(Math.random() * d.length)];
}

/* ================= EMAIL DATA ONLY (UPDATED) ================= */
emails = {
  /* ===================== NOVICE ===================== */
  novice: [
    {
      from: `Emily Carter <ecarter@northironridge.com>`,
      subject: "Meeting Request",
      body: "Good morning,\n\nCould we schedule a brief meeting this week to review project updates?\n\nKind regards,\nEmily Carter",
      correct: true,
      explanation: "This email is polite, clearly structured, and uses a professional tone appropriate for workplace communication."
    },
    {
      from: `Daniel Brooks <dbrooks@valewoodtech.net>`,
      subject: "Weekly Update",
      body: "Hello team,\n\nThe project is currently on track and progressing as expected.\n\nBest regards,\nDaniel",
      correct: true,
      explanation: "This message is concise and professional while clearly communicating project status."
    },
    {
      from: `Sarah Lee <slee@bluecorefinance.org>`,
      subject: "Schedule Confirmation",
      body: "Hi all,\n\nConfirming our meeting on Thursday at 2 PM as discussed.\n\nThank you,\nSarah",
      correct: true,
      explanation: "This email clearly confirms scheduling details in a polite and professional manner."
    },
    {
      from: `Michael Tan <mtan@halcyonlogistics.io>`,
      subject: "Report Submission",
      body: "Dear Manager,\n\nPlease find the weekly report submitted as requested.\n\nSincerely,\nMichael",
      correct: true,
      explanation: "This is formal and clearly communicates task completion without unnecessary detail."
    },
    {
      from: `HR Team <hr@evercrestsolutions.com>`,
      subject: "Policy Reminder",
      body: "Dear staff,\n\nPlease review the updated company policy by the end of the week.\n\nRegards,\nHR Team",
      correct: true,
      explanation: "This is a professional HR reminder with clear instructions and appropriate tone."
    },

    {
      from: `unknown@northironridge.com`,
      subject: "meeting",
      body: "hey can we meet now",
      correct: false,
      explanation: "This message is too informal and lacks proper structure and professional tone."
    },
    {
      from: `boss@valewoodtech.net`,
      subject: "do this",
      body: "fix it asap",
      correct: false,
      explanation: "The tone is overly demanding and lacks clarity and workplace professionalism."
    },
    {
      from: `user@bluecorefinance.org`,
      subject: "hi",
      body: "what's going on",
      correct: false,
      explanation: "This email is too vague and informal for professional communication."
    },
    {
      from: `team@halcyonlogistics.io`,
      subject: "URGENT",
      body: "respond!!!",
      correct: false,
      explanation: "The aggressive tone and lack of context make this unprofessional."
    },
    {
      from: `staff@evercrestsolutions.com`,
      subject: "question",
      body: "idk what to do",
      correct: false,
      explanation: "This is unclear and uses informal language unsuitable for business communication."
    }
  ],

  /* ===================== INTERMEDIATE ===================== */
  intermediate: [
    {
      from: `Karen Mitchell <kmitchell@northironridge.com>`,
      subject: "Project Milestone Update",
      body: "Dear team,\n\nWe have successfully completed phase two ahead of schedule.\n\nRegards,\nKaren Mitchell",
      correct: true,
      explanation: "This is a clear internal update with professional structure and tone."
    },
    {
      from: `Ops Team <ops@valewoodtech.net>`,
      subject: "System Maintenance Completion",
      body: "Hello,\n\nSystem maintenance has been completed successfully with no issues.\n\nThank you,\nOperations Team",
      correct: true,
      explanation: "This communicates completion clearly and professionally."
    },
    {
      from: `Finance Dept <finance@bluecorefinance.org>`,
      subject: "Budget Review Reminder",
      body: "Dear colleagues,\n\nPlease review the updated budget proposal before Friday.\n\nKind regards,\nFinance Department",
      correct: true,
      explanation: "This provides clear instruction and deadline in a professional tone."
    },
    {
      from: `Project Lead <lead@halcyonlogistics.io>`,
      subject: "Client Deliverable Update",
      body: "Dear team,\n\nClient deliverables have been submitted and are under review.\n\nBest regards,\nProject Lead",
      correct: true,
      explanation: "This is structured and appropriate for client-related communication."
    },
    {
      from: `Support Team <support@evercrestsolutions.com>`,
      subject: "Ticket Resolution",
      body: "Hello,\n\nYour support request has been resolved. Please contact us if needed.\n\nRegards,\nSupport Team",
      correct: true,
      explanation: "This is professional and provides a clear resolution notice."
    },

    {
      from: `manager@northironridge.com`,
      subject: "Update",
      body: "I already told you this.",
      correct: false,
      explanation: "This is dismissive and lacks constructive communication."
    },
    {
      from: `admin@valewoodtech.net`,
      subject: "fix this now",
      body: "this is wrong fix immediately",
      correct: false,
      explanation: "This tone is aggressive and unprofessional in workplace communication."
    },
    {
      from: `staff@bluecorefinance.org`,
      subject: "??",
      body: "why is this not done yet",
      correct: false,
      explanation: "This is confrontational and lacks clear context."
    },
    {
      from: `lead@halcyonlogistics.io`,
      subject: "status",
      body: "update???",
      correct: false,
      explanation: "This is vague and unprofessional communication."
    },
    {
      from: `office@evercrestsolutions.com`,
      subject: "hello",
      body: "ok",
      correct: false,
      explanation: "This message lacks meaningful business content."
    }
  ],

  /* ===================== EXPERT ===================== */
  expert: [
    {
      from: `Angela Foster <afoster@northironridge.com>`,
      subject: "Quarterly Financial Review",
      body: "Dear Board Members,\n\nPlease review the quarterly financial summary prior to the upcoming meeting.\n\nKind regards,\nAngela Foster",
      correct: true,
      explanation: "This is executive-level communication that is structured, formal, and clear."
    },
    {
      from: `CFO Office <cfo@bluecorefinance.org>`,
      subject: "Revenue Analysis Q3",
      body: "Dear leadership team,\n\nQ3 performance shows steady growth across divisions.\n\nSincerely,\nCFO Office",
      correct: true,
      explanation: "This is concise and appropriate for executive financial reporting."
    },
    {
      from: `Legal Dept <legal@valewoodtech.net>`,
      subject: "Compliance Update",
      body: "Dear stakeholders,\n\nPlease review updated compliance requirements effective immediately.\n\nRegards,\nLegal Department",
      correct: true,
      explanation: "This is formal and suitable for regulatory communication."
    },
    {
      from: `Strategy Team <strategy@halcyonlogistics.io>`,
      subject: "Market Expansion Analysis",
      body: "Dear executives,\n\nThree viable regions have been identified for expansion.\n\nBest regards,\nStrategy Team",
      correct: true,
      explanation: "This is structured and suitable for strategic decision-making."
    },
    {
      from: `Board Secretary <board@evercrestsolutions.com>`,
      subject: "Board Meeting Agenda",
      body: "Dear board members,\n\nThe agenda has been finalized and distributed.\n\nKind regards,\nBoard Secretary",
      correct: true,
      explanation: "This is formal and appropriate for board-level coordination."
    },

    {
      from: `exec@northironridge.com`,
      subject: "financials",
      body: "here are the numbers",
      correct: false,
      explanation: "This lacks structure and clarity required for executive communication."
    },
    {
      from: `ceo@valewoodtech.net`,
      subject: "???",
      body: "why is this late",
      correct: false,
      explanation: "This is unprofessional and lacks constructive feedback."
    },
    {
      from: `board@bluecorefinance.org`,
      subject: "read this",
      body: "important",
      correct: false,
      explanation: "This is too vague for executive decision-making."
    },
    {
      from: `admin@halcyonlogistics.io`,
      subject: "report",
      body: "send now",
      correct: false,
      explanation: "This directive lacks context and professionalism."
    },
    {
      from: `office@evercrestsolutions.com`,
      subject: "update",
      body: "fix it",
      correct: false,
      explanation: "This is unclear and not actionable in a professional context."
    }
  ]
};
