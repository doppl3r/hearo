(function (window) {

    //constructor
	function Player(preload) {
		this.Container_constructor();
		this.preload = preload;
		this.spriteSheet = new createjs.SpriteSheet({
            framerate: 8,
            images: [this.preload.getResult("player")],
            frames: [[4,4,165,291,0,67.2,262.95],[173,4,175,286,0,69.2,258.95],[352,4,180,286,0,70.2,256.95],
                    [536,4,183,314,0,61.2,285.95],[723,4,155,317,0,52.2,283.95],[4,325,258,234,0,32.2,192.95],
                    [266,325,170,250,0,70.2,228.95],[440,325,167,254,0,76.2,219.95]],
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
                this.forceAllKeysUp();
                this.enableRunAnimation(false);
            } //reset when reached target
	    }

        //check key input
        if (this.sprite.currentAnimation != "attack") { //disable movement while attacking
            if (this.left) this.x += this.speed * this.directionX;
            else if (this.right) this.x += this.speed * this.directionX;
            if (this.up) this.y += this.speed * this.directionY;
            else if (this.down) this.y += this.speed * this.directionY;
        }
        else this.forceAllKeysUp();

        //check collision using 'ndgmr.Collision.js' provided by Olaf Horstmann
        var tempChest;
        for (i=0; i<chestManager.children.length; i++){
            tempChest = chestManager.getChildAt(i); //get temporary index
            if (ndgmr.checkRectCollision(this, tempChest)){
                if (!tempChest.isClicked()){
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
        if (pressed){
            if (this.sprite.currentAnimation == "idle") this.sprite.gotoAndPlay("run");
        }
        else {
            this.targetX = this.x; //interrupt target
            this.targetY = this.y;
            if (this.sprite.currentAnimation == "run" && this.allKeysUp()) {
                this.sprite.gotoAndPlay("idle");
            }
        }
    }
    container.allKeysUp = function() { return this.left==this.right==this.up==this.down; }
    container.forceAllKeysUp = function() { this.left=this.right=this.up=this.down=this.target=false; }

	window.Player = createjs.promote(Player, "Container");
}(window));
