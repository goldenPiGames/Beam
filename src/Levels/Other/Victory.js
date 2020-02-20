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
		ctx.fillStyle = settings.normal_color;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		drawTextInRect("placeholder win screen", 0, 0, WIDTH, HEIGHT/2);
		drawParagraphInRect("Try the infinite levels. Pipe Path and Walk Once are pretty great. Toggle Gates is honestly kinda jank though. <br> (I think I forgot to mention, you can return to the main menu by clcking that button in the upper-left corner, then \"Quit\").", 0, HEIGHT/2, WIDTH, HEIGHT/2, 24);
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
		ctx.fillStyle = settings.normal_color;
		drawTextInRect(lg("Race-End"), 0, 0, WIDTH, HEIGHT/2);
		drawTextInRect(this.score, 0, HEIGHT/2, WIDTH, HEIGHT/2);
	}
}