(function(window) {
trials_remaining = function() {
	this.initialize();
}
trials_remaining._SpriteSheet = new createjs.SpriteSheet({images: ["trials-remaining.png"], frames: [[4,4,404,95,0,171.75,47.9]]});
var trials_remaining_p = trials_remaining.prototype = new createjs.Sprite();
trials_remaining_p.Sprite_initialize = trials_remaining_p.initialize;
trials_remaining_p.initialize = function() {
	this.Sprite_initialize(trials_remaining._SpriteSheet);
	this.paused = false;
}
window.trials_remaining = trials_remaining;
}(window));

