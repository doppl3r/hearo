/*Control all game data from here*/

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
var assetManager; //load progress screen
var manifest; //Main asset manifest
//var preload; //asset manager
var messageField; //load progress status
var background; //background class
var player; //player class
var chestManager; //chestmanager class
var selector; //selector icon

//register key functions
document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;

function init() {
    canvas = document.getElementById("gameCanvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(60);
    assetManager = new AssetManager();
    assetManager.init();
    stage.addChild(assetManager);
    stage.on("click", function(event){ player.navigate(event); selector.animateAt(event); });
    stage.on("pressmove", function(event){ player.navigate(event); selector.animateAt(event); });

    assetManager.preload.on("complete", function(){ restart(); });
    assetManager.preload.on("progress", function(){ assetManager.updateLoading(); stage.update(); });
}

//reset all game logic
function restart() {
    //hide anything on stage and show the score
    stage.removeAllChildren();

    //create the background
    background = new Background(assetManager.preload);
    background.x = canvas.width / 2;
    background.y = canvas.height / 2;

    //create the player
    player = new Player(assetManager.preload);
    player.setXY(canvas.width / 2, canvas.height / 2);

    //create the selector
    selector = new Selector(assetManager.preload);

    createjs.Sound.play("rail", {pan:1});
    createjs.Sound.play("bail", {pan:-1});

    //create the chest manager
    chestManager = new ChestManager(assetManager.preload);
    chestManager.addChest(640,100,1,1,"topClosed");
    chestManager.getLastChest(0).setText('mail');
    chestManager.addChest(1100,360,-1,1,"sideClosed");
    chestManager.getLastChest(0).setText('bail');
    chestManager.addChest(640,620,1,1,"bottomClosed");
    chestManager.getLastChest(0).setText('tail');
    chestManager.addChest(180,360,1,1,"sideClosed");
    chestManager.getLastChest(0).setText('rail');

    //ensure stage is blank and add the player
    stage.clear();
    stage.addChild(background);
    stage.addChild(chestManager);
    stage.addChild(selector);
    stage.addChild(player);

    //start game timer
    if (!createjs.Ticker.hasEventListener("tick")) {
        createjs.Ticker.addEventListener("tick", tick);
        createjs.Ticker.setFPS(60);
    }
}

function tick(event) {
    //call sub ticks
    background.tick(event);
    player.tick(event, chestManager);
    chestManager.tick(event);
    stage.update(event);
}

//allow for WASD and arrow control scheme
function handleKeyDown(e) {
    if (!e) { var e = window.event; } //cross browser issues exist
    switch (e.keyCode) {
        case KEYCODE_A: case KEYCODE_LEFT: player.moveLeft(true); break;
        case KEYCODE_D: case KEYCODE_RIGHT: player.moveRight(true); break;
        case KEYCODE_W: case KEYCODE_UP: player.moveUp(true); break;
        case KEYCODE_S: case KEYCODE_DOWN: player.moveDown(true); break;
        //case KEYCODE_SPACE: player.attack(1); break;
    }
}

function handleKeyUp(e) {
    if (!e) { var e = window.event; } //cross browser issues exist
    switch (e.keyCode) {
        case KEYCODE_A: case KEYCODE_LEFT: player.moveLeft(false); break;
        case KEYCODE_D: case KEYCODE_RIGHT: player.moveRight(false); break;
        case KEYCODE_W: case KEYCODE_UP: player.moveUp(false); break;
        case KEYCODE_S: case KEYCODE_DOWN: player.moveDown(false); break;
        //case KEYCODE_SPACE: player.attack(0); break;
    }
}