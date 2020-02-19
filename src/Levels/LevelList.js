var levelIterator = false;

const MAIN_LEVEL_LIST = [
	//LevelGridlock4,
	LevelToggleSingle,
	LevelToggleDouble,
	LevelToggleFirstTrick,
	LevelGridlock1,
	LevelGridlock2,
	LevelConcentricSingle,
	LevelConcentricDouble,
	LevelConcentricCascade3,
	LevelOnceSBend,
	LevelOnceMGrid,
	LevelOnceSymPip,
	LevelPipeIntro,
	LevelPipeReal,
	LevelSameIntro,
	LevelSameTower1,
	LevelConcentricReverse4,
	LevelVictory,
]

MAIN_LEVEL_LIST.forEach((con, dex) => con.prototype.index = dex);

class LevelIterator {
	constructor() {
		
	}
}

class MainLevelIterator {
	constructor(starting = 0) {
		this.index = starting;
	}
	firstLevel() {
		return new (MAIN_LEVEL_LIST[this.index])();
	}
	nextLevel() {
		this.index++;
		return new (MAIN_LEVEL_LIST[this.index])();
	}
	getTopText() {
		
	}
}

function continueGame() {
	levelIterator = new MainLevelIterator(0);
	startLevel();
}

function startLevel() {
	runnee = new LevelWrapper(levelIterator.firstLevel());
}

function nextLevel() {
	runnee = new LevelTransition(runnee.level, levelIterator.nextLevel(runnee.level));
}

class LevelTransition extends Screen {
	constructor(from, to) {
		super();
		this.from = from;
		this.to = to;
		clearBack();
		this.from.draw();
		this.fromsnap = ctx.getImageData(0, 0, WIDTH, HEIGHT);
		clearBack();
		this.to.draw();
		this.tosnap = ctx.getImageData(0, 0, WIDTH, HEIGHT);
		switch (this.to.beamEntranceSide) {
			case 0: this.tx = this.from.beamExitPosition - this.to.beamEntrancePosition;
					this.ty = HEIGHT;
					break;
			case 1: this.tx = -WIDTH;
					this.ty = this.from.beamExitPosition - this.to.beamEntrancePosition;
					break;
			case 2: this.tx = this.from.beamExitPosition - this.to.beamEntrancePosition;
					this.ty = -HEIGHT;
					break;
			case 3: this.tx = WIDTH;
					this.ty = this.from.beamExitPosition - this.to.beamEntrancePosition;
					break;
		}
		this.st = 0;
		this.sd = 0;
	}
	update() {
		this.st += .02;
		this.sd = (1-Math.cos(this.st*Math.PI))/2;
		if (this.st >= 1.0) {
			runnee = new LevelWrapper(this.to);
		}
	}
	draw() {
		ctx.putImageData(this.fromsnap, -this.sd * this.tx, -this.sd * this.ty);
		ctx.putImageData(this.tosnap, (1-this.sd) * this.tx, (1-this.sd) * this.ty);
	}
}