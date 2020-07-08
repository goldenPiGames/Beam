class GameMenu extends OverScreen {
	constructor(wrap) {
		super();
		this.wrap = wrap;
		this.width = 300;
		this.height = HEIGHT;
		this.x = 0;
		this.y = 0;
		this.objects = [
			...alternateHybridButtons(this.x+5, this.y+30, this.width-10, 50, [
					...(FULLSCREEN_BUTTONS ? [{text:lg("GameMenu-Fullscreen"), drawI:bubbleDrawIFullscreen, handler:()=>attemptFullscreen()}] : []),
					{text:lg("GameMenu-Exit"), drawI:bubbleDrawIReturn, handler:()=>popupConfirm(()=>exitLevel(), lg("GameMenu-ExitAsk"))},
					{text:lg("GameMenu-Redo"), drawI:bubbleDrawIReset, handler:()=>redoLevel()},
					{text:lg("GameMenu-Settings"), drawI:bubbleDrawISettings, handler:()=>switchScreen(new SettingsScreen(this))},
				]),
			//new Button(this.x, this.y+100, this.width, 30, lg("GameMenu-Quit"), ()=>runnee=new GameMenuQuitConfirm(this)),
		];
	}
	update() {
		this.wrap.jukeboxButton.update();
		this.wrap.hintButton.update();
		if (runnee == this && this.clickedOutside()) {
			runnee = this.wrap;
			return;
		}
		this.objects.forEach(oj=>oj.update());
	}
	draw() {
		this.wrap.draw();
		ctx.fillStyle = palette.background;
		ctx.globalAlpha = .3;
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.globalAlpha = .7;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.globalAlpha = 1;
		this.wrap.jukeboxButton.draw();
		this.wrap.hintButton.draw();
		this.objects.forEach(oj=>oj.draw());
	}
}

function bubbleDrawIMenu() {
	ctx.lineWidth = this.radius*.1;
	ctx.moveTo(this.x-this.radius/2, this.y-this.radius/3);
	ctx.lineTo(this.x+this.radius/2, this.y-this.radius/3);
	ctx.moveTo(this.x-this.radius/2, this.y);
	ctx.lineTo(this.x+this.radius/2, this.y);
	ctx.moveTo(this.x-this.radius/2, this.y+this.radius/3);
	ctx.lineTo(this.x+this.radius/2, this.y+this.radius/3);
	ctx.stroke();
}