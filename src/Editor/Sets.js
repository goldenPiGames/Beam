class EditorSetsScreen extends Screen {
	constructor() {
		super();
		this.returnButton = new BubbleButton(WIDTH-50, 50, 45, ()=>startEditor(), bubbleDrawIReturn);
	}
	update() {
		this.returnButton.update();
	}
	draw() {
		this.returnButton.draw();
		ctx.fillStyle = palette.normal;
		drawTextInRect(lg("EditorSet-No"), 0, 0, WIDTH, HEIGHT);
	}
}

function bubbleDrawISets() {
	ctx.strokeRect(this.x-.6*this.radius, this.y-.5*this.radius, .5*this.radius, 1.0*this.radius);
	ctx.strokeRect(this.x+.1*this.radius, this.y-.5*this.radius, .5*this.radius, 1.0*this.radius);
}