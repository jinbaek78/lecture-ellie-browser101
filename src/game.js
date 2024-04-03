'use strict';
const CARROT_COUNT = 5;
const GAME_DURATION_SEC = 5;

export default class Game {
  started = false;
  score = 0;
  timer = undefined;
  constructor(sound, gameField, gameFinishBanner) {
    this.sound = sound;
    this.gameField = gameField;
    this.gameFinishBanner = gameFinishBanner;
    this.gameBtn = document.querySelector('.game__button');
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stopGame();
      } else {
        this.startGame();
      }
    });
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }

    if (item === 'carrot') {
      this.score++;
      this.updateScoreBoard();
      if (this.score === CARROT_COUNT) {
        this.finishGame(true);
      }
    } else if (item === 'bug') {
      this.finishGame(false);
    }
  };

  startGame() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    this.sound.playBackground();
  }

  stopGame() {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    this.gameFinishBanner.showWithText('REPLAY?');
    this.sound.playAlert();
    this.sound.stopBackground();
  }

  showStopButton() {
    const icon = this.gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.gameBtn.style.visibility = 'visible';
  }

  hideGameButton() {
    this.gameBtn.style.visibility = 'hidden';
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }

  startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finishGame(CARROT_COUNT === this.score);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  initGame() {
    this.gameScore.innerHTML = CARROT_COUNT;
    this.score = 0;
    this.gameField.init();
  }

  finishGame(win) {
    this.started = false;
    this.hideGameButton();
    if (win) {
      this.sound.playWin();
    } else {
      this.sound.playAlert();
    }
    this.stopGameTimer();
    this.sound.stopBackground();
    this.gameFinishBanner.showWithText(win ? 'You Win' : 'You Lose');
  }

  updateScoreBoard() {
    this.gameScore.innerHTML = CARROT_COUNT - this.score;
  }
}
