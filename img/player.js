(function(window) {
character = function() {
	this.initialize();
}
character._SpriteSheet = new createjs.SpriteSheet({images: ["player.png"], frames: [[4,4,166,253,0,70.2,224.95],[174,4,168,251,0,66.2,223.95],[346,4,168,245,0,63.2,215.95],[518,4,183,314,0,61.2,285.95],[705,4,155,317,0,52.2,283.95],[4,325,258,234,0,32.2,192.95],[266,325,170,250,0,70.2,228.95],[440,325,167,254,0,76.2,219.95]]});
var character_p = character.prototype = new createjs.Sprite();
character_p.Sprite_initialize = character_p.initialize;
character_p.initialize = function() {
	this.Sprite_initialize(character._SpriteSheet);
	this.paused = false;
}
window.character = character;
}(window));

