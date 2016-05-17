(function (window) {

	//constructor
	function Background(preload) {
		this.Container_constructor();
        this.spriteSheet = new createjs.SpriteSheet({
            framerate: 1,
            images: [preload.getResult("bg-2")],
            frames: {"width": 1280, "height": 720, "count": 1},
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                frame1: [0],
                frame2: [1]
            }
        });
        this.sprite = new createjs.Sprite(this.spriteSheet,"frame1");
        this.sprite.x = -(this.sprite.getBounds().width/2);
        this.sprite.y = -(this.sprite.getBounds().height/2);
        this.addChild(this.sprite);
	}

	//instance of class
	var container = createjs.extend(Background, createjs.Container);

    //update
	container.tick = function (event) { }

	window.Background = createjs.promote(Background, "Container");
}(window));
