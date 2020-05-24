const SAMEGAME_EDITOR_MIN_WIDTH = 2;
const SAMEGAME_EDITOR_MAX_WIDTH = 15;
const SAMEGAME_EDITOR_MIN_HEIGHT = 4;
const SAMEGAME_EDITOR_MAX_HEIGHT = 12;
const SAMEGAME_EDITOR_MAX_COLORS = 5;

class SameGameEditor extends Editor {
	constructor(layout) {
		if (!layout) {
			layout = {
				mode : "SameGame",
				grid : [
					[0,0,0,0,0],
					[0,0,0,0,0],
					[0,0,0,0,0],
					[0,0,0,0,0],
					[0,0,0,0,0],],
				entranceSide : LEFT,
				entrancePosition : 2,
				exitSide : RIGHT,
				exitPosition : 2,
			}
		}
		layout.mode = "SameGame";
		layout.width = layout.grid.length;
		layout.height = layout.grid[0].length;
		super(layout);
		this.tabIndex = 0;
		this.color = 0;
		this.palette = [];
		for (var i = 0; i < SAMEGAME_EDITOR_MAX_COLORS; i++) {
			this.palette.push(new SameGameEditorColor(0, HEIGHT/2-35*SAMEGAME_EDITOR_MAX_COLORS+70*i, 70, 70, this, i));
		}
		this.tabs = new Tabs(100, HEIGHT-35, WIDTH-200, 35, [lg("SameGameEditor-TabOverwrite"), lg("SameGameEditor-TabAddRow"), lg("SameGameEditor-TabRemoveRow"), lg("SameGameEditor-TabAddColumn"), lg("SameGameEditor-TabRemoveColumn")], t=>this.setTab(t), ()=>this.tabIndex);
		this.redoGrid();
	}
	reconstructGridLevel() {
		this.gridLevel = new GridLevel(this.layout, {gap:0,margin:MAZE_EDITOR_MARGIN});
	}
	redoBorder() {
		this.reconstructGridLevel();
		this.setTab();
	}
	redoGrid() {
		this.reconstructGridLevel();
		this.pieces = this.layout.grid.map((row, i) => row.map((pis, j) => new SameGameEditorPiece(this.gridLevel.gridToPixX(i), this.gridLevel.gridToPixY(j), this.gridLevel.gridScale / 2, this, pis >= 0 ? pis : -1)));
		this.setTab();
	}
	update() {
		this.tabs.update();
		if (this.stripes)
			this.stripes.forEach(s=>s.update());
		switch (this.tabIndex) {
			case 0: //Overwrite
				this.palette.forEach(oj=>oj.update());
				this.pieces.forEach(col=>col.forEach(wal=>wal.update()));
				break;
			case 1:
				this.ifStripeClicked(clicked=>this.addRow(clicked.j));
				break;
			case 2:
				this.ifStripeClicked(clicked=>this.removeRow(clicked.j));
				break;
			case 3:
				this.ifStripeClicked(clicked=>this.addColumn(clicked.i));
				break;
			case 4:
				this.ifStripeClicked(clicked=>this.removeColumn(clicked.i));
				break;
		}
	}
	draw() {
		this.tabs.draw();
		ctx.strokeStyle = palette.normal;
		this.gridLevel.drawBorder();
		this.pieces.forEach(col=>col.forEach(wal=>wal.draw()));
		if (this.tabIndex <= 1)
			this.palette.forEach(oj=>oj.draw());
		if (this.stripes)
			this.stripes.forEach(s=>s.draw());
	}
	setTab(dex) {
		if (typeof dex == "number")
			this.tabIndex = dex;
		switch (this.tabIndex) {
			case 0: //overwrite
				this.stripes = null;
				break;
			case 1: //+row
				this.stripes = [];
				for (var j = 0; j <= this.layout.height; j++) {
					this.stripes.push(new GridEditorStripeAddHoriz(this.gridLevel.borderLeft, this.gridLevel.gridToPixY(j-1), this.gridLevel.borderRight-this.gridLevel.borderLeft, this.gridLevel.gridScale, this, j));
				}
				break;
			case 2: //-row
				this.stripes = [];
				for (var j = 0; j < this.layout.height; j++) {
					this.stripes.push(new GridEditorStripeRemoveHoriz(50, this.gridLevel.gridToPixY(j-1/2), WIDTH-100, this.gridLevel.gridScale, this, j));
				}
				break;
			case 3: //+col
				this.stripes = [];
				for (var i = 0; i <= this.layout.width; i++) {
					this.stripes.push(new GridEditorStripeAddVert(this.gridLevel.gridToPixX(i-1), this.gridLevel.borderTop, this.gridLevel.gridScale, this.gridLevel.borderBottom-this.gridLevel.borderTop, this, i));
				}
				break;
			case 4: //-col
				this.stripes = [];
				for (var i = 0; i < this.layout.width; i++) {
					this.stripes.push(new GridEditorStripeRemoveVert(this.gridLevel.gridToPixX(i-1/2), 50, this.gridLevel.gridScale, HEIGHT-100, this, i));
				}
				break;
		}
	}
	getLayout() {
		this.layout.grid = this.pieces.map(col=>col.map(pis=>pis.color));
		return this.layout;
	}
}
SameGameEditor.prototype.gridName = "grid";
SameGameEditor.prototype.minWidth = SAMEGAME_EDITOR_MIN_WIDTH;
SameGameEditor.prototype.maxWidth = SAMEGAME_EDITOR_MAX_WIDTH;
SameGameEditor.prototype.minHeight = SAMEGAME_EDITOR_MIN_HEIGHT;
SameGameEditor.prototype.maxHeight = SAMEGAME_EDITOR_MAX_HEIGHT;

