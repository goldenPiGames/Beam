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
		
	}
	draw() {
		this.objects.forEach(oj=>oj.draw());
	}
	tryMake() {
		if (this.modeButtons.index >= 0) {
			this.wrap.editor = EDITOR_MODES[this.modeButtons.index].getEditor();
			runnee = this.wrap;
			return true;
		} else
			return false;
	}
	modeClicked() {
		
	}
}

const EDITOR_MODES = [
	{id:"Maze", lName:"Maze-Name", getEditor:()=>new MazeEditor(),/* getObjects:()=>[
			new 
		]*/},
];

function bubbleDrawINew() {
	ctx.strokeRect(this.x-.6*this.radius, this.y-.5*this.radius, 1.2*this.radius, 1.0*this.radius);
	ctx.beginPath();
	ctx.moveTo(this.x, this.y-.3*this.radius);
	ctx.lineTo(this.x, this.y+.3*this.radius);
	ctx.moveTo(this.x-.3*this.radius, this.y);
	ctx.lineTo(this.x+.3*this.radius, this.y);
	ctx.stroke();
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