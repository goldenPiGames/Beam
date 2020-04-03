function popupConfirm(onYes, textTop, textYes, textNo) {
	runnee = new ConfirmPopup(runnee, onYes, textTop, textYes || lg("ConfirmPopup-Yes"), textNo || lg("ConfirmPopup-No"));
}


class ConfirmPopup extends OverScreen {
	constructor(returnTo, onYes, textTop, textYes, textNo) {
		super();
		this.returnTo = returnTo;
		this.textTop = textTop;
		this.x = WIDTH/3;
		this.y = HEIGHT/3;
		this.width = WIDTH/3;
		this.height = HEIGHT/3;
		this.buttons = [
			new Button(this.x+this.width/10, this.y+this.height/2, this.width*4/5, this.height/5, textYes, onYes),
			new Button(this.x+this.width/10, this.y+this.height*3/4, this.width*4/5, this.height/5, textNo, ()=>runnee=this.returnTo),
		];
	}
	update() {
		if (mouse.clicked && !this.intersectsMouse()) {
			runnee = this.returnTo;
			return;
		}
		this.buttons.forEach(butt=>butt.update());
	}
	draw() {
		this.returnTo.draw();
		ctx.fillStyle = palette.background;
		ctx.globalAlpha = .7;
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.globalAlpha = 1;
		ctx.lineWidth = 4;
		ctx.strokeStyle = palette.normal;
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = palette.normal;
		drawTextInRect(this.textTop, this.x, this.y, this.width, this.height/2);
		this.buttons.forEach(butt=>butt.draw());
	}
}