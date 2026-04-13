let currentEmails = [];
let currentIndex = 0;
let strikes = 0;
let answered = [];
let awaitingNext = false;

// ================= EMAIL DATA =================
const emails = {
  novice: [
    // ✅ GOOD (10)
    {
      from: "Emily Carter <ecarter@company.com>",
      subject: "Request to Schedule Meeting",
      body: "Dear Mr. Thompson,\n\nI hope you are doing well. I would like to schedule a meeting this week to discuss the current project timeline.\n\nPlease let me know your availability.\n\nBest regards,\nEmily Carter",
      correct: true,
      explanation: "Professional tone, clear purpose, and polite closing."
    },
    {
      from: "Daniel Lee <dlee@company.com>",
      subject: "Thank You",
      body: "Hello Ms. Rivera,\n\nThank you for your assistance earlier today. I appreciate your support.\n\nSincerely,\nDaniel Lee",
      correct: true,
      explanation: "Polite and appropriately structured."
    },
    {
      from: "Alex Johnson <ajohnson@company.com>",
      subject: "Reminder: Deadline Tomorrow",
      body: "Dear Team,\n\nThis is a reminder that the project deadline is tomorrow at 5 PM.\n\nBest regards,\nAlex Johnson",
      correct: true,
      explanation: "Clear, polite, and informative."
    },
    {
      from: "Samantha Green <sgreen@company.com>",
      subject: "Request for Sales Data",
      body: "Hello,\n\nCould you please provide the latest sales data when you have a moment?\n\nThank you,\nSamantha Green",
      correct: true,
      explanation: "Respectful request with proper tone."
    },
    {
      from: "Michael Brown <mbrown@company.com>",
      subject: "Meeting Time Update",
      body: "Dear Sarah,\n\nOur meeting has been rescheduled to 3:00 PM tomorrow.\n\nKind regards,\nMichael Brown",
      correct: true,
      explanation: "Concise and professional."
    },
    {
      from: "Jason Kim <jkim@company.com>",
      subject: "Introduction",
      body: "Hello Mr. Patel,\n\nMy name is Jason Kim, and I will be your point of contact moving forward.\n\nI look forward to working with you.\n\nBest regards,\nJason Kim",
      correct: true,
      explanation: "Proper introduction with professional tone."
    },
    {
      from: "Chris Walker <cwalker@company.com>",
      subject: "Follow-Up",
      body: "Dear Team,\n\nI wanted to follow up on my previous message regarding the project updates.\n\nBest,\nChris Walker",
      correct: true,
      explanation: "Appropriate follow-up wording."
    },
    {
      from: "Jordan Smith <jsmith@company.com>",
      subject: "Clarification Needed",
      body: "Hello,\n\nCould you please clarify the requirements for section 2?\n\nThank you,\nJordan Smith",
      correct: true,
      explanation: "Clear and polite question."
    },
    {
      from: "Pat Morgan <pmorgan@company.com>",
      subject: "Appointment Confirmation",
      body: "Dear Client,\n\nThis email confirms your appointment scheduled for Monday at 10 AM.\n\nSincerely,\nPat Morgan",
      correct: true,
      explanation: "Professional confirmation email."
    },
    {
      from: "Taylor Adams <tadams@company.com>",
      subject: "Appreciation",
      body: "Hello,\n\nI appreciate your assistance with this task.\n\nBest regards,\nTaylor Adams",
      correct: true,
      explanation: "Appropriate expression of appreciation."
    },

    // ❌ BAD (10)
    {
      from: "unknown",
      subject: "meeting",
      body: "hey can we meet",
      correct: false,
      explanation: "Too informal and lacks structure."
    },
    {
      from: "manager@company.com",
      subject: "URGENT",
      body: "WHY HAVENT YOU DONE THIS",
      correct: false,
      explanation: "All caps appears aggressive and unprofessional."
    },
    {
      from: "employee@company.com",
      subject: "",
      body: "send file",
      correct: false,
      explanation: "Missing subject and lacks professionalism."
    },
    {
      from: "staff@company.com",
      subject: "Hi",
      body: "need this asap",
      correct: false,
      explanation: "Too vague and informal."
    },
    {
      from: "boss@company.com",
      subject: "Update",
      body: "this is wrong fix it",
      correct: false,
      explanation: "Tone is harsh and unprofessional."
    },
    {
      from: "colleague@company.com",
      subject: "Hello",
      body: "???",
      correct: false,
      explanation: "No meaningful communication."
    },
    {
      from: "employee@company.com",
      subject: "Check",
      body: "did u do this",
      correct: false,
      explanation: "Improper grammar and tone."
    },
    {
      from: "manager@company.com",
      subject: "Important",
      body: "DO THIS NOW",
      correct: false,
      explanation: "Too aggressive."
    },
    {
      from: "team@company.com",
      subject: "Hey",
      body: "whats up with this",
      correct: false,
      explanation: "Too casual."
    },
    {
      from: "staff@company.com",
      subject: "Stuff",
      body: "idk what this is",
      correct: false,
      explanation: "Unclear and unprofessional."
    }
  ],

  intermediate: [
    // ✅ GOOD (10)
    {
      from: "Karen Mitchell <kmitchell@company.com>",
      subject: "Weekly Project Update",
      body: "Dear Team,\n\nI wanted to provide a brief update on the project. We are currently on track and progressing as scheduled.\n\nPlease let me know if you have any questions.\n\nBest regards,\nKaren Mitchell",
      correct: true,
      explanation: "Clear, neutral, and professional tone."
    },
    {
      from: "David Park <dpark@company.com>",
      subject: "Client Follow-Up",
      body: "Dear Ms. Chen,\n\nI hope you are doing well. I wanted to follow up regarding our recent discussion.\n\nPlease let me know if you need any additional information.\n\nKind regards,\nDavid Park",
      correct: true,
      explanation: "Polite and client-appropriate tone."
    },
    {
      from: "Rachel Evans <revans@company.com>",
      subject: "Meeting Summary",
      body: "Hello Team,\n\nThank you for attending the meeting earlier today. Below is a summary of key points discussed.\n\nBest,\nRachel Evans",
      correct: true,
      explanation: "Professional recap email."
    },
    {
      from: "Tom Wilson <twilson@company.com>",
      subject: "Deadline Reminder",
      body: "Dear Team,\n\nThis is a reminder that all deliverables are due by Friday at 3 PM.\n\nThank you,\nTom Wilson",
      correct: true,
      explanation: "Clear and respectful reminder."
    },
    {
      from: "Olivia Reed <oreed@company.com>",
      subject: "Proposal Follow-Up",
      body: "Dear Mr. Grant,\n\nI wanted to follow up regarding our proposal and see if you had any questions.\n\nBest regards,\nOlivia Reed",
      correct: true,
      explanation: "Appropriate client follow-up."
    },
    {
      from: "James Carter <jcarter@company.com>",
      subject: "Interview Thank You",
      body: "Dear Hiring Manager,\n\nThank you for taking the time to speak with me today. I appreciate the opportunity.\n\nBest regards,\nJames Carter",
      correct: true,
      explanation: "Professional gratitude email."
    },
    {
      from: "Laura Bennett <lbennett@company.com>",
      subject: "Request for Feedback",
      body: "Hello,\n\nCould you please provide feedback on the draft when convenient?\n\nThank you,\nLaura Bennett",
      correct: true,
      explanation: "Polite and clear request."
    },
    {
      from: "Ethan Brooks <ebrooks@company.com>",
      subject: "Weekly Status Update",
      body: "Dear Supervisor,\n\nAll assigned tasks are on track for completion.\n\nBest,\nEthan Brooks",
      correct: true,
      explanation: "Concise and professional."
    },
    {
      from: "Admin <admin@company.com>",
      subject: "Correction Notice",
      body: "Dear Team,\n\nPlease note that the correct deadline is Thursday.\n\nBest regards,\nAdmin",
      correct: true,
      explanation: "Clear correction."
    },
    {
      from: "Lisa Turner <lturner@company.com>",
      subject: "Meeting Reschedule Request",
      body: "Dear John,\n\nI would like to request rescheduling our meeting due to a scheduling conflict.\n\nBest,\nLisa Turner",
      correct: true,
      explanation: "Professional request."
    },

    // ❌ BAD (10)
    {
      from: "manager@company.com",
      subject: "Update",
      body: "I already explained this earlier. Please check.",
      correct: false,
      explanation: "Dismissive tone."
    },
    {
      from: "manager@company.com",
      subject: "Meeting",
      body: "You missed the meeting again.",
      correct: false,
      explanation: "Too accusatory."
    },
    {
      from: "review@company.com",
      subject: "Report Feedback",
      body: "This report doesn't make sense.",
      correct: false,
      explanation: "Unconstructive criticism."
    },
    {
      from: "staff@company.com",
      subject: "Hi",
      body: "Sent from my phone",
      correct: false,
      explanation: "No content."
    },
    {
      from: "manager@company.com",
      subject: "Reminder",
      body: "Don't forget again.",
      correct: false,
      explanation: "Passive-aggressive tone."
    },
    {
      from: "employee@company.com",
      subject: "Client Issue",
      body: "The client is upset because of your mistake.",
      correct: false,
      explanation: "Blaming tone."
    },
    {
      from: "boss@company.com",
      subject: "Important",
      body: "Read this immediately.",
      correct: false,
      explanation: "Too abrupt."
    },
    {
      from: "manager@company.com",
      subject: "Work Quality",
      body: "You need to do better.",
      correct: false,
      explanation: "Unprofessional tone."
    },
    {
      from: "staff@company.com",
      subject: "Re:",
      body: "k",
      correct: false,
      explanation: "Too informal."
    },
    {
      from: "team@company.com",
      subject: "Follow-Up",
      body: "Why haven't you responded yet?",
      correct: false,
      explanation: "Aggressive phrasing."
    }
  ],

  expert: [
    // ✅ GOOD (10)
    {
      from: "Angela Foster <afoster@company.com>",
      subject: "Quarterly Financial Summary",
      body: "Dear Board Members,\n\nI hope you are doing well. Below is a summary of our financial performance for the past quarter.\n\nPlease let me know if you have any questions.\n\nKind regards,\nAngela Foster\nChief Financial Officer",
      correct: true,
      explanation: "Appropriate tone for executive audience."
    },
    {
      from: "Daniel Hughes <dhughes@company.com>",
      subject: "Strategic Partnership Discussion",
      body: "Dear Mr. Alvarez,\n\nI would like to explore a potential partnership opportunity between our organizations.\n\nPlease let me know a convenient time to connect.\n\nBest regards,\nDaniel Hughes",
      correct: true,
      explanation: "Professional and diplomatic."
    },
    {
      from: "Support Team <support@company.com>",
      subject: "Response to Your Concern",
      body: "Dear Customer,\n\nThank you for bringing this to our attention. We are working to resolve the issue promptly.\n\nSincerely,\nSupport Team",
      correct: true,
      explanation: "Professional and empathetic."
    },
    {
      from: "Michael Grant <mgrant@company.com>",
      subject: "Contract Clarification",
      body: "Dear Legal Team,\n\nCould you please clarify clause 4.2 at your convenience?\n\nBest regards,\nMichael Grant",
      correct: true,
      explanation: "Clear and respectful."
    },
    {
      from: "Sophia Turner <sturner@company.com>",
      subject: "Executive Summary",
      body: "Dear Executive Team,\n\nPlease find a summary of key findings below.\n\nI welcome your feedback.\n\nRegards,\nSophia Turner",
      correct: true,
      explanation: "Appropriate executive communication."
    },
    {
      from: "HR Department <hr@company.com>",
      subject: "Policy Update Notification",
      body: "Dear Employees,\n\nPlease review the updated company policy at your convenience.\n\nBest regards,\nHR Department",
      correct: true,
      explanation: "Clear and professional."
    },
    {
      from: "Procurement <procurement@company.com>",
      subject: "Vendor Pricing Inquiry",
      body: "Dear Mr. Singh,\n\nCould you please confirm your current pricing?\n\nThank you,\nProcurement Team",
      correct: true,
      explanation: "Professional inquiry."
    },
    {
      from: "Operations <ops@company.com>",
      subject: "Process Update",
      body: "Dear Staff,\n\nPlease note the following updates to our internal processes.\n\nBest regards,\nOperations Team",
      correct: true,
      explanation: "Professional internal communication."
    },
    {
      from: "Service Team <service@company.com>",
      subject: "Formal Apology",
      body: "Dear Client,\n\nWe sincerely apologize for the inconvenience and appreciate your patience.\n\nKind regards,\nService Team",
      correct: true,
      explanation: "Professional apology."
    },
    {
      from: "Events <events@company.com>",
      subject: "Conference Invitation",
      body: "Dear Dr. Reynolds,\n\nYou are cordially invited to attend our upcoming conference.\n\nSincerely,\nEvents Team",
      correct: true,
      explanation: "Formal and appropriate."
    },

    // ❌ BAD (10)
    {
      from: "exec@company.com",
      subject: "Financials",
      body: "Here are the numbers.",
      correct: false,
      explanation: "Too vague."
    },
    {
      from: "biz@company.com",
      subject: "Partnership",
      body: "We should partner.",
      correct: false,
      explanation: "Too informal."
    },
    {
      from: "support@company.com",
      subject: "Client Issue",
      body: "The client misunderstood.",
      correct: false,
      explanation: "Dismissive."
    },
    {
      from: "legal@company.com",
      subject: "Contract",
      body: "This seems off.",
      correct: false,
      explanation: "Too vague."
    },
    {
      from: "analyst@company.com",
      subject: "Summary",
      body: "Quick summary.",
      correct: false,
      explanation: "Too informal."
    },
    {
      from: "hr@company.com",
      subject: "Policy",
      body: "Read when you can.",
      correct: false,
      explanation: "Lacks importance."
    },
    {
      from: "procurement@company.com",
      subject: "Vendor",
      body: "Your pricing is high.",
      correct: false,
      explanation: "Too blunt."
    },
    {
      from: "ops@company.com",
      subject: "Update",
      body: "Stuff changed.",
      correct: false,
      explanation: "Unclear."
    },
    {
      from: "service@company.com",
      subject: "Apology",
      body: "Sorry.",
      correct: false,
      explanation: "Too brief."
    },
    {
      from: "events@company.com",
      subject: "Conference",
      body: "Come if you want.",
      correct: false,
      explanation: "Too casual."
    }
  ]
};

