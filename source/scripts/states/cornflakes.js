import shuffle from '../utils/shuffle';
import random from '../utils/random';
import contains from '../utils/contains';
import shake from '../utils/shake';
import ChaptersManager from './chaptersManager';





const _cornflake = {
	width: 75,
	height: 75,
};

const _box = {
	width: 230,
	height: 235,
};

const _bowl = {
	width: 135,
	height: 105,
};





export default class extends ChaptersManager{
	preload() {
		this.load.image('cornflakesBackground', 'assets/images/cornflakes/background.jpg');

		this.load.spritesheet('cornflakesCornflake', 'assets/images/cornflakes/cornflake.png', _cornflake.width, _cornflake.height);
		this.load.spritesheet('cornflakesBox', 'assets/images/cornflakes/box.png', _box.width, _box.height);
		this.load.spritesheet('cornflakesLabel', 'assets/images/cornflakes/label.png', _box.width, _box.height);
		this.load.spritesheet('cornflakesBowl', 'assets/images/cornflakes/bowl.png', _bowl.width, _bowl.height);
	}

	createOrder(order) {
		const group = this.add.group();

		const background1 = this.add
			.graphics()
			.beginFill(0xedd2a6, 1)
	  	.drawRect(
				0,
				0,
				_cornflake.width + 20 * 2,
				this.game.height
			);

		const background2 = this.add
			.graphics()
			.beginFill(0xa0918d, 1)
	  	.drawRect(
				10,
				10,
				_cornflake.width + 20,
				this.game.height - 20
			);

		group.add(background1);
		group.add(background2);

		order
			.forEach((type, index) => {
				const cornflake = this.add.sprite(
					20,
					20 + index * _cornflake.height,
					'cornflakesCornflake',
					type
				);

				group.add(cornflake);
			}, this);
	}

	createBackground() {
		const background = this.add.sprite(
			0,
			0,
			'cornflakesBackground',
		);
	}

	createBox(position, cornflake) {
		const group = this.add.group();

		group.x = _box.width / 2 + _box.width * position;
		group.y = _box.height / 2;

		const box = this.add.sprite(
			_box.width / -2,
			_box.height / -2,
			'cornflakesBox',
			position
		);

		const label = this.add.sprite(
			_box.width / -2 + (position < 1 ? 15 : (position > 1 ? -15 : 0)),
			_box.height / -2,
			'cornflakesLabel',
			cornflake
		);

		box.inputEnabled = true;
    box.events.onInputDown.add(this.addToBowl.bind(this, group, position, cornflake));

		group.add(box);
		group.add(label);

		return group;
	}

	createBowl() {
		const bowl = this.add.sprite(
			_box.width * 1.5,
			_box.height + _bowl.height / 2,
			'cornflakesBowl'
		);

		bowl.anchor.setTo(0.5);

		this.objects.bowl = bowl;

		return bowl;
	}

	create() {
		this.objects = {};
		this.vars = {
			order: random([0, 1, 2], 6),
			bowl: [],
		};

		this.createBackground();
		this.createOrder(this.vars.order);

		const group = this.add.group();

		group.x = this.game.width / 2 - 310;
		group.y = this.game.height / 2 - 45;

		shuffle([0, 1, 2])
			.forEach((cornflake, position) => {
				group.add(this.createBox(position, cornflake));
			}, this);

		group.add(this.createBowl());
	}

	addToBowl(box, position, cornflake) {
		shake(this, box, position < 1 ? 1 : -1);

		this.vars.bowl.push(cornflake);

		this.objects.bowl.frame = this.vars.bowl.length;

		const bowlContains = contains(this.vars.bowl, cornflake);
		const orderContains = contains(this.vars.order, cornflake);

		if(bowlContains === orderContains && this.vars.bowl.length === this.vars.order.length) {
			this.nextChapter();
		}

		else {
			if(bowlContains > orderContains) {
				this.gameOver();
			}
		}
	}
}