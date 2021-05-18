// Selector
//Timer
let totalSeconds;
let totalSecondsShort;
let totalSecondsLong;
let timer;
let timerShort;
let timerLong;
let pauseEl = 1; // if main timer is in pause = 1 else = 0
let timersLunched = 0; // if this var = 1, chevrons cant change inputs value
let mainTimerFinished = 0; // if main timer completely finished, this var = 1;
let menuUp = 0; // if menu is up = 1

//MainPage selectors
const countDownEl = document.querySelectorAll(".time");
const circle = document.querySelector("circle");
const mainButtons = document.querySelectorAll(".mainBtn");
const btnContainer = document.querySelector(".btnContainer");
const pauseRestartBtn = document.querySelectorAll("div.pauseRestart");
const timers = document.querySelectorAll(".timers");
const pauseBtn = document.querySelectorAll(".pauseBtn");

//Menu selectors
const applyMenuBtn = document.querySelector(".applyMenuBtn");
const menuContainer = document.querySelector(".menuContainer");
const settingBtn = document.querySelector(".fa-cog");
const leaveMenuBtn = document.querySelector(".fa-times");
const inputs = document.querySelectorAll("input");
const chevronsUp = document.querySelectorAll(".fa-chevron-up");
const chevronsDown = document.querySelectorAll(".fa-chevron-down");
const fontButtons = document.querySelectorAll(".fontButtons");
const colorButtons = document.querySelectorAll(".colorButtons");
const colorButtonsFas = document.querySelectorAll(".buttonFas");

//When app open
colorButtonsFas[0].classList.add("fa-check");
mainButtons[0].classList.add("mainBtnStyle");
fontButtons[0].classList.add("fontSelectorBg");
disable(mainButtons[1]);
disable(mainButtons[2]);
disable(pauseBtn[0]);
disable(pauseBtn[1]);
disable(pauseBtn[2]);

//Event listener

// Style
settingBtn.addEventListener("click", () => {
  if (window.innerWidth <= 575) {
    menuContainer.classList.toggle("menuMoveResponsive");
  } else {
    menuContainer.classList.toggle("menuMove");
  }
  settingBtn.classList.toggle("cogAnimation");
  allEnable();
});

leaveMenuBtn.addEventListener("click", () => {
  if (window.innerWidth <= 575) {
    menuContainer.classList.remove("menuMoveResponsive");
  } else {
    menuContainer.classList.remove("menuMove");
  }
});

// Style for font selector button on click

document.addEventListener("click", (e) => {
  if (e.target === fontButtons[0]) {
    fontButtons[0].classList.add("fontSelectorBg");
    fontButtons[1].classList.remove("fontSelectorBg");
    fontButtons[2].classList.remove("fontSelectorBg");
  } else if (e.target === fontButtons[1]) {
    fontButtons[1].classList.add("fontSelectorBg");
    fontButtons[0].classList.remove("fontSelectorBg");
    fontButtons[2].classList.remove("fontSelectorBg");
  } else if (e.target === fontButtons[2]) {
    fontButtons[2].classList.add("fontSelectorBg");
    fontButtons[0].classList.remove("fontSelectorBg");
    fontButtons[1].classList.remove("fontSelectorBg");
  }
});

// Style for color buttons selector check
document.addEventListener("click", (e) => {
  for (let i = 0; i < colorButtons.length; i++) {
    if (e.target === colorButtons[i] || e.target === colorButtonsFas[i]) {
      colorButtonsFas[i].classList.toggle("fa-check");
    }
  }

  if (e.target === colorButtons[0]) {
    colorButtonsFas[1].classList.remove("fa-check");
    colorButtonsFas[2].classList.remove("fa-check");
  } else if (e.target === colorButtons[1]) {
    colorButtonsFas[0].classList.remove("fa-check");
    colorButtonsFas[2].classList.remove("fa-check");
  } else if (e.target === colorButtons[2]) {
    colorButtonsFas[0].classList.remove("fa-check");
    colorButtonsFas[1].classList.remove("fa-check");
  }
});

// Change timers
mainButtons[0].addEventListener("click", () => {
  timers[0].style.display = "flex";
  timers[1].style.display = "none";
  timers[2].style.display = "none";
  stopShortBreak();
  stopLongBreak();
});

