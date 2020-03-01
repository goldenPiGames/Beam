function continueGame() {
	levelIterator = new LinearLevelIterator(MAIN_LEVEL_SEQ);
	startLevel();
}

const MAIN_LEVEL_SEQ = {
	id : "MainLinear",
	levels : [
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
		//LevelVictory,
	],
}

class LinearLevelIterator extends LevelIterator {
	constructor(seq, starting) {
		super();
		this.seq = seq;
		if (typeof starting == "number")
			this.index = starting - 1;
		else
			this.index = (parseInt(localStorage.getItem("Beam"+this.seq.id+"Progress")) || 0)-1;
	}
	nextLevel(prev) {
		this.index++;
		var currSaved = localStorage.getItem("Beam"+this.seq.id+"Progress");
		if (this.index > currSaved)
			localStorage.setItem("Beam"+this.seq.id+"Progress", this.index);
		if (this.index >= this.seq.levels.length) {
			this.index = "";
			localStorage.setItem("Beam"+this.seq.id+"Beaten", 1);
			localStorage.setItem("Beam"+this.seq.id+"Progress", 0);
			return new LevelVictory(prev);
		} else {
			return new (this.seq.levels[this.index])();
		}
	}
	drawBack() {
		if (this.index >= 0)
			this.drawBackText(this.index);
	}
}
