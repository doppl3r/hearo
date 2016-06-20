(function (window) {

    //constructor
	function ScreenSettings() {
        //container properties
		this.Container_constructor();

        //background color
        this.background = new Background();
        this.background.setBackground("bg-2");
        this.background.center();

        this.updateScreen();
        this.addChild(this.background, this.text1, this.text2, this.text3, this.chestManager);
    }

	//instance of class
	var container = new createjs.extend(ScreenSettings, createjs.Container);

    //update
	container.tick = function (event) {
        //createjs.Tween.get(this.chestManager.getChest(2)).wait(500).to({ y: window.Game.getHeight()-200 }, 1000, createjs.Ease.cubicInOut)

        //tick chestManager
        this.chestManager.tick(event);
        if (this.delay >= 0){
            this.delay-=1;
            if (this.delay == 0) { //change screen after delay runs out
                this.updateScreen();
                window.Game.setScreen(2);
                window.Game.setStage();
                window.Game.levelManager.resetScore();
            }
        }
        else {
            var tempChest;
            for (var i=0; i<this.chestManager.children.length; i++){
                tempChest = this.chestManager.getChildAt(i); //get temporary index
                if (tempChest.isClicked()){
                    switch (i){
                        case 0: var id = window.prompt("User ID:", window.Game.userID); if (id != null) window.Game.setID(id); tempChest.reset(); this.updateScreen(); break;
                        case 1: window.Game.levelManager.increaseDupeCount(); tempChest.reset(); this.updateScreen(); break;
                        case 2: window.Game.levelManager.increaseTrials(); tempChest.reset(); this.updateScreen(); break;
                        case 3: window.Game.levelManager.decreaseTrials(); tempChest.reset(); this.updateScreen(); break;
                        case 4: this.chestManager.setChestFrameAt(i,7); this.delay = 120; break;
                    }
                }
            }
        }
    }
    container.updateScreen = function(text, y){
        this.removeChild(this.text1,this.text2,this.text3,this.chestManager);
        //make chests as clickable buttons
        this.chestManager = new ChestManager(true);
        //user ID
        this.chestManager.addChest(340,200,.5,.5,"topClosed",true);
        this.chestManager.getLastChest().updateChest("Edit",null,true);
        this.text1 = new CustomText(410,190,1,1,"User ID: #"+window.Game.userID, false);
        //Difficulty
        this.chestManager.addChest(340,300,.5,.5,"topClosed",true);
        this.chestManager.getLastChest().updateChest("+",null,true);
        this.text2 = new CustomText(410,290,1,1,"Similar Words: "+window.Game.levelManager.dupeWords+"/"+window.Game.levelManager.maxDupeWords(), false);
        this.addChild(this.background, this.text1, this.text2, this.chestManager);
        //Trials
        this.chestManager.addChest(340,400,.5,.5,"topClosed",true);
        this.chestManager.getLastChest().updateChest("+",null,true);
        this.chestManager.addChest(280,400,.5,.5,"topClosed",true);
        this.chestManager.getLastChest().updateChest("-",null,true);
        this.text3 = new CustomText(410,390,1,1,"Trials: "+window.Game.levelManager.startLevel, false);
        //start
        this.chestManager.addChest(window.Game.getCenter()[0],600,1,1,"topClosed",true);
        this.chestManager.getLastChest().updateChest("Begin",null,true);
        //update container
        this.addChild(this.background, this.text1, this.text2, this.text3, this.chestManager);
    }

	window.ScreenSettings = createjs.promote(ScreenSettings, "Container");
}(window));