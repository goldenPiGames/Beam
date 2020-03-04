//TODO make it not look like shit
class LevelVictory extends Level {
	constructor() {
		super();
		this.beamEntranceSide = 3;
		this.beamEntrancePosition = HEIGHT/2;
		this.calcBeamEnds();
	}
	update() {
		
	}
	draw() {
		ctx.globalAlpha = 1;
		ctx.fillStyle = palette.normal;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		drawTextInRect(lg("Victory-Title"), 0, 0, WIDTH, HEIGHT/2);
		drawParagraphInRect(lg("Victory-Paragraph"), 0, HEIGHT/2, WIDTH, HEIGHT/2, 24);
	}
}
LevelVictory.prototype.isEnd = true;

class RaceEndScreen extends Level {
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
				lg("RaceEnd-Length").replace(/<num>/, this.goal) + " <br> " +
				((typeof this.seed == "number") ? lg("RaceEnd-SM64RNG").replace(/<seed>/, this.seed.toString(16)) : lg("RaceEnd-NoPRNG"));
		this.redoButton = new Button(WIDTH/2-80, HEIGHT/2+100, 160, 40, lg("RaceEnd-Return"), ()=>{
				switchScreen(new InfiniteSelectScreen({
					mode : this.mode.id,
					race : true,
					goal : this.goal,
					rng : true,
					rngseed : this.seed,
				}));
			});
	}
	update() {
		this.redoButton.update();
	}
	draw() {
		ctx.fillStyle = palette.normal;
		drawTextInRect(lg("RaceEnd-Header"), 80, 0, WIDTH-160, HEIGHT/3);
		drawTextInRect(this.score, 0, HEIGHT/3, WIDTH, HEIGHT/3);
		drawParagraphInRect(this.paraText, 0, HEIGHT*2/3, WIDTH, HEIGHT/3, 30);
		this.redoButton.draw();
	}
}
RaceEndScreen.prototype.isEnd = true;