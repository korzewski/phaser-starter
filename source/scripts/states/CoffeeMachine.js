export default class CoffeeMachine extends Phaser.State{
	preload(){
		this.game.load.image('coffeeMachine', 'assets/images/cm_0.png');
		this.game.load.image('coffeeMachineCup', 'assets/images/cm_3.png');
		this.game.load.image('pacLeft', 'assets/images/cm_2.png');
		this.game.load.image('pacRight', 'assets/images/cm_1.png');
	}

	create(){
		this.game.stage.backgroundColor = '#ffffff';

		this.coffeeMachine = this.game.add.group();
		this.coffeeMachine.create(0, 0, 'coffeeMachine');
		this.coffeeMachine.create(125, 400, 'coffeeMachineCup');
		this.coffeeMachine.create(-170, 100, 'pacLeft');
		this.coffeeMachine.create(400, 100, 'pacRight');

		let barLeft = this.game.add.graphics();
	    barLeft.beginFill(0xffffff, 0.8);
	    barLeft.drawRect(35, 105, 100, 50);
	    this.coffeeMachine.add(barLeft);

	    let barRight = this.game.add.graphics();
	    barRight.beginFill(0xffffff, 0.8);
	    barRight.drawRect(250, 105, 100, 50);
	    this.coffeeMachine.add(barRight);

		let style = { font: "bold 32px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle" };
		this.game.add.text(40, 110, 'Error!', style, this.coffeeMachine);
		this.game.add.text(255, 110, 'Error!', style, this.coffeeMachine);


		this.coffeeMachine.x = 310;
		this.coffeeMachine.y = 80;
	}

	update(){
		

	}
}