class SameGameEditorPiece extends UIObject {
	constructor(x, y, radius, parent, color) {
		super();
		this.displayX = x-radius;
		this.displayY = y-radius;
		this.displayWidth = radius*2;
		this.displayHeight = radius*2;
		this.parent = parent;
		this.color = color;
		this.rotation = 0;
	}
	update() {
		this.updateMouse();
		if (this.hovered) {
			hovered = true;
			this.drawHovered = true;
		}
		if (this.clicked) {
			playSFX("blip1");
			this.color = this.parent.color;
		}
	}
	draw() {
		//console.log("bup")
		this.drawI();
		ctx.globalAlpha = 1;
		ctx.strokeStyle = this.drawHovered ? palette.hover : palette.normal;
		this.stroke();
		this.drawHovered = false;
	}
}
SameGameEditorPiece.prototype.drawI = SameBlock.prototype.drawI;

class SameGameEditorColor extends UIObject {
	constructor(x, y, width, height, parent, color) {
		super();
		this.displayX = x;
		this.displayY = y;
		this.displayWidth = width;
		this.displayHeight = height;
		this.color = color;
		this.parent = parent;
	}
	update() {
		this.updateMouse();
		if (this.hovered)
			hovered = true;
		if (this.clicked)
			this.parent.color = this.color;
	}
	draw() {
		this.drawI();
		ctx.globalAlpha = 1;
		ctx.strokeStyle = this.parent.color == this.color ? palette.click : this.hovered ? palette.hover : palette.normal;
		this.stroke();
	}
}
SameGameEditorColor.prototype.x = 0;
SameGameEditorColor.prototype.drawI = SameBlock.prototype.drawI;

const EDITOR_MODE_SAMEGAME = {
	id:"SameGame",
	lName:"SameGame-Name",
	getPane:()=>{
		var objects = {};
		objects.widthSelector = new NumberSelector(WIDTH/2, 50, 110, 110, SAMEGAME_EDITOR_MIN_WIDTH, SAMEGAME_EDITOR_MAX_WIDTH, 6);
		objects.widthLabel = new LabelAbove(objects.widthSelector, 28, lg("SameGameEditorNew-Width"));
		objects.heightSelector = new NumberSelector(WIDTH/2+130, 50, 110, 110, SAMEGAME_EDITOR_MIN_HEIGHT, SAMEGAME_EDITOR_MAX_HEIGHT, 6);
		objects.heightLabel = new LabelAbove(objects.heightSelector, 28, lg("SameGameEditorNew-Height"));
		//objects.fillRadio = new RadioButtons(WIDTH/2, 200, 140, 30, [lg("SameGameEditorNew-Full"), lg("SameGameEditorNew-Clear")], doNothing, 0);
		//objects.fillRadio.setIndex(0);
		return new EditorNewPane(objects);
	},	
	getEditor:pane=>{
		var layout = {};
		layout.width = pane.widthSelector.getNumber();
		layout.height = pane.heightSelector.getNumber();
		layout.direction = RIGHT;
		layout.grid = newArray2d(layout.width, layout.height, 0);
		return new SameGameEditor(layout);
	},
}