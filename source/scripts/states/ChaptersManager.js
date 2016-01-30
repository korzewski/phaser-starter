import shuffle from '../utils/shuffle';

export default class ChaptersManager extends Phaser.State{
	init(currentIndex){
		this.initChapters(currentIndex);
	}

	initChapters(currentIndex){
		this.chaptersList = shuffle(['CoffeeMachine', 'Cornflakes']);
       	this.currentChapterIndex = currentIndex;

       	if(this.currentChapterIndex == -1){
       		this.nextChapter();
       	}
        console.log('chaptersList: ', this.chaptersList);
        console.log('currentChapterIndex: ', this.currentChapterIndex);
	}

	create(){
		console.log('GUI');
	}

	nextChapter(){
		alert('next chapter');

		if(this.currentChapterIndex + 1 < this.chaptersList.length){
			this.currentChapterIndex++;
			this.game.state.start(this.chaptersList[this.currentChapterIndex], true, false, this.currentChapterIndex);
		} else {
			alert('last chapter');
		}
	}

	gameOver(){
		alert('gameOver');
		this.initChapters(-1);
	}
}