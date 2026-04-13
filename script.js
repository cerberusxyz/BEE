let currentEmails = [];
let currentIndex = 0;
let strikes = 0;

// EMAIL DATABASE (UPDATED FOR REALISM)
const emails = {
  novice: [
    // ✅ GOOD (10)
    {
      subject: "Request to Schedule Project Meeting",
      body: "Dear Mr. Thompson,\n\nI hope this message finds you well. I would like to schedule a meeting this week to review the current project status.\n\nPlease let me know your availability.\n\nBest regards,\nEmily Carter",
      correct: true
    },
    {
      subject: "Thank You for Your Assistance",
      body: "Hello Ms. Rivera,\n\nThank you for your help with the client presentation earlier today. I appreciate your support.\n\nSincerely,\nDaniel Lee",
      correct: true
    },
    {
      subject: "Follow-Up on Submitted Report",
      body: "Dear Team,\n\nI wanted to follow up regarding the report submitted yesterday. Please let me know if any revisions are needed.\n\nBest,\nChris Walker",
      correct: true
    },
    {
      subject: "Request for Information",
      body: "Hello,\n\nCould you please provide the latest sales figures when you have a moment?\n\nThank you,\nSamantha Green",
      correct: true
    },
    {
      subject: "Meeting Time Update",
      body: "Dear Sarah,\n\nPlease note that our meeting has been rescheduled to 3:00 PM tomorrow.\n\nKind regards,\nMichael Brown",
      correct: true
    },
    {
      subject: "Introduction",
      body: "Hello Mr. Patel,\n\nMy name is Jason Kim, and I will be assisting you with your account moving forward. I look forward to working with you.\n\nBest regards,\nJason Kim",
      correct: true
    },
    {
      subject: "Reminder: Upcoming Deadline",
      body: "Dear Team,\n\nThis is a friendly reminder that the project deadline is tomorrow at 5 PM.\n\nBest,\nAlex Johnson",
      correct: true
    },
    {
      subject: "Clarification Needed",
      body: "Hello,\n\nCould you please clarify the requirements for section 2 of the document?\n\nThank you,\nJordan Smith",
      correct: true
    },
    {
      subject: "Appointment Confirmation",
      body: "Dear Client,\n\nThis email confirms your appointment scheduled for Monday at 10 AM.\n\nSincerely,\nPat Morgan",
      correct: true
    },
    {
      subject: "Appreciation",
      body: "Hello,\n\nI wanted to express my appreciation for your assistance on this task.\n\nBest regards,\nTaylor Adams",
      correct: true
    },

    // ❌ BAD (10)
    {
      subject: "meeting",
      body: "hey can we meet sometime soon",
      correct: false
    },
    {
      subject: "URGENT RESPONSE NEEDED",
      body: "WHY HAVENT YOU RESPONDED YET???",
      correct: false
    },
    {
      subject: "",
      body: "send me the file",
      correct: false
    },
    {
      subject: "Question",
      body: "what is going on with this project???",
      correct: false
    },
    {
      subject: "Hi",
      body: "need this asap",
      correct: false
    },
    {
      subject: "Update",
      body: "this is wrong fix it",
      correct: false
    },
    {
      subject: "Hello",
      body: "???",
      correct: false
    },
    {
      subject: "Check",
      body: "did u do this",
      correct: false
    },
    {
      subject: "Important",
      body: "DO THIS NOW",
      correct: false
    },
    {
      subject: "Hey",
      body: "whats up with this",
      correct: false
    }
  ],

  intermediate: [
    // ✅ GOOD (10)
    {
      subject: "Weekly Project Update",
      body: "Dear Team,\n\nPlease find below the weekly update on the project. We have completed the initial testing phase and will move into deployment next week.\n\nBest regards,\nKaren Mitchell",
      correct: true
    },
    {
      subject: "Client Follow-Up",
      body: "Dear Ms. Chen,\n\nI hope you are doing well. I wanted to follow up regarding our meeting last week and see if you had any additional questions.\n\nKind regards,\nDavid Park",
      correct: true
    },
    {
      subject: "Meeting Minutes – March 12",
      body: "Hello Team,\n\nAttached are the meeting minutes from yesterday’s discussion. Please review and let me know if anything needs to be updated.\n\nBest,\nRachel Evans",
      correct: true
    },
    {
      subject: "Reminder: Friday Deadline",
      body: "Dear Team,\n\nThis is a reminder that all deliverables are due by Friday at 3 PM.\n\nThank you,\nTom Wilson",
      correct: true
    },
    {
      subject: "Proposal Submission",
      body: "Dear Mr. Grant,\n\nPlease find our proposal attached for your review. We look forward to your feedback.\n\nSincerely,\nOlivia Reed",
      correct: true
    },
    {
      subject: "Thank You for Interview",
      body: "Dear Hiring Manager,\n\nThank you for taking the time to speak with me today. I appreciate the opportunity and look forward to hearing from you.\n\nBest regards,\nJames Carter",
      correct: true
    },
    {
      subject: "Request for Feedback",
      body: "Hello,\n\nCould you please provide feedback on the draft when convenient?\n\nThank you,\nLaura Bennett",
      correct: true
    },
    {
      subject: "Weekly Status Update",
      body: "Dear Supervisor,\n\nHere is my weekly status update. All assigned tasks are on track.\n\nBest,\nEthan Brooks",
      correct: true
    },
    {
      subject: "Correction to Previous Email",
      body: "Dear Team,\n\nPlease note that the correct deadline is Thursday, not Friday as previously stated.\n\nApologies for any confusion.\n\nBest regards,\nAdmin",
      correct: true
    },
    {
      subject: "Request to Reschedule Meeting",
      body: "Dear John,\n\nDue to a scheduling conflict, I would like to request to reschedule our meeting.\n\nPlease let me know your availability.\n\nBest,\nLisa Turner",
      correct: true
    },

    // ❌ BAD (10) (more subtle issues)
    {
      subject: "Update",
      body: "I already explained this earlier. Please check.",
      correct: false
    },
    {
      subject: "Meeting",
      body: "You missed the meeting again. This is becoming a problem.",
      correct: false
    },
    {
      subject: "Report Feedback",
      body: "This report doesn’t make sense. Fix it.",
      correct: false
    },
    {
      subject: "Hi",
      body: "Sent from my iPhone",
      correct: false
    },
    {
      subject: "Reminder",
      body: "Don't forget again this time.",
      correct: false
    },
    {
      subject: "Client Issue",
      body: "The client is upset because of your mistake.",
      correct: false
    },
    {
      subject: "Important",
      body: "Read this immediately.",
      correct: false
    },
    {
      subject: "Work Quality",
      body: "You need to do better work moving forward.",
      correct: false
    },
    {
      subject: "Re:",
      body: "k",
      correct: false
    },
    {
      subject: "Follow-Up",
      body: "Why haven't you responded yet?",
      correct: false
    }
  ],

  expert: [
    // ✅ GOOD (10)
    {
      subject: "Quarterly Financial Review Materials",
      body: "Dear Board Members,\n\nAttached please find the financial statements for Q2. Please review them ahead of our meeting next week.\n\nKind regards,\nAngela Foster\nChief Financial Officer",
      correct: true
    },
    {
      subject: "Strategic Partnership Opportunity",
      body: "Dear Mr. Alvarez,\n\nI hope you are doing well. I would like to explore a potential partnership between our organizations.\n\nPlease let me know a convenient time to discuss further.\n\nBest regards,\nDaniel Hughes",
      correct: true
    },
    {
      subject: "Response to Customer Concern",
      body: "Dear Ms. Walker,\n\nThank you for bringing this matter to our attention. We sincerely apologize for the inconvenience and are actively working toward a resolution.\n\nSincerely,\nCustomer Support Team",
      correct: true
    },
    {
      subject: "Contract Clause Clarification",
      body: "Dear Legal Team,\n\nCould you please provide clarification regarding clause 4.2 in the current contract?\n\nThank you in advance.\n\nBest regards,\nMichael Grant",
      correct: true
    },
    {
      subject: "Executive Summary for Review",
      body: "Dear Executive Team,\n\nPlease find below a summary of the key findings from our recent analysis.\n\nI welcome any feedback.\n\nRegards,\nSophia Turner",
      correct: true
    },
    {
      subject: "Updated Company Policy",
      body: "Dear Employees,\n\nPlease review the updated company policy attached to this email. If you have any questions, feel free to reach out.\n\nBest regards,\nHuman Resources",
      correct: true
    },
    {
      subject: "Vendor Pricing Inquiry",
      body: "Dear Mr. Singh,\n\nCould you please confirm the updated pricing for the upcoming quarter?\n\nThank you for your assistance.\n\nSincerely,\nProcurement Team",
      correct: true
    },
    {
      subject: "Internal Memo: Process Update",
      body: "Dear Staff,\n\nPlease note the following updates to our internal processes effective immediately.\n\nBest regards,\nOperations Team",
      correct: true
    },
    {
      subject: "Formal Apology",
      body: "Dear Client,\n\nWe sincerely apologize for the delay in service and appreciate your patience as we resolve the issue.\n\nKind regards,\nService Team",
      correct: true
    },
    {
      subject: "Invitation to Annual Conference",
      body: "Dear Dr. Reynolds,\n\nYou are cordially invited to attend our annual conference next month.\n\nWe hope to see you there.\n\nSincerely,\nEvent Coordinator",
      correct: true
    },

    // ❌ BAD (10) (very subtle / professional but flawed)
    {
      subject: "Financials",
      body: "Here are the numbers. Let me know what you think.",
      correct: false
    },
    {
      subject: "Partnership",
      body: "We should probably partner up. Thoughts?",
      correct: false
    },
    {
      subject: "Client Complaint",
      body: "The client misunderstood the situation.",
      correct: false
    },
    {
      subject: "Contract Question",
      body: "This clause seems off to me.",
      correct: false
    },
    {
      subject: "Summary",
      body: "Here’s a quick summary.",
      correct: false
    },
    {
      subject: "Policy",
      body: "Read the new policy when you can.",
      correct: false
    },
    {
      subject: "Vendor",
      body: "Your pricing seems high.",
      correct: false
    },
    {
      subject: "Process Update",
      body: "We’re changing things. See below.",
      correct: false
    },
    {
      subject: "Apology",
      body: "Sorry for the inconvenience.",
      correct: false
    },
    {
      subject: "Conference",
      body: "You can come to our event if you want.",
      correct: false
    }
  ]
};

// START GAME
function startGame(level) {
  currentEmails = shuffle([...emails[level]]);
  currentIndex = 0;
  strikes = 0;

  document.getElementById("difficulty").innerText = "Difficulty: " + level;
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");

  document.getElementById("strikes").innerText = "Strikes: 0 / 3";

  loadEmail();
}

// LOAD EMAIL
function loadEmail() {
  if (currentIndex >= currentEmails.length) {
    endGame(true);
    return;
  }

  const email = currentEmails[currentIndex];
  document.getElementById("email-subject").innerText = email.subject || "(No Subject)";
  document.getElementById("email-body").innerText = email.body;
}

// ANSWER HANDLER
function answer(choice) {
  const email = currentEmails[currentIndex];

  if (choice !== email.correct) {
    strikes++;
    document.getElementById("strikes").innerText = "Strikes: " + strikes + " / 3";

    if (strikes >= 3) {
      endGame(false);
      return;
    }
  }

  currentIndex++;
  loadEmail();
}

// END GAME
function endGame(win) {
  document.getElementById("game-screen").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");

  document.getElementById("end-message").innerText =
    win ? "🎉 Congratulations! You passed!" : "💀 Game Over!";
}

// SHUFFLE FUNCTION
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
