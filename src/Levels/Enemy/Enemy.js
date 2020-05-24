class EnemyWrapper extends LevelWrapper {
	constructor(level) {
		super(level);
		this.hintButton.x += 100;//hide hint button
	}
	update() {
		super.update();
	}
	draw() {
		super.draw();
	}
	snap() {
		clearBack();
		levelIterator.drawBack(this);
		this.level.draw();
		return ctx.getImageData(0, 0, WIDTH, HEIGHT);
	}
}

class BossIterator extends LevelIterator {
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
		submitToAPI("Progress"+this.seq.id, this.index);
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
		if (this.index === 0 && !this.seenHintsAlready) {
			ctx.globalAlpha = 1;
			ctx.fillStyle = palette.normal;
			ctx.font = "30px "+settings.font;
			ctx.textAlign = "right";
			ctx.textBaseline = "bottom";
			ctx.fillText(lg("Hint-Prompt"), WIDTH-70, HEIGHT-5);
			if (runnee instanceof HintScreen)
				this.seenHintsAlready = true;
		}
	}
}
BossIterator.prototype.transitionType = LevelTransition;

class LevelTranslationBossGlitchy extends LevelTransition {
	
}

class EnemyCursor {
	
}