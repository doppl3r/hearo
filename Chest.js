(function (window) {

    //constructors
    function Chest(){
        container.Container_constructor();
    }
    function Chest(x,y,scaleX,scaleY,spriteSheet,frame){
        container.Container_constructor();
        container.initChest(x,y,scaleX,scaleY,spriteSheet,frame);
    }

    //instance of class
    var container = new createjs.extend(Chest, createjs.Container);

    //initialize Chest
	container.initChest = function (x,y,scaleX,scaleY,spriteSheet,frame) {
        container.x = x;
        container.y = y;
        container.sprite = new createjs.Sprite(spriteSheet, frame);
        container.sprite.scaleX = scaleX;
        container.sprite.scaleY = scaleY;
        container.sprite.gotoAndStop(frame);
        container.customText = new CustomText(0,0,scaleX,scaleY,"car");
        container.addChild(container.sprite);
        container.addChild(container.customText);
	}
	//public functions
    container.isClicked = function(){ return container.clicked; }
    container.click = function() { container.clicked=true; }

	window.Chest = createjs.promote(Chest, "Container");
}(window));
