class HybridButton extends UIObject {
	constructor(rx, ry, rwidth, rheight, cx, cy, cradius, text, drawI, handler = doNothing) {
		super();
		this.rect = new HybridButtonRect(rx, ry, rwidth, rheight, text);
		this.circ = new HybridButtonCirc(cx, cy, cradius, drawI);
		this.handler = handler;
	}
	update() {
		this.rect.update();
		this.circ.update();
		this.hovered = this.rect.hovered || this.circ.hovered;
		this.clicked = this.rect.clicked || this.circ.clicked;
		if (this.hovered)
			hovered = true;
		if (this.clicked)
			this.handler();
	}
	draw() {
		var color = this.clicked ? palette.click : this.hovered ? palette.hover : palette.normal;
		this.rect.draw1(color);
		this.circ.draw1(color);
		this.rect.draw2(color);
		this.circ.draw2(color);
	}
}

class HybridButtonRect extends UIObject {
	constructor(x, y, width, height, text) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.text = text;
	}
	update() {
		this.updateMouse();
	}
	draw1(color) {
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.strokeStyle = color;
		ctx.strokeRect(this.x+1, this.y+1, this.width-2, this.height-2);
	}
	draw2(color) {
		ctx.fillStyle = palette.background;
		ctx.fillRect(this.x+2, this.y+2, this.width-4, this.height-4);
		ctx.fillStyle = color;
		drawTextInRect(this.text, this.x+4, this.y+4, this.width-8, this.height-8);
	}
}

class HybridButtonCirc extends UIObject {
	constructor(x, y, radius, drawI) {
		super();
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.drawI = drawI;
	}
	update() {
		this.updateMouse();
	}
	draw1(color) {
		ctx.lineWidth = BUTTON_BORDER_WIDTH;
		ctx.strokeStyle = color;
		ctx.fillStyle = palette.background;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius-BUTTON_BORDER_WIDTH/2, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		this.drawI();
	}
	draw2(color) {
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		this.drawI();
	}
}

function alternateHybridButtons(x, y, width, height, eak) {
	var butts = [];
	var yInterval = height / eak.length;
	var heightEach = yInterval*.8 - 5;
	return eak.map((ak, dex) => {
			var butt = new HybridButton(x, y+dex*yInterval, width, heightEach, dex%2 ? x+width+heightEach*.75 : (x-heightEach*.75), y+dex*yInterval+heightEach/2, heightEach, ak.text, ak.drawI, ak.handler);
			butt.index = dex;
			/*for (prop in ak) { //easy way to add extra properties, like hover text in the race/multiplayer menu
				if (prop != "text" && prop != "drawI" && prop != "handler") {
					butt[prop] = ak[prop];
				}
			}*/
			return butt;
		});
}