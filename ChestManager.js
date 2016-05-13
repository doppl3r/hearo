(function (window) {

	function ChestManager() {
		this.Container_constructor();
    }

	//instance of class
	var container = new createjs.extend(ChestManager, createjs.Container);

    //shared spritesheet properties
    this.manifest = [{src: "chests.png", id: "chests"}];
    this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", handleComplete);
    this.loader.loadManifest(this.manifest, true, "img/");

    //configure after loaded
    function handleComplete() {
        container.spriteSheet = new createjs.SpriteSheet({
            framerate: 4,
            images: [this.loader.getResult("chests")],
            frames: [[0,0,159,132,0,79.25,65.65],[159,0,193,107,0,98.25,40.650000000000006],[352,0,193,107,0,98.25,40.650000000000006],
                    [545,0,113,147,0,56.5,73.4],[658,0,180,149,0,56.5,75.4],[838,0,180,149,0,56.5,75.4], //center bounds
                    [0,149,116,97,0,57.25,47.75],[116,149,111,94,0,55.25,44.75],[227,149,111,94,0,55.25,44.75]],
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
        for (i=0; i<this.children.length; i++){
            if (this.getChildAt(i).isClicked()){
                this.removeChest(i);
            }
        }
    }
    container.addChest = function (x,y,scaleX,scaleY,frame){
        var tempChest = new Chest(x,y,scaleX,scaleY,this.spriteSheet,frame);
        tempChest.on("click", function(){ tempChest.click(); });
        tempChest.on("mouseover", function(){ tempChest.mouseOver(); });
        tempChest.on("mouseout", function(){ tempChest.mouseOut(); });
        this.addChild(tempChest); //add to stage
    }
    container.removeChest = function(i){
        this.getChildAt(i).removeEventListener("click");
        this.getChildAt(i).removeEventListener("mouseover");
        this.getChildAt(i).removeEventListener("mouseout");
        this.removeChildAt(i);
    }
    container.getChest = function(i){ return this.getChildAt(i); }
    container.getLastChest = function(){ return this.getChest(this.children.length-1); }

	window.ChestManager = createjs.promote(ChestManager, "Container");
}(window));
