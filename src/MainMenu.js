function doMainMenu() {
	switchScreen(MainMenu);
}

class MainMenu extends Screen {
	constructor() {
		super();
		this.buttons = [
			new BubbleButtonMainMenu(WIDTH/2, HEIGHT-300, 45, ()=>continueGame(), bubbleDrawIPlay, "MainMenu-Play", this),
			new BubbleButtonMainMenu(WIDTH-50, 50, 45, ()=>runnee=new Jukebox(this), bubbleDrawIJukebox, "MainMenu-Jukebox", this),
			new BubbleButtonMainMenu(WIDTH/2, HEIGHT-200, 45, ()=>switchScreen(new InfiniteSelectScreen()), bubbleDrawIInfinity, "MainMenu-Infinite", this),
			new BubbleButtonMainMenu(WIDTH/2, HEIGHT-100, 45, ()=>switchScreen(new CreditsScreen()), bubbleDrawICredits, "MainMenu-Credits", this),
			//new Button(WIDTH/2, mainHeight()-100, 400, 45, "Credits", ()=>switchScreen(Credits)),
			//new Button(WIDTH/2, mainHeight()-50, 400, 45, "Settings", doSettings),
		]
		//if (differenceBetweenColors(settings.normal_color, settings.background_color) < 72)
			//this.objects.push(new EmergencyColorResetter(0, mainHeight()-20, 200, 20));
	}
	update() {
		this.hoverText = null;
		this.buttons.forEach(oj=>oj.update());
	}
	setHover(text) {
		this.hoverText = text;
	}
	draw() {
		ctx.font = "100px "+settings.font;
		ctx.textBaseline = "top";
		ctx.textAlign = "center";
		ctx.fillStyle = settings.beam_color;
		ctx.fillText(lg("Title"), canvas.width/2, 10);
		this.buttons.forEach(oj=>oj.draw());
		if (this.hoverText) {
			ctx.font = "25px "+settings.font;
			ctx.textBaseline = "bottom";
			ctx.textAlign = "center";
			ctx.fillStyle = settings.hover_color;
			ctx.fillText(this.hoverText, WIDTH/2, HEIGHT-10);
		}
	}
}

class BubbleButtonMainMenu extends BubbleButton {
	constructor(x, y, radius, handler, drawI, lHoverText, parent) {
		super(x, y, radius, handler, drawI);
		this.lHoverText = lHoverText;
		this.parent = parent;
	}
	update() {
		super.update();
		if (this.hovered)
			this.parent.setHover(lg(this.lHoverText));
	}
}