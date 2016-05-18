(function(window) {
treasure_bottom = function() {
	this.initialize();
}
treasure_bottom._SpriteSheet = new createjs.SpriteSheet({images: ["chests.png"], frames: [[4,4,157,131,0,78.25,65.65],[4,139,193,106,0,98.25,40.650000000000006],[4,249,193,106,0,98.25,40.650000000000006]]});
var treasure_bottom_p = treasure_bottom.prototype = new createjs.Sprite();
treasure_bottom_p.Sprite_initialize = treasure_bottom_p.initialize;
treasure_bottom_p.initialize = function() {
	this.Sprite_initialize(treasure_bottom._SpriteSheet);
	this.paused = false;
}
window.treasure_bottom = treasure_bottom;
treasure_side = function() {
	this.initialize();
}
treasure_side._SpriteSheet = new createjs.SpriteSheet({images: ["chests.png"], frames: [[4,359,113,147,0,56.5,73.4],[4,510,179,149,0,122.5,75.4],[4,663,179,149,0,122.5,75.4]]});
var treasure_side_p = treasure_side.prototype = new createjs.Sprite();
treasure_side_p.Sprite_initialize = treasure_side_p.initialize;
treasure_side_p.initialize = function() {
	this.Sprite_initialize(treasure_side._SpriteSheet);
	this.paused = false;
}
window.treasure_side = treasure_side;
treasure_top = function() {
	this.initialize();
}
treasure_top._SpriteSheet = new createjs.SpriteSheet({images: ["chests.png"], frames: [[4,816,115,95,0,57.25,47.75],[123,816,110,93,0,55.25,45.75],[4,915,110,93,0,55.25,45.75]]});
var treasure_top_p = treasure_top.prototype = new createjs.Sprite();
treasure_top_p.Sprite_initialize = treasure_top_p.initialize;
treasure_top_p.initialize = function() {
	this.Sprite_initialize(treasure_top._SpriteSheet);
	this.paused = false;
}
window.treasure_top = treasure_top;
}(window));

