(function (window) {

	function Chest(x,y,scaleX,scaleY,spriteSheet,frame) {
        this.sprite = new createjs.Sprite(spriteSheet, frame);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.scaleX = scaleX;
        this.sprite.scaleY = scaleY;
        this.sprite.gotoAndStop(frame);
        //this.clicked = false;
        this.sprite.addEventListener("pressup", function(evt){
            var o = evt.target;
            Chest.prototype.click();
        });
	}
	//public functions
    Chest.prototype.getSprite = function() { return this.sprite; }
    Chest.prototype.isClicked = function(){ return this.clicked; }
    Chest.prototype.click = function() { this.clicked=true; }

	window.Chest = createjs.promote(Chest, "Container");

}(window));
