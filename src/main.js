import Game from './game.js';
import PopUp from './popup.js';

const gameFinishBanner = new PopUp();
const game = new Game(2, 2, 2);
game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case 'cancel':
      message = 'Replay?';
      break;
    case 'win':
      message = 'You win!';
      break;
    case 'lose':
      message = 'You Lose';
      break;

    default:
      throw new Error('not valid reason');
  }
  gameFinishBanner.showWithText(message);
});
gameFinishBanner.setClickListener(() => {
  game.start();
});
