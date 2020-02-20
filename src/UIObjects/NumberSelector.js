class NumberSelector extends UIObject {
	constructor(x, y, width, height, digits, radix = 10) {
		super();
		this.radix = radix;
		var chwidth = width / digits;
		this.children = [];
		for (var i = 0; i < digits; i++) {
			this.children.unshift(new NumberSelectorDigit(x + chwidth * i, y, chwidth, height, this.radix, this));
		}
	}
	update() {
		this.children.forEach(oj=>oj.update());
	}
	draw() {
		this.children.forEach(oj=>oj.draw());
	}
	getNumber() {
		
	}
}

class NumberSelectorDigit extends UIObject {
	constructor(x, y, width, height, radix, parent) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.radix = radix;
		this.parent = parent;
		this.upButton = new Button(this.x, this.y, this.width, this.height/4, "↑", ()=>this.scrollUp());
		this.downButton = new Button(this.x, this.y+this.height*3/4, this.width, this.height/4, "↓", ()=>this.scrollDown());
		this.value = 0;
	}
	update() {
		this.updateMouse();
		this.upButton.update();
		this.downButton.update();
		if (this.hovered && mouse.scrolled) {
			if (mouse.scrolled < 0)
				this.scrollUp(Math.abs(mouse.scrolled), true);
			else
				this.scrollDown(Math.abs(mouse.scrolled), true);
		}
	}
	draw() {
		this.upButton.draw();
		this.downButton.draw();
		ctx.fillStyle = this.hovered ? settings.hover_color : settings.normal_color;
		drawTextInRect(this.value.toString(this.radix).toUpperCase(), this.x, this.y+this.height/4, this.width, this.height/2);
	}
	scrollDown(amount = 1, canLoop = true) {
		this.value -= amount;
		if (this.value < 0) {
			if (canLoop)
				this.value = this.radix-1;
			else
				this.value = 0;
		}
	}
	scrollUp(amount = 1, canLoop = true) {
		this.value += amount;
		if (this.value >= this.radix) {
			if (canLoop)
				this.value = 0;
			else
				this.value = this.radix-1;
		}
	}
}