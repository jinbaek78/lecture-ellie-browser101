import GameBuilder, { Reason } from './game.js';
import PopUp from './popup.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder() //
  .withGameDuration(5)
  .withCarrotCount(3)
  .withBugCount(3)
  .build();
game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = 'Replay?';
      break;
    case Reason.lose:
      message = 'You win!';
      break;
    case Reason.win:
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