// ================= GAME LOGIC =================

function startGame(level) {
  currentEmails = shuffle([...emails[level]]);
  strikes = 0;
  answered = new Array(currentEmails.length).fill(false);
  awaitingNext = false;

  document.getElementById("difficulty").innerText = "Difficulty: " + level;
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  document.getElementById("strikes").innerText = "Strikes: 0 / 3";

  renderEmailList();
}

function renderEmailList() {
  const list = document.getElementById("email-list");
  list.innerHTML = "";

  currentEmails.forEach((email, index) => {
    const li = document.createElement("li");
    li.innerText = email.subject || "(No Subject)";

    if (!answered[index]) {
      li.onclick = () => openEmail(index);
    } else {
      li.style.opacity = "0.5";
    }

    list.appendChild(li);
  });
}

function openEmail(index) {
  if (awaitingNext) return;

  currentIndex = index;
  const email = currentEmails[index];

  document.getElementById("email-subject").innerText = email.subject;
  document.getElementById("email-body").innerText =
    "From: " + email.from + "\n" +
    "Subject: " + email.subject + "\n\n" +
    email.body;

  document.getElementById("actions").classList.remove("hidden");
  clearFeedback();
  highlightSelected(index);
}

function answer(choice) {
  if (awaitingNext) return;

  const email = currentEmails[currentIndex];

  let correct = (choice === email.correct);

  if (!correct) {
    strikes++;
    document.getElementById("strikes").innerText = "Strikes: " + strikes + " / 3";

    if (strikes >= 3) {
      endGame(false);
      return;
    }
  }

  showFeedback(correct, email.explanation);

  answered[currentIndex] = true;
  awaitingNext = true;

  renderEmailList();
  document.getElementById("actions").classList.add("hidden");
}

