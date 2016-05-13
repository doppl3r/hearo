(function (window) {

	function CustomText(x,y,scaleX,scaleY,text) {
	    this.Container_constructor();
	    this.x = x;
	    this.y = y;
	    this.scaleX = scaleX;
	    this.scaleY = scaleY;
	    this.kerning = 32;
	    this.setText(x,y,scaleX,scaleY,text);
	}

	//instance of class
	var container = new createjs.extend(CustomText, createjs.Container);

    //shared spritesheet properties
    this.manifest = [{src: "text.png", id: "text"}];
    //this.loader = new createjs.LoadQueue(false);
    this.loader.addEventListener("complete", handleComplete);
    this.loader.loadManifest(this.manifest, true, "img/");

    //configure after loaded
    function handleComplete() {
        container.spriteSheet = new createjs.SpriteSheet({
            framerate: 0,
            images: [this.loader.getResult("text")],
            frames: [[4,4,37,56,0,19.6,25.3],[45,4,35,60,0,19.6,27.3],[84,4,33,56,0,17.6,26.3],
            [121,4,35,59,0,19.6,28.3],[160,4,31,55,0,18.6,25.3],[195,4,31,58,0,18.6,26.3],
            [230,4,34,55,0,15.600000000000001,25.3],[4,68,33,54,0,18.6,25.3],[41,68,34,54,0,17.6,23.3],
            [79,68,40,59,0,21.6,29.3],[123,68,33,56,0,17.6,26.3],[160,68,33,54,0,17.6,25.3],
            [197,68,36,50,0,19.6,19.3],[237,68,33,53,0,16.6,24.3],[4,131,34,53,0,18.6,26.3],
            [42,131,35,59,0,19.6,24.3],[81,131,32,55,0,15.600000000000001,23.3],[117,131,33,59,0,19.6,28.3],
            [154,131,30,52,0,14.600000000000001,24.3],[188,131,34,55,0,17.6,24.3],[226,131,32,52,0,18.6,23.3],
            [4,194,37,53,0,20.6,23.3],[45,194,39,55,0,21.6,24.3],[88,194,37,57,0,20.6,26.3],[129,194,38,53,0,21.6,24.3],
            [171,194,33,52,0,17.6,25.3],[208,194,33,52,0,17.6,25.3],[4,255,33,51,0,18.6,23.3],
            [41,255,30,49,0,15.600000000000001,22.3],[75,255,33,49,0,19.6,20.3],[112,255,33,48,0,19.6,21.3],
            [149,255,31,49,0,16.6,22.3],[184,255,31,50,0,16.6,22.3],[219,255,30,51,0,15.600000000000001,23.3],
            [4,310,28,50,0,15.600000000000001,22.3],[36,310,33,52,0,18.6,23.3],
            [73,310,27,50,0,14.600000000000001,21.3]],
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                //"run": [0, 1, "run"],
                "a": [0], "b": [1], "c": [2], "d": [3], "e": [4], "f": [5], "g": [6],
                "h": [7], "i": [8], "j": [9], "k": [10], "l": [11], "m": [12], "n": [13],
                "o": [14], "p": [15], "q": [16], "r": [17], "s": [18], "t": [19], "u": [20],
                "v": [21], "w": [22], "x": [23], "y": [24], "z": [25], "_": [26], "_0":[27],
                "_1": [28], "_2": [29], "_3": [30], "_4": [31], "_5": [33], "_6": [34], "_7": [35],
                "_8": [36], "_9": [37]
            }
        });
    }

    //update
	container.tick = function (event) { }
    container.setText = function (x,y,scaleX,scaleY,text){
        text=text.replace(" ","_");
        for (i = 0; i < text.length; i++){
            var tempChar = text.charAt(i).toLowerCase(); //only lowercase chars
            tempChar = !isNaN(tempChar) ? "_"+tempChar : tempChar; //allow numbers
            var tempCustomCharacter = new CustomCharacter(x+(i*this.kerning*scaleX),y,scaleX,scaleY,this.spriteSheet,tempChar);
            this.addChild(tempCustomCharacter);
        }
        this.centerAlignText();
    }
    container.removeChar = function(i){
        this.removeChildAt(i);
    }
    container.centerAlignText = function() {
        this.x = (-(this.getBounds().width/2)+(this.kerning/2))*this.scaleX;
        this.scaleX *= this.scaleX;
    }

	window.CustomText = createjs.promote(CustomText, "Container");
}(window));
