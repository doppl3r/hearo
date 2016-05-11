(function (window) {
    var container = new createjs.extend(Chest, createjs.Container);

    //constructor
    function Chest(){
        container.Container_constructor();
    }
	container.initChest = function (x,y,scaleX,scaleY,spriteSheet,frame) {
        container.sprite = new createjs.Sprite(spriteSheet, frame);
        container.sprite.x = x;
        container.sprite.y = y;
        container.sprite.scaleX = scaleX;
        container.sprite.scaleY = scaleY;
        container.sprite.gotoAndStop(frame);
        container.customText = new CustomText();
        container.customText.addText(x,y,scaleX,scaleY,"hey");
        container.addChild(container.sprite);
        container.addChild(container.customText);
	}
	//public functions
    container.getSprite = function() { return container.sprite; }
    container.isClicked = function(){ return container.clicked; }
    container.click = function() { container.clicked=true; }
    container.setSpriteSheet = function(spriteSheet) { container.spriteSheet=spriteSheet; }
    container.setX = function(x) { container.x=x; }
    container.setY = function(y) { container.y=y; }
    container.setScale = function(scaleX, scaleY){ container.scaleX=scaleX; container.scaleY=scaleY; }

	window.Chest = createjs.promote(Chest, "Container");

}(window));
