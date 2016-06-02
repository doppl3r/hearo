(function (window) {

	//constructor
	function Background() {
		this.Container_constructor();
        this.spriteSheet = new createjs.SpriteSheet({
            framerate: 1,
            images: [window.Game.assetManager.preload.getResult("backgrounds")],
            frames: [[0,0,1280,720,0,640,360.05],[0,720,1280,720,0,640,360.05]],
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                "bg-1": [0],
                "bg-2": [1]
            }
        });
        this.sprite = new createjs.Sprite(this.spriteSheet,"bg-1");
        this.addChild(this.sprite);
	}

	//instance of class
	var container = createjs.extend(Background, createjs.Container);

    //update
	container.tick = function (event) { }
    container.setBackground = function(bg){
        this.sprite.gotoAndStop(bg);
    }

	window.Background = createjs.promote(Background, "Container");
}(window));
