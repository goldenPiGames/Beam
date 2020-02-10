function doMainMenu() {
	switchScreen(MainMenu);
}

class MainMenu extends Screen {
	constructor() {
		super();
		this.buttons = [
			new BubbleButton(WIDTH/2, HEIGHT-200, 45, ()=>continueGame(), bubbleDrawIPlay),
			new BubbleButton(WIDTH-50, 50, 45, ()=>runJukebox(), bubbleDrawIJukebox),
			//new Button(WIDTH/2, HEIGHT-100, 400, 45, "Jukebox", ()=>switchScreen(Jukebox)),
			//new Button(WIDTH/2, mainHeight()-100, 400, 45, "Credits", ()=>switchScreen(Credits)),
			//new Button(WIDTH/2, mainHeight()-50, 400, 45, "Settings", doSettings),
		]
		//if (differenceBetweenColors(settings.normal_color, settings.background_color) < 72)
			//this.objects.push(new EmergencyColorResetter(0, mainHeight()-20, 200, 20));
	}
	update() {
		this.buttons.forEach(oj=>oj.update());
	}
	draw() {
		ctx.font = "100px sans-serif";
		ctx.textBaseline = "top";
		ctx.textAlign = "center";
		ctx.fillStyle = "#FF0000";
		ctx.fillText(lg("Title"), canvas.width/2, 10);
		this.buttons.forEach(oj=>oj.draw());
	}
}