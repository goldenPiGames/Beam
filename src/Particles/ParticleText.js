var ParticleText = function(text, x, y, dx, dy, height, fill, stroke, fade) {
	this.text = text;
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.height = height;
	this.fill = fill;
	this.stroke = stroke;
	this.alpha = 1;
	this.fade = fade;
}
ParticleText.prototype = Object.create(ParticleBase);

ParticleText.prototype.draw = function(ctx) {
	ctx.globalAlpha = this.alpha;
    ctx.font = "bold " + this.height + "px "+settings.font;
	
	ctx.strokeStyle = this.stroke;
	ctx.lineWidth = 2;
	ctx.strokeText(this.text, this.x - (ctx.measureText(this.text).width / 2), this.y - this.height/2);
	
	ctx.fillStyle = this.fill;
	ctx.fillText(this.text, this.x - (ctx.measureText(this.text).width / 2), this.y - this.height/2);
	
}