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
  const d = ["northironridge.com","valewoodtech.net","bluecorefinance.org","halcyonlogistics.io","evercrestsolutions.com"];
  return d[Math.floor(Math.random()*d.length)];
}

/* ================= EMAIL DATA (UPDATED ONLY) ================= */
emails = {
  /* ===================== NOVICE ===================== */
  novice: [
    // ✅ CORRECT (5)
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
      explanation: "The message is concise and professional while clearly communicating project status."
    },
    {
      from: `Sarah Lee <slee@bluecorefinance.org>`,
      subject: "Schedule Confirmation",
      body: "Hi all,\n\nConfirming our meeting on Thursday at 2 PM as discussed.\n\nThank you,\nSarah",
      correct: true,
      explanation: "This email is clear, polite, and appropriately confirms scheduling details."
    },
    {
      from: `Michael Tan <mtan@halcyonlogistics.io>`,
      subject: "Report Submission",
      body: "Dear Manager,\n\nPlease find the weekly report submitted as requested.\n\nSincerely,\nMichael",
      correct: true,
      explanation: "The communication is formal and clearly indicates task completion."
    },
    {
      from: `HR Team <hr@evercrestsolutions.com>`,
      subject: "Policy Reminder",
      body: "Dear staff,\n\nPlease review the updated company policy by the end of the week.\n\nRegards,\nHR Team",
      correct: true,
      explanation: "This is a professional HR reminder with clear instructions and appropriate tone."
    },

    // ❌ INCORRECT (5)
    {
      from: `unknown@northironridge.com`,
      subject: "meeting",
      body: "hey can we meet now",
      correct: false,
      explanation: "This message is too informal and lacks proper structure and context for business communication."
    },
    {
      from: `boss@valewoodtech.net`,
      subject: "do this",
      body: "fix it asap",
      correct: false,
      explanation: "The tone is overly demanding and lacks professionalism and clarity."
    },
    {
      from: `user@bluecorefinance.org`,
      subject: "hi",
      body: "what's going on",
      correct: false,
      explanation: "This email is too vague and informal for a professional setting."
    },
    {
      from: `team@halcyonlogistics.io`,
      subject: "URGENT",
      body: "respond!!!",
      correct: false,
      explanation: "The aggressive tone and lack of context make this inappropriate for workplace communication."
    },
    {
      from: `staff@evercrestsolutions.com`,
      subject: "question",
      body: "idk what to do",
      correct: false,
      explanation: "This message is unprofessional due to unclear wording and informal language."
    }
  ],

  /* ===================== INTERMEDIATE ===================== */
  intermediate: [
    // ✅ CORRECT (5)
    {
      from: `Karen Mitchell <kmitchell@northironridge.com>`,
      subject: "Project Milestone Update",
      body: "Dear team,\n\nWe have successfully completed phase two of the project ahead of schedule.\n\nRegards,\nKaren Mitchell",
      correct: true,
      explanation: "This is a clear and professional status update suitable for internal team communication."
    },
    {
      from: `Ops Team <ops@valewoodtech.net>`,
      subject: "System Maintenance Completion",
      body: "Hello,\n\nSystem maintenance has been completed successfully with no reported issues.\n\nThank you,\nOperations Team",
      correct: true,
      explanation: "The message is concise, formal, and communicates operational completion clearly."
    },
    {
      from: `Finance Dept <finance@bluecorefinance.org>`,
      subject: "Budget Review Reminder",
      body: "Dear colleagues,\n\nPlease review the updated budget proposal before Friday’s deadline.\n\nKind regards,\nFinance Department",
      correct: true,
      explanation: "This email provides clear instructions and maintains a professional tone."
    },
    {
      from: `Project Lead <lead@halcyonlogistics.io>`,
      subject: "Client Deliverable Update",
      body: "Dear team,\n\nClient deliverables have been submitted and are currently under review.\n\nBest regards,\nProject Lead",
      correct: true,
      explanation: "The communication is structured and appropriately formal for client-related updates."
    },
    {
      from: `Support Team <support@evercrestsolutions.com>`,
      subject: "Ticket Resolution Confirmation",
      body: "Hello,\n\nYour support request has been resolved. Please let us know if further assistance is needed.\n\nRegards,\nSupport Team",
      correct: true,
      explanation: "The tone is professional and includes a helpful follow-up offer for continued support."
    },

    // ❌ INCORRECT (5)
    {
      from: `manager@northironridge.com`,
      subject: "Update",
      body: "I already told you this.",
      correct: false,
      explanation: "This response is dismissive and lacks constructive communication."
    },
    {
      from: `admin@valewoodtech.net`,
      subject: "fix this now",
      body: "this is wrong fix immediately",
      correct: false,
      explanation: "The tone is aggressive and does not provide clear or professional guidance."
    },
    {
      from: `staff@bluecorefinance.org`,
      subject: "??",
      body: "why is this not done yet",
      correct: false,
      explanation: "This message is confrontational and lacks clarity about what is being requested."
    },
    {
      from: `lead@halcyonlogistics.io`,
      subject: "status",
      body: "update???",
      correct: false,
      explanation: "This is vague and unprofessional, lacking specific request details."
    },
    {
      from: `office@evercrestsolutions.com`,
      subject: "hello",
      body: "ok",
      correct: false,
      explanation: "This message is too minimal and does not communicate meaningful business intent."
    }
  ],

  /* ===================== EXPERT ===================== */
  expert: [
    // ✅ CORRECT (5)
    {
      from: `Angela Foster <afoster@northironridge.com>`,
      subject: "Quarterly Financial Review",
      body: "Dear Board Members,\n\nPlease find the quarterly financial summary for your review prior to next week’s meeting.\n\nKind regards,\nAngela Foster",
      correct: true,
      explanation: "This demonstrates executive-level clarity and professionalism appropriate for board communication."
    },
    {
      from: `CFO Office <cfo@bluecorefinance.org>`,
      subject: "Revenue Analysis Q3",
      body: "Dear leadership team,\n\nQ3 revenue performance indicates steady growth across all major divisions.\n\nSincerely,\nCFO Office",
      correct: true,
      explanation: "The message is concise, data-driven, and suitable for executive reporting."
    },
    {
      from: `Legal Dept <legal@valewoodtech.net>`,
      subject: "Compliance Update",
      body: "Dear stakeholders,\n\nPlease review the updated compliance requirements effective immediately.\n\nRegards,\nLegal Department",
      correct: true,
      explanation: "This is formal, precise, and appropriate for legal and regulatory communication."
    },
    {
      from: `Strategy Team <strategy@halcyonlogistics.io>`,
      subject: "Market Expansion Analysis",
      body: "Dear executives,\n\nThe analysis identifies three viable regions for upcoming expansion initiatives.\n\nBest regards,\nStrategy Team",
      correct: true,
      explanation: "This email is structured and provides high-level strategic insight appropriate for leadership."
    },
    {
      from: `Board Secretary <board@evercrestsolutions.com>`,
      subject: "Board Meeting Agenda",
      body: "Dear board members,\n\nThe agenda for the upcoming meeting has been finalized and distributed for review.\n\nKind regards,\nBoard Secretary",
      correct: true,
      explanation: "This is formal, clear, and appropriate for executive coordination."
    },

    // ❌ INCORRECT (5)
    {
      from: `exec@northironridge.com`,
      subject: "financials",
      body: "here are the numbers",
      correct: false,
      explanation: "This lacks clarity and structure expected in executive-level communication."
    },
    {
      from: `ceo@valewoodtech.net`,
      subject: "???",
      body: "why is this late",
      correct: false,
      explanation: "The tone is unprofessional and lacks context or constructive direction."
    },
    {
      from: `board@bluecorefinance.org`,
      subject: "read this",
      body: "important",
      correct: false,
      explanation: "This is overly vague and does not provide sufficient detail for decision-making."
    },
    {
      from: `admin@halcyonlogistics.io`,
      subject: "report",
      body: "send now",
      correct: false,
      explanation: "The directive tone without context is inappropriate for executive communication."
    },
    {
      from: `office@evercrestsolutions.com`,
      subject: "update",
      body: "fix it",
      correct: false,
      explanation: "This lacks clarity, professionalism, and actionable detail expected at this level."
    }
  ]
};
