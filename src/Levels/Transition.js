var levelIterator = false;

class LevelIterator {
	constructor() {
		
	}
	drawBackText(str) {
		ctx.fillStyle = palette.normal;
		ctx.globalAlpha = 1/5;
		drawTextInRect(str, 0, 0, WIDTH, HEIGHT);
	}
	exit() {
		
	}
}

function startLevel() {
	runnee = new LevelWrapper(levelIterator.nextLevel());
}

function nextLevel() {
	runnee = new LevelTransition(runnee, levelIterator);
}

function redoLevel() {
	switchScreen(new LevelWrapper(levelIterator.redoLevel()))
}

function exitLevel() {
	levelIterator.exit();
	runnee = new MainMenu();
}

class LevelTransition extends Screen {
	constructor(fromWrap, iter) {
		super();
		this.fromWrap = fromWrap;
		this.fromLevel = fromWrap.level;
		this.fromsnap = this.fromWrap.snap();
		this.toLevel = iter.nextLevel(this.fromLevel);
		this.toWrap = new LevelWrapper(this.toLevel);
		this.tosnap = this.toWrap.snap();
		switch (this.toLevel.beamEntranceSide) {
			case 0: this.tx = this.fromLevel.beamExitPosition - this.toLevel.beamEntrancePosition;
					this.ty = HEIGHT;
					break;
			case 1: this.tx = -WIDTH;
					this.ty = this.fromLevel.beamExitPosition - this.toLevel.beamEntrancePosition;
					break;
			case 2: this.tx = this.fromLevel.beamExitPosition - this.toLevel.beamEntrancePosition;
					this.ty = -HEIGHT;
					break;
			case 3: this.tx = WIDTH;
					this.ty = this.fromLevel.beamExitPosition - this.toLevel.beamEntrancePosition;
					break;
		}
		this.st = 0;
		this.sd = 0;
	}
	update() {
		this.st += .02;
		this.sd = (1-Math.cos(this.st*Math.PI))/2;
		if (this.st >= 1.0) {
			runnee = this.toWrap;
		}
	}
	draw() {
		ctx.putImageData(this.fromsnap, Math.floor(-this.sd * this.tx), Math.floor(-this.sd * this.ty));
		ctx.putImageData(this.tosnap, Math.floor((1-this.sd) * this.tx), Math.floor((1-this.sd) * this.ty));
	}
}