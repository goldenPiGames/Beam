const SCROLL_ELEMENT_HEIGHT = 22;
const SCROLL_BUTTON_HEIGHT = 30;
const SCROLL_BAR_WIDTH = 20;

class ScrollMenu extends UIObject {
	constructor(x, y, width, height, returnFunction, items = [], secondProperty = null, infoProperty = "description", enableProperty = function(val){return true}, highlightProperty = function(val){return false}) {
		super(x, y, width, height);
		this.currentScroll = 0;
		this.maxEntries = Math.floor((height - 4) / SCROLL_ELEMENT_HEIGHT);
		this.clicked = false;
		this.hovered = false;
		this.active = true;
		this.returnFunction = returnFunction;
		this.scrollBar = new ScrollBar(x + width - SCROLL_BAR_WIDTH, y + SCROLL_BUTTON_HEIGHT, SCROLL_BAR_WIDTH, height - 2*SCROLL_BUTTON_HEIGHT, "Scroll directly", this.maxEntries, items.length, (s)=>this.setBarScroll(s), ()=>this.currentScroll)
		this.upButton = new Button(x + width - SCROLL_BAR_WIDTH, y, SCROLL_BAR_WIDTH, SCROLL_BUTTON_HEIGHT, "↑", "Scroll up", ()=>this.scrollUp());
		this.downButton = new Button(x + width - SCROLL_BAR_WIDTH, y + height - SCROLL_BUTTON_HEIGHT, SCROLL_BAR_WIDTH, SCROLL_BUTTON_HEIGHT, "↓", "Scroll down", ()=>this.scrollDown());
		
		this.secondProperty = secondProperty;
		this.infoProperty = infoProperty;
		this.enableProperty = enableProperty;
		this.highlightProperty = highlightProperty;
		this.setItems(items);
	}
	setItems(items) {
		this.currentScroll = 0;
		this.items = items;
		this.maxScroll = Math.max(items.length-this.maxEntries, 0);
		this.scrollBar.max = items.length;
		this.itemElements = [];
		var newElement = null;
		for (var i = 0; i < this.maxEntries; i++) {
			newElement = new ScrollMenuElement(this.x, this.y + (i * SCROLL_ELEMENT_HEIGHT), this.width - SCROLL_BAR_WIDTH, SCROLL_ELEMENT_HEIGHT, this, items[i]);
			this.itemElements.push(newElement);
		}
	}
	scrollUp(amount = 1, canLoop = true) {
		this.currentScroll -= amount;
		if (this.currentScroll < 0) {
			if (canLoop)
				this.currentScroll = this.maxScroll;
			else
				this.currentScroll = 0;
		}
		this.putItems();
	}
	scrollDown(amount = 1, canLoop = true) {
		this.currentScroll += amount;
		if (this.currentScroll > this.maxScroll) {
			if (canLoop)
				this.currentScroll = 0;
			else
				this.currentScroll = this.maxScroll;
		}
		this.putItems();
	}
	setBarScroll(val) {
		this.currentScroll = val;
		this.putItems();
	}
	putItems() { //TODO use putItems as part of setItems
		this.maxScroll = Math.max(this.items.length-this.maxEntries, 0);
		this.scrollBar.max = this.items.length;
		if (this.currentScroll > this.maxScroll) {
			this.currentScroll = this.maxScroll;
		}
		for(var i = 0; i < this.maxEntries; i++) {
			this.itemElements[i].setItem(this.items[i + this.currentScroll]);
		}
	}
	update() {
		super.update();
		this.hoveredValue = null;
		//super.update();
		this.upButton.update();
		this.downButton.update();
		this.scrollBar.update();
		for (var i = 0; i < this.itemElements.length; i++) {
			this.itemElements[i].update();
		}
		if (this.hovered && mouse.scrolled) {
			if (mouse.scrolled < 0)
				this.scrollUp(Math.abs(mouse.scrolled), false);
			else
				this.scrollDown(Math.abs(mouse.scrolled), false);
		}
	}
	draw() {
		ctx.fillStyle = settings.background_color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.strokeStyle = settings.normal_color;
		ctx.strokeRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
		this.scrollBar.draw();
		this.upButton.draw();
		this.downButton.draw();
		for (var i = 0; i < this.itemElements.length; i++) {
			this.itemElements[i].draw();
		}
	}
	setHovered(value) {
		this.hoveredValue = value;
	}
	returnItem(value) {
		this.returnFunction(value, this);
	}
}
/* ------------------------------------------------ Scroll Menu Elements -------------------------------------------*/
class ScrollMenuElement extends UIObject {
	constructor(x, y, width, height, parent, value) {
		super(x, y, width, height)
		this.parent = parent;
		this.setItem(value);
		/*this.handler = function(){
			parent.returnItem(this.value);
		};*/
	}
	setItem(value) {
		this.value = value;
	}
	update() {
		super.update();
		if (this.value != undefined) {
			if (this.hovered) {
				infoField.setText(typeof this.parent.infoProperty == "function" ? this.parent.infoProperty(this.value) : this.value[this.parent.infoProperty]);
				this.parent.setHovered(this.value);
			}
			if (this.clicked)
				this.parent.returnItem(this.value);
		}
	}
	draw() {
		if (this.value) {
			var color = this.parent.enableProperty(this.value) ? ((this.clicked || this.parent.highlightProperty(this.value)) ? settings.click_color : (this.hovered ? settings.hover_color : settings.normal_color)) : settings.disabled_color;
			var fontSize = this.height - 3;
			ctx.fillStyle = color;
			ctx.font = fontSize + "px "+settings.font;
			ctx.textBaseline = "top";
			ctx.textAlign = "left";
			ctx.fillText(typeof this.value == "function" ? this.value.prototype.name : this.value.name, this.x+5, this.y+2);
			if (this.parent.secondProperty != null) {
				ctx.textAlign = "right";
				ctx.fillText(typeof this.parent.secondProperty == "function" ? this.parent.secondProperty(this.value) : this.value[this.parent.secondProperty], this.x + this.width-5, this.y+2);
			}
		}
	}
}
/* --------------------------------------------------------- Scroll Bar ---------------------------------------------------- */

