export default class SuccessOutro extends Phaser.State{
	preload(){
		this.game.load.image('winImg', 'assets/images/tmp_win.png');
		this.game.load.spritesheet('continueButton', 'assets/images/button_sprite_sheet.png', 193, 71);
	}

	init(dayCounter) {
		this.dayCounter = dayCounter;
	}

	create(){
		this.winImage = this.game.add.image(100, 100, 'winImg');
		this.winImage.scale.setTo(3,3);
		this.fontStyle = { font: "55px Arial", fill: "#ff0044", align: "center" };
		this.outroText = this.game.add.text(this.game.world.centerX, this.game.world.centerY,
			"Udało się! Wyszedłeś z domu!\nKoniec dnia " + this.dayCounter, this.fontStyle);
		this.outroText.anchor.set(0.5);
		this.button = this.game.add.button(this.game.world.centerX + 200 /*TODO: Button x position*/,
			this.game.world.centerY + 200/*TODO: Button y position*/, 'continueButton', this.actionOnClick, this, 2, 1, 0);
		this.buttonText = this.game.add.text(0, 0, "Go!", this.fontStyle);
		this.button.addChild(this.buttonText);
	}

	actionOnClick() {
		//TODO: Action on click
	}
}