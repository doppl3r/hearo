(function (window) {
    var container = new createjs.extend(CustomCharacter, createjs.Container);

	function CustomCharacter() {
        container.Container_constructor();
	}
	function CustomCharacter(x,y,scaleX,scaleY,spriteSheet,frame){
	    container.Container_constructor();
	    container.initCustomCharacter(x,y,scaleX,scaleY,spriteSheet,frame);
	}
	container.initCustomCharacter = function (x,y,scaleX,scaleY,spriteSheet,frame){
        container.sprite = new createjs.Sprite(spriteSheet, frame);
        container.sprite.x = x;
        container.sprite.y = y;
        container.sprite.scaleX = scaleX;
        container.sprite.scaleY = scaleY;
        container.sprite.gotoAndStop(frame.toLowerCase());
        container.addChild(container.sprite);
	}
	//public functions
    container.isClicked = function(){ return container.clicked; }
    container.click = function() { container.clicked=true; }

	window.CustomCharacter = createjs.promote(CustomCharacter, "Container");

}(window));
