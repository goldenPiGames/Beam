function continueGame() {
	levelIterator = new LinearLevelIterator(MAIN_LEVEL_SEQ);
	startLevel();
}

const MAIN_LEVEL_SEQ = {
	id : "MainLinear",
	levelIDs : [
		//LevelGridlock4,
		"Toggle1",
		"Toggle2",
		"ToggleFirstTrick",
		"MazeStraight",
		"MazeU",
		"Maze3",
		"Gridlock1",
		"Gridlock2",
		"ConcentricSingle",
		"ConcentricDouble",
		"ConcentricCascade3",
		"OnceSBend",
		"OnceMGrid",
		"OnceSymPip",
		"PipeStraight",
		"PipeSBend",
		"Pipe3",
		"PipeReal",
		"PipeAround",
		"SameIntro",
		"SameSlideDemo",
		"SameTower1",
		"ConcentricReverse4",
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
		if (this.index >= this.seq.levelIDs.length) {
			this.index = "";
			localStorage.setItem("Beam"+this.seq.id+"Beaten", 1);
			localStorage.setItem("Beam"+this.seq.id+"Progress", 0);
			return new LevelVictory(prev);
		} else {
			return new (Levels[this.seq.levelIDs[this.index]])();
		}
	}
	drawBack() {
		if (this.index >= 0)
			this.drawBackText(this.index);
	}
}
