function qAlert(text) {
	particles.push(new QAlert(text));
}

class QAlert extends Particle {
	constructor(text) {
		super();
		this.text = text;
	}
	draw() {
		ctx.fillStyle = palette.normal;
		drawTextInRect(this.text, 0, 0, WIDTH, 30);
	}
}
QAlert.prototype.fade = 60;