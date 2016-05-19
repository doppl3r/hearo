(function(window) {
character = function() {
	this.initialize();
}
character._SpriteSheet = new createjs.SpriteSheet({images: ["treasure-checker.png"], frames: [[4,4,167,253,0,83.4,126.65],[175,4,168,252,0,78.4,125.65],[347,4,168,245,0,75.4,117.65],[519,4,183,315,0,73.4,187.65],[706,4,155,317,0,64.4,185.65],[4,325,258,233,0,45.400000000000006,93.65],[266,325,206,251,0,65.4,128.65],[476,325,142,287,0,32.400000000000006,164.65],[622,325,157,272,0,24.400000000000006,147.65]]});
var character_p = character.prototype = new createjs.Sprite();
character_p.Sprite_initialize = character_p.initialize;
character_p.initialize = function() {
	this.Sprite_initialize(character._SpriteSheet);
	this.paused = false;
}
window.character = character;
}(window));

