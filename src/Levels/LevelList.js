var levelIterator = false;

const MAIN_LEVEL_LIST = [
	//LevelGridlock4,
	LevelToggle1,
	LevelToggle2,
	LevelToggleFirstTrick,
	LevelMazeStraight,
	LevelMazeU,
	LevelMaze3,
	LevelGridlock1,
	LevelGridlock2,
	LevelConcentricSingle,
	LevelConcentricDouble,
	LevelConcentricCascade3,
	LevelOnceSBend,
	LevelOnceMGrid,
	LevelOnceSymPip,
	LevelPipeStraight,
	LevelPipeSBend,
	LevelPipeIntro,
	LevelPipeReal,
	LevelSameIntro,
	LevelSameSlideDemo,
	LevelSameTower1,
	LevelConcentricReverse4,
	LevelVictory,
]

MAIN_LEVEL_LIST.forEach((con, dex) => con.prototype.index = dex);

class LevelIterator {
	constructor() {
		
	}
	drawBackText(str) {
		ctx.fillStyle = settings.normal_color;
		ctx.globalAlpha = 1/6;
		drawTextInRect(str, 0, 0, WIDTH, HEIGHT);
	}
}

class MainLevelIterator extends LevelIterator {
	constructor(starting = 0) {
		super();
		this.index = starting;
	}
	firstLevel() {
		return new (MAIN_LEVEL_LIST[this.index])();
	}
	nextLevel() {
		this.index++;
		return new (MAIN_LEVEL_LIST[this.index])();
	}
	drawBack() {
		this.drawBackText(this.index);
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
	runnee = new LevelTransition(runnee, levelIterator);
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