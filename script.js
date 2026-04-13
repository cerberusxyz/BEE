let currentEmails = [];
let currentIndex = 0;
let strikes = 0;
let answered = [];
let awaitingNext = false;

// ================= EMAIL DATA (same structure but enhanced explanations) =================
const emails = {
  novice: [
    {
      from:"Emily Carter <ecarter@northironridge.com>",
      subject:"Request to Schedule Meeting",
      body:"Dear Mr. Thompson,\n\nI hope you are doing well. I would like to schedule a meeting this week to discuss the project timeline.\n\nPlease let me know your availability.\n\nBest regards,\nEmily Carter",
      correct:true,
      explanation:"This email is professional because it uses a polite greeting, clear purpose, and structured paragraphs. It also includes a respectful closing, which is standard in business communication."
    },
    {
      from:"unknown@unknown.com",
      subject:"meeting",
      body:"hey can we meet",
      correct:false,
      explanation:"This message lacks professionalism because it uses informal language, no greeting, and no structure. In business communication, clarity and tone are essential to avoid misunderstanding."
    }
  ],

  intermediate: [
    {
      from:"Karen Mitchell <kmitchell@bluecorefinance.com>",
      subject:"Weekly Project Update",
      body:"Dear Team,\n\nWe are currently on track with the project timeline.\n\nBest regards,\nKaren Mitchell",
      correct:true,
      explanation:"This email is effective because it is concise, structured, and maintains a neutral professional tone. It communicates necessary information without unnecessary detail."
    },
    {
      from:"manager@halcyonlogistics.com",
      subject:"Update",
      body:"I already told you this. Please check.",
      correct:false,
      explanation:"The tone is dismissive and could damage workplace communication. Professional emails should remain constructive and avoid implying blame or frustration."
    }
  ],

  expert: [
    {
      from:"Angela Foster <afoster@bluecorefinance.com>",
      subject:"Quarterly Financial Summary",
      body:"Dear Board Members,\n\nPlease find the quarterly summary below.\n\nKind regards,\nAngela Foster",
      correct:true,
      explanation:"This is appropriate executive-level communication. It is concise, formal, and respects the reader's time while maintaining clarity."
    },
    {
      from:"exec@halcyonlogistics.com",
      subject:"Financials",
      body:"Here are the numbers.",
      correct:false,
      explanation:"This message is too vague for executive communication. Business emails at this level require context, structure, and clarity to support decision-making."
    }
  ]
};

// ================= GAME START =================

function startGame(level) {
  currentEmails = shuffle([...emails[level]]);
  strikes = 0;
  answered = new Array(currentEmails.length).fill(false);
  awaitingNext = false;

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  document.getElementById("strikes").innerText = "Strikes: 0 / 3";

  renderEmailList();
  openNextEmail();
}

// ================= UI =================

function renderEmailList() {
  const list = document.getElementById("email-list");
  list.innerHTML = "";

  currentEmails.forEach((email, i) => {
    const li = document.createElement("li");
    li.innerText = email.subject;

    if (answered[i]) li.style.opacity = "0.4";
    else li.onclick = () => openEmail(i);

    list.appendChild(li);
  });
}

function openEmail(index) {
  if (awaitingNext || answered[index]) return;

  currentIndex = index;
  const email = currentEmails[index];

  document.getElementById("email-view").innerHTML = `
    <div class="email-card">
      <b>From:</b> ${email.from}<br>
      <b>Subject:</b> ${email.subject}
      <hr>
      ${email.body}
    </div>
  `;

  document.getElementById("actions").classList.remove("hidden");
  highlight(index);
}

// ================= ANSWER =================

function answer(choice) {
  if (awaitingNext) return;

  const email = currentEmails[currentIndex];
  const correct = choice === email.correct;

  if (!correct) {
    strikes++;
    document.getElementById("strikes").innerText = `Strikes: ${strikes} / 3`;

    if (strikes >= 3) return gameOver();
  }

  answered[currentIndex] = true;
  awaitingNext = true;

  showFeedback(correct, email.explanation);

  renderEmailList();
  document.getElementById("actions").classList.add("hidden");
}

// ================= FEEDBACK =================

function showFeedback(correct, explanation) {
  const box = document.getElementById("feedback");

  box.innerHTML = `
    <h3 class="${correct ? "badge-correct" : "badge-wrong"}">
      ${correct ? "Correct Answer" : "Incorrect Answer"}
    </h3>
    <p>${explanation}</p>
  `;

  const btn = document.createElement("button");
  btn.innerText = "Next Email";
  btn.onclick = nextEmail;
  box.appendChild(btn);
}

// ================= FLOW =================

function nextEmail() {
  awaitingNext = false;
  document.getElementById("feedback").innerHTML = "";

  openNextEmail();
}

function openNextEmail() {
  const next = currentEmails.findIndex((e, i) => !answered[i]);

  if (next === -1) return gameOver(true);

  openEmail(next);
}

function highlight(i) {
  document.querySelectorAll("#email-list li").forEach((el, idx) => {
    el.classList.toggle("selected", idx === i);
  });
}

// ================= GAME OVER =================

function gameOver(win = false) {
  document.getElementById("app").classList.add("hidden");
  document.getElementById("end-screen").classList.remove("hidden");

  const total = currentEmails.length;
  const correct = answered.filter(Boolean).length;

  document.getElementById("end-message").innerHTML = `
    ${win ? "🎉 Inbox Cleared!" : "💀 Game Over"}<br><br>
    <b>Performance Summary:</b><br>
    Emails Reviewed: ${correct}/${total}<br>
    Strikes: ${strikes}/3<br><br>
    ${
      win
        ? "Excellent work maintaining professional email standards."
        : "You exceeded the maximum number of communication errors. Review tone, clarity, and professionalism in business emails."
    }
  `;
}

// ================= UTIL =================

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
