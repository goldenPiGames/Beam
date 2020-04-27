const LOADEXT_LEVEL = ".beamlevel";
const LOADEXT_SET = ".beamseat";

class LoadPopup extends OverScreen {
	constructor(returnTo, extension, onSucceed) {
		super();
		this.x = WIDTH/4;
		this.y = HEIGHT/3;
		this.width = WIDTH/2;
		this.height = HEIGHT/3;
		this.returnTo = returnTo;
		this.extension = extension;
		this.onSucceed = onSucceed;
		/*this.beforeFileHidden = fileInput.hidden;
		this.beforeFilePosition = fileInput.lastMoveArgs;
		this.beforeTextHidden = textInput0.hidden;
		this.beforeTextHidden = textInput0.lastMoveArgs;*/
		//this.fileButton = new Button(this.x+10, this.y+10, this.width-20, 40, lg("EditorLoad-File"), ()=>this.saveFile());
		setFileInput(this.x+10, this.y+10, this.width-20, 30, this.extension);
		this.fileButton = new Button(this.x+10, this.y+50, this.width-20, 40, lg("EditorLoad-File"), ()=>this.loadFile());
		setTextInput(0, this.x+10, this.y+this.height-90, this.width-20, 30, lg("EditorLoad-Paste"));
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
			if (this.file)
				this.file.text().then(txt=>this.fileRead(txt));
		}
		this.buttons.forEach(butt=>butt.update());
		if (this.dataLoaded)
			this.fileButton.update();
		if (this.clickedOutside()) {
			hideInputs();
			this.returnToReturnTo();
		}
	}
	draw() {
		this.returnTo.draw();
		this.fillBackAndFrame(.7, .6);
		this.buttons.forEach(butt=>butt.draw());
		if (this.dataLoaded) {
			this.fileButton.draw();
		} else if (this.file) {
			ctx.fillStyle = palette.normal;
			drawTextInRect(lg("EditorLoad-FileLoading"), this.x, this.y+55, this.width, 30);
		}
	}
	returnToReturnTo() {
		hideInputs();
		runnee = this.returnTo;
	}
	loadFile() {
		this.loadData(this.dataLoaded);
	}
	loadFromInput() {
		this.loadData(textInput0.value);
	}
	loadData(data) {
		this.returnToReturnTo();
		this.onSucceed(data);
	}
	fileRead(txt) {
		this.dataLoaded = txt;
	}
}

function editorFromJSON(data) {
	while (typeof data == "string")
		data = JSON.parse(data);
	switch (data.mode) {
		case "PipePath": return new PipePathEditor(data);
		case "WalkOnce": return new WalkOnceEditor(data);
		case "ToggleGates": return new ToggleGatesEditor(data);
		case "SameGame": return new SameGameEditor(data);
		case "Maze" : return new MazeEditor(data);
		case "Gridlock": return new GridlockEditor(data);
		case "ConcentricCircles": return new ConcentricCirclesEditor(data);
	}
	throw "Mode not specified";
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