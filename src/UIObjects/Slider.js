class Slider extends UIObject {
	constructor(x, y, width, height, text, hoverText, min, max, handler, getter, getterText) {
		super(x, y, width, height);
		this.position = 0;
		this.text = text;
		this.hoverText = hoverText;
		this.min = min;
		this.max = max;
		this.handler = handler;
		this.getter = getter;
		this.getterText = getterText;
	}
	update() {
		super.update();
		if (this.hovered) {
			infoField.setText(this.hoverText);
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
		var val = this.getter();
		var portion = (val-this.min)/(this.max-this.min);
		
		ctx.globalAlpha = 1;
		ctx.fillStyle = this.forceBG || settings.background_color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		
		var color = this.forceColor || (this.held ? settings.click_color : (this.hovered ? settings.hover_color : settings.normal_color));
		ctx.strokeStyle = color;
		ctx.strokeRect(this.x-BUTTON_BORDER_WIDTH/2, this.y+BUTTON_BORDER_WIDTH/2, this.width+BUTTON_BORDER_WIDTH, this.height-BUTTON_BORDER_WIDTH);
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width*portion, this.height);
		ctx.strokeStyle = color;
		ctx.fillStyle = this.forceBG || settings.background_color;
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

class ColorPicker extends UIObject {
	constructor(x, y, text, hoverText, handler, initial) {
		super(x, y, 255, 150);
		this.handler = handler;
		this.header = new Label(this.x, this.y, 255, 30, text, hoverText);
		this.redSlider =   new Slider(this.x, this.y+ 65, 255, 25, "Red", "The amount of red that goes into the color. Mix it with blue to get magenta, or with green to get yellow.", 0, 255, (val)=>{this.changed=true;this.red=val}, ()=>this.red);
		this.redSlider.forceColor = "#FF0000"; this.redSlider.forceBG = "#000000";
		this.greenSlider = new Slider(this.x, this.y+ 95, 255, 25, "Green", "The amount of green that goes into the color. Mix it with red to get yellow, or with blue to get cyan.", 0, 255, (val)=>{this.changed=true;this.green=val}, ()=>this.green);
		this.greenSlider.forceColor = "#00FF00"; this.greenSlider.forceBG = "#000000";
		this.blueSlider =  new Slider(this.x, this.y+125, 255, 25, "Blue", "The amount of blue that goes into the color. Mix it with green to get cyan, or with red to get magenta.", 0, 255, (val)=>{this.changed=true;this.blue=val}, ()=>this.blue);
		this.blueSlider.forceColor = "#0000FF"; this.blueSlider.forceBG = "#000000";
		if (initial) {
			if (typeof initial == "function") {
				initial = initial();
			}
		} else
			initial = settings.normal_color;
		this.red = parseInt(initial.substring(1, 3), 16);
		this.green = parseInt(initial.substring(3, 5), 16);
		this.blue = parseInt(initial.substring(5, 7), 16);
	}
	update() {
		this.changed = false;
		this.header.update();
		this.redSlider.update();
		this.greenSlider.update();
		this.blueSlider.update();
		this.color = "#" + fillLeft(this.red.toString(16), 2) + fillLeft(this.green.toString(16), 2) + fillLeft(this.blue.toString(16), 2);
		this.header.normalColor = this.color;
		if (this.changed && this.handler) {
			this.handler(this.color);
		}
	}
	draw() {
		this.header.draw();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y+35, this.width, 25);
		this.redSlider.draw();
		this.greenSlider.draw();
		this.blueSlider.draw();
	}
}