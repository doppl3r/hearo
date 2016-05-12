(function (window) {


	function CustomCharacter() {
        this.Container_constructor();
	}
	function CustomCharacter(x,y,scaleX,scaleY,spriteSheet,frame){
	    this.Container_constructor();
	    this.initCustomCharacter(x,y,scaleX,scaleY,spriteSheet,frame);
	}


	var container = new createjs.extend(CustomCharacter, createjs.Container);

    //initialize Character
	container.initCustomCharacter = function (x,y,scaleX,scaleY,spriteSheet,frame){
        this.x = x;
        this.y = y;
        this.sprite = new createjs.Sprite(spriteSheet, frame);
        this.sprite.scaleX = scaleX;
        this.sprite.scaleY = scaleY;
        this.sprite.gotoAndStop(frame.toLowerCase());
        this.addChild(this.sprite);
	}

	//public functions
    container.isClicked = function(){ return this.clicked; }
    container.click = function() { this.clicked=true; }

	window.CustomCharacter = createjs.promote(CustomCharacter, "Container");
}(window));
