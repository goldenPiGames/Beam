var levelNumber = 0;

const LEVEL_LIST = [
	//LevelGridlockFirst4,
	LevelToggleSingle,
	LevelToggleDouble,
	LevelGridlock1,
	LevelGridlock2,
	LevelConcentricSingle,
	LevelConcentricDouble,
	LevelConcentricCascade3,
	LevelOnceSBend,
	LevelOnceMGrid,
	LevelOnceSymPip,
	LevelPipeIntro,
	LevelToggleFirstTrick,
	LevelPipeReal,
	LevelConcentricReverse4,
]

function continueGame() {
	runnee = new LevelWrapper(new (LEVEL_LIST[levelNumber])());
}

function nextLevel() {
	levelNumber++;
	runnee = new LevelTransition(runnee.level, new (LEVEL_LIST[levelNumber])());
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
		this.p = 0;
	}
	update() {
		this.p += .02;
		if (this.p >= 1.0) {
			runnee = new LevelWrapper(this.to);
		}
	}
	draw() {
		ctx.putImageData(this.fromsnap, -this.p * this.tx, -this.p * this.ty);
		ctx.putImageData(this.tosnap, (1-this.p) * this.tx, (1-this.p) * this.ty);
	}
}