import Field from './field.js';
import Game from './game.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const gameFinishBanner = new PopUp();
const gameField = new Field(CARROT_COUNT, BUG_COUNT);
const game = new Game(sound, gameField, gameFinishBanner);

gameFinishBanner.setClickListener(() => {
  game.startGame();
});

gameField.setClickListener(game.onItemClick);
