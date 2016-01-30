import ChaptersManager from './chaptersManager';
export default class PooScene extends ChaptersManager {
    preload() {
        this.game.load.image('pooMan', 'assets/images/pooMan.JPG');
        this.game.load.image('toiletBarCorrect', 'assets/images/toiletBarCorrect.png');
        this.game.load.image('toiletBarBad', 'assets/images/toiletBarBad.png');
        this.game.load.image('toiletMarker', 'assets/images/toiletMarker.png');
        this.game.load.image('pooManHead', 'assets/images/pooManHead_normal.png');
        this.game.load.image('pooManHead', 'assets/images/pooManHead_normal.png');
    }

    create() {
        this.setSceneParameters();
        this.setPooMan();
        this.setBar();
    }

    setPooMan() {
        this.pooMan = this.game.add.sprite(0, 0, 'pooMan');
        this.pooManHeadNormal = this.game.add.sprite(565, 290, 'pooManHead');
        this.pooManHeadNormal.anchor.x = 0.5;
        this.pooManHeadNormal.anchor.y = 0.5;
        this.pooManHeadRed = this.game.add.sprite(565, 290, 'pooManHead');
        this.pooManHeadRed.anchor.x = 0.5;
        this.pooManHeadRed.anchor.y = 0.5;
        this.pooManHeadRed.alpha = 0;
        this.pooManHeadRed.tint = 0x990000;
    }

    setSceneParameters() {
        this.startBadProgressWidth = 150;
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
        this.test = true;
        this.maxHeadScale = 1.5;
        this.maxAlpha = 0.5;
    }

    setBar() {
        var barCenterY = this.game.height - 100;
        var hardnessBarMultiplier = this.game.global.currentLevel * this.game.width / 20;
        this.toiletBarMargin = 20;
        this.toiletBarBadLeft = this.game.add.sprite(0, barCenterY, 'toiletBarBad');
        this.toiletBarBadLeft.x = this.toiletBarMargin;
        var maxX = this.game.width / 2 - this.toiletBarMargin;
        var badBarScale = this.startBadProgressWidth + Math.min(hardnessBarMultiplier, maxX);
        this.toiletBarBadLeft.scale.x = badBarScale;
        var endBarX = this.game.width - this.toiletBarMargin;
        this.toiletBarBadRight = this.game.add.sprite(0, barCenterY, 'toiletBarBad');
        this.toiletBarBadRight.x = endBarX - this.toiletBarBadLeft.width;
        this.toiletBarBadRight.scale.x = badBarScale;
        this.toiletBarCorrect = this.game.add.sprite(0, barCenterY, 'toiletBarCorrect');
        this.toiletBarCorrect.x = this.toiletBarMargin + this.toiletBarBadLeft.scale.x;
        this.toiletBarCorrect.scale.x = (this.game.width / 2 - this.toiletBarMargin - this.toiletBarBadRight.width) * 2;
        this.toiletMarker = this.game.add.sprite(0, 0, 'toiletMarker');
        this.toiletMarker.y = barCenterY;
        this.toiletMarker.x = this.game.width / 2 - this.toiletMarker.width / 2;
    }

    update() {
        if (this.timeInCorrectAreToWin < this.timeInCorrectArea) {
            this.nextChapter();
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
            this.setHeadAnimation(markerCenter);
        }
        var halfGameWidth = this.game.width / 2;
        var markerPower = this.getMarkerPower(halfGameWidth);
        markerPower += this.getPlayerPower(halfGameWidth);
        this.toiletMarker.x += markerPower;

        if (this.isPlayerLoser()) {
            this.gameOver();
        }
    }

    setHeadAnimation(markerCenter) {
        var distanceToEdge;
        if (Phaser.Rectangle.containsPoint(this.toiletBarBadLeft, markerCenter)) {
            distanceToEdge = this.toiletBarBadLeft.x + this.toiletBarBadLeft.width - markerCenter.x;
        } else {
            distanceToEdge = markerCenter.x - this.toiletBarBadRight.x;
        }
        var scaleValue = distanceToEdge / this.toiletBarBadLeft.width * (this.maxHeadScale - 1) + 1;
        this.pooManHeadNormal.scale = new Phaser.Point(scaleValue, scaleValue);

        this.pooManHeadRed.scale = new Phaser.Point(scaleValue, scaleValue);
        this.pooManHeadRed.alpha = distanceToEdge / this.toiletBarBadLeft.width * this.maxAlpha;
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