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

		this.pacLeft = this.game.add.sprite(-170, 100, 'pacLeft');
	    this.coffeeMachine.add(this.pacLeft);
		this.pacRight = this.game.add.sprite(400, 100, 'pacRight');
	    this.coffeeMachine.add(this.pacRight);

		this.barLeft = this.game.add.graphics();
	    this.barLeft.beginFill(0xffffff, 0.8);
	    this.barLeft.drawRect(35, 105, 100, 50);
	    this.coffeeMachine.add(this.barLeft);

	    this.barRight = this.game.add.graphics();
	    this.barRight.beginFill(0xffffff, 0.8);
	    this.barRight.drawRect(250, 105, 100, 50);
	    this.coffeeMachine.add(this.barRight);

		let style = { font: "bold 32px Arial", fill: "#f00", boundsAlignH: "center", boundsAlignV: "middle" };
		this.errorLeft = this.game.add.text(40, 110, 'Error!', style, this.coffeeMachine);
		this.errorRight = this.game.add.text(255, 110, 'Error!', style, this.coffeeMachine);

		this.coffeeMachine.x = 310;
		this.coffeeMachine.y = 80;

		this.pacLeft.alpha = this.pacRight.alpha = this.errorLeft.alpha = this.errorRight.alpha = 0;

		this.leftButtonRect = new Phaser.Rectangle(220, 150, 150, 150);
		this.rightButtonRect = new Phaser.Rectangle(650, 150, 150, 150);
		this.startButtonCircle = new Phaser.Circle(500, 210, 30);

		this.isHitting = false;
		this.isStarted = false;

		this.errorsTimeRange = new Phaser.Point(500, 1000);
		this.errorsAreRunning = false;
		this.isErrorLeft = false;
		this.isErrorRight = false;

		this.correctHits = 0;
		this.missedHits = 0;
	}

	update(){

		if(this.game.input.activePointer.isDown && !this.isHitting){
			let posX = this.game.input.activePointer.x;
			let posY = this.game.input.activePointer.y;
			if(this.startButtonCircle.contains(posX, posY)){
				this.isStarted = true;
			}

			if( this.leftButtonRect.contains(posX, posY) && this.isStarted ){
				this.hitLeft();
			} else if( this.rightButtonRect.contains(posX, posY) && this.isStarted ){
				this.hitRight();
			}

			this.isHitting = true;

		} else if( this.game.input.activePointer.isUp && this.isHitting ){
			this.isHitting = false;

			this.pacLeft.alpha = this.pacRight.alpha = 0;
		}

		if(this.isStarted){
			if( !this.errorsAreRunning ){
				this.errorsAreRunning = true;
				setTimeout(() => {
					this.errorsAreRunning = false;
					this.updateErrors();
				}, this.game.rnd.integerInRange(this.errorsTimeRange.x, this.errorsTimeRange.y));
			}
		}
	}

	updateErrors(){
		if( this.game.rnd.integerInRange(0, 1) ){
			if(this.isErrorLeft){
				this.loseLeftError();
			} else {
				this.showLeftError();
			}
		} else {
			if(this.isErrorRight){
				this.loseRightError();
			} else {
				this.showRightError();
			}
		}
	}

	hitLeft(){
		this.pacLeft.alpha = 1;
		if(this.isErrorLeft){
			console.log('hitted error left!');
			this.hideLeftError();
			this.updateScore(1);
		} else {
			console.log('missed error left!');
			this.updateScore(-1);
		}
	}

	hitRight(){
		this.pacRight.alpha = 1;
		if(this.isErrorRight){
			console.log('hitted error right');
			this.hideRightError();
			this.updateScore(1);
		} else {
			console.log('missed error right');
			this.updateScore(-1);
		}
	}

	updateScore(value){
		if(value > 0){
			this.correctHits++;
			if(this.correctHits > 10){
				alert('you win!');
			}
		} else {
			this.missedHits++;
			console.log('missedHits: ', this.missedHits);
			if(this.missedHits > 2){
				alert('you lost!');
			}
		}
	}

	loseLeftError(){
		console.log('lose error left');
		this.hideLeftError();
		this.updateScore(-1);
	}

	loseRightError(){
		console.log('lose error right');
		this.hideRightError();
		this.updateScore(-1);
	}

	hideLeftError(){
		this.isErrorLeft = false;
		this.errorLeft.alpha = 0;
	}

	hideRightError(){
		this.isErrorRight = false;
		this.errorRight.alpha = 0;
	}

	showLeftError(){
		this.isErrorLeft = true;
		this.errorLeft.alpha = 1;
	}

	showRightError(){
		this.isErrorRight = true;
		this.errorRight.alpha = 1;
	}

	render(){
		this.game.debug.geom(this.leftButtonRect, 'rgba(255,0,0,0.1');
		this.game.debug.geom(this.rightButtonRect, 'rgba(255,0,0,0.1');
		this.game.debug.geom(this.startButtonCircle, 'rgba(0,255,0,0.5');
	}
}