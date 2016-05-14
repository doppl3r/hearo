(function(window) {
menu_background_instance_1 = function() {
	this.initialize();
}
menu_background_instance_1._SpriteSheet = new createjs.SpriteSheet({images: ["menu-background.png"], frames: [[4,4,952,540,0,475.25,269.95]]});
var menu_background_instance_1_p = menu_background_instance_1.prototype = new createjs.Sprite();
menu_background_instance_1_p.Sprite_initialize = menu_background_instance_1_p.initialize;
menu_background_instance_1_p.initialize = function() {
	this.Sprite_initialize(menu_background_instance_1._SpriteSheet);
	this.paused = false;
}
window.menu_background_instance_1 = menu_background_instance_1;
}(window));

