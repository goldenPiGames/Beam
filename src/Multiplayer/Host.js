class HostSettingsScreen extends Screen {
	constructor() {
		super();
		initFirebase();
		hideTextInput();
		this.unsubscribe = firebase.auth().onAuthStateChanged(user => this.signedIn(user));
		firebase.auth().signInAnonymously();
		//this.code = "TEST";
		//this.key = this.gameRef.key;
		this.modeButtons = new RadioButtons(10, 110, 200, 30, INFINITE_MODES.map(mod=>lg(mod.lName)), dex=>this.modeClicked(dex));
		this.beginButton = new BubbleButton(WIDTH-50, HEIGHT-50, 45, ()=>this.tryPlay(), bubbleDrawIPlay);
		this.goalSelector = new NumberSelector(10, HEIGHT/2+50, 180, 120, 1, 99, 5, 10);
		this.returnButton = new BubbleButton(50, HEIGHT-50, 45, ()=>popupConfirm(()=>this.exit(), lg("MultiplayerHostStart-ExitAsk")), bubbleDrawIReturn);
		this.fullscreenButton = new BubbleButton(50, 50, 45, ()=>attemptFullscreen(), bubbleDrawIFullscreen);
		this.copyButton = new Button(WIDTH-200, 55, 100, 40, lg("MultiplayerHost-Copy"), ()=>this.copyToClipboard());
		this.objects = [
			this.returnButton,
			this.modeButtons,
			this.fullscreenButton,
			this.beginButton,
			this.goalSelector,
		];
		textInput.value = this.key;
		this.namesList = [];
	}
	update() {
		if (this.user) {
			if (textInput.value != this.user.uid)
				textInput.value = this.user.uid;
			this.copyButton.update();
		}
		this.objects.forEach(oj=>oj.update());
	}
	draw() {
		this.objects.forEach(oj=>oj.draw());
		if (this.user) {
			ctx.fillStyle = palette.normal;
			var yStart = 100;
			var yIncrement = 30;
			var maxNames = Math.floor((HEIGHT-200) / yIncrement);
			var namesDraw = this.namesList.slice(-maxNames);
			//console.log(yStart, yIncrement, maxNames, namesDraw)
			for (var i = 0; i < namesDraw.length; i++) {
				//console.log(namesDraw[i], WIDTH/2, yStart+yIncrement*i, WIDTH/2, yIncrement);
				drawTextInRect(namesDraw[i], WIDTH/2, yStart+yIncrement*i, WIDTH/2, yIncrement);
			}
			this.copyButton.draw();
		} else {
			drawTextInRect(lg("Multiplayer-Connecting"), 225, 10, WIDTH-250, 40);
		}
	}
	tryPlay() {
		var laps = this.goalSelector.getNumber();
		if (this.modeButtons.index >= 0 && laps > 0) {
			levelIterator = new InfiniteIterator(INFINITE_MODES[this.modeButtons.index]);
			var levels = [];
			var prev = null;
			for (var i = 0; i < laps; i++) {
				prev = levelIterator.nextLevel(prev);
				levels.push(prev.json);
			}
			this.gameRef.child("levels").set(levels);
			this.gameRef.child("begun").set(true);
			this.gameRef.child("players").off("child_added", this.callbackOn);
			hideTextInput();
			runnee = new HostScoreboard(this.gameRef, levels);
		}
	}
	exit() {
		this.unsubscribe();
		this.gameRef.child("players").off("child_added", this.callbackOn);
		hideTextInput();
		firebase.auth().signOut();
		this.gameRef.remove();
		switchScreen(new MultiplayerMenu())
	}
	modeClicked(dex) {
		
	}
	signedIn(user) {
		if (user) {
			this.user = user;
			this.finishSignIn();
		} else {
		
		}
	}
	finishSignIn() {
		var allRef = firebase.database().ref("hostgamesa");
		this.gameRef = allRef.child(this.user.uid);
		this.gameRef.set({begun:false, players:[]});
		//this.gameRef.child("begun").set(false);
		//this.gameRef.child("players").set([]);
		setTextInput(100, 5, WIDTH-200, 40, this.user.uid);
		this.callbackOn = this.gameRef.child("players").on("child_added", snap=>this.handlePlayer(snap));
	}
	copyToClipboard() {
		copyToClipboard(this.user.uid);
	}
	handlePlayer(snap) {
		var val = snap.val();
		console.log(val);
		this.namesList.push(val.name);
	}
}

