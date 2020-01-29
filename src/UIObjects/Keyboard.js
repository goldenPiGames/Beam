var Keyboard = function(x, y, width, destination=null) {
	var thisser = this;
	var scale = width / 10;
	var size = width/10 - 5;
	this.children = [
		/*
		new KeyboardKey("1", x, y, size, size, this),
		new KeyboardKey("2", x+scale, y, size, size, this),
		new KeyboardKey("3", x+2*scale, y, size, size, this),
		new KeyboardKey("4", x+3*scale, y, size, size, this),
		new KeyboardKey("5", x+4*scale, y, size, size, this),
		new KeyboardKey("6", x+5*scale, y, size, size, this),
		new KeyboardKey("7", x+6*scale, y, size, size, this),
		new KeyboardKey("8", x+7*scale, y, size, size, this),
		new KeyboardKey("9", x+8*scale, y, size, size, this),
		new KeyboardKey("0", x+9*scale, y, size, size, this),
		*/
		new KeyboardKey("Q", x, y, size, size/2, this),
		new KeyboardKey("W", x+scale, y, size, size/2, this),
		new KeyboardKey("E", x+2*scale, y, size, size/2, this),
		new KeyboardKey("R", x+3*scale, y, size, size/2, this),
		new KeyboardKey("T", x+4*scale, y, size, size/2, this),
		new KeyboardKey("Y", x+5*scale, y, size, size/2, this),
		new KeyboardKey("U", x+6*scale, y, size, size/2, this),
		new KeyboardKey("I", x+7*scale, y, size, size/2, this),
		new KeyboardKey("O", x+8*scale, y, size, size/2, this),
		new KeyboardKey("P", x+9*scale, y, size, size/2, this),
		new KeyboardKey("q", x, y+size/2, size, size/2, this),
		new KeyboardKey("w", x+scale, y+size/2, size, size/2, this),
		new KeyboardKey("e", x+2*scale, y+size/2, size, size/2, this),
		new KeyboardKey("r", x+3*scale, y+size/2, size, size/2, this),
		new KeyboardKey("t", x+4*scale, y+size/2, size, size/2, this),
		new KeyboardKey("y", x+5*scale, y+size/2, size, size/2, this),
		new KeyboardKey("u", x+6*scale, y+size/2, size, size/2, this),
		new KeyboardKey("i", x+7*scale, y+size/2, size, size/2, this),
		new KeyboardKey("o", x+8*scale, y+size/2, size, size/2, this),
		new KeyboardKey("p", x+9*scale, y+size/2, size, size/2, this),
		new KeyboardKey("A", x+0.5*scale, y+scale, size, size/2, this),
		new KeyboardKey("S", x+1.5*scale, y+scale, size, size/2, this),
		new KeyboardKey("D", x+2.5*scale, y+scale, size, size/2, this),
		new KeyboardKey("F", x+3.5*scale, y+scale, size, size/2, this),
		new KeyboardKey("G", x+4.5*scale, y+scale, size, size/2, this),
		new KeyboardKey("H", x+5.5*scale, y+scale, size, size/2, this),
		new KeyboardKey("J", x+6.5*scale, y+scale, size, size/2, this),
		new KeyboardKey("K", x+7.5*scale, y+scale, size, size/2, this),
		new KeyboardKey("L", x+8.5*scale, y+scale, size, size/2, this),
		new KeyboardKey("a", x+0.5*scale, y+scale+size/2, size, size/2, this),
		new KeyboardKey("s", x+1.5*scale, y+scale+size/2, size, size/2, this),
		new KeyboardKey("d", x+2.5*scale, y+scale+size/2, size, size/2, this),
		new KeyboardKey("f", x+3.5*scale, y+scale+size/2, size, size/2, this),
		new KeyboardKey("g", x+4.5*scale, y+scale+size/2, size, size/2, this),
		new KeyboardKey("h", x+5.5*scale, y+scale+size/2, size, size/2, this),
		new KeyboardKey("j", x+6.5*scale, y+scale+size/2, size, size/2, this),
		new KeyboardKey("k", x+7.5*scale, y+scale+size/2, size, size/2, this),
		new KeyboardKey("l", x+8.5*scale, y+scale+size/2, size, size/2, this),
		new KeyboardKey("Z", x+scale, y+2*scale, size, size/2, this),
		new KeyboardKey("X", x+2*scale, y+2*scale, size, size/2, this),
		new KeyboardKey("C", x+3*scale, y+2*scale, size, size/2, this),
		new KeyboardKey("V", x+4*scale, y+2*scale, size, size/2, this),
		new KeyboardKey("B", x+5*scale, y+2*scale, size, size/2, this),
		new KeyboardKey("M", x+6*scale, y+2*scale, size, size/2, this),
		new KeyboardKey("N", x+7*scale, y+2*scale, size, size/2, this),
		new KeyboardKey("z", x+scale, y+2*scale+size/2, size, size/2, this),
		new KeyboardKey("x", x+2*scale, y+2*scale+size/2, size, size/2, this),
		new KeyboardKey("c", x+3*scale, y+2*scale+size/2, size, size/2, this),
		new KeyboardKey("v", x+4*scale, y+2*scale+size/2, size, size/2, this),
		new KeyboardKey("b", x+5*scale, y+2*scale+size/2, size, size/2, this),
		new KeyboardKey("m", x+6*scale, y+2*scale+size/2, size, size/2, this),
		new KeyboardKey("n", x+7*scale, y+2*scale+size/2, size, size/2, this),
		new KeyboardKey(" ", x+3*scale, y+3*scale, 3*scale+size, size, this),
		
		new Button(x+8*scale, y+2*scale, 2*size, size, "<-", "Backspace", function(){thisser.backspace()})
		]
	
	this.destination = destination;
	if (destination == null)
	destination.text = "";
}
Keyboard.prototype = Object.create(UIObjectBase);

Keyboard.prototype.update = function(ctx) {
	this.children.forEach(function(thing) {
		thing.update(ctx);
	});
}

Keyboard.prototype.draw = function(ctx) {
	this.children.forEach(function(thing) {
		thing.draw(ctx);
	});
}

Keyboard.prototype.keyPressed = function(character) {
	this.destination.text += character;
}

Keyboard.prototype.backspace = function(character) {
	this.destination.text = this.destination.text.substring(0, this.destination.text.length-1);
}

//-----------------------------------------------------Keyboard Key ----------------------------------

var KeyboardKey = function(letter, x, y, width, height, parent) {
	this.text = letter;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.parent = parent;
	this.active = true;
	this.hoverText = letter;
}
KeyboardKey.prototype = PExtend(KeyboardKey.prototype, Button.prototype);

KeyboardKey.prototype.handler = function() {
	this.parent.keyPressed(this.text);
}