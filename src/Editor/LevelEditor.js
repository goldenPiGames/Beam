function startEditor() {
	runnee = new EditorWrapper();
}

class EditorWrapper extends Screen {
	constructor(data) {
		super();
		try {
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
		} catch (e) {
			console.log(e);
			qAlert(lg("EditorLoad-Error"));
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
		runnee = new LoadPopup(this, LOADEXT_LEVEL, data=>this.loadData(data));
	}
	loadData(data) {
		try {
			this.editor = editorFromJSON(data);
			quicksaveEditor(this.editor);
		} catch (e) {
			qAlert(lg("EditorLoad-Error"));
			console.log(e);
		}
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
	addRow(j) {
		this.getLayout();
		if (this.layout.height >= this.maxHeight) {
			qAlert(lg(this.lMaxHeight));
			return false;
		}
		this.layout.height++;
		this.layout[this.gridName].forEach(col=>col.splice(j, 0, 0));
		if ((this.layout.entranceSide == LEFT || this.layout.entranceSide == RIGHT) && this.layout.entrancePosition > j)
			this.layout.entrancePosition++;
		if ((this.layout.exitSide == LEFT || this.layout.exitSide == RIGHT) && this.layout.exitPosition > j)
			this.layout.exitPosition++;
		this.redoGrid();
	}
	removeRow(j) {
		this.getLayout();
		if (this.layout.height <= this.minHeight) {
			qAlert(lg(this.lMinHeight));
			return false;
		}
		this.layout.height--;
		this.layout[this.gridName].forEach(col=>col.splice(j, 1));
		if ((this.layout.entranceSide == LEFT || this.layout.entranceSide == RIGHT) && (this.layout.entrancePosition > j || this.layout.entrancePosition >= this.layout.height))
			this.layout.entrancePosition--;
		if ((this.layout.exitSide == LEFT || this.layout.exitSide == RIGHT) && (this.layout.exitPosition > j || this.layout.exitPosition >= this.layout.height))
			this.layout.exitPosition--;
		this.redoGrid();
	}
	addColumn(i) {
		this.getLayout();
		if (this.layout.width >= this.maxWidth) {
			qAlert(lg(this.lMaxWidth));
			return false;
		}
		this.layout.width++;
		this.layout[this.gridName].splice(i, 0, new Array(this.layout.height).fill(0));
		if ((this.layout.entranceSide == UP || this.layout.entranceSide == DOWN) && this.layout.entrancePosition > i)
			this.layout.entrancePosition++;
		if ((this.layout.exitSide == UP || this.layout.exitSide == DOWN) && this.layout.exitPosition > i)
			this.layout.exitPosition++;
		this.redoGrid();
	}
	removeColumn(i) {
		this.getLayout();
		if (this.layout.width <= this.minWidth) {
			qAlert(lg(this.lMinWidth));
			return false;
		}
		this.layout.width--;
		this.layout[this.gridName].splice(i, 1);
		if ((this.layout.entranceSide == UP || this.layout.entranceSide == DOWN) && (this.layout.entrancePosition > i || this.layout.entrancePosition >= this.layout.width))
			this.layout.entrancePosition--;
		if ((this.layout.exitSide == UP || this.layout.exitSide == DOWN) && (this.layout.exitPosition > i || this.layout.exitPosition >= this.layout.width))
			this.layout.exitPosition--;
		this.redoGrid();
	}
	setEntrance(side, position) {
		this.layout.entranceSide = side;
		this.layout.entrancePosition = position;
		this.redoBorder();
	}
	setExit(side, position) {
		this.layout.exitSide = side;
		this.layout.exitPosition = position;
		this.redoBorder();
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
	ifStripeClicked(func) {
		var clicked = this.stripes.find(s=>s.clicked);
		if (clicked)
			func(clicked);
	}
	getLayout() {
		return this.layout;
	}
}
Editor.prototype.lMaxWidth = "Editor-MaxWidth";
Editor.prototype.lMinWidth = "Editor-MinWidth";
Editor.prototype.lMaxHeight = "Editor-MaxHeight";
Editor.prototype.lMinHeight = "Editor-MinHeight";

class GridEditorStripeAddHoriz extends UIObject {
	constructor(x, y, width, height, parent, j) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.parent = parent;
		this.j = j;
	}
	update() {
		this.updateMouse();
		if (this.hovered) {
			hovered = true;
		}
	}
	draw() {
		if (this.hovered) {
			ctx.lineWidth = 4;
			ctx.strokeStyle = palette.hover;
			ctx.beginPath();
			ctx.moveTo(this.x, this.y+this.height/2);
			ctx.lineTo(this.x+this.width, this.y+this.height/2);
			ctx.stroke();
		}
	}
}

class GridEditorStripeRemoveHoriz extends UIObject {
	constructor(x, y, width, height, parent, j) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.parent = parent;
		this.pieces = [];
		this.j = j;
		for (var i = 0; i < this.parent.layout.width; i++) {
			this.pieces.push(this.parent.pieces[i][j]);
		}
	}
	update() {
		this.updateMouse();
		if (this.hovered) {
			hovered = true;
			this.pieces.forEach(pis=>pis.drawHovered = true);
		}
	}
	draw() {
		
	}
}

class GridEditorStripeAddVert extends UIObject {
	constructor(x, y, width, height, parent, i) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.parent = parent;
		this.i = i;
	}
	update() {
		this.updateMouse();
		if (this.hovered) {
			hovered = true;
		}
	}
	draw() {
		if (this.hovered) {
			ctx.lineWidth = 4;
			ctx.strokeStyle = palette.hover;
			ctx.beginPath();
			ctx.moveTo(this.x+this.width/2, this.y);
			ctx.lineTo(this.x+this.width/2, this.y+this.height);
			ctx.stroke();
		}
	}
}

class GridEditorStripeRemoveVert extends UIObject {
	constructor(x, y, width, height, parent, i) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.parent = parent;
		this.pieces = [];
		this.i = i;
		//console.log(this.parent);
		for (var j = 0; j < this.parent.layout.height; j++) {
			this.pieces.push(this.parent.pieces[i][j]);
		}
	}
	update() {
		this.updateMouse();
		if (this.hovered) {
			hovered = true;
			this.pieces.forEach(pis=>pis.drawHovered = true);
		}
	}
	draw() {
		
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