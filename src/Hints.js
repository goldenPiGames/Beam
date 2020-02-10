class HintScreen extends Screen {
	constructor(returnTo, draw) {
		super();
		this.returnTo = returnTo;
		this.drawBack = draw || returnTo;
		this.width = 300;
		this.height = HEIGHT;
		this.x = WIDTH-this.width;
		this.y = 0;
		this.setTab(returnTo.hintTabIndex || 0);
		this.makeTabs();
	}
	makeTabs() {
		this.tabs = new Tabs(this.x, this.y+100, this.width, 30, [lg("Hint-TabModeRules"), lg("Hint-TabModeHints"), lg("Hint-TabLevelHints")], num=>this.setTab(num), ()=>this.tabIndex);
	}
	setTab(dex) {
		this.tabIndex = dex;
		switch (this.tabIndex) {
			case 0: this.text = lg(this.returnTo.level.lModeRules); break;
			case 1: this.text = lg(this.returnTo.level.lModeHints); break;
			case 2: this.text = lg(this.returnTo.level.lLevelHints) || lg("Hint-NoLevelHints"); break;
		}
	}
	update() {
		if (mouse.clicked && !this.intersectsMouse()) {
			this.returnTo.hintTabIndex = this.tabIndex;
			runnee = this.returnTo;
			return;
		}
		this.tabs.update();
	}//TODO show one hint at a time
	draw() {
		this.returnTo.draw();
		ctx.fillStyle = settings.background_color;
		ctx.globalAlpha = .8;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.globalAlpha = 1;
		this.tabs.draw();
		ctx.fillStyle = settings.normal_color;
		drawTextInRect(lg(this.returnTo.level.lModeName), this.x, this.y, this.width, 60);
		drawParagraphInRect(this.text, this.x, this.y+140, this.width, this.height-140, 20);
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