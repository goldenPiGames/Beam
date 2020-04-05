
class EditorLoadScreen extends OverScreen {
	constructor(wrap) {
		super();
		this.x = WIDTH/4;
		this.y = HEIGHT/3;
		this.width = WIDTH/2;
		this.height = HEIGHT/3;
		this.wrap = wrap;
		//this.fileButton = new Button(this.x+10, this.y+10, this.width-20, 40, lg("EditorLoad-File"), ()=>this.saveFile());
		setFileInput(this.x+10, this.y+10, this.width-20, 30, lg("EditorLoad-FileInput"));
		this.fileButton = new Button(this.x+10, this.y+50, this.width-20, 40, lg("EditorLoad-File"), ()=>this.loadFile());
		setTextInput(this.x+10, this.y+this.height-90, this.width-20, 30, lg("EditorLoad-Paste"));
		this.copyButton = new Button(this.x+10, this.y+this.height-50, this.width-20, 40, lg("EditorLoad-Text"), ()=>this.loadFromInput());
		this.buttons = [
			//this.fileButton,
			this.copyButton,
		];
	}
	update() {
		if (fileInput.files && fileInput.files[0] != this.file) {
			this.dataLoaded = null;
			this.file = fileInput.files[0];
			this.file.text().then(txt=>this.fileRead(txt));
		}
		this.buttons.forEach(butt=>butt.update());
		if (this.dataLoaded)
			this.fileButton.update();
		if (this.clickedOutside()) {
			hideInputs();
			runnee = this.wrap;
		}
	}
	draw() {
		this.wrap.draw();
		this.fillBackAndFrame(.7, .6);
		this.buttons.forEach(butt=>butt.draw());
		if (this.dataLoaded) {
			this.fileButton.draw();
		} else if (this.file) {
			ctx.fillStyle = palette.normal;
			drawTextInRect(lg("EditorLoad-FileLoading"), this.x, this.y+55, this.width, 30);
		}
	}
	loadFile() {
		this.loadData(this.dataLoaded);
	}
	loadFromInput() {
		this.loadData(textInput.value);
	}
	loadData(data) {
		try {
			this.wrap.editor = editorFromJSON(data);
			hideInputs();
			runnee = this.wrap;
		} catch (e) {
			qAlert(lg("EditorLoad-Error"));
			console.log(e);
		}
	}
	fileRead(txt) {
		this.dataLoaded = txt;
	}
}

function editorFromJSON(data) {
	while (typeof data == "string")
		data = JSON.parse(data);
	switch (data.mode) {
		case "PipePath": return new PipeEditor(data);
		case "WalkOnce": return new OnceEditor(data);
		case "ToggleGates": return new ToggleEditor(data);
		case "SameGame": return new SameEditor(data);
		case "Maze" : return new MazeEditor(data);
		case "Gridlock": return new GridlockEditor(data);
		case "ConcentricCircles": return new ConcentricEditor(data);
	}
}

function bubbleDrawILoad() {
	ctx.strokeRect(this.x-.6*this.radius, this.y-.5*this.radius, 1.2*this.radius, 1.0*this.radius);
	ctx.beginPath();
	ctx.moveTo(this.x, this.y+.3*this.radius);
	ctx.lineTo(this.x, this.y-.3*this.radius);
	ctx.moveTo(this.x-.3*this.radius, this.y);
	ctx.lineTo(this.x, this.y-.3*this.radius);
	ctx.lineTo(this.x+.3*this.radius, this.y);
	ctx.stroke();
}