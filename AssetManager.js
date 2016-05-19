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
            { id: "bg-1", src: "img/background-image1.png" },
            { id: "bg-2", src: "img/background-image2.png" },
            { id: "chests", src: "img/chests.png" },
            { id: "text", src: "img/text.png" },
            { id: "player", src: "img/player.png" },
            { id: "selector", src: "img/selector.png" },
            { id: "win", src: "sounds/win.wav" },
            { id: "sword", src: "sounds/sword.wav" },
            { id: "sword-low", src: "sounds/sword-low.wav" },
            { id: "chest-open", src: "sounds/chest-open.wav" },
            { id: "bail", src: "sounds/words/bail.wav" },
            { id: "bar", src: "sounds/words/bar.wav" },
            { id: "beer", src: "sounds/words/beer.wav" },
            { id: "beg", src: "sounds/words/beg.wav" },
            { id: "bill", src: "sounds/words/bill.wav" },
            { id: "book", src: "sounds/words/book.wav" },
            { id: "book2", src: "sounds/words/book2.wav" },
            { id: "boy", src: "sounds/words/boy.wav" },
            { id: "boy2", src: "sounds/words/boy2.wav" },
            { id: "cage", src: "sounds/words/cage.wav" },
            { id: "can", src: "sounds/words/can.wav" },
            { id: "car", src: "sounds/words/car.wav" },
            { id: "coat", src: "sounds/words/coat.wav" },
            { id: "cook", src: "sounds/words/cook.wav" },
            { id: "cook2", src: "sounds/words/cook2.wav" },
            { id: "curl", src: "sounds/words/curl.wav" },
            { id: "curl2", src: "sounds/words/curl2.wav" },
            { id: "dear", src: "sounds/words/dear.wav" },
            { id: "dig", src: "sounds/words/dig.wav" },
            { id: "girl", src: "sounds/words/girl.wav" },
            { id: "goat", src: "sounds/words/goat.wav" },
            { id: "hook", src: "sounds/words/hook.wav" },
            { id: "hurl", src: "sounds/words/hurl.wav" },
            { id: "joy", src: "sounds/words/joy.wav" },
            { id: "keg", src: "sounds/words/keg.wav" },
            { id: "keg2", src: "sounds/words/keg2.wav" },
            { id: "kit", src: "sounds/words/kit.wav" },
            { id: "leg", src: "sounds/words/leg.wav" },
            { id: "look", src: "sounds/words/look.wav" },
            { id: "mail", src: "sounds/words/mail.wav" },
            { id: "page", src: "sounds/words/page.wav" },
            { id: "pail", src: "sounds/words/pail.wav" },
            { id: "pail2", src: "sounds/words/pail2.wav" },
            { id: "pan", src: "sounds/words/pan.wav" },
            { id: "pearl", src: "sounds/words/pearl.wav" },
            { id: "pearl2", src: "sounds/words/pearl2.wav" },
            { id: "peg", src: "sounds/words/peg.wav" },
            { id: "peg2", src: "sounds/words/peg2.wav" },
            { id: "pen", src: "sounds/words/pen.wav" },
            { id: "pier", src: "sounds/words/pier.wav" },
            { id: "pig", src: "sounds/words/pig.wav" },
            { id: "pill", src: "sounds/words/pill.wav" },
            { id: "pit", src: "sounds/words/pit.wav" },
            { id: "rail", src: "sounds/words/rail.wav" },
            { id: "sail", src: "sounds/words/sail.wav" },
            { id: "tail", src: "sounds/words/tail.wav" },
            { id: "tail2", src: "sounds/words/tail2.wav" },
            { id: "tear", src: "sounds/words/tear.wav" },
            { id: "ten", src: "sounds/words/ten.wav" },
            { id: "took", src: "sounds/words/took.wav" },
            { id: "toy", src: "sounds/words/toy.wav" },
            { id: "toy2", src: "sounds/words/toy2.wav" }
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
