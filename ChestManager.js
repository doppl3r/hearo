(function (window) {
    var c = createjs.extend(ChestManager, createjs.Container);
    var chests = [new Chest(500,500,"sideClosed"),new Chest(200,200,"sideClosed")]; //list of Chest objects

	function ChestManager() {
		this.Container_constructor();
        for (i=0; i<chests.length;i++){
            this.addChild(chests[i].sprite);
        }
	}

    chestsToString();

    //update
	c.tick = function (event) {  }
    c.setXY = function(x,y) {  }

    function chestsToString(){
        for (i=0; i<chests.length;i++){
            chests[i].toString();
        }
    }

	window.ChestManager = createjs.promote(ChestManager, "Container");
}(window));
