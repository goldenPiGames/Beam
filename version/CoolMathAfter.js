var doneSplash = false;
const COOLMATH_SPLASH_TIME = FPS * 3;

function getVersionSplash() {
	if (!doneSplash) {
		doneSplash = true;
		return new CoolMathSplash();
	}
}

class CoolMathSplash extends Screen {
	constructor() {
		super();
		this.image = coolmathSplash;
		this.timer = 0;
	}
	update() {
		this.timer++;
		if (this.timer >= COOLMATH_SPLASH_TIME && (!settings.musicDontAsk || mouse.clicked)) {
			nextStartupScreen();
		}
	}
	draw() {
		ctx.drawImage(this.image, 0, 0);
		ctx.fillStyle = "#FFFFFF";
		if (this.timer > COOLMATH_SPLASH_TIME) {
			drawTextInRect(lg("CoolmathSplash-Continue"), WIDTH/5, HEIGHT*4/5, WIDTH*3/5, HEIGHT/6);
		}
	}
}