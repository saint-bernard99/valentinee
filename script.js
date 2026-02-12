/* step 1 */
const app = document.getElementById("app");
const audio = document.getElementById("audio"); // replace with your actual id

let currentStep = 0;
let noClickCount = 0;
let musicStarted = false;
let finalAnswer = null;
let reasonText = "";

/* step 2 */
const steps = [
  "Hi Kamsy, I’ve been thinking about something...",
  "It’s been on my mind for a while now.",
  "And I think it’s finally time to ask you.",
];

/* step 3 */
function renderStep() {
  if (currentStep < steps.length) {
    renderIntro();
  } else {
    renderQuestion();
  }
}

/* step 4 */
function renderIntro() {
  app.innerHTML = `
    <p>${steps[currentStep]}</p>
    <button id="continueBtn">
      ${currentStep === 0 ? "Continue" : "Go On"}
    </button>
  `;

  document.getElementById("continueBtn")
    .addEventListener("click", nextStep);
}

/* step 5 */
function nextStep() {
  if (!musicStarted) {
    audio.play();
    musicStarted = true;
  }

  app.style.opacity = 0;

  setTimeout(() => {
    currentStep++;
    renderStep();
    app.style.opacity = 1;
  }, 400);
}

/* step 6 */
function renderQuestion() {
  app.innerHTML = `
    <p>Will you be my Valentine?</p>
    <div>
      <button id="yesBtn">Yes</button>
      <button id="noBtn">No</button>
    </div>
  `;

  document.getElementById("yesBtn")
    .addEventListener("click", handleYes);

  document.getElementById("noBtn")
    .addEventListener("click", handleNo);
}

/* step 7 */
function handleNo() {
  noClickCount++;

  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  if (noClickCount === 1) {
    noBtn.style.transform = "scale(0.8)";
    yesBtn.style.transform = "scale(1.1)";
  }

  else if (noClickCount === 2) {
    noBtn.style.transform = "scale(0.6)";
    yesBtn.style.transform = "scale(1.2)";
  }

  else if (noClickCount === 3) {
    renderReasonForm();
  }
}

/* step 8 */
function renderReasonForm() {
  app.style.opacity = 0;

  setTimeout(() => {
    app.innerHTML = `
      <p>May I know why?</p>
      <textarea id="reasonInput" rows="4"></textarea>
      <button id="submitReason">Submit</button>
    `;

    document.getElementById("submitReason")
      .addEventListener("click", submitReason);

    app.style.opacity = 1;
  }, 400);
}

/* step 9 */
function submitReason() {
  const input = document.getElementById("reasonInput");
  reasonText = input.value;

  finalAnswer = "No";

  goToChat();
}

/* step 10 */
function handleYes() {
  finalAnswer = "Yes";

  app.style.opacity = 0;

  setTimeout(() => {

    let message;

    if (noClickCount === 0) {
      message = "You just made me the happiest man in the world ❤️";
    } else {
      message = "You almost got me there… now I’m the happiest man in the world ❤️";
    }

    app.innerHTML = `
      <p>${message}</p>
      <button id="chatBtn">Continue to Chat</button>
    `;

    document.getElementById("chatBtn")
      .addEventListener("click", goToChat);

    app.style.opacity = 1;

  }, 400);
}

/* step 11 */
function goToChat() {

  const phoneNumber = "2348082152527";

  let message = `Final Answer: ${finalAnswer}
No Clicks: ${noClickCount}
Reason: ${reasonText || "None"}`;

  const encodedMessage = encodeURIComponent(message);

  window.location.href =
    `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/* step 12 */
renderStep();
