const button = document.querySelector('.playControlButton');
const timer = document.querySelector('.timer');
let leftSeconds = 10;
let timerIntervalId;

button.addEventListener('click', () => {
  togglePlayStopButton();
  toggleTimer(timerIntervalId);
});

function togglePlayStopButton() {
  button.classList.toggle('play');
  button.classList.toggle('stop');
}

function toggleTimer(timerIntervalId) {
  if (timerIntervalId == null) {
    startTimer();
  } else {
    stopTimer(timerIntervalId);
  }
}

function startTimer() {
  timerIntervalId = setInterval(() => {
    if (leftSeconds > 0) {
      timer.textContent = `0:${--leftSeconds}`;
    }
  }, 1000);
}

function stopTimer(id) {
  clearInterval(id);
  timerIntervalId = null;
}
