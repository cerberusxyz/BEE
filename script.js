let emails = {};
let current = [];
let index = 0;
let strikes = 0;
let answered = [];

/* ✅ ADDED: lock state */
let locked = false;

function toggleTheme() {
  document.body.classList.toggle("dark");
}

emails = {
  novice: [
    { subject:"Meeting", from:"A", body:"Let’s meet tomorrow.", correct:true, explanation:"Clear and polite." },
    { subject:"Fix it", from:"B", body:"do it asap", correct:false, explanation:"Too aggressive." },
    { subject:"Update", from:"C", body:"Project is on track.", correct:true, explanation:"Professional update." }
  ],
  intermediate: [
    { subject:"System Update", from:"A", body:"Completed.", correct:true, explanation:"Clear status update." },
    { subject:"??", from:"B", body:"why not done", correct:false, explanation:"Unclear tone." }
  ],
  expert: [
    { subject:"Q3 Report", from:"A", body:"Revenue stable.", correct:true, explanation:"Executive summary." },
    { subject:"late", from:"B", body:"why late", correct:false, explanation:"Unprofessional." }
  ]
};

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

  current.forEach((e,i)=>{
    const li = document.createElement("li");
    li.textContent = e.subject;

    if(answered[i]) li.style.opacity = "0.4";

    li.onclick = () => openEmail(i);
    list.appendChild(li);
  });
}

function openEmail(i) {
  index = i;
  const e = current[i];

  document.getElementById("email-subject").textContent = e.subject;
  document.getElementById("email-body").textContent =
`From: ${e.from}

${e.body}`;

  document.getElementById("feedback").innerHTML = "";

  /* ✅ RESET LOCK ON NEW EMAIL */
  locked = false;
}

/* ✅ ONLY CHANGE: LOCK ADDED */
function answer(choice) {

  if (locked) return; // prevent changing answer
  locked = true;      // lock immediately after first click

  const e = current[index];
  const correct = choice === e.correct;

  if(!correct) strikes++;

  answered[index] = true;

  const fb = document.getElementById("feedback");
  fb.className = correct ? "good" : "bad";

  fb.innerHTML = `
    ${e.explanation}
    <br><br>
    <button onclick="nextEmail()">Next</button>
  `;

  document.getElementById("strikes").textContent = `Strikes: ${strikes} / 3`;

  renderInbox();

  if(strikes >= 3) gameOver(false);
}

function nextEmail() {
  const next = answered.findIndex(a => a === false);

  if(next === -1) {
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
