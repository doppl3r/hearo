(function (window) {
    var container = createjs.extend(Player, createjs.Container);
    var up, right, down, left;

	function Player(x,y) {
		container.Container_constructor();
        container.x = x;
        container.y = y;
        container.addChild(container.sprite);
	}
    
    //Public Properties
    var manifest = [{src: "player.png", id: "player"}];
    container.loader = new createjs.LoadQueue(false);
    container.loader.addEventListener("complete", handleComplete);
    container.loader.loadManifest(manifest, true, "img/");
    
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
        if (left) container.x -= 10;
        else if (right) container.x += 10;
        if (up) container.y -= 10;
        else if (down) container.y += 10;
	}
    container.moveUp = function(pressed) { up = pressed ? true : false; }
    container.moveRight = function(pressed) { container.sprite.scaleX = 1; right = pressed ? true : false; }
    container.moveDown = function(pressed) { down = pressed ? true : false; }
    container.moveLeft = function(pressed) { container.sprite.scaleX = -1; left = pressed ? true : false; }
    
	window.Player = createjs.promote(Player, "Container");
}(window));
