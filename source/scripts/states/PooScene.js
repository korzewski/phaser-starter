export default class PooScene extends Phaser.State{
	preload() {
		this.game.load.image('pooMan', 'assets/images/pooMan.JPG');
		this.game.load.image('toiletBarCorrect', 'assets/images/toiletBarCorrect.png');
		this.game.load.image('toiletBarBad', 'assets/images/toiletBarBad.png');
		this.game.load.image('toiletMarker', 'assets/images/toiletMarker.png');
	}

	create(){
		this.pooMan = this.game.add.sprite(0, 0, 'pooMan');

		var barCenterY = this.game.height - 100;
		var hardMultiplier = this.game.settings.level * this.game.width / 20;
		this.toiletBarMargin = 20;
		this.toiletBarBadLeft = this.game.add.sprite(0, barCenterY, 'toiletBarBad');
		this.toiletBarBadLeft.x = this.toiletBarMargin;
		var maxX = this.game.width / 2 - this.toiletBarMargin;
		var badBarMultiplier = Math.min(hardMultiplier, maxX)
		this.toiletBarBadLeft.scale.x = badBarMultiplier;
		var endBarX = this.game.width - this.toiletBarMargin;
		this.toiletBarBadRight = this.game.add.sprite(0, barCenterY, 'toiletBarBad');
		this.toiletBarBadRight.x = endBarX - this.toiletBarBadLeft.width;
		this.toiletBarBadRight.scale.x = badBarMultiplier;
		this.toiletBarCorrect = this.game.add.sprite(0, barCenterY, 'toiletBarCorrect');
		this.toiletBarCorrect.x = this.toiletBarMargin + this.toiletBarBadLeft.scale.x;
		this.toiletBarCorrect.scale.x = (this.game.width / 2 - this.toiletBarMargin - this.toiletBarBadRight.width) * 2;
		this.toiletMarker = this.game.add.sprite(0, 0, 'toiletMarker');
		this.toiletMarker.y = barCenterY;// - this.toiletMarker.height / 2;
		this.toiletMarker.x = this.game.width / 2 - this.toiletMarker.width / 2;

		this.text1 = this.add.text(this.game.world.centerX / 2 - 20, 0, "");
		this.text2 = this.add.text(this.game.world.centerX / 2 - 20, 20, "");
		this.text3 = this.add.text(this.game.world.centerX / 2 - 20, 40, "");
		this.text4 = this.add.text(this.game.world.centerX / 2 - 20, 60, "");

		this.minMagneticPowerToCalculate = 5;
		this.minMagneticPower = 5;
		this.maxMagneticPower = 15;
		this.maxMagneticRandomPower = this.maxMagneticPower / 2;
		this.maxPlayerPower = 18;
		this.whenUpdateMinPower = 120;
		this.countFromUpdateMinPower = this.whenUpdateMinPower;
	}

	update(){
		var halfGameWidth = this.game.width / 2;
		var markerPower = this.getMarkerPower(halfGameWidth);

		this.text3.setText("markerPowerWithoutPlayer: " + markerPower);

		markerPower += this.getPlayerPower(halfGameWidth);

		this.text4.setText("markerPowerWithPlayer: " + markerPower);
		this.toiletMarker.x += markerPower;

	}

	getMarkerPower(halfGameWidth){
            var distanceMarkerToCenter = (halfGameWidth - (this.toiletMarker.x + this.toiletMarker.width / 2)) * -1;
            var markerPower = distanceMarkerToCenter / (halfGameWidth - this.toiletBarMargin) * this.maxMagneticPower;
            if (Math.abs(markerPower) < this.minMagneticPowerToCalculate	&& ++this.countFromUpdateMinPower > this.whenUpdateMinPower) {
                this.countFromUpdateMinPower = 0;
                markerPower = this.getRandom(this.minMagneticPower, this.maxMagneticRandomPower);
                if (this.getRandomInt(0, 10000) % 2  == 0) {
                    markerPower *= -1;
                }
            }
            return markerPower;
        }

	getPlayerPower(halfGameWidth){
		if (!this.game.input.mousePointer.isDown) {
			return 0;
		}
		//this.toiletMarker.x = this.game.input.x;
		var mouseDistanceToCenter = (halfGameWidth - this.game.input.x) * -1;
		return mouseDistanceToCenter / halfGameWidth * this.maxPlayerPower;
	}

	getRandom(min, max) {
		return Math.random() * (max - min) + min;
	}

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}