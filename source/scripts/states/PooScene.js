export default class PooScene extends Phaser.State {
    preload() {
        this.game.load.image('pooMan', 'assets/images/pooMan.JPG');
        this.game.load.image('toiletBarCorrect', 'assets/images/toiletBarCorrect.png');
        this.game.load.image('toiletBarBad', 'assets/images/toiletBarBad.png');
        this.game.load.image('toiletMarker', 'assets/images/toiletMarker.png');
    }

    create() {
        this.pooMan = this.game.add.sprite(0, 0, 'pooMan');
        this.setBar();

        this.text1 = this.add.text(this.game.world.centerX / 2 - 20, 0, "");
        this.text2 = this.add.text(this.game.world.centerX / 2 - 20, 20, "");
        this.text3 = this.add.text(this.game.world.centerX / 2 - 20, 40, "");
        this.text4 = this.add.text(this.game.world.centerX / 2 - 20, 60, "");

        this.setSceneParameters();
    }

    setSceneParameters() {
        this.minMagneticPowerToCalculate = 5;
        this.minMagneticPower = 5;
        this.maxMagneticPower = 15;
        this.maxMagneticRandomPower = this.maxMagneticPower / 2;
        this.maxPlayerPower = 18;
        this.whenUpdateMinPower = 120;
        this.countFromUpdateMinPower = this.whenUpdateMinPower;
        this.timeInCorrectArea = 0;
        this.enteredIntoCorrectAreaTime = new Date().getTime();
        this.shouldSetEnetringTime = true;
        this.timeInCorrectAreToWin = 3000;
        this.totalTimeForScene = 8000;
        this.startTotalTime = new Date().getTime();
    }

    setBar() {
        var barCenterY = this.game.height - 100;
        var hardnessBarMultiplier = this.game.settings.level * this.game.width / 20;
        this.toiletBarMargin = 20;
        this.toiletBarBadLeft = this.game.add.sprite(0, barCenterY, 'toiletBarBad');
        this.toiletBarBadLeft.x = this.toiletBarMargin;
        var maxX = this.game.width / 2 - this.toiletBarMargin;
        var badBarMultiplier = Math.min(hardnessBarMultiplier, maxX)
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
    }

    fail() {
        this.game.settings.level = Math.max(this.game.settings.level - 1, 1);
        this.game.state.start('PooScene');
    };

    win() {
        this.game.settings.level += 1;
        this.game.state.start('PooScene');
    };

    update() {
        if (this.timeInCorrectAreToWin < this.timeInCorrectArea) {
            this.win();
        }
        var markerCenter = new Phaser.Point(this.toiletMarker.x + this.toiletMarker.width / 2,
            this.toiletMarker.y + this.toiletMarker.height / 2);
        if (Phaser.Rectangle.containsPoint(this.toiletBarCorrect, markerCenter)) {
            if (this.shouldSetEnetringTime) {
                this.shouldSetEnetringTime = false;
                this.enteredIntoCorrectAreaTime = new Date().getTime();
            }
            this.timeInCorrectArea = new Date().getTime() - this.enteredIntoCorrectAreaTime;
        } else {
            this.timeInCorrectArea = 0;
            this.shouldSetEnetringTime = true;
        }
        var halfGameWidth = this.game.width / 2;
        var markerPower = this.getMarkerPower(halfGameWidth);

        this.text3.setText("timeInCorrectArea: " + this.timeInCorrectArea);
        this.text1.setText("total Time: " + (new Date().getTime() - this.startTotalTime));

        markerPower += this.getPlayerPower(halfGameWidth);

        this.text4.setText("markerPowerWithPlayer: " + markerPower);
        this.toiletMarker.x += markerPower;
        if (this.isPlayerLoser()) {
            this.fail();
        }
    }

    isPlayerLoser() {
        return (this.toiletMarker.x <= this.toiletBarBadLeft.x
            || this.toiletMarker.x >= this.toiletBarBadRight.x + this.toiletBarBadRight.scale.x
            || new Date().getTime() - this.startTotalTime > this.totalTimeForScene)
            && this.timeInCorrectArea == 0;
    }

    getMarkerPower(halfGameWidth) {
        var distanceMarkerToCenter = (halfGameWidth - (this.toiletMarker.x + this.toiletMarker.width / 2)) * -1;
        var markerPower = distanceMarkerToCenter / (halfGameWidth - this.toiletBarMargin) * this.maxMagneticPower;
        if (Math.abs(markerPower) < this.minMagneticPowerToCalculate && ++this.countFromUpdateMinPower > this.whenUpdateMinPower) {
            this.countFromUpdateMinPower = 0;
            markerPower = this.getRandom(this.minMagneticPower, this.maxMagneticRandomPower);
            if (this.getRandomInt(0, 10000) % 2 == 0) {
                markerPower *= -1;
            }
        }
        return markerPower;
    }

    getPlayerPower(halfGameWidth) {
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