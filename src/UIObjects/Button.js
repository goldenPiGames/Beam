const BUTTON_BORDER_WIDTH = 2;

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
		var color = this.active ? (this.clicked ? settings.click_color : (this.hovered ? settings.hover_color : settings.normal_color)) : settings.disabled_color;
		ctx.lineWidth = BUTTON_BORDER_WIDTH;
		ctx.strokeStyle = color;
		
		ctx.fillStyle = settings.background_color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		
		var bbw = BUTTON_BORDER_WIDTH;
		ctx.strokeRect(this.x + bbw/2, this.y + bbw/2, this.width - bbw, this.height - bbw);
		
		var fontSize = 20;
		ctx.fillStyle = color;
		ctx.font = fontSize + "px "+settings.font;
		ctx.textBaseline = "top";
		ctx.textAlign = "center";
		
		ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2 - fontSize/2);
	}
}
