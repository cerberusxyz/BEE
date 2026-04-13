let currentEmails = [];
let currentIndex = 0;
let strikes = 0;

// EMAIL DATABASE
const emails = {
  novice: [
    // GOOD (10)
    {subject:"Meeting Request", body:"Dear Mr. Smith,\n\nI would like to schedule a meeting to discuss the project.\n\nBest regards,\nJohn", correct:true},
    {subject:"Thank You", body:"Hello,\n\nThank you for your assistance.\n\nSincerely,\nAnna", correct:true},
    {subject:"Follow Up", body:"Dear Team,\n\nJust following up on the previous email.\n\nBest,\nChris", correct:true},
    {subject:"Request Info", body:"Hello,\n\nCould you please provide the report?\n\nThanks,\nSam", correct:true},
    {subject:"Schedule Change", body:"Dear Sarah,\n\nThe meeting has been moved to 3 PM.\n\nRegards,\nMike", correct:true},
    {subject:"Introduction", body:"Hello,\n\nNice to meet you.\n\nBest regards,\nEmily", correct:true},
    {subject:"Reminder", body:"Dear Team,\n\nReminder about tomorrow's deadline.\n\nBest,\nAlex", correct:true},
    {subject:"Clarification", body:"Hello,\n\nCould you clarify this point?\n\nThanks,\nJordan", correct:true},
    {subject:"Confirmation", body:"Dear Client,\n\nThis confirms your appointment.\n\nSincerely,\nPat", correct:true},
    {subject:"Appreciation", body:"Hello,\n\nI appreciate your help.\n\nBest,\nTaylor", correct:true},

    // BAD (10)
    {subject:"yo", body:"hey send me that file asap", correct:false},
    {subject:"URGENT!!!", body:"WHY HAVENT YOU SENT THIS YET???", correct:false},
    {subject:"no subject", body:"i need this", correct:false},
    {subject:"Meeting", body:"whats going on with this???", correct:false},
    {subject:"hi", body:"send it", correct:false},
    {subject:"Question", body:"???", correct:false},
    {subject:"Update", body:"this is wrong fix it now", correct:false},
    {subject:"Hey", body:"yo what's up", correct:false},
    {subject:"Stuff", body:"idk what this is", correct:false},
    {subject:"ASAP", body:"DO THIS NOW", correct:false}
  ],

  intermediate: [
    // GOOD (10)
    {subject:"Project Update", body:"Dear Team,\n\nPlease find the attached project update.\n\nBest regards,\nManager", correct:true},
    {subject:"Client Follow-up", body:"Dear Ms. Lee,\n\nI hope you're well. I'm following up regarding our discussion.\n\nSincerely,\nDavid", correct:true},
    {subject:"Meeting Minutes", body:"Hello,\n\nAttached are the meeting minutes.\n\nBest,\nRachel", correct:true},
    {subject:"Deadline Reminder", body:"Dear Team,\n\nThis is a reminder for Friday's deadline.\n\nRegards,\nTom", correct:true},
    {subject:"Proposal Submission", body:"Dear Client,\n\nPlease find our proposal attached.\n\nKind regards,\nFirm", correct:true},
    {subject:"Interview Thank You", body:"Dear Hiring Manager,\n\nThank you for the opportunity.\n\nBest,\nCandidate", correct:true},
    {subject:"Feedback Request", body:"Hello,\n\nCould you provide feedback?\n\nThanks,\nEmployee", correct:true},
    {subject:"Status Update", body:"Dear Supervisor,\n\nHere is my weekly update.\n\nBest,\nIntern", correct:true},
    {subject:"Correction", body:"Dear Team,\n\nPlease note the correction below.\n\nRegards,\nAdmin", correct:true},
    {subject:"Reschedule", body:"Dear John,\n\nCan we reschedule?\n\nBest,\nLisa", correct:true},

    // BAD (10)
    {subject:"Re:", body:"k", correct:false},
    {subject:"Update", body:"I already told you this", correct:false},
    {subject:"Important", body:"read this now", correct:false},
    {subject:"Meeting", body:"you missed it again", correct:false},
    {subject:"Report", body:"this isnt right", correct:false},
    {subject:"Hi", body:"sent from my iphone lol", correct:false},
    {subject:"Hello", body:"fix this asap thanks.", correct:false},
    {subject:"Work", body:"do better next time", correct:false},
    {subject:"Client", body:"theyre mad fix it", correct:false},
    {subject:"Reminder", body:"dont forget this again", correct:false}
  ],

  expert: [
    // GOOD (10)
    {subject:"Quarterly Financial Review", body:"Dear Board Members,\n\nAttached is the quarterly financial report for your review.\n\nKind regards,\nCFO", correct:true},
    {subject:"Partnership Proposal", body:"Dear Mr. Adams,\n\nWe would like to explore a potential partnership.\n\nBest regards,\nDirector", correct:true},
    {subject:"Formal Complaint Response", body:"Dear Customer,\n\nWe sincerely apologize and are addressing your concern.\n\nSincerely,\nSupport Team", correct:true},
    {subject:"Contract Clarification", body:"Dear Legal Team,\n\nPlease clarify clause 4.2.\n\nBest,\nManager", correct:true},
    {subject:"Executive Summary", body:"Dear Executives,\n\nPlease review the summary below.\n\nRegards,\nAnalyst", correct:true},
    {subject:"Policy Update", body:"Dear Employees,\n\nPlease review the updated policy.\n\nBest regards,\nHR", correct:true},
    {subject:"Vendor Inquiry", body:"Dear Supplier,\n\nCould you confirm pricing?\n\nSincerely,\nProcurement", correct:true},
    {subject:"Internal Memo", body:"Dear Staff,\n\nPlease note the following updates.\n\nBest,\nAdmin", correct:true},
    {subject:"Apology Email", body:"Dear Client,\n\nWe apologize for the inconvenience caused.\n\nKind regards,\nService Team", correct:true},
    {subject:"Formal Invitation", body:"Dear Guest,\n\nYou are invited to our event.\n\nSincerely,\nOrganizer", correct:true},

    // BAD (10)
    {subject:"FYI", body:"this is bad", correct:false},
    {subject:"Important", body:"you messed this up", correct:false},
    {subject:"Client Issue", body:"theyre annoying", correct:false},
    {subject:"Board", body:"heres the thing...", correct:false},
    {subject:"Legal", body:"idk if this is right", correct:false},
    {subject:"Update", body:"stuff happened", correct:false},
    {subject:"Report", body:"numbers look weird lol", correct:false},
    {subject:"Policy", body:"just read it", correct:false},
    {subject:"Vendor", body:"why is this so expensive??", correct:false},
    {subject:"Meeting", body:"dont be late again", correct:false}
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

  loadEmail();
}

// LOAD EMAIL
function loadEmail() {
  if (currentIndex >= currentEmails.length) {
    endGame(true);
    return;
  }

  const email = currentEmails[currentIndex];
  document.getElementById("email-subject").innerText = email.subject;
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
