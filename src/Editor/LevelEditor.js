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
				this.editor = editorFromJSON(loaded);
			else 
				this.editor = new BlankEditor();
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
		try {
			var lo = quicksaveEditor(this.editor);
			levelIterator = new EditorTestIterator(lo);
			startLevel();
		} catch (e) {
			qAlert(lg("Editor-PlayError"));
			console.log(e);
		}
	}
}

class Editor {
	constructor(layout) {
		this.layout = layout;
	}
	getEdgeStripes() {
		var stripes = [];
		for (var i = 0; i < this.layout.width; i++) {
			stripes.push(new GridEditorStripeEdge(this.gridLevel.gridToPixX(i-1/2), this.gridLevel.borderTop-MAZE_EDITOR_MARGIN, this.gridLevel.gridScale, MAZE_EDITOR_MARGIN, UP, i));
			stripes.push(new GridEditorStripeEdge(this.gridLevel.gridToPixX(i-1/2), this.gridLevel.borderBottom, this.gridLevel.gridScale, MAZE_EDITOR_MARGIN, DOWN, i));
		}
		for (var j = 0; j < this.layout.height; j++) {
			stripes.push(new GridEditorStripeEdge(this.gridLevel.borderLeft-MAZE_EDITOR_MARGIN, this.gridLevel.gridToPixY(j-1/2), MAZE_EDITOR_MARGIN, this.gridLevel.gridScale, LEFT, j));
			stripes.push(new GridEditorStripeEdge(this.gridLevel.borderRight, this.gridLevel.gridToPixY(j-1/2), MAZE_EDITOR_MARGIN, this.gridLevel.gridScale, RIGHT, j));
		}
		return stripes;
	}
}

class GridEditorStripeEdge extends UIObject {
	constructor(x, y, width, height, side, position, out) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.side = side;
		this.position = position;
		this.out = out;
	}
	update() {
		this.updateMouse();
		if (this.hovered)
			hovered = true;
	}
	draw() {
		ctx.globalAlpha = 1;
		var color = this.hovered ? palette.hover : palette.normal;
		ctx.strokeStyle = color;
		
		ctx.fillStyle = palette.background;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		
		this.stroke();
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