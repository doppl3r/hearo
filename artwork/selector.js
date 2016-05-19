(function(window) {
selector = function() {
	this.initialize();
}
selector._SpriteSheet = new createjs.SpriteSheet({images: ["selector.png"], frames: [[4,4,53,53,0,26.7,26.15],[4,61,38,37,0,19.7,18.15],[46,61,11,9,0,5.699999999999999,4.149999999999999],[4,102,0,0,0,0.6999999999999993,0.14999999999999858]]});
var selector_p = selector.prototype = new createjs.Sprite();
selector_p.Sprite_initialize = selector_p.initialize;
selector_p.initialize = function() {
	this.Sprite_initialize(selector._SpriteSheet);
	this.paused = false;
}
window.selector = selector;
}(window));

