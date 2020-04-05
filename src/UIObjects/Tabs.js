
class Tabs extends UIObject {
	constructor(x, y, width, height, texts, handler, getter) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.numTabs = texts.length;
		this.tabWidth = this.width/this.numTabs;
		this.tabs = [];
		for (var i = 0; i < this.numTabs; i++) {
			this.tabs[i] = new TabsTab(this.x+this.tabWidth*i, this.y, this.tabWidth, this.height, texts[i], i, this);
		}
		this.handler = handler;
		this.getter = getter;
		
	}
	update() {
		this.updateMouse();
		this.tabs.forEach(tab=>tab.update());
		this.index = this.getter();
	}
	draw() {
		this.tabs.forEach(tab=>tab.draw(this.index));
	}
	tabClicked(dex) {
		this.handler(dex);
	}
}

class TabsTab extends UIObject {
	constructor(x, y, width, height, text, index, parent) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.text = text;
		this.index = index;
		this.parent = parent;
	}
	update() {
		this.updateMouse();
		if (this.hovered)
			hovered = true;
		if (this.clicked)
			this.parent.tabClicked(this.index);
	}
	draw(index) {
		var color = index == this.index ? palette.click : this.hovered ? palette.hover : palette.normal;
		ctx.strokeStyle = color;
		
		ctx.fillStyle = palette.background;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		
		this.stroke();
		
		ctx.fillStyle = color;
		drawTextInRect(this.text, this.x+BUTTON_BORDER_WIDTH, this.y+BUTTON_BORDER_WIDTH, this.width-BUTTON_BORDER_WIDTH*2, this.height-BUTTON_BORDER_WIDTH*2);
		
	}
}