(function(window) {
character = function() {
	this.initialize();
}
character._SpriteSheet = new createjs.SpriteSheet({images: ["player.png"], frames: [[4,4,167,253,0,83.65,126.65],[175,4,168,252,0,78.65,125.65],[347,4,168,245,0,75.65,117.65],[519,4,183,315,0,73.65,187.65],[706,4,155,317,0,64.65,185.65],[4,325,258,233,0,45.650000000000006,93.65],[266,325,171,251,0,83.65,130.65],[441,325,167,253,0,88.65,120.65]]});
var character_p = character.prototype = new createjs.Sprite();
character_p.Sprite_initialize = character_p.initialize;
character_p.initialize = function() {
	this.Sprite_initialize(character._SpriteSheet);
	this.paused = false;
}
window.character = character;
}(window));

