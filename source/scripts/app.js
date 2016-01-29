import Game from './classes/Game';

const settings = {
    width: 800,
    height: 600
}

class Init extends Phaser.Game {
    constructor() {
        super(settings.width, settings.height, Phaser.AUTO, 'game');
        this.state.add('Boot', Boot, false);
        this.state.add('Preloader', Preloader, false);
        this.state.add('Game', Game, false);
        this.state.start('Boot');
    }
}

class Boot extends Phaser.State {
    create() {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            this.scale.pageAlignHorizontally = true;
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.maxWidth = settings.width + settings.width/2;
            this.scale.maxHeight = settings.height + settings.height/2;
        } else {
            // mobile settings
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 1024;
            this.scale.maxHeight = 768;
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.refresh();
        }

        this.game.state.start('Preloader', true, false);
    }
}

class Preloader extends Phaser.State{
    preload() {
        this.game.load.image('example', 'assets/images/example.png');
    }

    create(){
        this.game.state.start('Game');
    }

}

new Init();