function showFeedback(correct, explanation) {
  const content = document.getElementById("content");

  let feedback = document.getElementById("feedback");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.id = "feedback";
    content.appendChild(feedback);
  }

  feedback.innerHTML =
    (correct ? "✅ Correct\n\n" : "❌ Incorrect\n\n") +
    explanation +
    "\n\n";

  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Next Email";
  nextBtn.onclick = nextEmail;

  feedback.appendChild(nextBtn);

  feedback.style.marginTop = "20px";
  feedback.style.padding = "15px";
  feedback.style.borderRadius = "6px";
  feedback.style.background = correct ? "#d4edda" : "#f8d7da";
}

function nextEmail() {
  awaitingNext = false;

  if (answered.every(a => a)) {
    endGame(true);
    return;
  }

  document.getElementById("email-subject").innerText = "Select an email";
  document.getElementById("email-body").innerText = "";
  clearFeedback();
}

function clearFeedback() {
  const feedback = document.getElementById("feedback");
  if (feedback) feedback.remove();
}

function highlightSelected(index) {
  const items = document.querySelectorAll("#email-list li");
  items.forEach((li, i) => {
    li.classList.toggle("selected", i === index);
  });
}

function endGame(win) {
  document.getElementById("app").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");

  document.getElementById("end-message").innerText =
    win ? "🎉 Inbox Cleared!" : "💀 Game Over!";
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
