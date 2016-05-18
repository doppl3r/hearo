(function (window) {

    //constructor
	function Player(preload) {
		this.Container_constructor();
		this.preload = preload;
		this.spriteSheet = new createjs.SpriteSheet({
            framerate: 8,
            images: [this.preload.getResult("player")],
            frames: [[4,4,167,253,0,83.4,126.65],[175,4,168,252,0,78.4,125.65],[4,261,168,245,0,75.4,117.65],
                    [176,261,183,315,0,73.4,187.65],[4,580,155,317,0,64.4,185.65],
                    [163,580,258,233,0,45.400000000000006,93.65]], //center bounds
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                idle: { frames: [0,1,2,1] },
                attack: { frames: [3,4,5,5], next: "idle" }
            }
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
    container.attack = function(pressed) { if (pressed) this.sprite.gotoAndPlay("attack"); }
    container.setXY = function(x,y) { this.x = x; this.y = y; }

	window.Player = createjs.promote(Player, "Container");
}(window));
