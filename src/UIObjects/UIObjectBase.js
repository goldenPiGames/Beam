class UIObject {
	constructor(x, y, width, height) {
		if (x != undefined) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
		}
	}
	update() {
		this.updateMouse();
	}
	intersectsMouse() {
		if (this.displayRadius || this.radius)
			return Math.sqrt((mouse.x - (this.displayX || this.x)) ** 2 + (mouse.y - (this.displayY || this.y))**2) <= (this.displayRadius || this.radius);
		else
			return mouse.x >= (this.displayX || this.x) && mouse.x < (this.displayX || this.x) + (this.displayWidth || this.width) && mouse.y >= (this.displayY || this.y) && mouse.y < (this.displayY || this.y) + (this.displayHeight || this.height);
	}
	updateMouse() {
		this.hovered = this.intersectsMouse();
		this.wasPressed = this.pressed;
		this.pressed = mouse.down && this.hovered;
		this.clicked = mouse.clicked && this.hovered;
		this.released = this.held && !mouse.down;
		this.held = (this.clicked || (this.held && mouse.down)) ? this.held+1 : 0;
		this.draggedX = this.held && mouse.x - mouse.lastX || 0;
		this.draggedY = this.held && mouse.y - mouse.lastY || 0;
		this.draggedTheta = this.held && (Math.atan2(mouse.y-this.y, mouse.x-this.x) - Math.atan2(mouse.lastY-this.y, mouse.lastX-this.x)) || 0;
	}
}

class BlankUIObject extends UIObject {
	draw() {
		
	}
}