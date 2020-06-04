class KongSingleIterator extends LevelIterator {
	constructor(params) {
		super();
		var level = levelFromJSON(params.content);
		this.params = params;
		this.data = params.content;
		console.log(this.data);
		this.done = false;
	}
	nextLevel(prev) {
		if (!this.done) {
			this.done = true;
			var level = levelFromJSON(this.data);
			return level;
		} else {
			return new KongSingleVictory(directionOpposite(prev.beamExitSide), this.data, prev.mode);
		}
	}
	redoLevel() {
		return levelFromJSON(this.data);
	}
	exit() {
		switchScreen(new MainMenu());
	}
	drawBack() {
		scintBeam();
	}
}

class KongSingleVictory extends Level {
	constructor(enter, data, mode, snapped) {
		super();
		this.beamEntranceSide = enter;
		this.beamEntrancePosition = (enter%2 ? HEIGHT : WIDTH) / 2;
		this.data = data;
		this.mode = mode;
		this.submitButton = new Button(WIDTH/2-150, HEIGHT/2-100, 300, 50, lg("KongSharedVictory-Browse"), ()=>{kongregate.sharedContent.browse("Level")});
		this.returnButton = new Button(WIDTH/2-150, HEIGHT/2+50, 300, 50, lg("KongSharedVictory-Exit"), ()=>{switchScreen(new MainMenu())});
		this.buttons = [
			this.submitButton,
			this.returnButton,
		];
	}
	update() {
		this.buttons.forEach(b=>b.update());
	}
	draw() {
		this.buttons.forEach(b=>b.draw());
	}
}