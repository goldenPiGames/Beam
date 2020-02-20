class RadioButtons extends UIObject {
	constructor(x, y, width, height, texts, handler = doNothing, index = -1) {
		super();
		this.texts = texts;
		this.children = [];
		var newButton;
		this.children = texts.map((tex, dex)=> new RadioButtonElement(x, y + dex * height, width, height, this, tex, dex));
		this.handler = handler;
		this.setIndex(index, false);
	}
	setIndex(newIndex, handle = true) {
		this.index = newIndex;
		for (var i = 0; i < this.children.length; i++) {
			this.children[i].selected = (i == newIndex);
		}
		if (handle && this.handler) {
			this.handler(newIndex);
		}
	}
	update() {
		this.children.forEach(oj=>oj.update());
	}
	draw(ctx) {
		this.children.forEach(oj=>oj.draw());
	}
}

//--------------------------------------------------------------- Element ---------------------------------------------------------

class RadioButtonElement extends UIObject {
	constructor(x, y, width, height, parent, text, index) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.selected = false;
		this.clicked = true;
		this.hovered = false;
		this.text = text;
		this.parent = parent;
		this.index = index;
	}
	update() {
		this.updateMouse();
		if (this.hovered) {
			hovered = true;
		}
		if (this.clicked) {
			this.parent.setIndex(this.index, this.text);
		}
	}
	draw() {
		ctx.lineWidth = 4;
		ctx.strokeStyle = (this.hovered) ? settings.hover_color : settings.normal_color;
		ctx.fillStyle = (this.selected) ? settings.click_color : settings.background_color;
		
		var r = this.height/3;
		
		ctx.beginPath();
		ctx.arc(this.x + r, this.y + this.height/2, r, 0, 2*Math.PI);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		
		var fontSize = this.height * 4/5;
		ctx.fillStyle = this.selected ? settings.click_color : (this.hovered ? settings.hover_color : settings.normal_color);
		ctx.font = fontSize + "px "+settings.font;
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		
		ctx.fillText(this.text, this.x + this.height, this.y + (this.height/2) - (fontSize/2));
	}
}