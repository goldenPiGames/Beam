function startEditor() {
	runnee = new EditorWrapper();
}

class EditorWrapper extends Screen {
	constructor(data) {
		super();
		if (data instanceof Editor) {
			this.editor = data;
		} else if (data) {
			this.editor = editorFromJSON(data);
		}
		if (!this.editor) {
			var loaded = localStorage.getItem("BeamLastLevelEditor");
			if (loaded)
				this.editor = loaded ? editorFromJSON(loaded) : new BlankEditor();
		}
		this.editor.wrapper = this;
		this.menuButton = new BubbleButton(35, 35, 30, ()=>runnee=new EditorMenu(this), bubbleDrawIMenu);
		this.jukeboxButton = new BubbleButton(WIDTH-35, 35, 30, ()=>runnee=new Jukebox(this, this.level), bubbleDrawIJukebox);
		this.testButton = new BubbleButton(WIDTH-35, HEIGHT/2, 30, ()=>this.test(), bubbleDrawIPlay);
		//this.hintButton = new BubbleButton(WIDTH-35, HEIGHT-35, 30, ()=>runnee=new HintScreen(this), bubbleDrawIHint);
		this.buttons = [
			this.menuButton,
			this.jukeboxButton,
			this.testButton,
		//	this.hintButton,
		];
	}
	update() {
		this.editor.update();
		if (runnee == this)
			this.buttons.forEach(oj=>oj.update());
	}
	draw() {
		this.editor.draw();
		ctx.globalAlpha = 1;
		if (runnee == this)
			this.buttons.forEach(oj=>oj.draw());
	}
	quicksave() {
		return quicksaveEditor(this.editor);
	}
	save() {
		var lo = quicksaveEditor(this.editor);
		runnee = new EditorSaveScreen(this, lo);
	}
	load() {
		runnee = new EditorLoadScreen(this);
	}
	test() {
		var lo = quicksaveEditor(this.editor);
		levelIterator = new EditorTestIterator(lo);
		startLevel();
	}
}

class Editor {
	constructor(layout) {
		this.layout = layout;
	}
}

class BlankEditor extends Editor {
	constructor(layout) {
		super(layout);
	}
	update() {
		
	}
	draw() {
		ctx.fillStyle = palette.normal;
		drawParagraphInRect(lg("Editor-BlankPara"), 100, 100, WIDTH-200, HEIGHT - 200, 30);
	}
}