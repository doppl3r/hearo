(function (window) {

    //constructor
	function LevelManager() {
		this.currentLevel = this.startLevel = 20;
        this.correctWords = 2;
		this.wordCount = 4;
        this.incorrectWordCount = 1;
		this.delay = -1; //milliseconds
	}

	LevelManager.prototype.tick = function () {
	    if (this.delay >= 0){
	        this.delay-=1;
	        if (this.delay == 0) {
                this.nextLevel();
                window.Game.setStage();
	        }
	    }
	}
    LevelManager.prototype.setXY = function(x,y) { this.x = x; this.y = y; }
    LevelManager.prototype.nextLevel = function(){ this.currentLevel-=1; }
    LevelManager.prototype.createLevel = function(){
        //remove extra chests
        window.Game.chestManager.removeAllChests();
        
        //show remaining trials
        window.Game.interface.setText("trials: "+this.currentLevel);

        //construct random words
        var words = [];
        var tempWordList = getWordList();
        var ear = getRandomInt(-1,1,true); //pick left or right ear (-1 or 1)
        var cellGroup = tempWordList[getRandomInt()].cell; //pick random cell group

        //create new list by group
        var groupList = [];
        for (var i=0; i<tempWordList.length; i++){
            if (tempWordList[i].cell == cellGroup){
                groupList.push(tempWordList[i]);
            }
        }

        //remove words that are incorrect

        var incorrectList = groupList.slice(0);
        incorrectList = incorrectList.slice(this.wordCount-this.correctWords);
        groupList = groupList.slice(0, this.correctWords);

        console.log(incorrectList);
        console.log(groupList);

        //add wrong words
        var incorrectWordCount = this.incorrectWordCount;
        while (groupList.length < this.wordCount){
            var randWord;
            randWord = getRandomWord(tempWordList);
            //scan list for existing words
            for (var i=0; i<groupList.length; i++){
                //add wrong word if id does not match current list
                if (randWord.id != groupList[i].id){
                    if (randWord.cell != cellGroup){
                        incorrectWordCount--;
                        groupList.push(randWord);
                        break; //break for-loop
                    }
                }
            }
        }

        //set new list properties
        for (var i=0; i < groupList.length; i++){
            var correct = i < (this.correctWords);
            words.push([groupList[i].id, ear, correct]);
            ear *= -1; //switch ear
        }

        //words[0][0] = first random word string
        //words[0][1] = first current ear (-1 or 1);
        //words[0][2] = first correct/incorrect

        words = shuffleArray(words); //mix up the array

        //play words that are correct
        for (var i=0; i < words.length; i++){
            if (words[i][2]){ //if correct
                createjs.Sound.play(words[i][0], {pan: words[i][1]});
            }
        }

        if (this.wordCount == 4){ //four-word layout
            window.Game.chestManager.addChest(640,100,1,1,"topClosed");
            window.Game.chestManager.getLastChest(0).updateChest(words[0][0],words[0][2]);
            window.Game.chestManager.addChest(1100,360,-1,1,"sideClosed");
            window.Game.chestManager.getLastChest(0).updateChest(words[1][0],words[1][2]);
            window.Game.chestManager.addChest(640,620,1,1,"bottomClosed");
            window.Game.chestManager.getLastChest(0).updateChest(words[2][0],words[2][2]);
            window.Game.chestManager.addChest(180,360,1,1,"sideClosed");
            window.Game.chestManager.getLastChest(0).updateChest(words[3][0],words[3][2]);
        }
    }
    LevelManager.prototype.setDelay = function(delay){ this.delay = delay; }
    function getRandomWord(tempList){
        var tempWord = tempList[getRandomInt(0,tempList.length)];
        return tempWord;
    }
    function getRandomInt(min, max, noZero) {
        if (typeof min === 'undefined' || typeof max === 'undefined') {
            min = 0;
            max = getWordList().length-1;
        }
        var rand;
        do { rand = Math.floor(Math.random() * (max - min + 1)) + min; }
        while (noZero && rand == 0); //if noZero = true, get new random number
        return rand;
    }
    function getWordList(){
        return window.Game.assetManager.preload._loadedResults.words.manifest;
    }

    //http://stackoverflow.com/a/12646864/2510368
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

	window.LevelManager = new LevelManager();
}(window));
