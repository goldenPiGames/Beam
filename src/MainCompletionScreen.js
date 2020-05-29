function areAllMainLevelsCompleted() {
	return !MAIN_LEVEL_SEQS.find(seq=> {
		var prog = parseInt(localStorage.getItem("Beam"+seq.id+"Progress"));
		return !prog || prog < seq.levelIDs.length;
	});
}

class MainCompletionScreen extends Level {
	constructor() {
		super();
		this.beamEntranceSide = LEFT;
		this.beamExitSide = RIGHT;
		this.beamEntrancePosition = HEIGHT*1/5;
		this.beamExitPosition = this.beamEntrancePosition;
		this.path = new Path2D();
		this.path.moveTo(0, this.beamEntrancePosition);
		this.path.lineTo(WIDTH, this.beamEntrancePosition);
		this.surveyButton = new Button(WIDTH/2-100, HEIGHT*2/4, 200, 40, lg("Completion-SurveyButton"), ()=>window.open(SURVEY_LINK));
		this.discordButton = new Button(WIDTH/2-210, HEIGHT*3/4, 200, 40, "Discord", ()=>window.open(DISCORD_LINK));
		this.patreonButton = new Button(WIDTH/2+10, HEIGHT*3/4, 200, 40, "Patreon", ()=>window.open(PATREON_LINK));
		this.mainMenuButton = new Button(WIDTH/2-100, HEIGHT-45, 200, 40, lg("Completion-Return"), ()=>switchScreen(new MainMenu()));
		this.buttons = [
			this.surveyButton,
			this.discordButton,
			this.patreonButton,
			this.mainMenuButton
		]
	}
	update() {
		//runnee = this;
		this.buttons.forEach(b=>b.update());
	}
	draw() {
		scintBeam();
		ctx.globalAlpha = 1;
		drawBeam(this.path);
		this.buttons.forEach(b=>b.draw());
		ctx.fillStyle = palette.normal;
		drawParagraphInRect(lg("Completion-Paragraph"), 50, HEIGHT/5+20, WIDTH-100, HEIGHT/4-20, 20);
		drawParagraphInRect(lg("Completion-FollowPara"), 50, HEIGHT*2/4+50, WIDTH-100, HEIGHT/4-20, 20);
		drawTextInRect(lg("Completion-Heading"), 75, 0, WIDTH-150, this.beamEntrancePosition-5);
	}
}