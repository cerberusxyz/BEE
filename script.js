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
  const d = ["northironridge.com","valewoodtech.net","bluecorefinance.org"];
  return d[Math.floor(Math.random()*d.length)];
}

/* ================= FULL DATA FIX ================= */
emails = {
  novice: [
    {from:`A@${domain()}`,subject:"Meeting",body:"Please schedule a meeting.",correct:true,explanation:"Clear professional request."},
    {from:`B@${domain()}`,subject:"update",body:"hey fix this",correct:false,explanation:"Too informal."}
  ],

  intermediate: [
    {from:`C@${domain()}`,subject:"Report",body:"Quarterly report attached.",correct:true,explanation:"Professional summary."},
    {from:`D@${domain()}`,subject:"status",body:"why not done???",correct:false,explanation:"Aggressive tone."}
  ],

  expert: [
    {from:`E@${domain()}`,subject:"Board Update",body:"Financial review completed.",correct:true,explanation:"Executive tone appropriate."},
    {from:`F@${domain()}`,subject:"FIN",body:"send numbers",correct:false,explanation:"Too vague for executive level."}
  ]
};

/* ================= START GAME FIX ================= */
function startGame(level){
  currentEmails = shuffle([...emails[level]]);

  strikes = 0;
  score = 0;
  answered = new Array(currentEmails.length).fill(false);
  awaitingNext = false;

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("app").style.display = "flex";

  renderInbox();
  openNextEmail();
  updateUI();
}

/* ================= INBOX ================= */
function renderInbox(){
  const list = document.getElementById("email-list");
  list.innerHTML = "";

  currentEmails.forEach((e,i)=>{
    const li=document.createElement("li");
    li.textContent=e.subject;
    if(!answered[i]) li.onclick=()=>openEmail(i);
    list.appendChild(li);
  });
}

/* ================= OPEN ================= */
function openEmail(i){
  if(awaitingNext||answered[i]) return;

  currentIndex=i;
  const email=currentEmails[i];

  document.getElementById("email-subject").textContent=email.subject;
  document.getElementById("email-body").textContent=
`From: ${email.from}
Subject: ${email.subject}

${email.body}`;

  document.getElementById("actions").classList.remove("hidden");
  clearFeedback();
}

/* ================= ANSWER ================= */
function answer(choice){
  if(awaitingNext) return;

  const email=currentEmails[currentIndex];
  const correct=choice===email.correct;

  if(correct) score+=Math.floor(100/currentEmails.length);
  else if(++strikes>=3) return gameOver(false);

  answered[currentIndex]=true;
  awaitingNext=true;

  showFeedback(correct,email.explanation);
  renderInbox();
  updateUI();

  document.getElementById("actions").classList.add("hidden");
}

/* ================= FEEDBACK FIXED ================= */
function showFeedback(correct,text){
  const box=document.getElementById("feedback");
  box.classList.remove("hidden");

  box.innerHTML=`
    <div class="feedback-box ${correct?"good-box":"bad-box"}">
      <div class="feedback-title">${correct?"Correct":"Incorrect"}</div>
      <div>${text}</div>
    </div>
  `;

  const btn=document.createElement("button");
  btn.textContent="Next Email";
  btn.onclick=nextEmail;
  box.appendChild(btn);
}

function clearFeedback(){
  const box=document.getElementById("feedback");
  box.classList.add("hidden");
  box.innerHTML="";
}

/* ================= NEXT ================= */
function nextEmail(){
  awaitingNext=false;
  clearFeedback();

  const next=currentEmails.findIndex((e,i)=>!answered[i]);
  if(next===-1) return gameOver(true);

  openEmail(next);
}

/* ================= UI ================= */
function updateUI(){
  document.getElementById("strikes").textContent=`Strikes: ${strikes} / 3`;
}

/* ================= GAME OVER IMPROVED ================= */
function gameOver(win){
  document.getElementById("app").style.display="none";
  document.getElementById("end-screen").style.display="flex";

  const grade=score>=90?"A":score>=80?"B":score>=70?"C":score>=60?"D":"F";

  document.getElementById("end-message").textContent=
    win?"🎉 Training Complete":"💀 Session Failed";

  document.getElementById("final-score").innerHTML=
    `<h2>Score: ${score}/100</h2><h3>Grade: ${grade}</h3>`;
}

/* ================= DARK MODE ================= */
function toggleMode(){
  document.body.classList.toggle("dark");
}

/* ================= UTIL ================= */
function shuffle(a){return a.sort(()=>Math.random()-0.5);}
