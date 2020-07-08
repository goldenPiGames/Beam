class JoinMultiplayerScreen extends Screen {
	constructor() {
		super();
		initFirebase();
		firebase.auth().onAuthStateChanged(user => this.signedIn(user));
		firebase.auth().signInAnonymously();
		setTextInput(0, 10, 110, WIDTH-20, 40, lg("MultiplayerJoin-InputKey"));
		setTextInput(1, 290, HEIGHT/2+COLOR_PICKER_TEXT_HEIGHT+5, WIDTH-300, 40, lg("MultiplayerJoin-InputName"));
		textInput1.value = settings.name;
		this.returnButton = new BubbleButton(50, HEIGHT-50, 45, ()=>{hideInputs();switchScreen(new MultiplayerMenu())}, bubbleDrawIReturn);
		this.beginButton = new BubbleButton(WIDTH-50, HEIGHT-50, 45, ()=>this.tryPlay(), bubbleDrawIPlay);
		this.fullscreenButton = new BubbleButton(50, 50, 45, ()=>attemptFullscreen(), bubbleDrawIFullscreen);
		this.colorPicker = new ColorPicker(10, HEIGHT/2, lg("MultiplayerJoin-SetColor"), val=>changeSingleColor("player", val), palette.player);
		this.objects = [
			this.returnButton,
			this.beginButton,
			//this.fullscreenButton,
			this.colorPicker,
		];
		if (FULLSCREEN_BUTTONS)
			this.objects.push(this.fullscreenButton);
	}
	update() {
		if (textInput1.value != settings.name) {
			settings.name = textInput1.value;
			saveSettings();
		}
		this.objects.forEach(oj=>oj.update());
		if (this.foundHost && this.user) {
			hideInputs();
			recommendSilence();
			runnee = new JoinWaitingScreen(this.gameRef, this.user);
		}
	}
	draw() {
		this.objects.forEach(oj=>oj.draw());
		ctx.fillStyle = palette.normal;
		drawTextInRect(lg("MultiplayerJoin-SetName"), 290, HEIGHT/2, WIDTH-300, COLOR_PICKER_TEXT_HEIGHT);
		var text;
		if (this.waiting) {
			text = lg("MultiplayerJoin-Waiting");
		} else if (this.notFound) {
			text = lg("MultiplayerJoin-NotFound");
		}
		if (text) {
			ctx.fillStyle = palette.normal;
			drawTextInRect(text, 0, 160, WIDTH, 60);
		}
	}
	tryPlay() {
		if (!this.waiting && textInput0.value) {
			this.waiting = true;
			this.gameRef = firebase.database().ref("hostgamesa").child(textInput0.value);
			this.gameRef.once("value", snap=>this.handleReturn(snap));
		}
	}
	signedIn(user) {
		if (user) {
			this.user = user;
		} else {
		
		}
	}
	handleReturn(snap) {
		var val = snap.val();
		//console.log(val);
		if (val) {
			this.foundHost = true;
			hideTextInput();
		} else {
			this.notFound = true;
		}
		this.waiting = false;
	}
}
JoinMultiplayerScreen.prototype.overrideTouch = false;

class JoinWaitingScreen extends Screen {
	constructor(gameRef, user) {
		super();
		this.gameRef = gameRef;
		this.user = user;
		this.playRef = this.gameRef.child("players").child(this.user.uid);
		this.playRef.set({
				name:settings.name,
				color:palette.player,
				progress:-1,
				lastprogP:Date.now()
			});
		this.key = this.playRef.key;
		this.callbackOn = this.gameRef.child("begun").on("value", snap=>this.handleBegin(snap));
		//setTextInput(0, WIDTH/2-150, 350, 200, 40, "Name");
		this.objects = [
			new BubbleButton(50, 50, 45, ()=>attemptFullscreen(), bubbleDrawIFullscreen),
			new BubbleButton(50, HEIGHT-50, 45, ()=>this.exit(), bubbleDrawIReturn),
			//new Button(WIDTH/2+60, 350, 90, 40, lg("MultiplayerJoin-NameChange"), ()=>this.changeName()),
		];
	}
	update() {
		this.objects.forEach(oj=>oj.update());
	}
	draw() {
		this.objects.forEach(oj=>oj.draw());
		ctx.fillStyle = settings.normal_color;
		drawTextInRect(lg("MultiplayerJoin-Joined"), 10, 120, WIDTH-20, 60);
		drawParagraphInRect(lg("MultiplayerJoin-JoinedPara"), 10, 200, WIDTH-20, 60, 24);
		drawTextInRect(lg("MultiplayerJoin-Name", {"name":settings.name}), 10, 305, WIDTH-20, 34);
	}
	handleBegin(snap) {
		var val = snap.val();
		//console.log(val);
		if (val) {
			this.gameRef.child("begun").off("value", this.callbackOn);
			this.gameRef.child("levels").once("value", snap=>this.trulyBegin(snap));
		}
	}
	trulyBegin(snap) {
		var val = snap.val();
		//console.log(val);
		levelIterator = new MultiplayerGuestIterator(val, this.gameRef, this.playRef);
		hideTextInput();
		startLevel();
	}
	changeName() {
		settings.name = textInput0.value;
		this.playRef.update({"name":settings.name});
	}
	exit() {
		this.playRef.remove();
		runnee = new MultiplayerMenu();
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
		scintBeam();
		if (!this.finished) {
			this.drawBackText(this.index);
		} else {
			wrap.level.place = this.place;
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
		//this.playRef.remove();
		runnee = new MultiplayerMenu();
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
		//scintBeam();
		ctx.fillStyle = palette.normal;
		drawTextInRect(lg("MultiplayerGuestEnd-Header"), 80, 0, WIDTH-160, HEIGHT/3);
		if (this.placeDrawBuffer) {
			this.placeDrawBuffer = false;
		} else if (this.place) {
			drawTextInRect(lg("MultiplayerGuestEnd-Place", {"place":this.place}), 80, HEIGHT/3, WIDTH-160, HEIGHT/3);
		}
		drawTextInRect(settings.name, 0, HEIGHT*2/3+15, WIDTH, 30);
		//drawParagraphInRect(lg("MultiplayerGuestEnd-Paragraph"), 0, HEIGHT*2/3, WIDTH, HEIGHT/3, 30);
	}
}
