export default class SuccessOutro extends Phaser.State{

	init(dayCounter) {
		this.dayCounter = dayCounter;
	}

	preload(){
		this.game.load.image('winImg', 'extra/img/tmp_win.png');
	}

	create(){
		this.game.add.image(100, 100, 'winImg');
		this.fontStyle = { font: "55px Arial", fill: "#ff0044", align: "center" };
		this.outroText = this.game.add.text(this.game.world.centerX, this.game.world.centerY,
			"Udało się! Wyszedłeś z domu!\nKoniec dnia " + this.dayCounter, this.fontStyle);
		this.outroText.anchor.set(0.5);
	}
}