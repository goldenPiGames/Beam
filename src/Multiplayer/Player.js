class JoinMultiplayerScreen extends Screen {
	constructor() {
		super();
		initFirebase();
		setTextInput(10, 110, WIDTH-20, 80, "Key");
		this.returnButton = new BubbleButton(50, HEIGHT-50, 45, ()=>{hideTextInput();switchScreen(new MultiplayerMenu())}, bubbleDrawIReturn);
		this.beginButton = new BubbleButton(WIDTH-50, HEIGHT-50, 45, ()=>this.tryPlay(), bubbleDrawIPlay);
		this.fullscreenButton = new BubbleButton(50, 50, 45, ()=>attemptFullscreen(), bubbleDrawIFullscreen);
		this.objects = [
			this.returnButton,
			this.beginButton,
			this.fullscreenButton,
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
			ctx.fillStyle = palette.normal;
			drawTextInRect(text, 0, 200, WIDTH, 60);
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
JoinMultiplayerScreen.prototype.overrideTouch = false;

class JoinWaitingScreen extends Screen {
	constructor(gameRef) {
		super();
		this.gameRef = gameRef;
		this.playRef = this.gameRef.child("players").push({
				name:settings.name,progress:-1,
				lastprogP:Date.now()
			});
		this.key = this.playRef.key;
		this.callbackOn = this.gameRef.child("begun").on("value", snap=>this.handleBegin(snap));
		this.objects = [
			new BubbleButton(50, 50, 45, ()=>attemptFullscreen(), bubbleDrawIFullscreen),
		];
	}
	update() {
		this.objects.forEach(oj=>oj.update());
	}
	draw() {
		this.objects.forEach(oj=>oj.draw());
		ctx.fillStyle = settings.normal_color;
		drawTextInRect(lg("MultiplayerJoin-Joined"), 10, 120, WIDTH-20, 60);
		drawParagraphInRect(lg("MultiplayerJoin-JoinedPara"), 10, 220, WIDTH-20, 60, 24);
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
JoinWaitingScreen.prototype.overrideTouch = false;

class MultiplayerGuestIterator extends LevelIterator {
	constructor(val, gameRef, playRef) {
		super();
		this.levelData = val;
		console.log(this.levelData);
		this.gameRef = gameRef;
		this.playRef = playRef;
		this.name = name;
		this.index = -1;
		this.callbackOn = this.playRef.on("value", snap=>this.handlePlace(snap));
	}
	nextLevel(prev) {
		this.index++;
		this.placeDrawBuffer = true;
		this.playRef.update({
				progress : this.index,
				lastprogP : Date.now(),
				lastbumpP : true,
			});
		if (this.index < this.levelData.length) {
			return levelFromJSON(this.levelData[this.index]);
		} else {
			this.finished = true;
			return new MultiplayerGuestEndScreen(directionOpposite(prev.beamExitSide), this);
		}
	}
	redoLevel() {
		return levelFromJSON(this.levelData[this.index]);
	}
	drawBack(wrap) {
		if (!this.finished) {
			this.drawBackText(this.index);
		}
		if (this.placeDrawBuffer) {
			this.placeDrawBuffer = false;
		} else if (this.place) {
			ctx.globalAlpha = 1;
			drawTextInRect(this.place, WIDTH/4, 5, WIDTH/2, 35);
		}
	}
	handlePlace(snap) {
		var val = snap.val();
		console.log(val);
		if (val && !val.lastBumpP)
			this.place = val.place;
	}
	exit() {
		this.playRef.off("value", this.callbackOn);
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