mainButtons[1].addEventListener("click", () => {
  timers[0].style.display = "none";
  timers[1].style.display = "flex";
  timers[2].style.display = "none";
  startShort();
});

mainButtons[2].addEventListener("click", () => {
  timers[0].style.display = "none";
  timers[1].style.display = "none";
  timers[2].style.display = "flex";
  startLong();
});

// Set up main buttons
mainButtons[0].addEventListener("click", runTimer);
mainButtons[1].addEventListener("click", pauseTimer);
mainButtons[2].addEventListener("click", pauseTimer);

// Lunch timer when applyMenuBtn is clicked
applyMenuBtn.addEventListener("click", () => {
  if (window.innerWidth <= 575) {
    menuContainer.classList.remove("menuMoveResponsive");
  } else {
    menuContainer.classList.remove("menuMove");
  }
  pauseRestartBtn[0].innerHTML = "PAUSE";
  //circle.style.strokeDashoffset = 900;
  mainTimerFinished = 0;
  timersLunched = 1;
  enable(mainButtons[1]);
  enable(mainButtons[2]);
  enable(pauseBtn[0]);
  start();

  // change style
  // Change first main buttons color
  if (colorButtonsFas[0].classList.contains("fa-check")) {
    mainButtons[0].classList.remove("mainBtnStyleBlue");
    mainButtons[0].classList.remove("mainBtnStylePurple");
    mainButtons[0].classList.add("mainBtnStyle");
  } else if (colorButtonsFas[1].classList.contains("fa-check")) {
    mainButtons[0].classList.remove("mainBtnStyle");
    mainButtons[0].classList.add("mainBtnStyleBlue");
  } else if (colorButtonsFas[2].classList.contains("fa-check")) {
    mainButtons[0].classList.remove("mainBtnStyle");
    mainButtons[0].classList.add("mainBtnStylePurple");
  }
  // color
  if (colorButtonsFas[0].classList.contains("fa-check")) {
    circle.style.stroke = "#f87070";
  } else if (colorButtonsFas[1].classList.contains("fa-check")) {
    circle.style.stroke = "#70F3F8";
  } else if (colorButtonsFas[2].classList.contains("fa-check")) {
    circle.style.stroke = "#D881F8";
  }

  // font
  if (fontButtons[0].classList.contains("fontSelectorBg")) {
    for (let i = 0; i < timers.length; i++) {
      timers[i].style.fontFamily = '"Kumbh Sans", sans-serif';
      timers[i].style.marginBottom = "0";
      mainButtons[i].style.fontFamily = '"Kumbh Sans", sans-serif';
    }
  } else if (fontButtons[1].classList.contains("fontSelectorBg")) {
    for (let i = 0; i < timers.length; i++) {
      timers[i].style.fontFamily = '"Roboto Slab", sans-serif';
      timers[i].style.marginBottom = "1rem";
      mainButtons[i].style.fontFamily = '"Roboto Slab", sans-serif';
    }
  } else if (fontButtons[2].classList.contains("fontSelectorBg")) {
    for (let i = 0; i < timers.length; i++) {
      timers[i].style.fontFamily = '"Space Mono", sans-serif';
      timers[i].style.marginBottom = "1rem";
      mainButtons[i].style.fontFamily = '"Space Mono", sans-serif';
    }
  }
});

