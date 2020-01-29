function RadioButtons(x, y, width, height, texts, hoverTexts = null, handler = doNothing) {
	this.index = -1;
    this.texts = texts;
	this.children = [];
	var newButton;
	for (var i = 0; i < texts.length; i++) {
		newButton = new RadioButtonElement(x, y + i * height, width, height, this, texts[i], hoverTexts == null ? null : hoverTexts[i], i);
		this.children.push(newButton);
	}
	this.handler = handler;
}

RadioButtons.prototype.setIndex = function(newIndex, newText) {
	this.index = newIndex;
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].selected = (i == newIndex);
	}
	if (this.handler) {
		this.handler(newIndex, newText);
	}
}

RadioButtons.prototype.setValue = function(newText) {
	this.setIndex(this.texts.indexOf(newText), newText);
}

RadioButtons.prototype.update = function() {
	this.children.forEach(function(item) {
		item.update();
	});
}

RadioButtons.prototype.draw = function(ctx) {
	this.children.forEach(function(item) {
		item.draw();
	});
}

//--------------------------------------------------------------- Element ---------------------------------------------------------

function RadioButtonElement(x, y, width, height, parent, text, hoverText, index) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
	this.selected = false;
    this.clicked = true;
    this.hovered = false;
    this.text = text;
	this.hoverText = hoverText;
	this.parent = parent;
	this.index = index;
	this.handler = function(){
		parent.setIndex(this.index, this.text);
	};
}

RadioButtonElement.prototype = Object.create(UIObjectBase);

RadioButtonElement.prototype.update = function() {
    this.updateMouse();
	if (this.hovered) {
		infoField.setText(this.hoverText);
	}
    if (this.clicked) {
		this.handler();
    }
}

RadioButtonElement.prototype.draw = function() {
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
	
	ctx.fillText(this.text, this.x + this.height, this.y + (this.height/2) - (fontSize/2));
}