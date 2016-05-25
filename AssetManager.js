(function (window) {

	//constructor
	function AssetManager(canvas) {
		this.Container_constructor();
		this.centerX = canvas.width / 2;
		//logo.x = this.centerX - (logo.getBounds().width / 2);
        logo.x = 300;
        logo.y = 100;
	}

	//instance of class
	var logo = new createjs.Bitmap("img/neurocoach-logo.png");
	var container = createjs.extend(AssetManager, createjs.Container);

	container.init = function(){
	    //preload content
	    this.addChild(logo)
        //load game assets
        this.preload = new createjs.LoadQueue(true);
        this.preload.installPlugin(createjs.Sound);
        this.preload.loadManifest({ id: "manifest", src:"manifest.json" });
        this.preload.loadManifest({ id: "words", src:"words.json" });

        //draw background of progress bar
        this.bar1 = new createjs.Shape();
        this.bar1.width = 400;
        this.bar1.height = 48;
        this.bar1.graphics.beginFill("#d9d9d9").drawRect(
            this.centerX-(this.bar1.width/2), 600-(this.bar1.height/2),
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
        this.messageField.x = this.centerX;
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
            this.centerX-(this.bar2.width/2), 600-(this.bar2.height/2),
            (this.preload.progress * this.bar2.width | 0), this.bar2.height);
    }

	window.AssetManager = createjs.promote(AssetManager, "Container");
}(window));
