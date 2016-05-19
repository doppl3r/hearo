(function (window) {

    //constructor
	function Player(preload) {
		this.Container_constructor();
		this.preload = preload;
		this.spriteSheet = new createjs.SpriteSheet({
            framerate: 8,
            images: [this.preload.getResult("player")],
            frames: [[4,4,167,253,0,83.4,126.65],[175,4,168,252,0,78.4,125.65],[4,261,168,245,0,75.4,117.65],
                    [176,261,183,315,0,73.4,187.65],[4,580,155,317,0,64.4,185.65],
                    [163,580,258,233,0,45.400000000000006,93.65]], //center bounds
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                idle: { frames: [0,1,2,1] },
                attack: { frames: [3,4,5,5], next: "idle" }
            }
        });
        this.sprite = new createjs.Sprite(this.spriteSheet, "idle");
        this.addChild(this.sprite);
        this.speed = 10;
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

                if (this.left) this.scaleX = -1;
                else this.scaleX = 1;
            }
            else { this.left=this.right=this.up=this.down=this.target=false; } //reset when reached target
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
                    tempChest.click();
                    this.sprite.gotoAndPlay("attack");
                }
            }
        }
	}

	//public variables
    container.moveUp = function(pressed) { this.up = pressed ? true : false; this.directionY = -1; }
    container.moveRight = function(pressed) { this.sprite.scaleX = 1; this.right = pressed ? true : false; this.directionX = 1; }
    container.moveDown = function(pressed) { this.down = pressed ? true : false; this.directionY = 1; }
    container.moveLeft = function(pressed) { this.sprite.scaleX = -1; this.left = pressed ? true : false; this.directionX = -1; }
    container.attack = function(pressed) { if (pressed) this.sprite.gotoAndPlay("attack"); }
    container.setXY = function(x,y) { this.x = x; this.y = y; }
    container.navigate = function(event) {
        this.target = true;
        this.targetX = event.stageX;
        this.targetY = event.stageY;
        this.distance = Math.sqrt(Math.pow(this.targetX - this.x,2)+Math.pow(this.targetY - this.y,2));
        this.directionX = (this.targetX - this.x) / this.distance;
        this.directionY = (this.targetY - this.y) / this.distance;
    }
	window.Player = createjs.promote(Player, "Container");
}(window));
