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
var manifest; //Main asset manifest
var preload;

//var audio; //audio handler
var background; //background class
var player; //player class
var chestManager; //chestmanager class

//var customText;
var scoreField; //score Field
var loadingInterval = 0;

function init() {
    canvas = document.getElementById("gameCanvas");
    canvas.getContext("2d").imageSmoothingEnabled = true;
    canvas.getContext("2d").mozImageSmoothingEnabled = false;
    canvas.getContext("2d").oImageSmoothingEnabled = false;
    canvas.getContext("2d").webkitImageSmoothingEnabled = false;
    canvas.getContext("2d").msImageSmoothingEnabled = false;

    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(30);
    stage.update(); //update the stage to show text

    manifest = [
        { id: "begin", src: "sounds/spawn.ogg" },
        { id: "break", src: "sounds/break.ogg" },
        { id: "death", src: "sounds/death.ogg" },
        { id: "laser", src: "sounds/shot.ogg" },
        { id: "music", src: "sounds/music.ogg" },
        { id: "bg-1", src: "img/background-image1.png" },
        { id: "bg-2", src: "img/background-image2.png" }
    ];

    preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);
    preload.loadManifest(manifest);
    preload.on("complete", function(){  });

    //create audio handler
    //audio = new Audio();

    //finish loading
    watchRestart();
}

function watchRestart() {
    //watch for clicks
    //stage.update(); //update the stage to show text
    canvas.onclick = handleClick;
}

function handleClick() {
    //prevent extra clicks and hide text
    canvas.onclick = null;

    // indicate the player is now on screen
    createjs.Sound.play("begin");

    restart();
}

//reset all game logic
function restart() {
    //hide anything on stage and show the score
    stage.removeAllChildren();

    //create the background
    background = new Background(preload.getResult("bg-2"));
    background.x = canvas.width / 2;
    background.y = canvas.height / 2;

    //create the player
    player = new Player(canvas.width / 2, canvas.height / 2);

    //create the chest manager
    chestManager = new ChestManager();
    chestManager.addChest(640,100,1,1,"topClosed");
    chestManager.getLastChest(0).setText('a');
    chestManager.addChest(1100,360,1,1,"sideClosed");
    chestManager.getLastChest(0).setText('peazy');
    chestManager.addChest(640,620,1,1,"bottomClosed");
    chestManager.getLastChest(0).setText('lemon');
    chestManager.addChest(180,360,-1,1,"sideClosed");
    chestManager.getLastChest(0).setText('squeezy');

    //ensure stage is blank and add the player
    stage.clear();
    stage.addChild(background);
    stage.addChild(player);
    stage.addChild(chestManager);

    //start game timer
    if (!createjs.Ticker.hasEventListener("tick")) {
        createjs.Ticker.addEventListener("tick", tick);
        createjs.Ticker.setFPS(60);
    }
}

function tick(event) {
    //call sub ticks
    background.tick(event);
    player.tick(event);
    //chest.tick(event);
    chestManager.tick(event);
    stage.update(event);
}

//allow for WASD and arrow control scheme
function handleKeyDown(e) {
    if (!e) { var e = window.event; } //cross browser issues exist
    switch (e.keyCode) {
        case KEYCODE_A: case KEYCODE_LEFT: player.moveLeft(1); break;
        case KEYCODE_D: case KEYCODE_RIGHT: player.moveRight(1); break;
        case KEYCODE_W: case KEYCODE_UP: player.moveUp(1); break;
        case KEYCODE_S: case KEYCODE_DOWN: player.moveDown(1); break;
        case KEYCODE_ENTER: if (canvas.onclick == handleClick) { handleClick(); } break;
    }
}

function handleKeyUp(e) {
    if (!e) { var e = window.event; } //cross browser issues exist
    switch (e.keyCode) {
        case KEYCODE_A: case KEYCODE_LEFT: player.moveLeft(0); break;
        case KEYCODE_D: case KEYCODE_RIGHT: player.moveRight(0); break;
        case KEYCODE_W: case KEYCODE_UP: player.moveUp(0); break;
        case KEYCODE_S: case KEYCODE_DOWN: player.moveDown(0); break;
    }
}