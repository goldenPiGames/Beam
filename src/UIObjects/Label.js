
/*class Label extends UIObject {
	constructor(x, y, width, height, hoverText, normalColor = palette.normal, align = "center") {
		super(x, y, width, height);
		this.text = text;
		this.normalColor = normalColor;
		this.align = align;
		this.clicked = false;
		this.hovered = false;
	}
	update() {
		super.update();
	}
	draw() {
		ctx.fillStyle = this.normalColor;
		ctx.font = this.height + "px " + settings.font;
		ctx.textAlign = this.align;
		
		ctx.fillText(this.text, this.x + (this.align=="left" ? 0 : this.align=="right" ? 1 : .5) * this.width, this.y);
	}
}*/

class LabelAbove extends UIObject {
	constructor(object, height, text) {
		super();
		this.object = object;
		this.height = height;
		this.text = text;
	}
	update() {
		
	}
	draw() {
		ctx.fillStyle = palette.normal;
		drawTextInRect(this.text, this.object.x, this.object.y-this.height, this.object.width, this.height);
	}
}

class LebelledObject extends UIObject {
	constructor(object, text, textheight) {
		this.object = object;
		this.text = text;
		this.textHeight = textHeight;
	}
	update() {
		this.object.update();
	}
	draw() {
		this.object.draw();
		ctx.fillStyle = this.object.hovered ? palette.hover : palette.normal;
		drawTextInRect(this.object.x, this.object.y-this.textHeight, this.object.width, this.textHeight);
	}
}