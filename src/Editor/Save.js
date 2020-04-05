function quicksaveEditor(editor) {
	var lo = JSON.stringify(editor.getLayout());
	localStorage.setItem("BeamLastLevelEditor", lo);
	return lo;
}

class EditorSaveScreen extends OverScreen {
	constructor(wrap, data) {
		super();
		this.x = WIDTH/4;
		this.y = HEIGHT/3;
		this.width = WIDTH/2;
		this.height = HEIGHT/3;
		this.wrap = wrap;
		this.data = data;
		this.fileButton = new Button(this.x+10, this.y+10, this.width-20, 40, lg("EditorSave-File"), ()=>this.saveFile());
		setTextInput(this.x+10, this.y+this.height-90, this.width-20, 30, lg("EditorSave-Data"));
		this.copyButton = new Button(this.x+10, this.y+this.height-50, this.width-20, 40, lg("EditorSave-Clipboard"), ()=>this.copyToClipboard());
		this.buttons = [
			this.fileButton,
			this.copyButton,
		];
	}
	update() {
		if (textInput.value != this.data)
			textInput.value = this.data;
		this.buttons.forEach(butt=>butt.update());
		if (this.clickedOutside()) {
			hideTextInput();
			runnee = this.wrap;
		}
	}
	draw() {
		this.wrap.draw();
		this.fillBackAndFrame(.7, .6);
		this.buttons.forEach(butt=>butt.draw());
	}
	//https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
	saveFile() {
		var file = new Blob([this.data], {type : "application/json"});
		var a = document.createElement("a");
		var url = URL.createObjectURL(file);
		a.href = url;
		a.download = "level";
		document.body.appendChild(a);
		a.click();
		setTimeout(function() {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);  
		}, 0); 
	}
	copyToClipboard() {
		navigator.clipboard.writeText(this.data);
	}
}


function bubbleDrawISave() {
	ctx.strokeRect(this.x-.6*this.radius, this.y-.5*this.radius, 1.2*this.radius, 1.0*this.radius);
	ctx.beginPath();
	ctx.moveTo(this.x, this.y-.3*this.radius);
	ctx.lineTo(this.x, this.y+.3*this.radius);
	ctx.moveTo(this.x-.3*this.radius, this.y);
	ctx.lineTo(this.x, this.y+.3*this.radius);
	ctx.lineTo(this.x+.3*this.radius, this.y);
	ctx.stroke();
}