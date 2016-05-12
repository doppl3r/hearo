(function (window) {

    //constructors
    function Chest(){
        this.Container_constructor();
    }
    function Chest(x,y,scaleX,scaleY,spriteSheet,frame){
        this.Container_constructor();
        this.addChest(x,y,scaleX,scaleY,spriteSheet,frame);
    }

    //instance of class
    var container = new createjs.extend(Chest, createjs.Container);

    //initialize Chest
	container.addChest = function (x,y,scaleX,scaleY,spriteSheet,frame) {
        this.x = x;
        this.y = y;
        this.sprite = new createjs.Sprite(spriteSheet, frame);
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.sprite.gotoAndStop(frame);
        this.addChild(this.sprite);
	}
	//public functions
    container.isClicked = function(){ return this.clicked; }
    container.click = function() { this.clicked=true; }
    container.setText = function(text){
        if (this.children.length > 0) this.removeChild(this.customText);
        this.customText = new CustomText(0,0,this.scaleX,this.scaleY,text);
        this.addChild(this.customText);
    }

	window.Chest = createjs.promote(Chest, "Container");
}(window));
