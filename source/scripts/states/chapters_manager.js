import shuffle from '../utils/shuffle';





export default class extends Phaser.State{
	init(index) {
		this.initChapters(index);
	}

	initChapters(index){
		if(!this.game.global) {
			this.game.global = {};
		}

		this.game.global.level = 1;
		this.game.global.chapter = index;


    	if(this.game.global.chapter < 0) {
			this.game.global.chapters = shuffle(['CoffeeMachine', 'Cornflakes', 'Toilet']);

			this.nextChapter();
    	}
	}

	nextChapter() {
		if(this.game.global.chapter + 1 < this.game.global.chapters.length) {
			this.game.global.chapter++;

			this.state.start(
				this.game.global.chapters[this.game.global.chapter],
				true,
				false,
				this.game.global.chapter
			);
		}

		else {
			this.lose();
		}
	}

	lose() {
		this.initChapters(-1);
	}
}