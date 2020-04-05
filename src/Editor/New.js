

class EditorNewSelect extends Screen {
	constructor(wrap) {
		super();
		this.wrap = wrap;
		this.returnButton = new BubbleButton(WIDTH-50, 50, 45, ()=>{runnee=this.wrap}, bubbleDrawIReturn);
		this.modeButtons = new RadioButtons(10, 10, 200, 30, EDITOR_MODES.map(mod=>lg(mod.lName)), dex=>this.modeClicked(dex));
		this.makeButton = new BubbleButton(WIDTH-50, HEIGHT-50,  45, ()=>this.tryMake(), bubbleDrawINew);
		this.objects = [
			this.returnButton,
			this.modeButtons,
			this.makeButton,
		];
	}
	update() {
		this.objects.forEach(oj=>oj.update());
		if (this.pane)
			this.pane.update();
	}
	draw() {
		this.objects.forEach(oj=>oj.draw());
		if (this.pane)
			this.pane.draw();
	}
	tryMake() {
		if (this.modeButtons.index >= 0) {
			this.wrap.editor = EDITOR_MODES[this.modeButtons.index].getEditor(this.pane);
			runnee = this.wrap;
			return true;
		} else
			return false;
	}
	modeClicked(dex) {
		this.pane = EDITOR_MODES[dex].getPane();
	}
}

class EditorNewPane {
	constructor(stuff) {
		this.objects = [];
		for (var thing in stuff) {
			this[thing] = stuff[thing];
			this.objects.push(stuff[thing]);
		}
	}
	update() {
		this.objects.forEach(oj=>oj.update());
	}
	draw() {
		this.objects.forEach(oj=>oj.draw());
	}
}

function bubbleDrawINew() {
	ctx.strokeRect(this.x-.6*this.radius, this.y-.5*this.radius, 1.2*this.radius, 1.0*this.radius);
	ctx.beginPath();
	ctx.moveTo(this.x, this.y-.3*this.radius);
	ctx.lineTo(this.x, this.y+.3*this.radius);
	ctx.moveTo(this.x-.3*this.radius, this.y);
	ctx.lineTo(this.x+.3*this.radius, this.y);
	ctx.stroke();
}