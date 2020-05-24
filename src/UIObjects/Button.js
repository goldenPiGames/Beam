const BUTTON_BORDER_WIDTH = 3;

class Button extends UIObject {
	constructor(x, y, width, height, text, handler = doNothing, active = true) {
		super(x, y, width, height);
		this.text = text;
		this.handler = handler;
		this.active = active;
	}
	update() {
		super.update();
		if (this.hovered)
			hovered = true;
		if (this.clicked && this.active)
			this.handler();
	}
	draw() {
		ctx.globalAlpha = 1;
		var color = this.active ? (this.clicked ? palette.click : (this.hovered ? palette.hover : palette.normal)) : palette.disabled;
		ctx.lineWidth = BUTTON_BORDER_WIDTH;
		ctx.strokeStyle = color;
		
		ctx.fillStyle = palette.background;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		
		this.stroke();
		
		ctx.fillStyle = color;
		drawTextInRect(this.text, this.x+BUTTON_BORDER_WIDTH*2, this.y+BUTTON_BORDER_WIDTH*2, this.width-BUTTON_BORDER_WIDTH*4, this.height-BUTTON_BORDER_WIDTH*4);
	}
}
