(function(window) {
coin = function() {
	this.initialize();
}
coin._SpriteSheet = new createjs.SpriteSheet({images: ["coin.png"], frames: [[4,4,18,18,0,13.55,44.9],[26,4,13,20,0,11.55,45.9],[43,4,7,20,0,7.550000000000001,45.9],[4,28,13,20,0,11.55,45.9]]});
var coin_p = coin.prototype = new createjs.Sprite();
coin_p.Sprite_initialize = coin_p.initialize;
coin_p.initialize = function() {
	this.Sprite_initialize(coin._SpriteSheet);
	this.paused = false;
}
window.coin = coin;
}(window));

