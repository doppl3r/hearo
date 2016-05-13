(function (window) {

    //constructor
	function Player(x,y) {
		this.Container_constructor();
        this.x = x;
        this.y = y;
        this.addChild(container.sprite);
	}

	//instance of class
	var container = createjs.extend(Player, createjs.Container);
    
    //Public Properties
    this.manifest = [{src: "player.png", id: "player"}];
    container.loader = new createjs.LoadQueue(false);
    container.loader.addEventListener("complete", handleComplete);
    container.loader.loadManifest(this.manifest, true, "img/");
    
    function handleComplete() {
        container.spriteSheet = new createjs.SpriteSheet({
            framerate: 4,
            images: [container.loader.getResult("player")],
            frames: [[0,0,167,255,0,83.4,126.65],[167,0,169,252,0,79.4,124.65],[336,0,169,245,0,76.4,116.65]], //center bounds
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                //"run": [0, 1, "run"],
                idle: { frames: [0,1,2,1] }
            }
        });
        container.sprite = new createjs.Sprite(container.spriteSheet, "idle");
    }
    //update
	container.tick = function (event) {
        if (this.left) this.x -= 10;
        else if (this.right) this.x += 10;
        if (this.up) this.y -= 10;
        else if (this.down) this.y += 10;
	}
    container.moveUp = function(pressed) { this.up = pressed ? true : false; }
    container.moveRight = function(pressed) { this.sprite.scaleX = 1; this.right = pressed ? true : false; }
    container.moveDown = function(pressed) { this.down = pressed ? true : false; }
    container.moveLeft = function(pressed) { this.sprite.scaleX = -1; this.left = pressed ? true : false; }
    
	window.Player = createjs.promote(Player, "Container");
}(window));
