(function (window) {

    //constructor
    function Chest(preload){
        this.Container_constructor();
        this.preload = preload;
    }

    //instance of class
    var container = new createjs.extend(Chest, createjs.Container);

    //initialize Chest
	container.addChest = function (x,y,scaleX,scaleY,spriteSheet,frame) {
        this.x = x;
        this.y = y;
        this.sprite = new createjs.Sprite(spriteSheet, frame);
        this.sprite.sourceRect = new createjs.Rectangle(0,0, this.sprite.width, this.sprite.height);
        this.sprite.filters = [new createjs.BlurFilter(16,16,.5)];
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.sprite.gotoAndStop(frame);
        this.addChild(this.sprite);
	}

	//public functions
    container.isClicked = function(){ return this.clicked; }
    container.click = function() {
        if (!this.clicked){
            this.clicked=true;
            createjs.Sound.play("win", {pan:0});
            this.sprite.gotoAndStop(this.sprite._currentFrame+1);
            this.resetMouse();
        }
    }
    container.mouseOver = function() {
        if (!this.clicked){
            this.sprite.alpha=.25;
            this.cursor="pointer";
        }
    }
    container.mouseOut = function() { this.resetMouse(); }
    container.setText = function(text){
        if (this.children.length > 0) this.removeChild(this.customText);
        this.customText = new CustomText(0,-48,this.scaleX,this.scaleY,text,this.preload);
        this.addChild(this.customText);
    }
    container.resetMouse = function() { this.sprite.alpha=1; this.cursor="default"; }

	window.Chest = createjs.promote(Chest, "Container");
}(window));
