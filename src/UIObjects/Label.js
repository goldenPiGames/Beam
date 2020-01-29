
class Label extends UIObject {
	constructor(x, y, width, height, text, hoverText, normalColor = settings.normal_color, align = "center") {
		super(x, y, width, height);
		this.text = text;
		this.hoverText = hoverText;
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
}

function outof(current, max) {
	return current + "/" + max;
}