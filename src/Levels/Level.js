var Levels = {};

class LevelWrapper extends Screen {
	constructor(level) {
		super();
		this.level = level;
		this.level.wrapper = this;
		this.menuButton = new BubbleButton(35, 35, 30, ()=>runnee=new GameMenu(this), bubbleDrawIMenu);
		this.jukeboxButton = new BubbleButton(WIDTH-35, 35, 30, ()=>runnee=new Jukebox(this, this.level), bubbleDrawIJukebox);
		this.hintButton = new BubbleButton(WIDTH-35, HEIGHT-35, 30, ()=>runnee=new HintScreen(this), bubbleDrawIHint);
		this.buttons = [
			this.menuButton,
			this.jukeboxButton,
			this.hintButton,
		];
		this.timeTaken = 0;
	}
	update() {
		this.timeTaken++;
		this.level.update();
		this.timeTaken++;
		if (this.level.won) {
			nextLevel();
			return;
		}
		if (runnee == this)
			this.buttons.forEach(oj=>oj.update());
	}
	draw() {
		ctx.globalAlpha = 1;
		levelIterator.drawBack(this);
		this.level.draw();
		ctx.globalAlpha = 1;
		if (runnee == this)
			this.buttons.forEach(oj=>oj.draw());
	}
	snap() {
		clearBack();
		levelIterator.drawBack(this);
		this.level.draw();
		return ctx.getImageData(0, 0, WIDTH, HEIGHT);
	}
}

class Level {
	constructor(args) {
		if (args) {
			this.solution = args.solution;
		}
	}
	win() {
		this.won = true;
	}
	calcBeamEnds() {
		switch (this.beamEntranceSide) {
			case 0: this.beamStartX = this.beamEntrancePosition;
					this.beamStartY = 0;
					break;
			case 1: this.beamStartX = WIDTH;
					this.beamStartY = this.beamEntrancePosition;
					break;
			case 2: this.beamStartX = this.beamEntrancePosition;
					this.beamStartY = HEIGHT;
					break;
			case 3: this.beamStartX = 0;
					this.beamStartY = this.beamEntrancePosition;
					break;
		}
		switch (this.beamExitSide) {
			case 0: this.beamEndX = this.beamExitPosition;
					this.beamEndY = 0;
					break;
			case 1: this.beamEndX = WIDTH;
					this.beamEndY = this.beamExitPosition;
					break;
			case 2: this.beamEndX = this.beamExitPosition;
					this.beamEndY = HEIGHT;
					break;
			case 3: this.beamEndX = 0;
					this.beamEndY = this.beamExitPosition;
					break;
		}
	}
	getLevelHints() {
		var basehints = lg(this.id + "-Hints");
		if (basehints)
			return basehints;
		if (this.solution) {
			return this.getSolutionHints();
		}
		return lg("Hint-NoLevelHints");
	}
}
Level.prototype.lModeName = "LevelOther-Name";
Level.prototype.lModeRules = "LevelOther-Rules";
Level.prototype.lModeHints = "LevelOther-Hints";

function levelFromJSON(data) {
	while (typeof data == "string")
		data = JSON.parse(data);
	switch (data.mode) {
		case "PipePath": return new PipeLevel(data);
		case "WalkOnce": return new OnceLevel(data);
		case "ToggleGates": return new ToggleLevel(data);
		case "SameGame": return new SameLevel(data);
		case "Maze" : return new MazeLevel(data);
		case "Gridlock": return new GridlockLevel(data);
	}
}