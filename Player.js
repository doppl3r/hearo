(function (window) {

    //constructor
	function Player(preload) {
		this.Container_constructor();
		this.preload = preload;
		this.spriteSheet = new createjs.SpriteSheet({
            framerate: 8,
            images: [this.preload.getResult("player")],
            frames: [[4,4,167,253,0,83.65,126.65],[175,4,168,252,0,78.65,125.65],[347,4,168,245,0,75.65,117.65],[519,4,183,315,0,73.65,187.65],[706,4,155,317,0,64.65,185.65],[4,325,258,233,0,45.650000000000006,93.65],[266,325,171,251,0,83.65,130.65],[441,325,167,253,0,88.65,120.65]],
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                idle: { frames: [0,1,2,1] },
                attack: { frames: [3,4,5,5], next: "idle" },
                run: { frames: [6,7] }
            }
        });
        this.sprite = new createjs.Sprite(this.spriteSheet, "idle");
        this.addChild(this.sprite);
        this.speed = 10;
        this.forceAllKeysUp();
	}

	//instance of class
	var container = createjs.extend(Player, createjs.Container);

    //update
	container.tick = function (event, chestManager) {
	    //move player if target is not in reach
	    if (this.target){
	        if (Math.abs(this.x - this.targetX) >= this.speed ||
                Math.abs(this.y - this.targetY) >= this.speed){
                this.left = this.x >= this.targetX + this.speed * this.directionX;
                this.right = this.x < this.targetX - this.speed * this.directionX;
                this.up = this.y >= this.targetY + this.speed * this.directionY;
                this.down = this.y < this.targetY - this.speed * this.directionY;

                this.enableRunAnimation(true);

                //adjust player direction
                if (this.left) this.scaleX = -1;
                else this.scaleX = 1;
            }
            else {
                this.left=this.right=this.up=this.down=this.target=false;
                this.enableRunAnimation(false);
            } //reset when reached target
	    }

        //check key input
        if (this.left) this.x += this.speed * this.directionX;
        else if (this.right) this.x += this.speed * this.directionX;
        if (this.up) this.y += this.speed * this.directionY;
        else if (this.down) this.y += this.speed * this.directionY;

        //check collision using 'ndgmr.Collision.js' provided by Olaf Horstmann
        var tempChest;
        for (i=0; i<chestManager.children.length; i++){
            tempChest = chestManager.getChildAt(i); //get temporary index
            if (ndgmr.checkRectCollision(this, tempChest)){
                if (!tempChest.isClicked()){
                    // TODO Force stop left and right action
                    this.forceAllKeysUp();
                    tempChest.click();
                    this.sprite.gotoAndPlay("attack");
                }
            }
        }
	}

	//public variables
    container.moveUp = function(pressed) { this.up = pressed; this.directionY = -1; this.enableRunAnimation(pressed); }
    container.moveRight = function(pressed) { this.right = pressed; this.scaleX = this.directionX = 1; this.enableRunAnimation(pressed); }
    container.moveDown = function(pressed) { this.down = pressed; this.directionY = 1; this.enableRunAnimation(pressed); }
    container.moveLeft = function(pressed) { this.left = pressed; this.scaleX = this.directionX = -1; this.enableRunAnimation(pressed); }
    container.setXY = function(x,y) { this.x = x; this.y = y; }
    container.navigate = function(event) {
        this.target = true;
        this.targetX = event.stageX;
        this.targetY = event.stageY;
        this.distance = Math.sqrt(Math.pow(this.targetX - this.x,2)+Math.pow(this.targetY - this.y,2));
        this.directionX = (this.targetX - this.x) / this.distance;
        this.directionY = (this.targetY - this.y) / this.distance;
    }
    container.enableRunAnimation = function(pressed){
        if (pressed){ if (this.sprite.currentAnimation == "idle") this.sprite.gotoAndPlay("run"); }
        else { if (this.sprite.currentAnimation == "run" && this.allKeysUp()) { this.sprite.gotoAndPlay("idle"); } }
    }
    container.allKeysUp = function() { return this.left==this.right==this.up==this.down; }
    container.forceAllKeysUp = function() { this.left=this.right=this.up=this.down=this.target=false; }

	window.Player = createjs.promote(Player, "Container");
}(window));
