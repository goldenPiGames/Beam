function doMainMenu() {
	switchScreen(MainMenu);
}

class MainMenu extends Screen {
	constructor() {
		super();
		recommendSongs(SONGREC.mainMenu);
		this.buttons = [
			...alternateHybridButtons(WIDTH/4, HEIGHT/3, WIDTH/2, HEIGHT/10, [
				{text:lg("MainMenu-Play"), drawI:bubbleDrawIPlay, handler:()=>continueGame()},
				{text:lg("MainMenu-Infinite"), drawI:bubbleDrawIInfinity, handler:()=>switchScreen(new InfiniteSelectScreen())},
				...(MULTIPLAYER_IN ? [{text:lg("MainMenu-Race"), drawI:bubbleDrawIRace, handler:()=>switchScreen(new MultiplayerMenu())}] : []),
				{text:lg("MainMenu-Editor"), drawI:bubbleDrawINew, handler:()=>startEditor()},
				{text:lg("MainMenu-Credits"), drawI:bubbleDrawICredits, handler:()=>switchScreen(new CreditsScreen())},
				{text:lg("MainMenu-Settings"), drawI:bubbleDrawISettings, handler:()=>switchScreen(new SettingsScreen(this))},
			]),
			new HybridButton(WIDTH-220, 5, 170, 35, WIDTH-50, 50, 45, lg("MainMenu-Jukebox"), bubbleDrawIJukebox, ()=>switchScreen(new Jukebox(this))),
		];
		if (FULLSCREEN_BUTTONS) {
			this.buttons.push(new HybridButton(50, 5, 170, 35, 50, 50, 45, lg("MainMenu-Fullscreen"), bubbleDrawIFullscreen, ()=>attemptFullscreen()));
		}
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
		scintBeam();
		ctx.font = "100px "+settings.font;
		ctx.textBaseline = "top";
		ctx.textAlign = "center";
		ctx.fillStyle = palette.beam;
		ctx.fillText(lg("Title"), canvas.width/2, 10);
		this.buttons.forEach(oj=>oj.draw());
		ctx.fillStyle = palette.normal;
		ctx.textAlign = "left";
		ctx.textBaseline = "bottom";
		ctx.font = "16px " + settings.font;
		ctx.fillText("©2020 goldenPiGames", 3, HEIGHT-3);
	}
}
MainMenu.prototype.overrideTouch = false;