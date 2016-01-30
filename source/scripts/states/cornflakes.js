import shuffle from '../utils/shuffle';
import random from '../utils/random';
import contains from '../utils/contains';





const _cornflake = {
	width: 60,
	height: 60,
};

const _box = {
	width: 200,
	height: 300,
};

const _bowl = {
	width: 300,
	height: 150,
};

const _space = 40;





export default class Cornflakes extends Phaser.State{
	preload() {
		this.load.image('cornflakes1', 'assets/images/cornflakes_1.png');
		this.load.image('cornflakes2', 'assets/images/cornflakes_2.png');
		this.load.image('cornflakes3', 'assets/images/cornflakes_3.png');
		this.load.image('cornflakesBox1', 'assets/images/cornflakes_box_1.png');
		this.load.image('cornflakesBox2', 'assets/images/cornflakes_box_2.png');
		this.load.image('cornflakesBox3', 'assets/images/cornflakes_box_3.png');
		this.load.image('cornflakesBowl', 'assets/images/cornflakes_bowl.png');
	}

	createOrder(order) {
		const orderGroup = this.add.group();

		const background = this.add
			.graphics()
			.beginFill(0xffffff, 0.25)
	  	.drawRect(
				0,
				0,
				_cornflake.width * 3,
				this.game.height
			);

		orderGroup.add(background);

		order = order
			.map(index => {
				return this.cornflakes[index].cornflake;
			}, this)
			.forEach((sprite, index) => {

				const cornflake = this.add.sprite(
					_cornflake.width * 1.5,
					(index + 1) * _cornflake.height + (index + 1) * _space / 2,
					sprite
				);

				cornflake.anchor.setTo(0.5);

				orderGroup.add(cornflake);
			});
	}

	createBox(boxIndex, positionIndex) {
		const positions = [
			{
				x: this.game.width / 2 - _box.width - _space,
				y: this.game.height / 2 - _space,
			},
			{
				x: this.game.width / 2,
				y: this.game.height / 2 - _space,
			},
			{
				x: this.game.width / 2 + _box.width + _space,
				y: this.game.height / 2 - _space,
			},
		];

		const box = this.add.sprite(
			positions[positionIndex].x,
			positions[positionIndex].y,
			this.cornflakes[boxIndex].box
		)

		box.anchor.setTo(0.5);
		box.inputEnabled = true;
    box.events.onInputDown.add(this.addToBowl, { _self: this, index: boxIndex, });
	}

	createBowl() {
		const bowl = this.add.sprite(
			this.game.width / 2,
			this.game.height / 2 + _box.height / 2 + _bowl.height / 2,
			'cornflakesBowl'
		);

		bowl.anchor.setTo(0.5);
	}

	create() {
		this.cornflakes = [
			{
				cornflake: 'cornflakes1',
				box: 'cornflakesBox1',
			},
			{
				cornflake: 'cornflakes2',
				box: 'cornflakesBox2',
			},
			{
				cornflake: 'cornflakes3',
				box: 'cornflakesBox3',
			},
		];

		this.order = random([0, 1, 2], 5);

		this.bowl = [];



		this.createOrder(this.order);

		shuffle([0, 1, 2])
			.forEach((boxIndex, positionIndex) => {
				this.createBox(boxIndex, positionIndex);
			}, this);

		this.createBowl();
	}

	update() {

	}

	addToBowl() {
		this._self.bowl.push(this.index);

		const bowlContains = contains(this._self.bowl, this.index);
		const orderContains = contains(this._self.order, this.index);

		if(bowlContains > orderContains) {
			this._self.lose();
		}

		else {
			if(bowlContains === orderContains && this._self.bowl.length === this._self.order.length) {
				this._self.win();
			}
		}
	}

	win() {
		if(confirm('You win!')) {
			this.state.start('Cornflakes');
		}
	}

	lose() {
		if(confirm('You lose!')) {
			this.state.start('Cornflakes');
		}
	}
}