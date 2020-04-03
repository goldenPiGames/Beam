class EditorTestIterator extends LevelIterator {
	constructor(data) {
		super();
		this.data = data;
		this.done = false;
	}
	nextLevel() {
		if (!this.done) {
			this.done = true;
			return levelFromJSON(this.data);
		} else {
			switchScreen(new EditorWrapper(this.data));
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