// Set main buttons color
btnContainer.addEventListener("click", (e) => {
  if (colorButtonsFas[0].classList.contains("fa-check")) {
    for (let i = 0; i < mainButtons.length; i++) {
      if (e.target === mainButtons[i]) {
        mainButtons[i].classList.add("mainBtnStyle");
      }
    }
    if (e.target === mainButtons[0]) {
      mainButtons[0].classList.add("mainBtnStyle");
      mainButtons[1].classList.remove("mainBtnStyle");
      mainButtons[2].classList.remove("mainBtnStyle");
    } else if (e.target === mainButtons[1]) {
      mainButtons[1].classList.add("mainBtnStyle");
      mainButtons[0].classList.remove("mainBtnStyle");
      mainButtons[2].classList.remove("mainBtnStyle");
    } else if (e.target === mainButtons[2]) {
      mainButtons[2].classList.add("mainBtnStyle");
      mainButtons[0].classList.remove("mainBtnStyle");
      mainButtons[1].classList.remove("mainBtnStyle");
    }
  } else if (colorButtonsFas[1].classList.contains("fa-check")) {
    for (let i = 0; i < mainButtons.length; i++) {
      if (e.target === mainButtons[i]) {
        mainButtons[i].classList.add("mainBtnStyleBlue");
      }
    }
    if (e.target === mainButtons[0]) {
      mainButtons[0].classList.add("mainBtnStyleBlue");
      mainButtons[1].classList.remove("mainBtnStyleBlue");
      mainButtons[2].classList.remove("mainBtnStyleBlue");
    } else if (e.target === mainButtons[1]) {
      mainButtons[1].classList.add("mainBtnStyleBlue");
      mainButtons[0].classList.remove("mainBtnStyleBlue");
      mainButtons[2].classList.remove("mainBtnStyleBlue");
    } else if (e.target === mainButtons[2]) {
      mainButtons[2].classList.add("mainBtnStyleBlue");
      mainButtons[0].classList.remove("mainBtnStyleBlue");
      mainButtons[1].classList.remove("mainBtnStyleBlue");
    }
  } else if (colorButtonsFas[2].classList.contains("fa-check")) {
    for (let i = 0; i < mainButtons.length; i++) {
      if (e.target === mainButtons[i]) {
        mainButtons[i].classList.add("mainBtnStylePurple");
      }
    }
    if (e.target === mainButtons[0]) {
      mainButtons[0].classList.add("mainBtnStylePurple");
      mainButtons[1].classList.remove("mainBtnStylePurple");
      mainButtons[2].classList.remove("mainBtnStylePurple");
    } else if (e.target === mainButtons[1]) {
      mainButtons[1].classList.add("mainBtnStylePurple");
      mainButtons[0].classList.remove("mainBtnStylePurple");
      mainButtons[2].classList.remove("mainBtnStylePurple");
    } else if (e.target === mainButtons[2]) {
      mainButtons[2].classList.add("mainBtnStylePurple");
      mainButtons[0].classList.remove("mainBtnStylePurple");
      mainButtons[1].classList.remove("mainBtnStylePurple");
    }
  }
});

// Change inputs values with chevrons
document.addEventListener("click", (e) => {
  if (timersLunched === 0) {
    for (let i = 0; i < chevronsUp.length; i++) {
      if (e.target === chevronsUp[i]) {
        if (inputs[i].value === "") {
          break;
        } else {
          inputs[i].value = parseInt(inputs[i].value) + 1;
        }
      } else if (e.target === chevronsDown[i]) {
        if (inputs[i].value === "") {
          break;
        } else {
          inputs[i].value = parseInt(inputs[i].value) - 1;
          if (inputs[i].value < 1) {
            inputs[i].value = 0;
          }
        }
      }
    }
  }
});

// Set up pause button below timer
pauseRestartBtn[0].addEventListener("click", () => {
  if (mainTimerFinished === 0) {
    if (pauseEl === 0) {
      pauseTimer();
      pauseRestartBtn[0].innerHTML = "RESTART";
    } else if (pauseEl === 1) {
      runTimer();
      pauseRestartBtn[0].innerHTML = "PAUSE";
    }
  } else if (mainTimerFinished === 1) {
    pauseRestartBtn[0].innerHTML = "PAUSE";
    circle.style.strokeDashoffset = 900;
    start();
    mainTimerFinished = 0;
  }
});

document.addEventListener("click", () => {
  console.log();
});

// Functions

// Global functions

function getMinutes(totalSeconds) {
  let minutes = Math.floor(totalSeconds / 60);
  return minutes < 10 ? "0" + minutes : minutes; // Gets quotient rounded down
}

function getSeconds(totalSeconds) {
  let seconds = totalSeconds % 60; // Gets remainder after division
  return seconds < 10 ? "0" + seconds : seconds; // Inserts "0" if needed
}

function disable(element) {
  element.setAttribute("disabled", "");
}
function enable(element) {
  element.removeAttribute("disabled");
}

