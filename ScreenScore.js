(function (window) {

    //constructor
	function ScreenScore() {
        //container properties
		this.Container_constructor();
        this.x = window.Game.canvas.width / 2;
        this.y = (window.Game.canvas.height / 2);

        //background color
        this.background = new Background();
        this.background.setBackground("bg-2");

        //make chests as clickable buttons
        this.chestManager = new ChestManager(true);
        this.chestManager.addChest(0,240,1,1,"topClosed");
        this.chestManager.getLastChest().updateChest("retry",null,true);

        //add to stage
        this.addChild(this.background);
        this.addChild(this.chestManager); //add to stage
        this.setText("score:", -216);
        this.setText("left ear: "+window.Game.levelManager.leftPoints, -72);
        this.setText("right ear: "+window.Game.levelManager.right, 0);
    }

	//instance of class
	var container = new createjs.extend(ScreenScore, createjs.Container);

    //update
	container.tick = function (event) {
        //tick chestManager
        this.chestManager.tick(event);
        if (this.delay >= 0){
            this.delay-=1;
            if (this.delay == 0) { //change screen after delay runs out
                window.Game.setScreen(2);
                window.Game.setStage();
                window.Game.levelManager.resetScore();
            }
        }
        else{
            var tempChest;
            for (var i=0; i<this.chestManager.children.length; i++){
                tempChest = this.chestManager.getChildAt(i); //get temporary index
                if (tempChest.isClicked()){
                    this.chestManager.setChestFrameAt(i,7);
                    this.delay = 120; //delay before screen changes
                }
            }
        }
    }
    container.setText = function(text, y){
        this.customText = new CustomText(0,y,this.scaleX,this.scaleY,text);
        this.addChild(this.customText);
    }

	window.ScreenScore = createjs.promote(ScreenScore, "Container");
}(window));
