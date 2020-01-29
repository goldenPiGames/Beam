var ColorFade = function(fade, x=0, y=0, width=settings.width, height=settings.height, color=settings.background_color) {
	this.fade = fade;
	this.color = color;
	this.x = x;
	this.y = x;
    this.width = width;
	this.height = height;
	if (ONLINE)
		this.oldData = ctx.getImageData(this.x, this.y, this.width, this.height);
}
ColorFade.prototype = Object.create(ParticleBase);
ColorFade.prototype.draw = function(ctx) {
	if (this.alpha > .5) {
		ctx.globalAlpha = 1;
		if (ONLINE) {
			ctx.putImageData(this.oldData, this.x, this.y);
			ctx.globalAlpha = 2 - 2 * this.alpha;
		}
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		
	} else {
		ctx.globalAlpha = 2 * this.alpha;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}