(function (window) {
    var container = createjs.extend(Char, createjs.Container);

	function Char(x,y,scaleX,scaleY,spriteSheet,frame) {
        this.Container_constructor();
        this.sprite = new createjs.Sprite(spriteSheet, frame);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.scaleX = scaleX;
        this.sprite.scaleY = scaleY;
        this.sprite.gotoAndStop(frame);
        this.addChild(this.sprite);
	}
	//public functions
    container.getSprite = function() { return this.sprite; }
    container.isClicked = function(){ return this.clicked; }
    container.click = function() { this.clicked=true; }

	window.Char = createjs.promote(Char, "Container");

}(window));
