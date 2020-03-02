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

class RaceEndScreen extends Level {
	constructor(enter, time) {
		super();
		this.beamEntranceSide = enter;
		this.beamEntrancePosition = (enter%2 ? HEIGHT : WIDTH) / 2;
		time = time;
		var mins = Math.floor(time/60000);
		var secs = Math.floor((time/1000)%60);
		var msecs = Math.floor((time%1000));
		this.score = mins+":"+secs.toString().padStart(2,"0")+"."+msecs.toString().padStart(3,"0");
	}
	update() {
		
	}
	draw() {
		ctx.fillStyle = palette.normal;
		drawTextInRect(lg("Race-End"), 0, 0, WIDTH, HEIGHT/2);
		drawTextInRect(this.score, 0, HEIGHT/2, WIDTH, HEIGHT/2);
	}
}