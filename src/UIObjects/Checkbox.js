function Checkbox(x, y, width, height, text, hoverText, handler = doNothing, checked = false) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	this.hoverText = hoverText;
	this.handler = handler;
	this.checked = checked;
	this.clicked = false;
	this.hovered = false;
}
Checkbox.prototype = Object.create(UIObjectBase);

Checkbox.prototype.update = function() {
	this.updateMouse();
	if (this.hovered && this.hoverText != undefined)
		infoField.setText(this.hoverText);
	if (this.clicked) {
		this.checked = !this.checked;
		this.handler(this.checked);
	}
}

Checkbox.prototype.draw = function() {
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