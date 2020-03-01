class Checkbox extends UIObject {
	constructor(x, y, width, height, text, handler = doNothing, checked = false) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.text = text;
		this.handler = handler;
		this.checked = checked;
	}
	update() {
		this.updateMouse();
		if (this.hovered)
			hovered = true;
		if (this.clicked) {
			this.checked = !this.checked;
			this.handler(this.checked);
		}
	}
	draw() {
		ctx.lineWidth = 4;
		ctx.strokeStyle = (this.hovered) ? settings.hover_color : settings.normal_color;
		ctx.fillStyle = (this.checked) ? settings.click_color : settings.background_color;
		
		ctx.strokeRect(this.x, this.y + this.height/6, this.height*2/3, this.height*2/3);
		ctx.fillRect(this.x, this.y + this.height/6, this.height*2/3, this.height*2/3);
		
		var fontSize = this.height * 4/5;
		ctx.fillStyle = this.selected ? settings.click_color : (this.hovered ? settings.hover_color : settings.normal_color);
		ctx.font = fontSize + "px "+settings.font;
		ctx.textAlign = "left";
		
		ctx.fillText(this.text, this.x + this.height, this.y + (this.height/2) - (fontSize/2));
	}
}