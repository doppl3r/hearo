(function (window) {

    //constructor
	function ScreenIntro() {
        //container properties
		this.Container_constructor();
        this.x = window.Game.canvas.width / 2;
        this.y = (window.Game.canvas.height / 2);

        //title sprite
		this.spriteSheet = new createjs.SpriteSheet({
            framerate: 8,
            images: [window.Game.assetManager.preload.getResult("hearo-title")],
            frames: [[0,0,858,284,0,433.6,118],[0,284,858,284,0,433.6,118]],
            animations: { start: [0,1] }
        });
        this.sprite = new createjs.Sprite(this.spriteSheet, "start");
        this.sprite.y = -128;
        this.sprite.scaleX = this.sprite.scaleY = 0;

        //character sprite
        this.characterSheet = new createjs.SpriteSheet({
            framerate: 8,
            images: [window.Game.assetManager.preload.getResult("player-large")],
            frames: [[0,0,454,805,0,226.85,402.45],[0,805,454,805,0,226.85,402.45]],
            animations: { start: [0,1] }
        });
        this.characterSprite = new createjs.Sprite(this.characterSheet, "start");
        this.characterSprite.x = 640 + this.characterSprite.getBounds().width/2; //set off stage

        //background color
        this.background = new Background();
        this.background.setBackground("bg-1");

        //make chests as clickable buttons
        this.chestManager = new ChestManager(true);
        this.chestManager.addChest(0,240,1,1,"topClosed");
        this.chestManager.getLastChest().updateChest("start",true);

        //add to stage
        this.addChild(this.background);
        this.addChild(this.characterSprite);
        this.addChild(this.sprite);
        this.addChild(this.chestManager); //add to stage
    }

	//instance of class
	var container = new createjs.extend(ScreenIntro, createjs.Container);

    //update
	container.tick = function (event) {
        //begin animation
        createjs.Tween.get(this.sprite).to({scaleX: 1, scaleY: 1}, 1000, createjs.Ease.cubicInOut);
        createjs.Tween.get(this.characterSprite).wait(1000).to({ x:-460 }, 1000, createjs.Ease.cubicInOut);

        //tick chestManager
        this.chestManager.tick(event);
        if (this.delay >= 0){
            this.delay-=1;
            if (this.delay == 0) { //change screen after delay runs out
                window.Game.setScreen(1);
                window.Game.setStage();
            }
        }
        else{
            var tempChest;
            for (var i=0; i<this.chestManager.children.length; i++){
                tempChest = this.chestManager.getChildAt(i); //get temporary index
                if (tempChest.isClicked()){
                    this.chestManager.setChestFrameAt(i,7);
                    this.delay = 120; //delay before screen changes
                }
            }
        }
    }

	window.ScreenIntro = createjs.promote(ScreenIntro, "Container");
}(window));
