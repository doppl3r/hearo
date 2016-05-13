(function (window) {

	//constructor
	function Background() {
		this.Container_constructor();
        this.addChild(this.sprite);
	}

	//instance of class
	var container = createjs.extend(Background, createjs.Container);

    //Public Properties
    this.manifest = [{src: "background-image1.png", id: "bg1"},{src: "background-image2.png", id: "bg2"}];
    container.loader = new createjs.LoadQueue(false);
    container.loader.addEventListener("complete", handleComplete);
    container.loader.loadManifest(this.manifest, true, "img/");

    function handleComplete() {
        container.spriteSheet = new createjs.SpriteSheet({
            framerate: 1,
            images: [container.loader.getResult("bg2")],
            frames: {"width": 1280, "height": 720, "count": 1},
            // define two animations, run (loops, 1.5x speed) and jump (returns to run):
            animations: {
                frame1: [0],
                frame2: [1]
            }
        });
        container.sprite = new createjs.Sprite(container.spriteSheet,"frame1");
        container.sprite.x = -(container.sprite.getBounds().width/2);
        container.sprite.y = -(container.sprite.getBounds().height/2);
    }
    //update
	container.tick = function (event) { }

	window.Background = createjs.promote(Background, "Container");
}(window));
