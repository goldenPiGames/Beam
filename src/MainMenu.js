function doMainMenu() {
	switchScreen(MainMenu);
}

class MainMenu extends Screen {
	constructor() {
		super();
		this.buttons = [
			...alternateHybridButtons(WIDTH/3, HEIGHT/2, WIDTH/3, HEIGHT/3, [
					{text:lg("MainMenu-Play"), drawI:bubbleDrawIPlay, handler:()=>continueGame()},
					{text:lg("MainMenu-Infinite"), drawI:bubbleDrawIInfinity, handler:()=>switchScreen(new InfiniteSelectScreen())},
					{text:lg("MainMenu-Race"), drawI:bubbleDrawIRace, handler:()=>switchScreen(new MultiplayerMenu())},
					{text:lg("MainMenu-Credits"), drawI:bubbleDrawICredits, handler:()=>switchScreen(new CreditsScreen())},
				]),
			new HybridButton(WIDTH-220, 5, 170, 35, WIDTH-50, 50, 45, lg("MainMenu-Jukebox"), bubbleDrawIJukebox, ()=>switchScreen(new Jukebox(this))),
		];
		/*	new BubbleButtonMainMenu(WIDTH*1/4, HEIGHT-100, 35, ()=>switchScreen(new PaletteScreen(this)), bubbleDrawIPalette, "MainMenu-Palette", this),
			//new Button(WIDTH/2, mainHeight()-100, 400, 45, "Credits", ()=>switchScreen(Credits)),
			//new Button(WIDTH/2, mainHeight()-50, 400, 45, "Settings", doSettings),
		]*/
		//if (differenceBetweenColors(palette.normal, palette.background) < 72)
			//this.objects.push(new EmergencyColorResetter(0, mainHeight()-20, 200, 20));
	}
	update() {
		this.buttons.forEach(oj=>oj.update());
	}
	draw() {
		ctx.font = "100px "+settings.font;
		ctx.textBaseline = "top";
		ctx.textAlign = "center";
		ctx.fillStyle = palette.beam;
		ctx.fillText(lg("Title"), canvas.width/2, 10);
		this.buttons.forEach(oj=>oj.draw());
	}
}