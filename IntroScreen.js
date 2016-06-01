(function (window) {

    //constructor
	function IntroScreen() {
		this.Container_constructor();
		this.spriteSheet = new createjs.SpriteSheet({
            framerate: 0,
            images: [window.Game.assetManager.preload.getResult("hearo-title")],
            frames: [[4,4,796,236,0,397.4,117.5]],
            animations: { start: [0] }
        });
        this.sprite = new createjs.Sprite(this.spriteSheet, "start");
        this.x = window.Game.canvas.width / 2;
        this.y = window.Game.canvas.height / 2;
        this.sprite.scaleX = this.sprite.scaleY = 0;
        this.rate = 0.0001;
        this.vel = 0;

        this.shape = new createjs.Shape();
        this.shape.graphics.beginFill("#6d486d").
            drawRect(-window.Game.getWidth()/2, -window.Game.getHeight()/2,
            window.Game.getWidth(), window.Game.getHeight());
        this.addChild(this.shape);
        this.addChild(this.sprite);
    }

	//instance of class
	var container = new createjs.extend(IntroScreen, createjs.Container);

    //update
	container.tick = function (event) {
        if (this.sprite.scaleX < 1){
            this.vel = this.sprite.scaleX < 0.5 ? this.vel + this.rate : this.vel - this.rate;
            this.sprite.scaleX += this.vel;
            this.sprite.scaleY += this.vel;
        }
        else this.sprite.scaleX = this.sprite.scaleY = 1;
    }

	window.IntroScreen = createjs.promote(IntroScreen, "Container");
}(window));
