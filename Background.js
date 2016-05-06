(function (window) {
    var bg = createjs.extend(Background, createjs.Container);
	function Background() {
		this.Container_constructor();
        this.addChild(this.sprite);
	}

    //Public Properties
    Background.manifest = [{src: "background-image1.png", id: "bg1"},{src: "background-image2.png", id: "bg2"}];
    Background.loader = new createjs.LoadQueue(false);
    Background.loader.addEventListener("complete", handleComplete);
    Background.loader.loadManifest(Background.manifest, true, "img/");

    function handleComplete() {
        bg.spriteSheet = new createjs.SpriteSheet({
            framerate: 1,
            images: [Background.loader.getResult("bg2")],
            frames: {"width": 1280, "height": 720, "count": 1},
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                frame1: [0],
                frame2: [1]
            }
        });
        bg.sprite = new createjs.Sprite(bg.spriteSheet,"frame1");
        bg.sprite.x = -(bg.sprite.getBounds().width/2);
        bg.sprite.y = -(bg.sprite.getBounds().height/2);
    }
    //update
	bg.tick = function (event) { }
    bg.jump = function() { }

	window.Background = createjs.promote(Background, "Container");
}(window));
