let currentEmails = [];
let currentIndex = 0;
let strikes = 0;
let answered = [];

// ================= EMAIL DATA =================
const emails = {
  novice: [
    {subject:"Request to Schedule Meeting",body:"Dear Mr. Smith,\n\nI hope you're doing well. I would like to schedule a meeting this week to discuss the project.\n\nBest regards,\nJohn Doe",correct:true},
    {subject:"Thank You",body:"Hello,\n\nThank you for your assistance today.\n\nSincerely,\nAnna",correct:true},
    {subject:"Reminder: Deadline",body:"Dear Team,\n\nThis is a reminder that the deadline is tomorrow.\n\nBest,\nChris",correct:true},
    {subject:"Request for Info",body:"Hello,\n\nCould you send the report when available?\n\nThanks,\nSam",correct:true},
    {subject:"Meeting Update",body:"Dear Sarah,\n\nThe meeting has been moved to 3 PM.\n\nRegards,\nMike",correct:true},
    {subject:"Introduction",body:"Hello,\n\nI look forward to working with you.\n\nBest,\nEmily",correct:true},
    {subject:"Follow-Up",body:"Dear Team,\n\nFollowing up on the previous email.\n\nBest,\nAlex",correct:true},
    {subject:"Clarification",body:"Hello,\n\nCould you clarify this point?\n\nThanks,\nJordan",correct:true},
    {subject:"Confirmation",body:"Dear Client,\n\nThis confirms your appointment.\n\nSincerely,\nPat",correct:true},
    {subject:"Appreciation",body:"Hello,\n\nThank you for your help.\n\nBest,\nTaylor",correct:true},

    {subject:"meeting",body:"hey can we meet",correct:false},
    {subject:"URGENT",body:"WHY HAVENT YOU SENT THIS",correct:false},
    {subject:"",body:"send file",correct:false},
    {subject:"Hi",body:"need this asap",correct:false},
    {subject:"Update",body:"this is wrong fix it",correct:false},
    {subject:"Hello",body:"???",correct:false},
    {subject:"Check",body:"did u do this",correct:false},
    {subject:"Important",body:"DO THIS NOW",correct:false},
    {subject:"Hey",body:"whats up",correct:false},
    {subject:"Stuff",body:"idk what this is",correct:false}
  ],

  intermediate: [
    {subject:"Project Update",body:"Dear Team,\n\nPlease find the weekly update below.\n\nBest regards,\nManager",correct:true},
    {subject:"Client Follow-Up",body:"Dear Ms. Lee,\n\nFollowing up on our discussion.\n\nBest,\nDavid",correct:true},
    {subject:"Meeting Minutes",body:"Hello,\n\nAttached are the meeting notes.\n\nBest,\nRachel",correct:true},
    {subject:"Deadline Reminder",body:"Reminder that deliverables are due Friday.\n\nThanks,\nTom",correct:true},
    {subject:"Proposal Submission",body:"Dear Client,\n\nPlease review the attached proposal.\n\nRegards,\nFirm",correct:true},
    {subject:"Interview Thank You",body:"Thank you for your time today.\n\nBest,\nCandidate",correct:true},
    {subject:"Feedback Request",body:"Could you provide feedback when possible?\n\nThanks,\nEmployee",correct:true},
    {subject:"Status Update",body:"All tasks are on track.\n\nBest,\nIntern",correct:true},
    {subject:"Correction",body:"Please note the correction below.\n\nBest,\nAdmin",correct:true},
    {subject:"Reschedule",body:"Can we reschedule our meeting?\n\nBest,\nLisa",correct:true},

    {subject:"Update",body:"I already told you this",correct:false},
    {subject:"Meeting",body:"You missed again",correct:false},
    {subject:"Report",body:"This makes no sense",correct:false},
    {subject:"Hi",body:"Sent from my iPhone lol",correct:false},
    {subject:"Reminder",body:"Don't forget again",correct:false},
    {subject:"Client",body:"theyre mad fix it",correct:false},
    {subject:"Important",body:"Read now",correct:false},
    {subject:"Work",body:"do better",correct:false},
    {subject:"Re:",body:"k",correct:false},
    {subject:"Follow-Up",body:"why havent you responded",correct:false}
  ],

  expert: [
    {subject:"Financial Review",body:"Dear Board,\n\nAttached are the quarterly results.\n\nRegards,\nCFO",correct:true},
    {subject:"Partnership Opportunity",body:"Dear Mr. Adams,\n\nWe would like to explore a partnership.\n\nBest,\nDirector",correct:true},
    {subject:"Customer Response",body:"We apologize for the inconvenience.\n\nSupport Team",correct:true},
    {subject:"Contract Clarification",body:"Please clarify clause 4.2.\n\nThanks,\nManager",correct:true},
    {subject:"Executive Summary",body:"Please review the summary below.\n\nAnalyst",correct:true},
    {subject:"Policy Update",body:"Please review updated policy.\n\nHR",correct:true},
    {subject:"Vendor Inquiry",body:"Confirm pricing.\n\nProcurement",correct:true},
    {subject:"Internal Memo",body:"See updates below.\n\nAdmin",correct:true},
    {subject:"Apology",body:"We sincerely apologize.\n\nService Team",correct:true},
    {subject:"Invitation",body:"You are invited to our event.\n\nOrganizer",correct:true},

    {subject:"Financials",body:"Here are numbers",correct:false},
    {subject:"Partnership",body:"We should partner",correct:false},
    {subject:"Client",body:"they misunderstood",correct:false},
    {subject:"Contract",body:"this seems off",correct:false},
    {subject:"Summary",body:"quick summary",correct:false},
    {subject:"Policy",body:"read when u can",correct:false},
    {subject:"Vendor",body:"too expensive??",correct:false},
    {subject:"Update",body:"stuff changed",correct:false},
    {subject:"Apology",body:"sorry",correct:false},
    {subject:"Event",body:"come if u want",correct:false}
  ]
};

// ================= GAME LOGIC =================

function startGame(level) {
  currentEmails = shuffle([...emails[level]]);
  strikes = 0;
  answered = new Array(currentEmails.length).fill(false);

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
  currentIndex = index;

  const email = currentEmails[index];

  document.getElementById("email-subject").innerText = email.subject || "(No Subject)";
  document.getElementById("email-body").innerText = email.body;

  document.getElementById("actions").classList.remove("hidden");

  highlightSelected(index);
}

function highlightSelected(index) {
  const items = document.querySelectorAll("#email-list li");
  items.forEach((li, i) => {
    li.classList.toggle("selected", i === index);
  });
}

function answer(choice) {
  const email = currentEmails[currentIndex];

  if (answered[currentIndex]) return;

  if (choice !== email.correct) {
    strikes++;
    document.getElementById("strikes").innerText = "Strikes: " + strikes + " / 3";

    if (strikes >= 3) {
      endGame(false);
      return;
    }
  }

  answered[currentIndex] = true;

  renderEmailList();
  document.getElementById("actions").classList.add("hidden");

  checkWin();
}

function checkWin() {
  if (answered.every(a => a)) {
    endGame(true);
  }
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
