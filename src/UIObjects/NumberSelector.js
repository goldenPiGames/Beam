class NumberSelector extends UIObject {
	constructor(x, y, width, height, min, max, start, radix = 10) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.min = min;
		this.max = max;
		this.value = start || min;
		this.radix = radix;
		this.digits = Math.floor(Math.log(max)/Math.log(radix))+1
		var chwidth = width / this.digits;
		this.children = [];
		for (var i = 0; i < this.digits; i++) {
			this.children[i] = new NumberSelectorDigit(this.x + this.width - chwidth * (i+1), y, chwidth, height, this.radix, i, this);
		}
		this.updateDisp();
	}
	update() {
		this.children.forEach(oj=>oj.update());
		if (this.changed) {
			this.changed = false;
			this.updateDisp();
		}
	}
	updateDisp() {
		var disp = fillLeft(this.value.toString(this.radix).toUpperCase(), this.digits, "0");
		for (var i = 0; i < this.digits; i++) {
			this.children[this.digits-i-1].disp = disp[i];
		}
	}
	draw() {
		this.children.forEach(oj=>oj.draw());
	}
	changeNumber(by = 0, canLoop = true) {
		var was = this.value;
		this.value += by;
		if (this.value > this.max) {
			if (canLoop & was >= this.max)
				this.value = this.min;
			else
				this.value = this.max;
		} else if (this.value < this.min) {
			if (canLoop && was <= this.min)
				this.value = this.max;
			else
				this.value = this.min;
		}
		this.changed = true;
	}
	getNumber() {
		return this.value;
	}
	setNumber(num) {
		this.value = Math.max(this.min, Math.min(this.max, Math.floor(num)));
		this.changed = true;
	}
}


class NumberSelectorDigit extends UIObject {
	constructor(x, y, width, height, radix, index, parent) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.radix = radix;
		this.index = index;
		this.parent = parent;
		this.upButton = new Button(this.x, this.y, this.width, this.height/4, "↑", ()=>this.scrollUp(1, true));
		this.downButton = new Button(this.x, this.y+this.height*3/4, this.width, this.height/4, "↓", ()=>this.scrollDown(1, true));
		this.disp = 0;
	}
	update() {
		this.updateMouse();
		this.upButton.update();
		this.downButton.update();
		if (this.hovered && mouse.scrolled) {
			if (mouse.scrolled < 0)
				this.scrollUp(Math.abs(mouse.scrolled), false);
			else
				this.scrollDown(Math.abs(mouse.scrolled), false);
		}
	}
	draw() {
		this.upButton.draw();
		this.downButton.draw();
		ctx.fillStyle = this.hovered ? palette.hover : palette.normal;
		drawTextInRect(this.disp, this.x, this.y+this.height/4, this.width, this.height/2);
	}
	scrollDown(amount = 1, canLoop = true) {
		this.parent.changeNumber(-amount*this.radix**this.index, canLoop)
	}
	scrollUp(amount = 1, canLoop = true) {
		this.parent.changeNumber(amount*this.radix**this.index, canLoop)
	}
}

//------------------------------------------------------------------ Code -----------------------------------------------------

class CodeNumberSelector extends UIObject {
	constructor(x, y, width, height, digits, radix = 10) {
		super();
		this.digits = digits;
		this.radix = radix;
		var chwidth = width / digits;
		this.children = [];
		for (var i = 0; i < digits; i++) {
			this.children[i] = new CodeNumberSelectorDigit(x + chwidth * i, y, chwidth, height, this.radix, this);
		}
	}
	update() {
		this.children.forEach(oj=>oj.update());
	}
	draw() {
		this.children.forEach(oj=>oj.draw());
	}
	getNumber() {
		var num = 0;
		for (var i = 0; i < this.digits; i++) {
			num += this.children[i].value * this.radix**(this.digits-1-i);
		}
		return num;
	}
	setNumber(num) {
		for (var i = 0; i < this.digits; i++) {
			//console.log(num, this.radix**(this.digits-1-i), this.radix**(this.digits-i), (num / (this.radix**(this.digits-1-i)))) % (this.radix**(this.digits-i))
			this.children[i].value = Math.floor((num % (this.radix**(this.digits-i))) / (this.radix**(this.digits-1-i))) || 0;
		}
	}
}

class CodeNumberSelectorDigit extends UIObject {
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
		ctx.fillStyle = this.hovered ? palette.hover : palette.normal;
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