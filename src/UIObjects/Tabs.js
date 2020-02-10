
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
		var color = index == this.index ? settings.click_color : this.hovered ? settings.hover_color : settings.normal_color;
		ctx.lineWidth = BUTTON_BORDER_WIDTH;
		ctx.strokeStyle = color;
		
		ctx.fillStyle = settings.background_color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		
		var bbw = BUTTON_BORDER_WIDTH;
		ctx.strokeRect(this.x + bbw/2, this.y + bbw/2, this.width - bbw, this.height - bbw);
		
		var fontSize = 18;
		ctx.fillStyle = color;
		ctx.font = fontSize + "px "+settings.font;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		
		ctx.fillText(this.text, this.x + this.width/2, this.y + this.height/2);
		
	}
}