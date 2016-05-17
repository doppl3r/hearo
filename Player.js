(function (window) {

    //constructor
	function Player(preload) {
		this.Container_constructor();
		this.preload = preload;
		this.spriteSheet = new createjs.SpriteSheet({
            framerate: 4,
            images: [this.preload.getResult("player")],
            frames: [[0,0,167,255,0,83.4,126.65],[167,0,169,252,0,79.4,124.65],[336,0,169,245,0,76.4,116.65]], //center bounds
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: { idle: { frames: [0,1,2,1] }}
        });
        this.sprite = new createjs.Sprite(this.spriteSheet, "idle");
        this.addChild(this.sprite);
	}

	//instance of class
	var container = createjs.extend(Player, createjs.Container);

    //update
	container.tick = function (event) {
        if (this.left) this.x -= 10;
        else if (this.right) this.x += 10;
        if (this.up) this.y -= 10;
        else if (this.down) this.y += 10;
	}

	//public variables
    container.moveUp = function(pressed) { this.up = pressed ? true : false; }
    container.moveRight = function(pressed) { this.sprite.scaleX = 1; this.right = pressed ? true : false; }
    container.moveDown = function(pressed) { this.down = pressed ? true : false; }
    container.moveLeft = function(pressed) { this.sprite.scaleX = -1; this.left = pressed ? true : false; }
    container.setXY = function(x,y) { this.x = x; this.y = y; }

	window.Player = createjs.promote(Player, "Container");
}(window));
