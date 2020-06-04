class EditorTestIterator extends LevelIterator {
	constructor(data) {
		super();
		this.data = data;
		this.done = false;
	}
	nextLevel(prev) {
		if (!this.done) {
			this.done = true;
			var level = levelFromJSON(this.data);
			this.snapped = level.snap();
			return level;
		} else {
			if (VERSION_KONGREGATE) {
				return new EditorSubmitScreen(directionOpposite(prev.beamExitSide), this.data, prev.mode, this.snapped);
			} else {
				switchScreen(new EditorWrapper(this.data));
			}
		}
	}
	redoLevel() {
		return levelFromJSON(this.data);
	}
	exit() {
		switchScreen(new EditorWrapper(this.data));
	}
	drawBack() {
		scintBeam();
	}
}

class EditorSubmitScreen extends Level {
	constructor(enter, data, mode, snapped) {
		super();
		this.beamEntranceSide = enter;
		this.beamEntrancePosition = (enter%2 ? HEIGHT : WIDTH) / 2;
		this.data = data;
		this.mode = mode;
		this.snapped = snapped;
		this.submitButton = new Button(WIDTH/2-150, HEIGHT/2-100, 300, 50, lg("EditorSubmit-Submit"), ()=>this.submit());
		this.returnButton = new Button(WIDTH/2-150, HEIGHT/2+50, 300, 50, lg("EditorSubmit-Return"), ()=>{switchScreen(new EditorWrapper(this.data))});
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
	submit() {
		submitLevel(this.data, this.mode, this.snapped);
	}
}
