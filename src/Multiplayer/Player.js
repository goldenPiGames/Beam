class JoinMultiplayerScreen extends Screen {
	constructor() {
		super();
		initFirebase();
		setTextInput(10, 10, WIDTH-20, 80, "Key");
		this.returnButton = new BubbleButton(50, HEIGHT-50, 45, ()=>{hideTextInput();switchScreen(new MultiplayerMenu())}, bubbleDrawIReturn);
		this.beginButton = new BubbleButton(WIDTH-50, HEIGHT-50, 45, ()=>this.tryPlay(), bubbleDrawIPlay);
		this.objects = [
			this.returnButton,
			this.beginButton,
		];
	}
	update() {
		this.objects.forEach(oj=>oj.update());
	}
	draw() {
		this.objects.forEach(oj=>oj.draw());
		var text;
		if (this.waiting) {
			text = lg("MultiplayerJoin-Waiting");
		} else if (this.notFound) {
			text = lg("MultiplayerJoin-NotFound");
		}
		if (text) {
			ctx.fillStyle = settings.normal_color;
			drawTextInRect(text, 10, 100, WIDTH-20, 60);
		}
	}
	tryPlay() {
		if (!this.waiting && textInput.value) {
			this.waiting = true;
			this.gameRef = firebase.database().ref("hostgames").child(textInput.value);
			this.gameRef.once("value", snap=>this.handleReturn(snap));
		}
	}
	handleReturn(snap) {
		var val = snap.val();
		console.log(val);
		if (val) {
			hideTextInput();
			runnee = new JoinWaitingScreen(this.gameRef);
		} else {
			this.notFound = true;
		}
		this.waiting = false;
	}
}

class JoinWaitingScreen extends Screen {
	constructor(gameRef) {
		super();
		this.gameRef = gameRef;
		this.playRef = this.gameRef.child("players").push({name:settings.name,progress:-1,lastprog:Date.now()});
		this.key = this.playRef.key;
		this.callbackOn = this.gameRef.child("begun").on("value", snap=>this.handleBegin(snap));
		this.objects = [
			
		];
	}
	update() {
		this.objects.forEach(oj=>oj.update());
	}
	draw() {
		this.objects.forEach(oj=>oj.draw());
		ctx.fillStyle = settings.normal_color;
		drawTextInRect(lg("MultiplayerJoin-Joined"), 10, 20, WIDTH-20, 60);
	}
	handleBegin(snap) {
		var val = snap.val();
		console.log(val);
		if (val) {
			this.gameRef.child("begun").off("value", this.callbackOn);
			this.gameRef.child("levels").once("value", snap=>this.trulyBegin(snap));
		}
	}
	trulyBegin(snap) {
		var val = snap.val();
		console.log(val);
		levelIterator = new MultiplayerGuestIterator(val, this.gameRef, this.playRef);
		startLevel();
	}
}

class MultiplayerGuestIterator extends LevelIterator {
	constructor(val, gameRef, playRef) {
		super();
		this.levelData = val;
		console.log(this.levelData);
		this.gameRef = gameRef;
		this.playRef = playRef;
		this.name = name;
		this.index = -1;
	}
	nextLevel(prev) { 
		this.index++;
		this.playRef.set({name:settings.name, progress:this.index, lastprog:Date.now()});
		if (this.index < this.levelData.length) {
			return levelFromJSON(this.levelData[this.index]);
		} else {
			this.finished = true;
			return new MultiplayerGuestEndScreen(directionOpposite(prev.beamExitSide), this);
		}
	}
	drawBack(wrap) {
		if (!this.finished) {
			this.drawBackText(this.levelData.length - this.index);
		}
	}
}

class MultiplayerGuestEndScreen extends Level {
	constructor(enter, iter) {
		super();
		this.beamEntranceSide = enter;
		this.beamEntrancePosition = (enter%2 ? HEIGHT : WIDTH) / 2;
		this.gameRef = iter.gameRef;
		this.playRef = iter.playRef;
	}
	update() {
		
	}
	draw() {
		ctx.fillStyle = palette.normal;
		drawTextInRect(lg("MultiplayerGuestEnd-Header"), 80, 0, WIDTH-160, HEIGHT/3);
		drawTextInRect(settings.name, 0, HEIGHT/2-15, WIDTH, 30);
		drawParagraphInRect(lg("MultiplayerGuestEnd-Paragraph"), 0, HEIGHT*2/3, WIDTH, HEIGHT/3, 30);
	}
}
