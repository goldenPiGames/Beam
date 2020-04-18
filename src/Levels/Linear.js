function continueGame() {
	//levelIterator = new LinearLevelIterator(MAIN_LEVEL_SEQ);
	//startLevel();
	runnee = new LevelSelectLinearScreen(MAIN_LEVEL_SEQS);
}

class LevelSelectLinearScreen extends Screen {
	constructor(seqs = MAIN_LEVEL_SEQS) {
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
			if (settings.rainbowBeam)
				palette.beam = this.selected.seq.color;
			recommendSongs(this.selected.seq.music);
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
		this.beads = this.seq.levelIDs.map((lev, dex, ray)=>new LevelSelectSeqBeadsBead(this.x+bradius + (this.width-2*bradius)*(dex/(ray.length)), by, bradius, dex, this));
		this.leftX = this.x+bradius;
		this.midX = this.x+bradius+(this.width-2*bradius)*this.progress/this.seq.levelIDs.length;
		this.rightX = this.x+this.width-bradius;
		this.lineY = by;
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
		ctx.strokeStyle = palette.disabled;
		ctx.beginPath();
		ctx.moveTo(this.midX, this.lineY);
		ctx.lineTo(this.rightX, this.lineY);
		ctx.stroke();
		ctx.strokeStyle = settings.rainbowBeam ? this.seq.color : palette.normal;
		ctx.beginPath();
		ctx.moveTo(this.leftX, this.lineY);
		ctx.lineTo(this.midX, this.lineY);
		ctx.stroke();
		this.beads.forEach(b=>b.draw());
		ctx.textBaseline = "bottom";
		ctx.textAlign = "left";
		ctx.font = Math.floor(this.height/3)+"px "+settings.font;
		ctx.fillStyle = palette.normal;
		ctx.fillText(lg("Seq-"+this.seq.id), this.x, this.y+this.height-this.beads[0].radius*2);
	}
	beadClicked(dex) {
		if (dex <= this.progress) {
			if (dex == this.index && this.parent.selected == this)
				this.parent.tryPlay();
			this.index = dex;
			this.clicked = true;
		}
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
			localStorage.setItem("Beam"+this.seq.id+"Beaten", true);
			return new LevelVictoryLinear(this.seq, prev);
		} else {
			return new (Levels[this.seq.levelIDs[this.index]])();
		}
	}
	exit() {
		//if I have multiple level sets I'll have to change this
		runnee = new LevelSelectLinearScreen(MAIN_LEVEL_SEQS);
	}
	redoLevel() {
		return new (Levels[this.seq.levelIDs[this.index]])();
	}
	drawBack() {
		if (this.index >= 0)
			this.drawBackText(this.index);
	}
}

class LevelVictoryLinear extends Level {
	constructor(seq, prev) {
		super();
		this.beamEntranceSide = directionOpposite(prev.beamExitSide);
		this.beamEntrancePosition = HEIGHT/2;
		this.calcBeamEnds();
		this.levelButton = new Button(WIDTH/2-80, HEIGHT/2+100, 160, 40, lg("Victory-Return"), ()=>switchScreen(new LevelSelectLinearScreen()));
	}
	update() {
		this.levelButton.update();
	}
	draw() {
		ctx.globalAlpha = 1;
		ctx.fillStyle = palette.normal;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		drawTextInRect(lg("Victory-Title"), 0, 0, WIDTH, HEIGHT/2);
		//drawParagraphInRect(lg("Victory-Paragraph"), 0, HEIGHT/2, WIDTH, HEIGHT/2, 24);
		this.levelButton.draw();
	}
}
LevelVictoryLinear.prototype.isEnd = true;