import ChaptersManager from './chapters_manager';

export default class PooScene extends ChaptersManager {
    preload() {
        this.game.load.image('background', 'assets/images/explosion.png');
        this.game.load.image('pooMan', 'assets/images/pooMan/01.png');
        this.game.load.image('toiletBarCorrect', 'assets/images/pooMan/toiletBarCorrect.png');
        this.game.load.image('toiletBarBad', 'assets/images/pooMan/toiletBarBad.png');
        this.game.load.image('toiletMarker', 'assets/images/pooMan/toiletMarker.png');
        this.game.load.spritesheet('head', 'assets/images/pooMan/head.png', 165, 210);
        this.game.load.image('januszPart1', 'assets/images/pooMan/boom/01.png');
        this.game.load.image('januszPart2', 'assets/images/pooMan/boom/02.png');
        this.game.load.image('januszPart3', 'assets/images/pooMan/boom/03.png');
        this.game.load.image('januszPart4', 'assets/images/pooMan/boom/04.png');
        this.game.load.image('januszPart5', 'assets/images/pooMan/boom/05.png');
        this.game.load.image('januszPart6', 'assets/images/pooMan/boom/06.png');
        this.game.load.image('januszPart7', 'assets/images/pooMan/boom/07.png');
        this.game.load.image('januszPart8', 'assets/images/pooMan/boom/08.png');
        this.game.load.image('januszPart9', 'assets/images/pooMan/boom/09.png');
        this.game.load.image('januszPart10', 'assets/images/pooMan/boom/10.png');
        this.game.load.image('januszPart11', 'assets/images/pooMan/boom/11.png');
        //this.game.load.spritesheet('explosion', 'assets/images/explosion.png', 46.25, 37.5, 62);
    }

    create() {
        this.setSceneParameters();
        this.setPooMan();
        this.setBar();
        //this.explosion = this.game.add.sprite(0, 0, 'explosion');
        //this.explosion.animations.add('explode');
        //this.explosion.play('explode', 60, true);
    }

    setPooMan() {
        this.game.add.sprite(0, 0, 'background');
        this.pooManGroup = this.game.add.group();
        this.pooMan = this.game.add.sprite(0, 150, 'pooMan');
        this.pooManGroup.add(this.pooMan);

        this.setNormalHead();
        //this.setRedHead();

        this.pooManGroup.add(this.pooManHeadNormal);
        this.pooManGroup.add(this.januszGroup);
        //this.pooManGroup.add(this.pooManHeadRed);

        //this.pooManHeadRed.x = 155;
        //this.pooManHeadRed.y = 78;
        this.pooManHeadNormal.x = 155;
        this.pooManHeadNormal.y = 78;
        this.januszGroup.x = 155;
        this.januszGroup.y = 78;

        var headHeightAboveBody = this.pooManHeadNormal.y - this.pooMan.y;
        var groupHeight = headHeightAboveBody + this.pooMan.height;


        this.pooManGroup.x = this.game.world.width / 2 - this.pooMan.width / 2;
        this.pooManGroup.y = this.game.world.height / 2 - groupHeight / 2;
    }

    setRedHead() {
        //this.pooManHeadRed = this.game.add.group();
        //this.pooManHeadRed.alpha = 0;



        var allHair = this.game.add.sprite(0, 0, 'head', 1);
        allHair = this.setHeadSprites(allHair, false);
        //this.pooManHeadRed.add(allHair);
    }

    setNormalHead() {
        this.pooManHeadNormal = this.game.add.group();

        var faceOnly = this.game.add.sprite(/*this.pooMan.width / 2*/0, 0, 'head', 0);
        faceOnly = this.setHeadSprites(faceOnly, false);
        this.pooManHeadNormal.add(faceOnly);
        this.faceOnlyRed = this.game.add.sprite(0, 0, 'head', 0);

        this.faceOnlyRed = this.setHeadSprites(this.faceOnlyRed, true);
        this.faceOnlyRed.alpha = 0;
        this.pooManHeadNormal.add(this.faceOnlyRed);

        var allHair = this.game.add.sprite(/*this.pooMan.width / 2*/0, 0, 'head', 1);

        allHair = this.setHeadSprites(allHair, false);
        this.pooManHeadNormal.add(allHair);

        this.januszGroup = this.game.add.group();
        this.janusz1 = this.game.add.sprite(0, 0, 'januszPart1');
        this.janusz1 = this.setHeadSprites(this.janusz1, false);
        this.janusz2 = this.game.add.sprite(0, 0, 'januszPart2');
        this.janusz2 = this.setHeadSprites(this.janusz2, false);
        this.janusz3 = this.game.add.sprite(0, 0, 'januszPart3');
        this.janusz3 = this.setHeadSprites(this.janusz3, false);
        this.janusz4 = this.game.add.sprite(0, 0, 'januszPart4');
        this.janusz4 = this.setHeadSprites(this.janusz4, false);
        this.janusz5 = this.game.add.sprite(0, 0, 'januszPart5');
        this.janusz5 = this.setHeadSprites(this.janusz5, false);
        this.janusz6 = this.game.add.sprite(0, 0, 'januszPart6');
        this.janusz6 = this.setHeadSprites(this.janusz6, false);
        this.janusz7 = this.game.add.sprite(0, 0, 'januszPart7');
        this.janusz7 = this.setHeadSprites(this.janusz7, false);
        this.janusz8 = this.game.add.sprite(0, 0, 'januszPart8');
        this.janusz8 = this.setHeadSprites(this.janusz8, false);
        this.janusz9 = this.game.add.sprite(0, 0, 'januszPart9');
        this.janusz9 = this.setHeadSprites(this.janusz9, false);
        this.janusz10 = this.game.add.sprite(0, 0, 'januszPart10');
        this.janusz10 = this.setHeadSprites(this.janusz10, false);
        this.janusz11 = this.game.add.sprite(0, 0, 'januszPart11');
        this.janusz11 = this.setHeadSprites(this.janusz11, false);

        this.januszGroup.add(this.janusz1);
        this.januszGroup.add(this.janusz2);
        this.januszGroup.add(this.janusz3);
        this.januszGroup.add(this.janusz4);
        this.januszGroup.add(this.janusz5);
        this.januszGroup.add(this.janusz6);
        this.januszGroup.add(this.janusz7);
        this.januszGroup.add(this.janusz8);
        this.januszGroup.add(this.janusz9);
        this.januszGroup.add(this.janusz10);
        this.januszGroup.add(this.janusz11);

        this.januszGroup.alpha = 0;
    }

