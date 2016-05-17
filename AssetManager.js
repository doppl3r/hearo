(function (window) {

	//constructor
	function AssetManager() {
		this.Container_constructor();
		logo.x = (canvas.width / 2) - (logo.getBounds().width / 2);
        logo.y = 100;
	}

	//instance of class
	var container = createjs.extend(AssetManager, createjs.Container);
	var logo = new createjs.Bitmap("img/neurocoach-logo.png");

	container.init = function(){
	    //preload content
	    this.addChild(logo)

	    //game content
	    this.manifest = [
            { id: "begin", src: "sounds/spawn.ogg" },
            { id: "break", src: "sounds/break.ogg" },
            { id: "death", src: "sounds/death.ogg" },
            { id: "laser", src: "sounds/shot.ogg" },
            { id: "music", src: "sounds/music.ogg" },
            { id: "bg-1", src: "img/background-image1.png" },
            { id: "bg-2", src: "img/background-image2.png" },
            { id: "chests", src: "img/chests.png" },
            { id: "text", src: "img/text.png" },
            { id: "player", src: "img/player.png" }
        ];

        //load game assets
        this.preload = new createjs.LoadQueue(true);
        this.preload.installPlugin(createjs.Sound);
        this.preload.loadManifest(this.manifest);

        //draw background of progress bar
        this.bar1 = new createjs.Shape();
        this.bar1.width = 400;
        this.bar1.height = 48;
        this.bar1.graphics.beginFill("#d9d9d9").drawRect(
            (canvas.width / 2)-(this.bar1.width/2), 600-(this.bar1.height/2),
            this.bar1.width, this.bar1.height);

        //draw progress bar
        this.bar2 = new createjs.Shape();
        this.bar2.width = this.bar1.width;
        this.bar2.height = this.bar1.height;

        //draw progress percentage in text form
        this.messageField = new createjs.Text("Loading", "bold 24px Arial", "#FFFFFF");
        this.messageField.maxWidth = 1000;
        this.messageField.textAlign = "center";
        this.messageField.textBaseline = "middle";
        this.messageField.x = canvas.width / 2;
        this.messageField.y = 600;

        //add to containger -> stage
        this.addChild(this.bar1);
        this.addChild(this.bar2);
        this.addChild(this.messageField);
	}

    //update
	container.updateLoading = function() {
        this.messageField.text = "Loading " + (this.preload.progress * 100 | 0) + "%";
        this.bar2.graphics.beginFill("#ec7b23").drawRect(
            (canvas.width / 2)-(this.bar2.width/2), 600-(this.bar2.height/2),
            (this.preload.progress * this.bar2.width | 0), this.bar2.height);
    }

	window.AssetManager = createjs.promote(AssetManager, "Container");
}(window));
