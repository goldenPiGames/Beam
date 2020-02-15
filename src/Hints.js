class HintScreen extends Screen {
	constructor(wrap) {
		super();
		this.wrap = wrap;
		this.width = 300;
		this.height = HEIGHT;
		this.x = WIDTH-this.width;
		this.y = 0;
		this.setTab(wrap.hintTabIndex || 0);
		this.makeTabs();
	}
	makeTabs() {
		this.tabs = new Tabs(this.x, this.y+100, this.width, 30, [lg("Hint-TabModeRules"), lg("Hint-TabModeHints"), lg("Hint-TabLevelHints")], num=>this.setTab(num), ()=>this.tabIndex);
	}
	setTab(dex) {
		this.tabIndex = dex;
		switch (this.tabIndex) {
			case 0: this.text = lg(this.wrap.level.lModeRules); break;
			case 1: this.text = lg(this.wrap.level.lModeHints); break;
			case 2: this.text = lg(this.wrap.level.lLevelHints) || lg("Hint-NoLevelHints"); break;
		}
	}
	update() {
		this.wrap.menuButton.update();
		if (runnee == this && mouse.clicked && !this.intersectsMouse()) {
			this.wrap.hintTabIndex = this.tabIndex;
			runnee = this.wrap;
			return;
		}
		this.tabs.update();
	}//TODO show one hint at a time
	draw() {
		this.wrap.level.draw();
		ctx.fillStyle = settings.background_color;
		ctx.globalAlpha = .3;
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.globalAlpha = .7;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.globalAlpha = 1;
		this.tabs.draw();
		ctx.fillStyle = settings.normal_color;
		drawTextInRect(lg(this.wrap.level.lModeName), this.x, this.y, this.width, 60);
		drawParagraphInRect(this.text, this.x, this.y+140, this.width, this.height-140, 20);
		this.wrap.menuButton.draw();
	}
}
HintScreen.prototype.intersectsMouse = UIObject.prototype.intersectsMouse;


function bubbleDrawIHint() {
	ctx.lineWidth = .08*this.radius;
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.font = (this.radius*3/2)+"px sans-serif";
	ctx.fillText("?", this.x, this.y);
}