function allDisable() {
  disable(inputs[0]);
  disable(inputs[1]);
  disable(inputs[2]);
  disable(fontButtons[0]);
  disable(fontButtons[1]);
  disable(fontButtons[2]);
  disable(colorButtons[0]);
  disable(colorButtons[1]);
  disable(colorButtons[2]);
  disable(applyMenuBtn);
}
function allEnable() {
  enable(inputs[0]);
  enable(inputs[1]);
  enable(inputs[2]);
  enable(fontButtons[0]);
  enable(fontButtons[1]);
  enable(fontButtons[2]);
  enable(colorButtons[0]);
  enable(colorButtons[1]);
  enable(colorButtons[2]);
  enable(applyMenuBtn);
}

function disableMainButtons() {
  disable(mainButtons[0]);
  disable(mainButtons[1]);
  disable(mainButtons[2]);
  mainButtons[0].style.cursor = "default";
  mainButtons[1].style.cursor = "default";
  mainButtons[2].style.cursor = "default";
}
function enableMainButtons() {
  enable(mainButtons[0]);
  enable(mainButtons[1]);
  enable(mainButtons[2]);
  mainButtons[0].style.cursor = "pointer";
  mainButtons[1].style.cursor = "pointer";
  mainButtons[2].style.cursor = "pointer";
}

//MAIN TIMER FUNCTIONS

function start() {
  totalSeconds = inputs[0].value * 60; // Sets initial value of totalSeconds based on user input
  countDownEl[0].innerHTML =
    getMinutes(totalSeconds) + ":" + getSeconds(totalSeconds); // Initializes display
  allDisable();
  circle.style.animation = `animate ${totalSeconds}s linear`; // Initializes animation duration
  runTimer();
}

function runTimer() {
  // Is the main timer function, calls `tick` every 1000 milliseconds
  if (pauseEl === 1) {
    pauseCircle();
    pauseEl = 0;
  }
  timer = setInterval(tick, 1000);
}

function tick() {
  if (totalSeconds >= 2) {
    totalSeconds--; // Decreases total seconds by one
    countDownEl[0].innerHTML =
      getMinutes(totalSeconds) + ":" + getSeconds(totalSeconds); // Updates display
    allDisable();
  } else if (totalSeconds == 1) {
    // The timer has reached zero. Let the user start again.
    totalSeconds--; // Decreases total seconds by one
    countDownEl[0].innerHTML =
      getMinutes(totalSeconds) + ":" + getSeconds(totalSeconds); // Updates display
    pauseRestartBtn[0].innerHTML = "RESTART";
    circle.style.strokeDashoffset = 0;
    pauseEl = 0;
    timersLunched = 0;
    mainTimerFinished = 1;
    pauseTimer();
    allEnable();
    disable(pauseBtn[0]);
  } else {
    return;
  }
}

function pauseTimer() {
  // Stops calling `tick` and pause circle animation
  clearInterval(timer);
  pauseCircle();
  pauseEl = 1;
}

function pauseCircle() {
  const circleStrokeDashoffset = 900;
  let totalTime = parseInt(inputs[0].value) * 60;
  let minutesTimerValue = parseInt(countDownEl[0].innerHTML.substring(0, 2));
  let secondsTimerValue = parseInt(countDownEl[0].innerHTML.substring(3, 5));
  let minutesInSeconds = minutesTimerValue * 60;
  let pauseTotalSeconds = secondsTimerValue + minutesInSeconds;
  let timePercentageLeft = (100 * pauseTotalSeconds) / totalTime;
  let circleStrokeDashoffsetNeeded =
    (circleStrokeDashoffset * timePercentageLeft) / 100;
  let timeLeft = totalTime - (totalTime - pauseTotalSeconds);

  if (pauseEl === 0) {
    circle.style.animation = "none";
    circle.style.strokeDashoffset = `${circleStrokeDashoffsetNeeded}`;
  } else if (pauseEl === 1) {
    circle.style.animation = `animate ${timeLeft}s linear`;
    circle.style.strokeDashoffset = `${circleStrokeDashoffsetNeeded}`;
  }
}

