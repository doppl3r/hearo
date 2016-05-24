(function (window) {

    //constructor
	function Interface(preload) {
		this.Container_constructor();
		this.preload = preload;
		this.spriteSheet = new createjs.SpriteSheet({
            framerate: 0,
            images: [this.preload.getResult("trials-remaining")],
            frames: [[4,4,335,95,0,167.9,47.9]],
            animations: { default: [0] }
        });
    }

	//instance of class
	var container = new createjs.extend(Interface, createjs.Container);

    //update
	container.tick = function (event) {  }

    //public functions
    container.addChest = function (x,y,scaleX,scaleY,frame){
        var tempChest = new Chest(this.preload);
        tempChest.addChest(x,y,scaleX,scaleY,this.spriteSheet,frame);
        //tempChest.on("click", function(){ tempChest.click(); });
        tempChest.on("mouseover", function(){ tempChest.mouseOver(); });
        tempChest.on("mouseout", function(){ tempChest.mouseOut(); });
        this.addChild(tempChest); //add to stage
    }

	window.Interface = createjs.promote(Interface, "Container");
}(window));
