(function (window) {

    //constructor
	function Interface() {
		this.Container_constructor();
		this.spriteSheet = new createjs.SpriteSheet({
            framerate: 0,
            images: [window.Game.assetManager.preload.getResult("trials-remaining")],
            frames: [[4,4,404,95,0,171.75,47.9]],
            animations: { start: [0] }
        });
        this.sprite = new createjs.Sprite(this.spriteSheet, "start");
        this.x = (this.sprite.getBounds().width/2) - 36;
        this.y = (window.Game.canvas.height - this.sprite.getBounds().height/2) + 12;
        this.addChild(this.sprite);
    }

	//instance of class
	var container = new createjs.extend(Interface, createjs.Container);

    //update
	container.tick = function (event) {  }
    container.setText = function(text){
        if (this.children.length > 0) this.removeChild(this.customText);
        this.customText = new CustomText(0,0,this.scaleX,this.scaleY,text);
        this.addChild(this.customText);
    }

	window.Interface = createjs.promote(Interface, "Container");
}(window));