// Short pause timer functions
function startShort() {
  totalSecondsShort = inputs[1].value * 60; // Sets initial value of totalShortSeconds based on user input
  countDownEl[1].innerHTML =
    getMinutes(totalSecondsShort) + ":" + getSeconds(totalSecondsShort); // Initializes display
  allDisable(); // Toggles buttons
  runShortTimer();
}

function runShortTimer() {
  // Is the main timer function, calls `tick` every 1000 milliseconds
  if (pauseEl === 1) {
    pauseCircle();
    pauseEl = 0;
  }
  timerShort = setInterval(tickShortTimer, 1000);
}

function tickShortTimer() {
  if (totalSecondsShort >= 2) {
    totalSecondsShort--;
    countDownEl[1].innerHTML =
      getMinutes(totalSecondsShort) + ":" + getSeconds(totalSecondsShort); // Updates display
    allDisable();
    disableMainButtons();
    disable(pauseBtn[0]);
  } else if (totalSecondsShort == 1) {
    // The short pause timer has reached zero, main timer resumes
    totalSecondsShort--;
    countDownEl[1].innerHTML =
      getMinutes(totalSecondsShort) + ":" + getSeconds(totalSecondsShort); // Updates display
    clearInterval(timerShort);
    runTimer();
    enableMainButtons();
    enable(pauseBtn[0]);
    timers[0].style.display = "flex";
    timers[1].style.display = "none";
    timers[2].style.display = "none";
    if (colorButtonsFas[0].classList.contains("fa-check")) {
      mainButtons[0].classList.add("mainBtnStyle");
      mainButtons[1].classList.remove("mainBtnStyle");
    } else if (colorButtonsFas[1].classList.contains("fa-check")) {
      mainButtons[0].classList.add("mainBtnStyleBlue");
      mainButtons[1].classList.remove("mainBtnStyleBlue");
    } else if (colorButtonsFas[2].classList.contains("fa-check")) {
      mainButtons[0].classList.add("mainBtnStylePurple");
      mainButtons[1].classList.remove("mainBtnStylePurple");
    }
  } else {
    return;
  }
}

// Long pause timer functions
function startLong() {
  totalSecondsLong = inputs[2].value * 60; // Sets initial value of totalLongSeconds based on user input
  countDownEl[2].innerHTML =
    getMinutes(totalSecondsLong) + ":" + getSeconds(totalSecondsLong); // Initializes display
  allDisable();
  runLongTimer();
}

function runLongTimer() {
  // Is the main timer function, calls `tick` every 1000 milliseconds
  if (pauseEl === 1) {
    pauseCircle();
    pauseEl = 0;
  }
  timerLong = setInterval(tickLongTimer, 1000);
}

function tickLongTimer() {
  if (totalSecondsLong >= 2) {
    totalSecondsLong--;
    countDownEl[2].innerHTML =
      getMinutes(totalSecondsLong) + ":" + getSeconds(totalSecondsLong); // Updates display
    allDisable();
    disableMainButtons();
    disable(pauseBtn[0]);
  } else if (totalSecondsLong == 1) {
    // The long pause timer has reached zero, main timer resumes
    totalSecondsLong--;
    countDownEl[2].innerHTML =
      getMinutes(totalSecondsLong) + ":" + getSeconds(totalSecondsLong);
    clearInterval(timerLong);
    enableMainButtons();
    enable(pauseBtn[0]);
    runTimer();
    timers[0].style.display = "flex";
    timers[1].style.display = "none";
    timers[2].style.display = "none";
    if (colorButtonsFas[0].classList.contains("fa-check")) {
      mainButtons[0].classList.add("mainBtnStyle");
      mainButtons[2].classList.remove("mainBtnStyle");
    } else if (colorButtonsFas[1].classList.contains("fa-check")) {
      mainButtons[0].classList.add("mainBtnStyleBlue");
      mainButtons[2].classList.remove("mainBtnStyleBlue");
    } else if (colorButtonsFas[2].classList.contains("fa-check")) {
      mainButtons[0].classList.add("mainBtnStylePurple");
      mainButtons[2].classList.remove("mainBtnStylePurple");
    }
  } else {
    return;
  }
}