    setHeadSprites(sprite, shouldBeRed) {
        if (shouldBeRed) {
            sprite.tint = 0xFF0000;
        }

        sprite./*scale.*/anchor.x = 0.5;
        sprite./*scale.*/anchor.y = 0.5;
        return sprite;
    }

    setSceneParameters() {
        this.startBadProgressWidth = 150;
        this.minMagneticPowerToCalculate = 10;
        this.minMagneticPower = 12;
        this.maxMagneticPower = 23;
        this.maxMagneticRandomPower = this.maxMagneticPower / 2;
        this.maxPlayerPower = 25;
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
        this.killed = false;
    }

    setBar() {
        var barCenterY = this.game.height - 100;
        var hardnessBarMultiplier = this.game.global.level * this.game.width / 20;
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
        if (this.killed) {
            return;
        }
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
            this.boomJanusz();
            //this.gameOver();
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
        //this.januszGroup.scale = new Phaser.Point(scaleValue, scaleValue);
        //this.pooManHeadRed.scale = new Phaser.Point(scaleValue, scaleValue);
        this.faceOnlyRed.alpha = distanceToEdge / this.toiletBarBadLeft.width * this.maxAlpha;
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
        if (!this.game.input.activePointer.isDown) {
            return 0;
        }
        var mouseDistanceToCenter = (halfGameWidth - this.game.input.x) * -1;
        return mouseDistanceToCenter / halfGameWidth * this.maxPlayerPower;
    }

    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min));
    }

    boomJanusz() {

        if (this.killed) {
            return;
        }
        this.killed = true;

        this.januszGroup.scale.x = 0.75;//this.pooManHeadNormal.width / this.januszGroup.width;
        this.januszGroup.scale.y = 0.75;//this.pooManHeadNormal.height / this.januszGroup.height;

        var showingJanusz = this.game.add.tween(this.januszGroup).to( {alpha : 1}, 100, "Quart.easeOut", false);
        showingJanusz.onComplete.add(this.januszShowed, this);
        showingJanusz.start();
    }

    januszShowed() {
        this.game.add.tween(this.pooManHeadNormal).to( {alpha : 0}, 100, "Quart.easeOut", true);

        var animTime = 1500;

        var tween1 = this.game.add.tween(this.janusz1);
        tween1.to( {x : this.janusz1.x - 150, y : this.janusz1.y - 270, angle : -45}, animTime, "Quart.easeOut", false);

        var tween2 = this.game.add.tween(this.janusz2);
        tween2.to( {y : this.janusz2.y - 270, angle : 15}, animTime, "Quart.easeOut", false);

        var tween3 = this.game.add.tween(this.janusz3);
        tween3.to( {x : this.janusz3.x + 200, y : this.janusz3.y - 270, angle : 40}, animTime, "Quart.easeOut", false);

        var tween4 = this.game.add.tween(this.janusz4);
        tween4.to( {x : this.janusz4.x - 200, y : this.janusz4.y - 180, angle : -15}, animTime, "Quart.easeOut", false);

        var tween5 = this.game.add.tween(this.janusz5);
        tween5.to( {y : this.janusz5.y + 270, angle : -20}, animTime, "Quart.easeOut", false);

        var tween6 = this.game.add.tween(this.janusz6);
        tween6.to( {x : this.janusz6.x + 150, y : this.janusz6.y + 150, angle : 5}, animTime, "Quart.easeOut", false);

        var tween7 = this.game.add.tween(this.janusz7);
        tween7.to( {x : this.janusz7.x + 250, angle : 15}, animTime, "Quart.easeOut", false);

        var tween8 = this.game.add.tween(this.janusz8);
        tween8.to( {x : this.janusz8.x - 250, angle : -15}, animTime, "Quart.easeOut", false);

        var tween9 = this.game.add.tween(this.janusz9);
        tween9.to( {x : this.janusz9.x - 130, y : this.janusz9.y + 120, angle : -60}, animTime, "Quart.easeOut", false);

        var tween10 = this.game.add.tween(this.janusz10);
        tween10.to( {x : this.janusz10.x - 110, y : this.janusz10.y - 90, angle : 40}, animTime, "Quart.easeOut", false);

        var tween11 = this.game.add.tween(this.janusz11);
        tween11.to( {x : this.janusz11.x - 130, y : this.janusz11.y - 110, angle : 20}, animTime, "Quart.easeOut", false);

        tween11.onComplete.add(this.lose, this);

        tween1.start();
        tween2.start();
        tween3.start();
        tween4.start();
        tween5.start();
        tween6.start();
        tween7.start();
        tween8.start();
        tween9.start();
        tween10.start();
        tween11.start();
    }
}