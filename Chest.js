(function (window) {

    //constructors
    function Chest(){
        this.Container_constructor();
    }
    function Chest(x,y,scaleX,scaleY,spriteSheet,frame){
        this.Container_constructor();
        this.initChest(x,y,scaleX,scaleY,spriteSheet,frame);
    }

    //instance of class
    var container = new createjs.extend(Chest, createjs.Container);

    //initialize Chest
	container.initChest = function (x,y,scaleX,scaleY,spriteSheet,frame) {
        this.x = x;
        this.y = y;
        this.sprite = new createjs.Sprite(spriteSheet, frame);
        this.sprite.scaleX = scaleX;
        this.sprite.scaleY = scaleY;
        this.sprite.gotoAndStop(frame);
        this.customText = new CustomText(0,0,scaleX,scaleY,"car");
        this.addChild(this.sprite);
        this.addChild(this.customText);
	}
	//public functions
    container.isClicked = function(){ return this.clicked; }
    container.click = function() { this.clicked=true; }

	window.Chest = createjs.promote(Chest, "Container");
}(window));
