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