class HostScoreboard extends Screen {
	constructor(gameRef, levels) {
		super();
		this.gameRef = gameRef;
		this.callbackOnV = this.gameRef.child("players").on("value", snap=>this.handleVal(snap));
		this.callbackOnC = this.gameRef.child("players").on("child_changed", snap=>this.handleProg(snap));
		this.levels = levels;
		this.exitButton = new BubbleButton(WIDTH-50, 50, 45, ()=>popupConfirm(()=>this.exit(), lg("MultiplayerHost-ExitAsk")), bubbleDrawIReturn);
		this.objects = [
			this.exitButton,
		]
	}
	update() {
		var val = this.currVal;
		if (val && this.needUpdatePlaces) {
			this.needUpdatePlaces = false;
			this.ranking = [];
			for (var key in val) {
				val[key].key = key;
				this.ranking.push(val[key]);
			}
			this.progressDist = new Array(this.levels.length+1).fill(0);
			this.ranking.forEach(a=>{if (a.progress >= 0) this.progressDist[a.progress]++});
			this.ranking.sort((a,b)=> b.progress-a.progress || a.lastprogH-b.lastprogH || a.lastprogP-b.lastprogP); //Sorts by progress, host-side time, and player-side time, in that order
			this.ranking.forEach((p, dex)=> this.gameRef.child("players").child(p.key).update({
					place : dex+1,
				}));
		}
		this.objects.forEach(oj=>oj.update());
		//console.log(this.ranking);
	}
	draw() {
		ctx.fillStyle = palette.normal
		if (this.ranking) {
			var yStart = 10;
			var yIncrement = 30;
			var maxNames = Math.floor((HEIGHT-170) / yIncrement);
			//console.log(yStart, yIncrement, maxNames, this.ranking);
			ctx.font = yIncrement+"px "+settings.font;
			ctx.textBaseline = "top";
			ctx.textAlign = "left";
			for (var i = 0; i < maxNames && i < this.ranking.length; i++) {
				let y = yStart+yIncrement*i;
				let peep = this.ranking[i];
				ctx.fillText(i+1, 5, y);
				ctx.fillText(peep.progress, 100, y);
				ctx.fillText(peep.name, 200, y);
			}
		}
		if (this.progressDist) {
			var xIncrement = WIDTH/(this.progressDist.length);
			var max = Math.max(...this.progressDist, 1);
			ctx.fillStyle = palette.normal;
			for (var i = 0; i < this.progressDist.length; i++) {
				let barHeight = this.progressDist[i] / max * 150;
				ctx.fillRect(xIncrement*i, HEIGHT-barHeight, xIncrement, barHeight);
			}
		}
		this.objects.forEach(oj=>oj.draw());
	}
	handleVal(snap) {//TODO why do i have two listeners
		var val = snap.val();
		if (val)
			this.currVal = val;
	}
	handleProg(snap) {
		var val = snap.val();
		if (!val || !val.lastbumpP)
			return false;
		snap.ref.update({
				lastprogH : Date.now(),
				lastbumpP : false,
			});
		this.needUpdatePlaces = true;
	}
	/*tryReplay() { i have no idea what this was supposed to do
		this.callbackOnV = this.gameRef.child("players").on("value", snap=>this.handleVal(snap));
		this.callbackOnC = this.gameRef.child("players").on("child_changed", snap=>this.handleProg(snap));
		this.gameRef.child("players").off("value", this.callbackOnV);
		this.gameRef.child("players").on("child_changed", this.callbackOnC);
		
	}*/
	exit() {
		this.gameRef.child("players").off("value", this.callbackOnV);
		this.gameRef.child("players").off("child_changed", this.callbackOnC);
		this.gameRef.remove();
		firebase.auth().signOut();//if reusing codes, don't do this
		switchScreen(new MultiplayerMenu());
	}
}