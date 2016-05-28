(function (window) {

    //constructor
    function Chest(){
        this.Container_constructor();
    }

    //instance of class
    var container = new createjs.extend(Chest, createjs.Container);

	//public functions
    container.tick = function(event){
        if (this.coins != null) this.coins.tick(event);
    }
    container.addChest = function (x,y,scaleX,scaleY,spriteSheet,frame) {
        //initialize Chest
        this.x = x;
        this.y = y;
        this.sprite = new createjs.Sprite(spriteSheet, frame);
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.sprite.gotoAndStop(frame);
        this.addChild(this.sprite);
    }
    container.isClicked = function(){ return this.clicked; }
    container.click = function() {
        if (!this.clicked){
            if (this.success) {
                this.coins = new CoinEffect();
                this.coins.addCoins(0, 0, 1, 1, 50);
                this.addChild(this.coins);
            }
            window.Game.levelManager.setDelay(120); //1 second delay
            this.clicked=true;
            createjs.Sound.play("sword-low", {pan:0});
            createjs.Sound.play("chest-open", {pan:0});
            this.sprite.gotoAndPlay(this.sprite.spriteSheet.animations[this.sprite._currentFrame+(this.success ? 1:2)]);
            this.resetMouse();
        }
    }
    container.mouseOver = function() {
        if (!this.clicked){
            //this.sprite.alpha=.25;
            this.cursor="pointer";
        }
    }
    container.mouseOut = function() { this.resetMouse(); }
    container.setText = function(text){
        if (this.children.length > 0) this.removeChild(this.customText);
        this.customText = new CustomText(0,-48,this.scaleX,this.scaleY,text);
        this.addChild(this.customText);
    }
    container.updateChest = function(text, success){
        this.setText(text);
        this.success=success;
    }
    container.resetMouse = function() { this.sprite.alpha=1; this.cursor="default"; }

	window.Chest = new createjs.promote(Chest, "Container");
}(window));
