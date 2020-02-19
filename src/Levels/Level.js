//var Levels = {};

class LevelWrapper extends Screen {
	constructor(level) {
		super();
		this.level = level;
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
		this.level.update();
		this.timeTaken++;
		if (this.level.won) {
			nextLevel();
			return;
		}
		this.buttons.forEach(oj=>oj.update());
	}
	draw() {
		ctx.globalAlpha = 1;
		this.level.draw();
		this.buttons.forEach(oj=>oj.draw());
	}
}

class Level {
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
	drawTextInBack(str) {
		ctx.fillStyle = settings.normal_color;
		ctx.globalAlpha = 1/6;
		drawTextInRect(str, 0, 0, WIDTH, HEIGHT);
	}
	drawIndex() {
		if (typeof this.index == "number")
			this.drawTextInBack(this.index);
	}
}
Level.prototype.lModeName = "LevelOther-Name";
Level.prototype.lModeRules = "LevelOther-Rules";
Level.prototype.lModeHints = "LevelOther-Hints";
