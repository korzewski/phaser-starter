import shuffle from '../utils/shuffle';





export default class extends Phaser.State{
	init(index) {
		this.initChapters(index);
	}

	initChapters(index){
		if(!this.global) {
			this.global = {};
		}

		this.global.level = 1;
		this.global.chapter = index;

    if(this.global.chapter < 0) {
			this.global.chapters = shuffle(['CoffeeMachine', 'Cornflakes', 'Toilet']);
        console.log('chapters:', this.global.chapters);

				this.nextChapter();
      }
	}

	nextChapter() {
		alert('next chapter');

		if(this.global.chapter + 1 < this.global.chapters.length) {
			this.global.chapter++;
			this.state.start(
				this.global.chapters[this.global.chapter],
				true,
				false,
				this.game.global.chapter
			);
		}

		else {
			alert('last chapter');

			this.lose();
		}
	}

	lose() {
		alert('game over');

		this.initChapters(-1);
	}
}