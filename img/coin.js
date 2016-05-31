(function(window) {
coin = function() {
	this.initialize();
}
coin._SpriteSheet = new createjs.SpriteSheet({images: ["coin.png"], frames: [[4,4,20,22,0,14,46.25],[28,4,16,23,0,12,47.25],[48,4,10,23,0,9,47.25],[62,4,17,22,0,13,46.25],[83,4,23,18,0,16,44.25]]});
var coin_p = coin.prototype = new createjs.Sprite();
coin_p.Sprite_initialize = coin_p.initialize;
coin_p.initialize = function() {
	this.Sprite_initialize(coin._SpriteSheet);
	this.paused = false;
}
window.coin = coin;
}(window));

