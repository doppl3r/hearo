(function (window) {
    var container = createjs.extend(CharManager, createjs.Container);
    var charString = []; //list of Char objects

	function CharManager(x,y,scaleX,scaleY) {
		this.Container_constructor();
        container.x=x;
        container.y=y;
        container.scaleX=scaleX;
        container.scaleY=scaleY;

        for (i=0; i < charString.length; i++){
            this.addChild(charString[i]);
        }
	}
    //shared spritesheet properties
    var manifest = [{src: "text.png", id: "text"}];
    container.loader = new createjs.LoadQueue(false);
    container.loader.addEventListener("complete", handleComplete);
    container.loader.loadManifest(manifest, true, "img/");

    //configure after loaded
    function handleComplete() {
        container.spriteSheet = new createjs.SpriteSheet({
            framerate: 4,
            images: [container.loader.getResult("text")],
            frames: [[0,0,16,23,0,8.15,11.15],[16,0,15,26,0,8.15,12.15],[31,0,14,23,0,7.15,11.15],[45,0,15,25,0,8.15,12.15],[60,0,13,23,0,7.15,11.15],[73,0,14,24,0,8.15,11.15],[87,0,14,23,0,6.15,11.15],[101,0,14,23,0,7.15,11.15],[115,0,15,22,0,7.15,10.15],[130,0,16,25,0,8.15,13.15],[146,0,14,23,0,7.15,11.15],[160,0,14,23,0,7.15,11.15],[174,0,15,22,0,8.15,9.15],[189,0,13,23,0,6.15,11.15],[202,0,14,23,0,7.15,12.15],[216,0,15,25,0,8.15,11.15],[231,0,14,23,0,6.15,10.15],[245,0,14,25,0,8.15,12.15],[259,0,13,22,0,6.15,11.15],[272,0,14,23,0,7.15,11.15],[286,0,13,22,0,7.15,10.15],[299,0,15,22,0,8.15,10.15],[314,0,17,22,0,9.15,10.15],[331,0,15,24,0,8.15,11.15],[346,0,16,22,0,9.15,10.15],[362,0,14,22,0,7.15,11.15]],
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                //"run": [0, 1, "run"],
                "a": [0], "b": [1], "c": [2], "d": [3], "e": [4], "f": [5], "g": [6],
                "h": [7], "i": [8], "j": [9], "k": [10], "l": [11], "m": [12], "n": [13],
                "o": [14], "p": [15], "q": [16], "r": [17], "s": [18], "t": [19], "u": [20],
                "v": [21], "w": [22], "x": [23], "y": [24], "z": [25]
            }
        });
    }

    //update
	container.tick = function (event) {
        for (i=0; i<charString.length; i++){
            if (charString[i].isClicked()){
                this.removeChar(i);
            }
        }

    }
    container.setXY = function(x,y) {  }
    container.addChar = function (x,y,scaleX,scaleY,frame){
        var tempChar = new Char(x,y,scaleX,scaleY,container.spriteSheet,frame);
        tempChar.sprite.on("click", function(evt){ tempChar.click(); });
        charString.push(tempChar);
    }
    container.removeChar = function(i){
        if(i != -1) {
            this.removeChild(i);
            charString[i].sprite.removeEventListener("click");
            charString.splice(i, 1); this.removeChildAt(i);
        }
    }
	window.CharManager = createjs.promote(CharManager, "Container");
}(window));
