export default class Game extends Phaser.State{
	create(){
		this.example = this.game.add.sprite(0, this.game.height / 2 - 20, 'example');
	}

	update(){
		this.example.x += 2;
		if(this.example.x > this.game.width){
			this.example.x = -5;
		}
	}
}