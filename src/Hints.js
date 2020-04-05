class HintScreen extends OverScreen {
	constructor(wrap) {
		super();
		this.wrap = wrap;
		this.width = 300;
		this.height = HEIGHT;
		this.x = WIDTH-this.width;
		this.y = 0;
		this.hintIndices = wrap.hintIndices || [0, 0, 0];
		this.setTab(wrap.hintTabIndex || 0);
		this.makeTabs();
		this.prevHintButton = new Button(this.x, this.y+this.height-50, 50, 50, "<", ()=>this.prevHint());
		this.nextHintButton = new Button(this.x+this.width-50, this.y+this.height-50, 50, 50, ">", ()=>this.nextHint());
	}
	makeTabs() {
		this.tabs = new Tabs(this.x, this.y+100, this.width, 30, [lg("Hint-TabModeRules"), lg("Hint-TabModeHints"), lg("Hint-TabLevelHints")], num=>this.setTab(num), ()=>this.tabIndex);
	}
	setTab(dex) {
		this.tabIndex = dex;
		switch (this.tabIndex) {
			case 0: this.hints = lg(this.wrap.level.lModeRules); break;
			case 1: this.hints = lg(this.wrap.level.lModeHints); break;
			case 2: this.hints = this.wrap.level.getLevelHints(); break;
		}
		if (Array.isArray(this.hints))
			this.text = this.hints[this.hintIndices[this.tabIndex]];
		else
			this.text = this.hints;
	}
	update() {
		this.wrap.menuButton.update();
		if (runnee == this && this.clickedOutside()) {
			this.wrap.hintTabIndex = this.tabIndex;
			this.wrap.hintIndices = this.hintIndices;
			runnee = this.wrap;
			return;
		}
		this.tabs.update();
		if (Array.isArray(this.hints)) {
			this.prevHintButton.update();
			this.nextHintButton.update();
		}
	}//TODO show one hint at a time
	draw() {
		this.wrap.draw();
		ctx.fillStyle = palette.background;
		ctx.globalAlpha = .3;
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.globalAlpha = .7;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.globalAlpha = 1;
		this.tabs.draw();
		ctx.fillStyle = palette.normal;
		drawTextInRect(lg(this.wrap.level.lModeName), this.x, this.y, this.width, 60);
		drawParagraphInRect(this.text, this.x, this.y+140, this.width, this.height-200, 24);
		if (Array.isArray(this.hints)) {
			this.prevHintButton.draw();
			this.nextHintButton.draw();
			ctx.fillStyle = palette.normal;
			drawTextInRect((this.hintIndices[this.tabIndex]+1)+"/"+this.hints.length, this.prevHintButton.x+this.prevHintButton.width, this.prevHintButton.y, this.nextHintButton.x-this.prevHintButton.x-this.prevHintButton.width, this.prevHintButton.height);
		}
		this.wrap.menuButton.draw();
	}
	prevHint() {
		this.hintIndices[this.tabIndex] = Math.max(0, this.hintIndices[this.tabIndex]-1);
		this.text = this.hints[this.hintIndices[this.tabIndex]];
	}
	nextHint() {
		this.hintIndices[this.tabIndex] = Math.min(this.hints.length-1, this.hintIndices[this.tabIndex]+1);
		this.text = this.hints[this.hintIndices[this.tabIndex]];
	}
}

function bubbleDrawIHint() {
	ctx.lineWidth = .08*this.radius;
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.font = (this.radius*3/2)+"px sans-serif";
	ctx.fillText("?", this.x, this.y);
}