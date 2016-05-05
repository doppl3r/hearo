(function (window) {
    var p = createjs.extend(Player, createjs.Container);
    var up;
    var right;
    var down;
    var left;

	function Player() {
		this.Container_constructor();
        this.addChild(this.sprite);
	}
    
    //Public Properties
    Player.manifest = [{src: "player.png", id: "player"}];
    Player.loader = new createjs.LoadQueue(false);
    Player.loader.addEventListener("complete", handleComplete);
    Player.loader.loadManifest(Player.manifest, true, "img/");
    
    function handleComplete() {
        p.spriteSheet = new createjs.SpriteSheet({
            framerate: 12,
            images: [Player.loader.getResult("player")],
            frames: [[0,0,167,255,0,83.4,126.65]], //center bounds
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                //"run": [0, 1, "run"],
                idle: [0, 0, "idle"]
            }
        });
        p.sprite = new createjs.Sprite(p.spriteSheet, "idle");
        p.sprite.scaleX = -1;
    }
    //update
	p.tick = function (event) {
        //p.sprite.x += 1;
        if (left) this.x -= 10;
        else if (right) this.x += 10;
        if (up) this.y -= 10;
        else if (down) this.y += 10;
	}
    p.moveUp = function(pressed) { up = pressed ? true : false; }
    p.moveRight = function(pressed) { p.sprite.scaleX = 1; right = pressed ? true : false; }
    p.moveDown = function(pressed) { down = pressed ? true : false; }
    p.moveLeft = function(pressed) { p.sprite.scaleX = -1; left = pressed ? true : false; }
    
	window.Player = createjs.promote(Player, "Container");
}(window));