class ScrollBar extends UIObject {
	constructor(x, y, width, height, hoverText, size, max, handler, getter) {
		super(x, y, width, height);
		this.hoverText = hoverText;
		this.min = 0;
		this.size = size;
		this.max = max;
		this.handler = handler;
		this.getter = getter;
	}
	update() {
		super.update();
		if (this.hovered && this.hoverText) {
			infoField.setText(this.hoverText);
		}
		if (this.clicked || this.held) {
			this.handler(Math.round(Math.max(this.min, Math.min(this.max-this.size, this.min - this.size/2 + (mouse.y-this.y)/this.height * (this.max-this.min)))));
		}
	}
	draw() {
		ctx.strokeStyle = this.held ? settings.click_color : this.hovered ? settings.hover_color : settings.normal_color;
		//ctx.strokeRect(this.x + this.width - SCROLL_BAR_WIDTH + 1, this.y + SCROLL_BUTTON_HEIGHT + (this.height - SCROLL_BUTTON_HEIGHT * 2) * this.currentScroll / (this.maxEntries + this.maxScroll), SCROLL_BAR_WIDTH - 2, (this.height - SCROLL_BUTTON_HEIGHT * 2) * this.maxEntries / (this.maxEntries + this.maxScroll));
		if (this.size < (this.max-this.min))
			ctx.strokeRect(this.x +1, this.y + this.height*this.getter()/this.max +1, this.width -2, this.height*this.size/this.max -2);
		else
			ctx.strokeRect(this.x +1, this.y +1, this.width -2, this.height -2);
	}
}