(function (window) {
    var container = new createjs.extend(ChestManager, createjs.Container);
    var chests = []; //list of Chest objects

	function ChestManager() {
		container.Container_constructor();
        container.addChest(640,100,1,1,"topClosed");
        container.addChest(1100,360,1,1,"sideClosed");
        container.addChest(640,620,1,1,"bottomClosed");
        container.addChest(180,360,-1,1,"sideClosed");
	}
    //shared spritesheet properties
    var manifest = [{src: "chests.png", id: "chests"}];
    container.loader = new createjs.LoadQueue(false);
    container.loader.addEventListener("complete", handleComplete);
    container.loader.loadManifest(manifest, true, "img/");

    //configure after loaded
    function handleComplete() {
        container.spriteSheet = new createjs.SpriteSheet({
            framerate: 4,
            images: [container.loader.getResult("chests")],
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
    }

    //update
	container.tick = function (event) {
        for (i=0; i<chests.length; i++){
            if (chests[i].isClicked()){
                container.removeChest(i);
            }
        }
        console.log(container.children);
    }
    container.setXY = function(x,y) {  }
    container.addChest = function (x,y,scaleX,scaleY,frame){
        var tempChest = new Chest();
        tempChest.initChest(x,y,scaleX,scaleY,container.spriteSheet,frame);
        tempChest.sprite.on("click", function(evt){ tempChest.click(); });
        container.addChild(tempChest); //add to stage
        chests.push(tempChest); //add to list
    }
    container.removeChest = function(i){
        if(i != -1) {
            container.removeChild(i);
            chests[i].sprite.removeEventListener("click");
            chests.splice(i, 1); container.removeChildAt(i);
        }
    }
	window.ChestManager = createjs.promote(ChestManager, "Container");
}(window));
