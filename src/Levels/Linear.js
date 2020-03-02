function continueGame() {
	//levelIterator = new LinearLevelIterator(MAIN_LEVEL_SEQ);
	//startLevel();
	runnee = new LevelSelectLinearScreen(MAIN_LEVEL_SEQS);
}

const MAIN_LEVEL_SEQS = [
	SEQ_MAIN_PIPE,
	SEQ_MAIN_ONCE,
	SEQ_MAIN_TOGGLE,
	SEQ_MAIN_GRIDLOCK,
	SEQ_MAIN_SAME,
	SEQ_MAIN_CONCENTRIC,
	SEQ_MAIN_MAZE,
]

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

class LevelSelectLinearScreen extends Screen {
	constructor(seqs) {
		super();
		this.seqs = seqs;
		this.seqBeads = this.seqs.map((seq, dex, ray) => new LevelSelectSeqBeads(seq, 10, HEIGHT*(dex)/(ray.length), WIDTH-120, HEIGHT/(ray.length+1), this));
		this.playButton = new BubbleButton(WIDTH-50, HEIGHT-50, 45, ()=>this.tryPlay(), bubbleDrawIPlay);
		this.returnButton = new BubbleButton(WIDTH-50, 50, 45, ()=>switchScreen(new MainMenu()), bubbleDrawIReturn);
		this.buttons = [
			this.playButton,
			this.returnButton,
		];
	}
	update() {
		this.seqBeads.forEach(b=>b.update());
		this.buttons.forEach(b=>b.update());
	}
	draw() {
		this.seqBeads.forEach(b=>b.draw());
		this.buttons.forEach(b=>b.draw());
	}
	beadsClicked(beep) {
		this.selected = beep;
	}
	tryPlay() {
		if (this.selected) {
			levelIterator = new LinearLevelIterator(this.selected.seq, this.selected.index);
			startLevel();
		}
	}
}

class LevelSelectSeqBeads extends UIObject {
	constructor(seq, x, y, width, height, parent) {
		super();
		this.parent = parent;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.seq = seq;
		this.progress = parseInt(localStorage.getItem("Beam"+this.seq.id+"Progress")) || 0;
		var bradius = this.height*5/16;
		var by = this.y+this.height-bradius;
		this.beads = this.seq.levelIDs.map((lev, dex, ray)=>new LevelSelectSeqBeadsBead(this.x+bradius + (this.width-2*bradius)*(dex/(ray.length-1)), by, bradius, dex, this));
	}
	update() {
		this.clicked = false;
		this.beads.forEach(b=>b.update());
		if (this.clicked) {
			this.parent.beadsClicked(this);
		}
	}
	draw() {
		ctx.globalAlpha = 1;
		ctx.lineWidth = 4;
		ctx.strokeStyle = palette.normal;
		ctx.beginPath();
		ctx.moveTo(this.beads[0].x, this.beads[0].y);
		ctx.lineTo(this.beads[this.beads.length-1].x, this.beads[this.beads.length-1].y);
		ctx.stroke();
		this.beads.forEach(b=>b.draw());
		ctx.textBaseline = "bottom";
		ctx.textAlign = "left";
		ctx.font = Math.floor(this.height/3)+"px "+settings.font;
		ctx.fillStyle = palette.normal;
		ctx.fillText(lg("Seq-"+this.seq.id), this.x, this.y+this.height-this.beads[0].radius*2);
	}
	beadClicked(dex) {
		if (dex <= this.progress);
		this.index = dex;
		this.clicked = true;
	}
}

/*
* I know this is a stupid name.
*/
class LevelSelectSeqBeadsBead extends UIObject {
	constructor(x, y, radius, index, parent) {
		super();
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.index = index;
		this.parent = parent;
	}
	update() {
		super.update();
		if (this.hovered && this.index <= this.parent.progress)
			hovered = true;
		if (this.clicked) {
			this.parent.beadClicked(this.index);
		}
	}
	draw() {
		var color = this.index > this.parent.progress ? palette.disabled : this.parent.index == this.index && this.parent.parent.selected == this.parent ? palette.click : this.hovered ? palette.hover : palette.normal;
		ctx.strokeStyle = color;
		ctx.fillStyle = palette.background;
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.fillStyle = color;
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.font = (this.radius*3/2)+"px sans-serif";
		ctx.fillText(this.index, this.x, this.y);
	}
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