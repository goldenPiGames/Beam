class Slider extends UIObject {
	constructor(x, y, width, height, text, min, max, handler, getter, getterText) {
		super(x, y, width, height);
		this.position = 0;
		this.text = text;
		this.min = min;
		this.max = max;
		this.handler = handler;
		this.getter = getter;
		this.getterText = getterText;
	}
	update() {
		super.update();
		if (this.hovered) {
			hovered = true;
		}
		if (this.held) {
			var portion;
			if (mouse.x < this.x)
				portion = 0;
			else if (mouse.x >= this.x+this.width)
				portion = 1;
			else
				portion = (mouse.x-this.x)/this.width;
			this.handler(this.min + portion*(this.max-this.min));
		}
	}
	draw() {
		ctx.lineWidth = BUTTON_BORDER_WIDTH;
		var val = this.getter();
		var portion = (val-this.min)/(this.max-this.min);
		
		ctx.globalAlpha = 1;
		ctx.fillStyle = this.forceBG || palette.background;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		
		var color = this.forceColor || (this.held ? palette.click : (this.hovered ? palette.hover : palette.normal));
		ctx.strokeStyle = color;
		ctx.strokeRect(this.x-BUTTON_BORDER_WIDTH/2, this.y+BUTTON_BORDER_WIDTH/2, this.width+BUTTON_BORDER_WIDTH, this.height-BUTTON_BORDER_WIDTH);
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width*portion, this.height);
		ctx.strokeStyle = color;
		ctx.fillStyle = this.forceBG || palette.background;
		ctx.font = (this.height - 6) + "px " + settings.font;
		ctx.textBaseline = "top";
		ctx.textAlign = "left";
		ctx.strokeText(this.text, this.x+3, this.y+3);
		ctx.fillText(this.text, this.x+3, this.y+3);
		ctx.textAlign = "right";
		var text = this.getterText ? this.getterText() : val;
		ctx.strokeText(text, this.x+this.width-3, this.y+3);
		ctx.fillText(text, this.x+this.width-3, this.y+3);
	}
}

// ------------------------------------------------------------------------------ Color Picker ---------------------------------

const COLOR_PICKER_TEXT_HEIGHT = 30;

class ColorPicker extends UIObject {
	constructor(x, y, text, handler, initial) {
		super();
		this.handler = handler;
		this.x = x;
		this.y = y;
		this.width = 255;
		this.height = 150;
		this.header = text;
		this.redSlider =   new Slider(this.x, this.y+ 65, 255, 25, "R", 0, 255, val=>{this.changed=true;this.red=Math.round(val)}, ()=>this.red);
		this.redSlider.forceColor = "#FF0000"; this.redSlider.forceBG = "#000000";
		this.greenSlider = new Slider(this.x, this.y+ 95, 255, 25, "G", 0, 255, val=>{this.changed=true;this.green=Math.round(val)}, ()=>this.green);
		this.greenSlider.forceColor = "#00FF00"; this.greenSlider.forceBG = "#000000";
		this.blueSlider =  new Slider(this.x, this.y+125, 255, 25, "B", 0, 255, val=>{this.changed=true;this.blue=Math.round(val)}, ()=>this.blue);
		this.blueSlider.forceColor = "#0000FF"; this.blueSlider.forceBG = "#000000";
		if (initial) {
			if (typeof initial == "function") {
				initial = initial();
			}
		} else
			initial = palette.normal;
		this.red = parseInt(initial.substring(1, 3), 16);
		this.green = parseInt(initial.substring(3, 5), 16);
		this.blue = parseInt(initial.substring(5, 7), 16);
	}
	update() {
		this.changed = false;
		this.redSlider.update();
		this.greenSlider.update();
		this.blueSlider.update();
		this.color = "#" + fillLeft(this.red.toString(16), 2) + fillLeft(this.green.toString(16), 2) + fillLeft(this.blue.toString(16), 2);
		if (this.changed && this.handler) {
			this.handler(this.color);
		}
	}
	draw() {
		if (this.color == palette.background) {
			ctx.fillStyle = palette.normal;
			ctx.fillRect(this.x, this.y, this.width, 30);
		}
		ctx.fillStyle = this.color;
		drawTextInRect(this.header, this.x, this.y, this.width, COLOR_PICKER_TEXT_HEIGHT);
		ctx.fillRect(this.x, this.y+35, this.width, 25);
		this.redSlider.draw();
		this.greenSlider.draw();
		this.blueSlider.draw();
	}
}