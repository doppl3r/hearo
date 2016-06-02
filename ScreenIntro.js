(function (window) {

    //constructor
	function ScreenIntro() {
		this.Container_constructor();
		this.spriteSheet = new createjs.SpriteSheet({
            framerate: 8,
            images: [window.Game.assetManager.preload.getResult("hearo-title")],
            frames: [[4,4,795,307,0,397.4,118],[4,315,795,307,0,397.4,118]],
            animations: { start: [0,1] }
        });
        this.sprite = new createjs.Sprite(this.spriteSheet, "start");
        this.x = window.Game.canvas.width / 2;
        this.y = (window.Game.canvas.height / 2);
        this.sprite.y = -128;
        this.sprite.scaleX = this.sprite.scaleY = 0;
        this.rate = 0.0002;
        this.vel = 0;

        //background color
        this.background = new Background();
        this.background.setBackground("bg-3");

        //make chests as clickable buttons
        this.chestManager = new ChestManager(true);
        this.chestManager.addChest(0,240,1,1,"topClosed");
        this.chestManager.getLastChest().updateChest("start",true);

        //add to stage
        this.addChild(this.background);
        this.addChild(this.sprite);
        this.addChild(this.chestManager); //add to stage
    }

	//instance of class
	var container = new createjs.extend(ScreenIntro, createjs.Container);

    //update
	container.tick = function (event) {
        //zoom in text
        if (this.sprite.scaleX < 1){
            this.vel = this.sprite.scaleX < 0.5 ? this.vel + this.rate : this.vel - this.rate;
            this.sprite.scaleX += this.vel;
            this.sprite.scaleY += this.vel;
        }
        else this.sprite.scaleX = this.sprite.scaleY = 1;

        //tick chestManager
        this.chestManager.tick(event);
        if (this.delay >= 0){
            this.delay-=1;
            if (this.delay == 0) {
                window.Game.setScreen(1);
                window.Game.setStage();
            }
        }
        else{
            var tempChest;
            for (var i=0; i<this.chestManager.children.length; i++){
                tempChest = this.chestManager.getChildAt(i); //get temporary index
                if (tempChest.isClicked()){
                    this.delay = 120;
                }
            }
        }
    }

	window.ScreenIntro = createjs.promote(ScreenIntro, "Container");
}(window));
