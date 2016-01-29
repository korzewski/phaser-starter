export default class Outro extends Phaser.State{
	create(){
		this.example = this.game.add.sprite(0, this.game.height / 2 - 20, 'example');
	}

	update(){
		this.example.x += 20;
		if(this.example.x > this.game.width){
			this.example.x = -5;
		}
	}
}