import shuffle from '../utils/shuffle';

export default class ChaptersManager extends Phaser.State{
	init(currentIndex){
		this.initChapters(currentIndex);
	}

	initChapters(currentIndex){
		if(typeof this.game.global === 'undefined'){
			this.game.global = {};
		}
       	this.game.global.currentChapterIndex = currentIndex;
       	this.game.global.currentLevel = 1;

       	if(this.game.global.currentChapterIndex == -1){
			this.game.global.chaptersList = shuffle(['CoffeeMachine', 'Cornflakes', 'PooScene']);
        	console.log('chaptersList: ', this.game.global.chaptersList);
       		this.nextChapter();
       	}
        console.log('currentChapterIndex: ', this.game.global.currentChapterIndex);
	}

	create(){
		console.log('GUI');
	}

	nextChapter(){
		alert('next chapter');

		if(this.game.global.currentChapterIndex + 1 < this.game.global.chaptersList.length){
			this.game.global.currentChapterIndex++;
			this.game.state.start(this.game.global.chaptersList[this.game.global.currentChapterIndex], true, false, this.game.global.currentChapterIndex);
		} else {
			alert('last chapter');
			this.gameOver();
		}
	}

	gameOver(){
		alert('gameOver');
		this.initChapters(-1);
	}
}