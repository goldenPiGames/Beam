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
		if (this.clicked && this.onclick)
			this.onclick();
	}
	intersectsMouse() {
		if (this.displayRadius || this.radius)
			return distanceBetween(mouse.x, mouse.y, this.displayX || this.x, this.displayY || this.y) <= (this.displayRadius || this.radius);
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
	stroke() {
		ctx.lineWidth = BUTTON_BORDER_WIDTH;
		ctx.strokeRect((this.displayX || this.x) + BUTTON_BORDER_WIDTH/2, (this.displayY || this.y) + BUTTON_BORDER_WIDTH/2, (this.displayWidth || this.width) - BUTTON_BORDER_WIDTH, (this.displayHeight || this.height) - BUTTON_BORDER_WIDTH);
	}
}

class BlankUIObject extends UIObject {
	draw() {
		
	}
}