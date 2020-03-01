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