(function (window) {
    //private variables
    var KEYCODE_ENTER = 13; //useful keycode
    var KEYCODE_SPACE = 32; //useful keycode
    var KEYCODE_UP = 38; //useful keycode
    var KEYCODE_LEFT = 37; //useful keycode
    var KEYCODE_RIGHT = 39; //useful keycode
    var KEYCODE_DOWN = 40;
    var KEYCODE_W = 87; //useful keycode
    var KEYCODE_A = 65; //useful keycode
    var KEYCODE_D = 68; //useful keycode
    var KEYCODE_S = 83; //useful keycode

    var canvas; //Main canvas
    var stage; //Main display stage

    //register key functions
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    //private functions
    function Game(){ Game.prototype.init(); } //constructor
    Game.prototype.init = function() {
        canvas = document.getElementById("gameCanvas");
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(60);
        this.assetManager = new AssetManager(document.getElementById("gameCanvas"));
        this.assetManager.init();
        stage.addChild(this.assetManager);
        stage.on("click", function(event){ Game.prototype.player.navigate(event); Game.prototype.selector.animateAt(event); });

        //create level manager prototype from window object
        this.levelManager = Object.create(LevelManager);

        this.assetManager.preload.on("complete", function(){ Game.prototype.restart(); });
        this.assetManager.preload.on("progress", function(){ Game.prototype.assetManager.updateLoading(); stage.update(); });
    }
    function tick(event) {
        //call sub ticks
        Game.prototype.background.tick(event);
        Game.prototype.player.tick(event, Game.prototype.chestManager);
        Game.prototype.chestManager.tick(event)
        Game.prototype.levelManager.tick(event);
        stage.update(event);
    }
    //allow for WASD and arrow control scheme
    function handleKeyDown(e) {
        if (!e) { var e = window.event; } //cross browser issues exist
        switch (e.keyCode) {
            case KEYCODE_A: case KEYCODE_LEFT: Game.prototype.player.moveLeft(true); break;
            case KEYCODE_D: case KEYCODE_RIGHT: Game.prototype.player.moveRight(true); break;
            case KEYCODE_W: case KEYCODE_UP: Game.prototype.player.moveUp(true); break;
            case KEYCODE_S: case KEYCODE_DOWN: Game.prototype.player.moveDown(true); break;
        }
    }
    function handleKeyUp(e) {
        if (!e) { var e = window.event; } //cross browser issues exist
        switch (e.keyCode) {
            case KEYCODE_A: case KEYCODE_LEFT: Game.prototype.player.moveLeft(false); break;
            case KEYCODE_D: case KEYCODE_RIGHT: Game.prototype.player.moveRight(false); break;
            case KEYCODE_W: case KEYCODE_UP: Game.prototype.player.moveUp(false); break;
            case KEYCODE_S: case KEYCODE_DOWN: Game.prototype.player.moveDown(false); break;
        }
    }

    //public functions
    Game.prototype.restart = function() {
        //createjs.Sound.muted = true;
        stage.removeAllChildren();

        //create the background
        if (this.background == null) this.background = new Background(this.assetManager.preload);
        this.background.x = canvas.width / 2;
        this.background.y = canvas.height / 2;
        //create the player
        if (this.player == null) this.player = new Player(this.assetManager.preload);
        this.player.setXY(canvas.width / 2, (canvas.height / 2)+32);
        //create the selector
        if (this.selector == null) this.selector = new Selector(this.assetManager.preload);
        //create the chest manager
        if (this.chestManager == null) this.chestManager = new ChestManager(this.assetManager.preload);

        //ensure stage is blank and add the player
        stage.clear();
        stage.addChild(this.background);
        stage.addChild(this.chestManager);
        stage.addChild(this.selector);
        stage.addChild(this.player);

        //start game timer
        if (!createjs.Ticker.hasEventListener("tick")) {
            createjs.Ticker.addEventListener("tick", tick);
            createjs.Ticker.setFPS(60);
        }

        this.levelManager.createLevel();
    }

    //create prototype of self
    window.Game = new Game();
}(window));
