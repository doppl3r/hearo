(function (window) {
    var c = createjs.extend(ChestManager, createjs.Container);
    var chests = []; //list of Chest objects

	function ChestManager() {
		this.Container_constructor();
        for (i=0; i < chests.length; i++){
            this.addChild(chests[i].sprite);
        }
	}
    //shared spritesheet properties
    this.manifest = [{src: "chests.png", id: "chests"}];
    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", handleComplete);
    this.loader.loadManifest(this.manifest, true, "img/");

    //configure after loaded
    function handleComplete() {
        c.spriteSheet = new createjs.SpriteSheet({
            framerate: 4,
            images: [this.loader.getResult("chests")],
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
        c.addChest(640,100,1,1,"topClosed");
        c.addChest(1100,360,1,1,"sideClosed");
        c.addChest(640,620,1,1,"bottomClosed");
        c.addChest(180,360,-1,1,"sideClosed");
    }

    //update
	c.tick = function (event) {
        for (i=0; i<chests.length; i++){
            if (chests[i].isClicked()){
                this.removeChest(i);
            }
        }

    }
    c.setXY = function(x,y) {  }
    c.addChest = function (x,y,scaleX,scaleY,frame){
        var tempChest = new Chest(x,y,scaleX,scaleY,c.spriteSheet,frame);
        tempChest.sprite.on("click", function(evt){
            tempChest.click();
        });
        chests.push(tempChest);
    }
    c.removeChest = function(i){ if(i != -1) { chests.splice(i, 1); this.removeChildAt(i); }}
    c.removeLastChest = function(){ chests.pop(); this.removeChildAt(chests.length-1); }

	window.ChestManager = createjs.promote(ChestManager, "Container");
}(window));
