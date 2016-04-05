(function (window) {
    var p = createjs.extend(Player, createjs.Container);
	function Player() {
		this.Container_constructor();
        this.addChild(this.grant);
	}
    
    //Public Properties
    Player.manifest = [{src: "toon.png", id: "grant"}];
    Player.loader = new createjs.LoadQueue(false);
    Player.loader.addEventListener("complete", handleComplete);
    Player.loader.loadManifest(Player.manifest, true, "img/");
    
    function handleComplete() {
        p.spriteSheet = new createjs.SpriteSheet({
            framerate: 12,
            "images": [Player.loader.getResult("grant")],
            "frames": {"width": 16, "height": 16, "count": 16},
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            "animations": {
                "run": [0, 4, "run", 1.5],
                "jump": [4, 8, "run"]
            }
        });
        p.grant = new createjs.Sprite(p.spriteSheet, "run");
        p.grant.x = -(p.grant.getBounds().width/2);
        p.grant.y = -(p.grant.getBounds().height/2);
    }
    //update
	p.tick = function (event) {
        //p.grant.x += 1;
	}
    p.jump = function() {
        p.grant.gotoAndPlay("jump");
    }
    
	window.Player = createjs.promote(Player, "Container");
}(window));