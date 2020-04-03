class Screen {
	constructor() {
		
	}
	update() {
		this.objects.forEach(oj => oj.update());
	}
	draw() {
		clearBack();
		this.objects.forEach(oj => oj.draw());
	}
	snap() {
		clearBack();
		this.draw();
		return ctx.getImageData(0, 0, WIDTH, HEIGHT);
	}
}
Screen.prototype.isScreen = true;
Screen.prototype.overrideTouch = true;

class OverScreen extends Screen {
	constructor() {
		super();
	}
	clickedOutside() {
		return mouse.clicked && !this.intersectsMouse();
	}
	fillBackAndFrame(alphaAll, alphaBack) {
		ctx.fillStyle = palette.background;
		ctx.globalAlpha = alphaAll;
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.globalAlpha = alphaBack;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.globalAlpha = 1;
		ctx.lineWidth = 4;
		ctx.strokeStyle = palette.normal;
		ctx.strokeRect(this.x, this.y, this.width, this.height);
	}
}
OverScreen.prototype.overrideTouch = false;
OverScreen.prototype.intersectsMouse = UIObject.prototype.intersectsMouse;

function switchScreen(to) {
	if (typeof to == "function") {
		if (to.prototype.isScreen)
			to = new to();
		else {
			to();
			return;
		}
	}
	runnee = to;
	particles.push(new ColorFade(4, 0, 0));
}