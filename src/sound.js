'use strict';

const SOUND_TYPES = {
  CARROT: 'carrot',
  BUG: 'bug',
  ALERT: 'alert',
  BG: 'bg',
  WIN: 'win',
};
export default class Sound {
  constructor() {
    this.carrotSound = new Audio('./sound/carrot_pull.mp3');
    this.alertSound = new Audio('./sound/alert.wav');
    this.bgSound = new Audio('./sound/bg.mp3');
    this.bugSound = new Audio('./sound/bug_pull.mp3');
    this.windSound = new Audio('./sound/game_win.mp3');
  }

  play(type) {
    const sound = this.#getSoundByType(type);
    sound.currentTime = 0;
    sound.play();
  }

  stop(type) {
    this.#getSoundByType(type).pause();
  }

  #getSoundByType(type) {
    let sound;
    switch (type) {
      case SOUND_TYPES['CARROT']:
        sound = this.carrotSound;
        break;
      case SOUND_TYPES['BUG']:
        sound = this.bugSound;
        break;
      case SOUND_TYPES['ALERT']:
        sound = this.alertSound;
        break;
      case SOUND_TYPES['BG']:
        sound = this.bgSound;
        break;
      case SOUND_TYPES['WIN']:
        sound = this.windSound;
        break;

      default:
        throw new Error('You have to only use a sound among registered sounds');
    }
    return sound;
  }
}
