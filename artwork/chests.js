(function(window) {
treasure_bottom_instance_1 = function() {
	this.initialize();
}
treasure_bottom_instance_1._SpriteSheet = new createjs.SpriteSheet({images: ["treasure.png"], frames: [[0,0,159,132,0,79.25,65.65],[159,0,193,107,0,98.25,40.650000000000006],[352,0,193,107,0,98.25,40.650000000000006]]});
var treasure_bottom_instance_1_p = treasure_bottom_instance_1.prototype = new createjs.Sprite();
treasure_bottom_instance_1_p.Sprite_initialize = treasure_bottom_instance_1_p.initialize;
treasure_bottom_instance_1_p.initialize = function() {
	this.Sprite_initialize(treasure_bottom_instance_1._SpriteSheet);
	this.paused = false;
}
window.treasure_bottom_instance_1 = treasure_bottom_instance_1;
treasure_side_instance_1 = function() {
	this.initialize();
}
treasure_side_instance_1._SpriteSheet = new createjs.SpriteSheet({images: ["treasure.png"], frames: [[545,0,113,147,0,56.5,73.4],[658,0,180,149,0,56.5,75.4],[838,0,180,149,0,56.5,75.4]]});
var treasure_side_instance_1_p = treasure_side_instance_1.prototype = new createjs.Sprite();
treasure_side_instance_1_p.Sprite_initialize = treasure_side_instance_1_p.initialize;
treasure_side_instance_1_p.initialize = function() {
	this.Sprite_initialize(treasure_side_instance_1._SpriteSheet);
	this.paused = false;
}
window.treasure_side_instance_1 = treasure_side_instance_1;
treasure_top_instance_1 = function() {
	this.initialize();
}
treasure_top_instance_1._SpriteSheet = new createjs.SpriteSheet({images: ["treasure.png"], frames: [[0,149,116,97,0,57.25,47.75],[116,149,111,94,0,55.25,44.75],[227,149,111,94,0,55.25,44.75]]});
var treasure_top_instance_1_p = treasure_top_instance_1.prototype = new createjs.Sprite();
treasure_top_instance_1_p.Sprite_initialize = treasure_top_instance_1_p.initialize;
treasure_top_instance_1_p.initialize = function() {
	this.Sprite_initialize(treasure_top_instance_1._SpriteSheet);
	this.paused = false;
}
window.treasure_top_instance_1 = treasure_top_instance_1;
}(window));

