class HostSettingsScreen extends Screen {
	constructor() {
		super();
		initFirebase();
		hideTextInput();
		this.unsubscribe = firebase.auth().onAuthStateChanged(user => this.signedIn(user));
		firebase.auth().signInAnonymously();
		this.pWidth = WIDTH/4;
		this.tabIndex = 0;
		this.beginButton = new BubbleButton(WIDTH-50, HEIGHT-50, 45, ()=>this.tryPlay(), bubbleDrawIPlay);
		this.returnButton = new BubbleButton(50, HEIGHT-50, 45, ()=>popupConfirm(()=>this.exit(), lg("MultiplayerHostStart-ExitAsk")), bubbleDrawIReturn);
		this.fullscreenButton = new BubbleButton(50, 50, 45, ()=>attemptFullscreen(), bubbleDrawIFullscreen);
		this.copyButton = new Button(WIDTH-200, 55, 100, 40, lg("MultiplayerHost-Copy"), ()=>this.copyToClipboard());
		//this.levelTabs = new Tabs(0, 100, this.pWidth, 30, [lg("MultiplayerHost-Generate"), lg("MultiplayerHost-Load")], tab=>this.setTab(tab), ()=>this.tabIndex);
		this.loadButton = new Button(10, 100, this.pWidth-20, 30, lg("MultiplayerHost-Load"), ()=>this.openLoad()); 
		this.objects = [
			this.returnButton,
			this.fullscreenButton,
			this.beginButton,
			//this.levelTabs,
			this.loadButton,
		];
		this.modeButtons = new RadioButtons(10, 160, this.pWidth-10, 30, INFINITE_MODES.map(mod=>lg(mod.lName)), dex=>this.modeClicked(dex));
		this.goalSelector = new NumberSelector(10, HEIGHT/2+50, 180, 120, 1, 99, 5, 10);
		this.objectsGen = [
			this.modeButtons,
			this.goalSelector,
		];
		this.guestList = [];
	}
	update() {
		if (this.user) {
			if (textInput0.value != this.user.uid)
				textInput0.value = this.user.uid;
			this.copyButton.update();
		}
		if (this.mustResetTextInput) {
			setTextInput(0, 100, 5, WIDTH-200, 40, this.user.uid);
			this.mustResetTextInput = undefined;
		}
		this.objects.forEach(oj=>oj.update());
		if (this.loadedSet) {
			
		} else {
			this.objectsGen.forEach(oj=>oj.update());
		}
	}
	draw() {
		this.objects.forEach(oj=>oj.draw());
		if (this.loadedSet) {
			
		} else {
			this.objectsGen.forEach(oj=>oj.draw());
		}
		if (this.user) {
			ctx.fillStyle = palette.normal;
			var yStart = 100;
			var yIncrement = 30;
			var maxNames = Math.floor((HEIGHT-200) / yIncrement);
			var namesDraw = this.guestList.slice(-maxNames);
			//console.log(yStart, yIncrement, maxNames, namesDraw)
			ctx.font = yIncrement+"px "+settings.font;
			ctx.textBaseline = "top";
			ctx.textAlign = "left";
			namesDraw.forEach((peep, dex)=>{
				let y = yStart+yIncrement*dex;
				ctx.fillStyle = peep.color;
				ctx.fillRect(this.pWidth+10, y, 30, yIncrement);
				ctx.fillStyle = palette.normal;
				ctx.fillText(peep.name, this.pWidth+50, y);
			});
			this.copyButton.draw();
		} else {
			drawTextInRect(lg("Multiplayer-Connecting"), 225, 10, WIDTH-250, 40);
		}
	}
	setTab(dex) {
		this.tabIndex = dex;
		if (this.tabIndex == 1)
			setFileInput(0, 150, this.pWidth, 25, ".beamset");
		else
			hideFileInput();
	}
	openLoad() {
		if (this.user)
			this.mustResetTextInput = true;
		runnee = new LoadPopup(this, ".beamset", data=>this.loadLevels(data));
	}
	loadLevels(data) {
		try {
			while (typeof data == "string")
				data = JSON.parse(data);
			if (!Array.isArray(data))
				throw "not an array";
			data.forEach(d=>levelFromJSON(d));
			this.loadedSet = data;
		} catch (e) {
			qAlert(lg("MultiplayerHost-LoadError"));
			console.log(e);
		}
	}
	tryPlay() {
		var levels;
		if (this.loadedSet) {
			levels = this.loadedSet;
		} else {
			var laps = this.goalSelector.getNumber();
			if (this.modeButtons.index >= 0 && laps > 0) {
				levelIterator = new InfiniteIterator(INFINITE_MODES[this.modeButtons.index]);
				levels = [];
				var prev = null;
				for (var i = 0; i < laps; i++) {
					prev = levelIterator.nextLevel(prev);
					levels.push(prev.json);
				}
			} else {
				qAlert(lg("MultiplayerHost-NeedSet"));
				return null;
			}
		}
		this.gameRef.child("levels").set(levels);
		this.gameRef.child("begun").set(true);
		this.gameRef.child("players").off("child_added", this.callbackOn);
		hideTextInput();
		runnee = new HostScoreboard(this.gameRef, levels);
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
		this.mustResetTextInput = true;
		this.callbackOn = this.gameRef.child("players").on("child_added", snap=>this.handlePlayer(snap));
	}
	copyToClipboard() {
		copyToClipboard(this.user.uid);
	}
	handlePlayer(snap) {
		var val = snap.val();
		console.log(val);
		this.guestList.push(val);
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
			this.progressDist = new Array(this.levels.length+1).fill(0).map(()=>[]);
			this.ranking.sort((a,b)=> b.progress-a.progress || a.lastprogH-b.lastprogH || a.lastprogP-b.lastprogP); //Sorts by progress, host-side time, and player-side time, in that order
			this.ranking.forEach((p, dex)=> {
				this.gameRef.child("players").child(p.key).update({
					place : dex+1,
				});
				if (this.progressDist[p.progress])
					this.progressDist[p.progress].push(p);
			});
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
			ctx.fillStyle = palette.normal;
			for (var i = 0; i < maxNames && i < this.ranking.length; i++) {
				let y = yStart+yIncrement*i;
				let peep = this.ranking[i];
				ctx.fillText(i+1, 5, y);
				ctx.fillText(peep.progress, 50, y);
				ctx.fillStyle = peep.color;
				ctx.fillRect(100, y, 30, yIncrement);
				ctx.fillStyle = palette.normal;
				ctx.fillText(peep.name, 140, y);
			}
		}
		if (this.progressDist) {
			var widthEach = WIDTH/(this.progressDist.length);
			var max = Math.max(...this.progressDist.map(col=>col.length), 1);
			var heightEach = 150 / max;
			ctx.fillStyle = palette.normal;
			this.progressDist.forEach((col, i)=> {
				col.forEach((peep, j)=> {
					ctx.fillStyle = peep.color;
					ctx.fillRect(widthEach*i, HEIGHT-heightEach*(j+1), widthEach, heightEach);
				});
			});
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