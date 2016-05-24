(function (window) {

    //constructor
	function LevelManager() {
		//this.Container_constructor();
		//this.preload = preload;
		this.currentLevel = 1;
		this.difficulty = 1;
	}

    //update
	LevelManager.prototype.tick = function () {  }
    LevelManager.prototype.setXY = function(x,y) { this.x = x; this.y = y; }

	window.LevelManager = new LevelManager();
}(window));
