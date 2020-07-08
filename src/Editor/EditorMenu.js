class EditorMenu extends OverScreen {
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
					{text:lg("EditorMenu-Exit"), drawI:bubbleDrawIReturn, handler:()=>this.exit()},
					{text:lg("EditorMenu-New"), drawI:bubbleDrawINew, handler:()=>runnee=new EditorNewSelect(this.wrap)},
					{text:lg("EditorMenu-Save"), drawI:bubbleDrawISave, handler:()=>this.wrap.save()},
					{text:lg("EditorMenu-Load"), drawI:bubbleDrawILoad, handler:()=>this.wrap.load()},
					{text:lg("EditorMenu-Sets"), drawI:bubbleDrawISets, handler:()=>this.sets()},
					{text:lg("GameMenu-Settings"), drawI:bubbleDrawISettings, handler:()=>switchScreen(new SettingsScreen(this))},
				]),
			//new Button(this.x, this.y+100, this.width, 30, lg("GameMenu-Quit"), ()=>runnee=new GameMenuQuitConfirm(this)),
		];
	}
	update() {
		this.wrap.jukeboxButton.update();
		//this.wrap.hintButton.update();
		if (runnee == this && mouse.clicked && !this.intersectsMouse()) {
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
		//this.wrap.hintButton.draw();
		this.objects.forEach(oj=>oj.draw());
	}
	exit() {
		this.wrap.quicksave();
		runnee = new MainMenu();
	}
	sets() {
		this.wrap.quicksave();
		runnee = new EditorSetsScreen();
	}
}