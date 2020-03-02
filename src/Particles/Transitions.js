class ColorFade extends Particle {
	constructor(fade=.25, x=0, y=0, width=WIDTH, height=HEIGHT, color=palette.background) {
		super();
		this.fade = fade;
		this.color = color;
		this.x = x;
		this.y = x;
		this.width = width;
		this.height = height;
		//if (ONLINE)
			this.oldData = ctx.getImageData(this.x, this.y, this.width, this.height);
	}
	draw(ctx) {
		if (this.alpha > .5) {
			ctx.globalAlpha = 1;
			//if (ONLINE) {
				ctx.putImageData(this.oldData, this.x, this.y);
				ctx.globalAlpha = 2 - 2 * this.alpha;
			//}
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
			
		} else {
			ctx.globalAlpha = 2 * this.alpha;
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}
}