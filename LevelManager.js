(function (window) {

    //constructor
	function LevelManager() {
		this.currentLevel = 1;
		this.difficulty = 1;
		this.delay = -1; //milliseconds
	}

	LevelManager.prototype.tick = function () {
	    if (this.delay >= 0){
	        this.delay-=1;
	        if (this.delay == 0) {
	            //this.nextLevel();
                window.Game.restart();
	        }
	    }
	}
    LevelManager.prototype.setXY = function(x,y) { this.x = x; this.y = y; }
    LevelManager.prototype.nextLevel = function(){ this.currentLevel+=1; }
    LevelManager.prototype.createLevel = function(){
        //testing purposes
        window.Game.chestManager.removeAllChests(); //remove extra chests
        if (this.currentLevel == 1){
            var words = [getRandomWord(), getRandomWord(), getRandomWord(), getRandomWord()];

            createjs.Sound.play(words[0], {pan:-1});
            createjs.Sound.play(words[1], {pan:1});

            window.Game.chestManager.addChest(640,100,1,1,"topClosed");
            window.Game.chestManager.getLastChest(0).setText(words[0]);
            window.Game.chestManager.addChest(1100,360,-1,1,"sideClosed");
            window.Game.chestManager.getLastChest(0).setText(words[1]);
            window.Game.chestManager.addChest(640,620,1,1,"bottomClosed");
            window.Game.chestManager.getLastChest(0).setText(words[2]);
            window.Game.chestManager.addChest(180,360,1,1,"sideClosed");
            window.Game.chestManager.getLastChest(0).setText(words[3]);
        }
    }
    LevelManager.prototype.setDelay = function(delay){ this.delay = delay; }
    function getRandomWord(){
        return window.Game.assetManager.preload._loadedResults.words.manifest[getRandomInt()].id;
    }
    function getRandomInt() {
        var min = 0;
        var max = window.Game.assetManager.preload._loadedResults.words.manifest.length-1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

	window.LevelManager = new LevelManager();
}(window));
