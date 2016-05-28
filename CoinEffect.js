(function (window) {

    //constructor
	function CoinEffect() {
	    this.Container_constructor();
	    this.spriteSheet = new createjs.SpriteSheet({ //generated with Adobe Animate
            framerate: 8,
            images: [window.Game.assetManager.preload.getResult("coin")],
            frames: [[4,4,18,18,0,13.55,44.9],[26,4,13,20,0,11.55,45.9],
                    [43,4,7,20,0,7.550000000000001,45.9],[4,28,13,20,0,11.55,45.9]],
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                spin: { frames: [0,1,2,3] }
            }
        });
	}

	//instance of class
	var container = new createjs.extend(CoinEffect, createjs.Container);

    //update
	container.tick = function (event) {
         for (var i=0; i < this.children.length; i++){
             this.getChildAt(i).tick(event);
         }
    }

	//public functions
    container.addCoins = function (x,y,scaleX,scaleY,amount){
        //text=text.replace(" ","_");
        if (this.children.length > 0) this.removeChild(this.coin);
        for (i = 0; i < amount; i++){
            this.coin = new Coin();
            this.coin.init(this.x,this.y,scaleX,scaleY,this.spriteSheet,"spin");
            this.addChild(this.coin);
        }
    }

	window.CoinEffect = createjs.promote(CoinEffect, "Container");
}(window));
