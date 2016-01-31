import ChaptersManager from './states/ChaptersManager';
import CoffeeMachine from './states/CoffeeMachine';
import Cornflakes from './states/cornflakes';
import PooScene from './states/PooScene';

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
    this.state.add('PooScene', PooScene, false);
  }
}

class Boot extends Phaser.State {
  create() {
    this.scaleMode = this.scale.RESIZE;
    // this.scale.startFullScreen(true);

    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.scale.refresh();

    this.game.state.start('Preloader', true, true);
  }
}

class Preloader extends Phaser.State{
  preload() {
    // preload all images in future
  }

  create() {
    this.game.state.start('ChaptersManager', true, false, -1);
  }
}

new Init();