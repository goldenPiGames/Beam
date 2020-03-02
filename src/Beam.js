function drawBeam(paff) {
	ctx.strokeStyle = palette.beam;
	ctx.lineWidth = 4;
	ctx.stroke(paff);
}

function drawBeamStop(x, y) {
	//particles.push(randomCursorEmber(x, y, palette.beam));
	particles.push(new BeamStopSpark(x, y));
}

class BeamStopSpark extends Particle {
	constructor(x, y) {
		super();
		this.x = x;
		this.y = y;
		this.radiusMax = 36;
		this.theta = 2*Math.PI*Math.random();
		this.color = palette.beam;
		this.fade = 16;
	}
	draw() {
		if (!(runnee instanceof LevelWrapper))
			return;
		this.radius = this.radiusMax * (1-this.alpha)
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x+this.radius*Math.cos(this.theta), this.y+this.radius*Math.sin(this.theta));
		ctx.stroke();
	}
}