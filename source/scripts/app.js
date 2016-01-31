import ChaptersManager from './states/chapters_manager';
import CoffeeMachine from './states/CoffeeMachine';
import Cornflakes from './states/cornflakes';
import Toilet from './states/PooScene';

const settings = {
  width: 1024,
  height: 768,
}

class Init extends Phaser.Game {
  constructor() {
    super(settings.width, settings.height, Phaser.AUTO, 'game');

    this.state.add('Boot', Boot, true);
    this.state.add('Preloader', Preloader, false);

    this.state.add('ChaptersManager', ChaptersManager, false);
    this.state.add('CoffeeMachine', CoffeeMachine, false);
    this.state.add('Cornflakes', Cornflakes, false);
    this.state.add('Toilet', Toilet, false);
  }
}

class Boot extends Phaser.State {
  create() {
    this.scaleMode = this.scale.RESIZE;
    // this.scale.startFullScreen(true);

    this.scale.refresh();

    this.state.start('Preloader', true, true);
  }
}

class Preloader extends Phaser.State{
  preload() {
    // preload all images in future

    this.load.audio('theme', 'assets/audio/theme.mp3');
  }

  create() {
        if(!this.game.global) {
          this.game.global = {};
        }

        this.game.global.audio = this.add.audio('theme', 2, true, true);
        this.game.global.audio.onDecoded.add(() => {
            this.game.global.audio.fadeIn(100);
            this.state.start('ChaptersManager', true, false, -1);
        }, this);

  }
}

new Init();