var levelIterator = false;

class LevelIterator {
	constructor() {
		
	}
	drawBackText(str) {
		ctx.fillStyle = palette.normal;
		ctx.globalAlpha = settings.bgNumber;
		drawTextInRect(str, 0, 0, WIDTH, HEIGHT);
	}
	proceed() {
		var from = runnee;
		var fromSnap = from.snap();
		var toLevel = this.nextLevel(from.level);
		if (toLevel) {
			var toWrap = new LevelWrapper(toLevel);
			var trans = new (this.transitionType)(from, toWrap, fromSnap);
			runnee = trans;
		} else if (runnee == from)
			switchScreen(new MainMenu());
	}
	exit() {
		
	}
}
//sets transitionType at the bottom

function startLevel() {
	runnee = new LevelWrapper(levelIterator.nextLevel());
}

function nextLevel() {
	levelIterator.proceed();
}

function redoLevel() {
	switchScreen(new LevelWrapper(levelIterator.redoLevel()))
}

function exitLevel() {
	levelIterator.exit();
	//runnee = new MainMenu();
}

class LevelTransition extends Screen {
	constructor(fromWrap, toWrap, fromSnap) {
		super();
		this.fromWrap = fromWrap;
		this.fromLevel = fromWrap.level;
		this.fromSnap = fromSnap;
		this.toWrap = toWrap;
		this.toLevel = toWrap.level;
		this.toSnap = this.toWrap.snap();
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
		ctx.putImageData(this.fromSnap, Math.floor(-this.sd * this.tx), Math.floor(-this.sd * this.ty));
		ctx.putImageData(this.toSnap, Math.floor((1-this.sd) * this.tx), Math.floor((1-this.sd) * this.ty));
	}
}

LevelIterator.prototype.transitionType = LevelTransition;