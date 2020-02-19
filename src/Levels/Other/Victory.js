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

