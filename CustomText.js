(function (window) {

    //constructor
	function CustomText(x,y,scaleX,scaleY,text) {
	    this.Container_constructor();
	    this.spriteSheet = new createjs.SpriteSheet({ //generated with Adobe Animate
            framerate: 0,
            images: [window.Game.assetManager.preload.getResult("text")],
            frames: [[4,4,0,0,0,0.6000000000000014,0.3000000000000007],[8,4,37,56,0,19.6,25.3],[49,4,35,60,0,19.6,27.3],
                    [88,4,33,56,0,17.6,26.3],[125,4,35,59,0,19.6,28.3],[164,4,31,55,0,18.6,25.3],
                    [199,4,31,58,0,18.6,26.3],[234,4,34,55,0,15.600000000000001,25.3],[272,4,33,54,0,18.6,25.3],
                    [309,4,34,54,0,17.6,23.3],[347,4,40,59,0,21.6,29.3],[391,4,33,56,0,17.6,26.3],
                    [428,4,33,54,0,17.6,25.3],[465,4,36,50,0,19.6,19.3],[505,4,33,53,0,16.6,24.3],
                    [542,4,34,53,0,18.6,26.3],[580,4,35,59,0,19.6,24.3],[619,4,32,55,0,15.600000000000001,23.3],
                    [655,4,33,59,0,19.6,28.3],[692,4,30,52,0,14.600000000000001,24.3],[726,4,34,55,0,17.6,24.3],
                    [764,4,32,52,0,18.6,23.3],[800,4,37,53,0,20.6,23.3],[841,4,39,55,0,21.6,24.3],
                    [884,4,37,57,0,20.6,26.3],[925,4,38,53,0,21.6,24.3],[967,4,33,52,0,17.6,25.3],
                    [4,68,33,51,0,18.6,23.3],[41,68,30,49,0,15.600000000000001,22.3],[75,68,33,49,0,19.6,20.3],
                    [112,68,33,48,0,19.6,21.3],[149,68,31,49,0,16.6,22.3],[184,68,31,50,0,16.6,22.3],
                    [219,68,30,51,0,15.600000000000001,23.3],[253,68,28,50,0,15.600000000000001,22.3],
                    [285,68,33,52,0,18.6,23.3],[322,68,27,50,0,14.600000000000001,21.3],
                    [353,68,13,34,0,6.600000000000001,15.3]],
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                //"run": [0, 1, "run"],
                "_": [0], "a": [1], "b": [2], "c": [3], "d": [4], "e": [5], "f": [6], "g": [7],
                "h": [8], "i": [9], "j": [10], "k": [11], "l": [12], "m": [13], "n": [14],
                "o": [15], "p": [16], "q": [17], "r": [18], "s": [19], "t": [20], "u": [21],
                "v": [22], "w": [23], "x": [24], "y": [25], "z": [26], "/0":[27],
                "/1": [28], "/2": [29], "/3": [30], "/4": [31], "/5": [33], "/6": [34], "/7": [35],
                "/8": [36], "/9": [37], ":": [37]
            }
        });
	    this.x = x;
	    this.y = y;
	    this.scaleX = scaleX;
	    this.scaleY = scaleY;
	    this.kerning = 32;
	    this.setText(x,y,scaleX,scaleY,text);
	}

	//instance of class
	var container = new createjs.extend(CustomText, createjs.Container);

    //update
	container.tick = function (event) { }

	//public functions
    container.setText = function (x,y,scaleX,scaleY,text){
        //text=text.replace(" ","_");
        for (i = 0; i < text.length; i++){
            var tempChar = text.charAt(i).toLowerCase(); //only lowercase chars
            tempChar = !isNaN(tempChar) ? "/"+tempChar : tempChar; //allow numbers
            var tempCustomCharacter = new CustomCharacter();
            tempCustomCharacter.init((i*this.kerning*scaleX),0,scaleX,scaleY,this.spriteSheet,tempChar);
            this.addChild(tempCustomCharacter);
        }
        this.centerAlignText();
    }
    container.removeChar = function(i){ this.removeChildAt(i); }
    container.centerAlignText = function() {
        //the first
        this.setBounds((-this.getBounds().width/2)-(this.getBounds().x)+2, //spritesheet was rendered with 4 padding
                        -this.getBounds().height/2,
                        this.getBounds().width,
                        this.getBounds().height);
        this.x=this.getBounds().x; //set to new bounds
        this.scaleX *= this.scaleX; //mirror if the parent was flipped
    }

	window.CustomText = new createjs.promote(CustomText, "Container");
}(window));
