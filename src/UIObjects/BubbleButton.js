class BubbleButton extends UIObject {
	constructor(x, y, radius, handler = doNothing, drawI = doNothing) {
		super();
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.handler = handler;
		this.drawI = drawI;
	}
	update() {
		super.update();
		if (this.hovered)
			hovered = true;
		if (this.clicked)
			this.handler();
	}
	draw() {
		ctx.lineWidth = 4;
		var color = this.clicked ? settings.click_color : (this.hovered ? settings.hover_color : settings.normal_color);
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		ctx.closePath();
		ctx.stroke();
		this.drawI();
		
	}
}

function bubbleDrawIPlay() {
	var path = new Path2D();
	path.moveTo(this.x-this.radius/3, this.y-this.radius/2);
	path.lineTo(this.x+this.radius/2, this.y);
	path.lineTo(this.x-this.radius/3, this.y+this.radius/2);
	ctx.fill(path);
}

function bubbleDrawIPause() {
	ctx.fillRect(this.x-.5*this.radius, this.y-.5*this.radius, .4*this.radius, 1.0*this.radius);
	ctx.fillRect(this.x+.1*this.radius, this.y-.5*this.radius, .4*this.radius, 1.0*this.radius);
}

function bubbleDrawIReturn() {
	ctx.lineWidth = .1*this.radius;
	ctx.beginPath();
	ctx.moveTo(this.x-.4*this.radius, this.y-.4*this.radius);
	ctx.lineTo(this.x+.5*this.radius, this.y-.4*this.radius);
	ctx.lineTo(this.x+.5*this.radius, this.y+.4*this.radius);
	ctx.lineTo(this.x-.4*this.radius, this.y+.4*this.radius);
	ctx.stroke();
	var path = new Path2D();
	path.moveTo(this.x-.2*this.radius, this.y+.2*this.radius);
	path.lineTo(this.x-.6*this.radius, this.y+.4*this.radius);
	path.lineTo(this.x-.2*this.radius, this.y+.6*this.radius);
	ctx.fill(path);
}

function bubbleDrawIHyperlink() {
	ctx.lineWidth = .1*this.radius;
	ctx.beginPath();
	ctx.arc(this.x+.3*this.radius, this.y-.3*this.radius, .3*this.radius, -Math.PI*3/4, Math.PI/4);
	ctx.arc(this.x+.1*this.radius, this.y-.1*this.radius, .3*this.radius, Math.PI/4, Math.PI*3/4);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(this.x-.3*this.radius, this.y+.3*this.radius, .3*this.radius, Math.PI/4, -Math.PI*3/4);
	ctx.arc(this.x-.1*this.radius, this.y+.1*this.radius, .3*this.radius, -Math.PI*3/4, -Math.PI/4);
	ctx.stroke();
}