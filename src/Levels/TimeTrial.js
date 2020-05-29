class TimeTrialIterator extends InfiniteIterator {
	constructor(mode, goal, seed) {
		super(mode);
		this.goal = goal;
		this.seed = seed;
		this.timeTaken = 0;
	}
	nextLevel(prev) {
		if (!prev) {
			return super.nextLevel();
		} else if (this.beaten < this.goal-1) {
			this.timeTaken += prev.wrapper.timeTaken;
			return super.nextLevel(prev);
		} else {
			this.finished = true;
			this.finishTime = Date.now();
			if (!(typeof this.seed == "number")) {
				submitToAPI("TimeTrial"+this.mode.id+this.goal, this.timeTaken);
			}
			return new TimeTrialEndScreen(directionOpposite(prev.beamExitSide), this);
		}
	}
	drawBack(wrap) {
		scintBeam();
		this.timeTaken += lastFrameDelay;
		if (!this.finished) {
			this.drawBackText(this.goal - this.beaten);
			ctx.globalAlpha = 1;
			var now = Date.now();
			var mins = Math.floor(this.timeTaken/60000);
			var secs = Math.floor((this.timeTaken%60000)/1000);
			drawTextInRect(mins+":"+secs.toString().padStart(2,"0"), WIDTH/4, 5, WIDTH/2, 35);
			//drawTextInRect(this.timeTaken+wrap.timeTaken, WIDTH/4, 5, WIDTH/2, 35)
		}
	}
}

class TimeTrialEndScreen extends Level {
	constructor(enter, iter) {
		super();
		this.beamEntranceSide = enter;
		this.beamEntrancePosition = (enter%2 ? HEIGHT : WIDTH) / 2;
		this.time = iter.timeTaken;
		var mins = Math.floor(this.time/60000);
		var secs = Math.floor((this.time/1000)%60);
		var msecs = Math.floor((this.time%1000));
		this.score = mins+":"+secs.toString().padStart(2,"0")+"."+msecs.toString().padStart(3,"0");
		console.log(this.score);
		this.mode = iter.mode;
		this.seed = iter.seed;
		this.goal = iter.goal;
		this.paraText = lg(this.mode.lName) + " <br> " +
				lg("TimeTrialEnd-Length", {"num":this.goal}) + " <br> " +
				((typeof this.seed == "number") ? lg("TimeTrialEnd-SM64RNG", {"seed":this.seed.toString(16)}) : lg("TimeTrialEnd-NoPRNG"));
		this.redoButton = new Button(WIDTH/2-80, HEIGHT/2+100, 160, 40, lg("TimeTrialEnd-Return"), ()=>{
				switchScreen(new InfiniteSelectScreen({
					mode : this.mode.id,
					race : true,
					goal : this.goal,
					rng : (typeof this.seed == "number"),
					rngseed : this.seed,
				}));
			});
	}
	update() {
		this.redoButton.update();
	}
	draw() {
		ctx.fillStyle = palette.normal;
		drawTextInRect(lg("TimeTrialEnd-Header"), 80, 0, WIDTH-160, HEIGHT/3);
		drawTextInRect(this.score, 0, HEIGHT/3, WIDTH, HEIGHT/3);
		drawParagraphInRect(this.paraText, 0, HEIGHT*2/3, WIDTH, HEIGHT/3, 30);
		this.redoButton.draw();
	}
}
TimeTrialEndScreen.prototype.isEnd = true;