(function (window) {
    var c = createjs.extend(Chest, createjs.Container);
    var cX;
    var cY;
    var animation;

	function Chest(x,y,type) {
		this.Container_constructor();
        this.addChild(this.sprite);
        cX = x;
        cY = y;
        animation = type;
	}

    //Public Properties
    Chest.manifest = [{src: "chests.png", id: "chests"}];
    Chest.loader = new createjs.LoadQueue(false);
    Chest.loader.addEventListener("complete", handleComplete);
    Chest.loader.loadManifest(Chest.manifest, true, "img/");

    function handleComplete() {
        c.spriteSheet = new createjs.SpriteSheet({
            framerate: 4,
            images: [Chest.loader.getResult("chests")],
            frames: [[0,0,159,132,0,79.25,65.65],[159,0,193,107,0,98.25,40.650000000000006],[352,0,193,107,0,98.25,40.650000000000006],
                    [545,0,113,147,0,56.5,73.4],[658,0,180,149,0,56.5,75.4],[838,0,180,149,0,56.5,75.4], //center bounds
                    [0,149,116,97,0,57.25,47.75],[116,149,111,94,0,55.25,44.75],[227,149,111,94,0,55.25,44.75]],
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                //"run": [0, 1, "run"],
                topClosed: [6], topOpenReward: [7], topOpenNothing: [8],
                sideClosed: [3], sideOpenReward: [4], sideOpenNothing: [5],
                bottomClosed: [0], bottomOpenReward: [1], bottomOpenNothing: [2]
            }
        });
        c.sprite = new createjs.Sprite(c.spriteSheet, "topClosed");
        c.setXY(cX,cY);
        c.sprite.gotoAndStop(animation);
    }
    //update
	c.tick = function (event) {  }
    c.setXY = function(x,y) { c.sprite.x=x; c.sprite.y=y; }
    c.toString = function() { console.log('x: '+cX+', y: '+cY); }

	window.Chest = createjs.promote(Chest, "Container");
}(window));
