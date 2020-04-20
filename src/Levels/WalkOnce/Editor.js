const WALK_ONCE_EDITOR_MIN_WIDTH = 4;
const WALK_ONCE_EDITOR_MAX_WIDTH = 15;
const WALK_ONCE_EDITOR_MIN_HEIGHT = 4;
const WALK_ONCE_EDITOR_MAX_HEIGHT = 12;

class WalkOnceEditor extends Editor {
	constructor(layout) {
		if (!layout) {
			layout = {
				mode : "WalkOnce",
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
		layout.mode = "WalkOnce";
		layout.width = layout.grid.length;
		layout.height = layout.grid[0].length;
		super(layout);
		this.tabIndex = 0;
		this.tabs = new Tabs(100, HEIGHT-35, WIDTH-200, 35, [lg("WalkOnceEditor-TabWall"), lg("WalkOnceEditor-TabAddRow"), lg("WalkOnceEditor-TabRemoveRow"), lg("WalkOnceEditor-TabAddColumn"), lg("WalkOnceEditor-TabRemoveColumn"), lg("WalkOnceEditor-TabEntrance"), lg("WalkOnceEditor-TabExit")], t=>this.setTab(t), ()=>this.tabIndex);
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
		this.pieces = this.layout.grid.map((row, i) => row.map((pis, j) => new OnceEditorPiece(this.gridLevel.gridToPixX(i), this.gridLevel.gridToPixY(j), this.gridLevel.gridScale / 2, pis)));
		this.setTab();
	}
	update() {
		this.tabs.update();
		if (this.stripes)
			this.stripes.forEach(s=>s.update());
		switch (this.tabIndex) {
			case 0:
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
			case 5:
				this.ifStripeClicked(clicked=>this.setEntrance(clicked.side, clicked.position));
				break;
			case 6:
				this.ifStripeClicked(clicked=>this.setExit(clicked.side, clicked.position));
				break;
		}
	}
	draw() {
		this.tabs.draw();
		ctx.strokeStyle = palette.normal;
		this.gridLevel.drawBorder();
		this.pieces.forEach(col=>col.forEach(wal=>wal.draw()));
		if (this.stripes)
			this.stripes.forEach(s=>s.draw());
	}
	setTab(dex) {
		if (typeof dex == "number")
			this.tabIndex = dex;
		switch (this.tabIndex) {
			case 0: //walls
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
			case 5: case 6: //entrance/exit
				this.stripes = this.getEdgeStripes().filter(oj=>!(oj.side == this.layout.entranceSide && oj.position == this.layout.entrancePosition || oj.side == this.layout.exitSide && oj.position == this.layout.exitPosition));
				break;
		}
	}
	getLayout() {
		this.layout.grid = this.pieces.map(col=>col.map(pis=>pis.clear));
		return this.layout;
	}
}
WalkOnceEditor.prototype.gridName = "grid";
WalkOnceEditor.prototype.minWidth = WALK_ONCE_EDITOR_MIN_WIDTH;
WalkOnceEditor.prototype.maxWidth = WALK_ONCE_EDITOR_MAX_WIDTH;
WalkOnceEditor.prototype.minHeight = WALK_ONCE_EDITOR_MIN_HEIGHT;
WalkOnceEditor.prototype.maxHeight = WALK_ONCE_EDITOR_MAX_HEIGHT;

class OnceEditorPiece extends UIObject {
	constructor(x, y, radius, clear) {
		super();
		this.displayX = x-radius;
		this.displayY = y-radius;
		this.displayWidth = radius*2;
		this.displayHeight = radius*2;
		this.clear = clear;
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
			this.clear = this.clear ? 0 : 1;
		}
	}
	draw() {
		//console.log("bup")
		ctx.strokeStyle = this.drawHovered ? palette.hover : palette.normal;
		this.drawHovered = false;
		ctx.lineWidth = 3;
		if (this.clear) {
			ctx.lineWidth = 2;
			ctx.strokeRect(this.displayX+1, this.displayY+1, this.displayWidth-2, this.displayHeight-2);
			ctx.beginPath();
			ctx.arc(this.displayX+this.displayWidth/2, this.displayY+this.displayHeight/2, this.displayHeight/5, 0, 2*Math.PI);
			ctx.stroke();
		} else {
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo(this.displayX, this.displayY);
			ctx.lineTo(this.displayX+this.displayWidth, this.displayY+this.displayHeight);
			ctx.moveTo(this.displayX+this.displayWidth, this.displayY);
			ctx.lineTo(this.displayX, this.displayY+this.displayHeight);
			ctx.stroke();
		}
	}
}

const EDITOR_MODE_WALK_ONCE = {
	id:"WalkOnce",
	lName:"WalkOnce-Name",
	getPane:()=>{
		var objects = {};
		objects.widthSelector = new NumberSelector(WIDTH/2, 50, 110, 110, WALK_ONCE_EDITOR_MIN_WIDTH, WALK_ONCE_EDITOR_MAX_WIDTH, 6);
		objects.widthLabel = new LabelAbove(objects.widthSelector, 28, lg("WalkOnceEditorNew-Width"));
		objects.heightSelector = new NumberSelector(WIDTH/2+130, 50, 110, 110, WALK_ONCE_EDITOR_MIN_HEIGHT, WALK_ONCE_EDITOR_MAX_HEIGHT, 6);
		objects.heightLabel = new LabelAbove(objects.heightSelector, 28, lg("WalkOnceEditorNew-Height"));
		objects.fillRadio = new RadioButtons(WIDTH/2, 200, 140, 30, [lg("WalkOnceEditorNew-Full"), lg("WalkOnceEditorNew-Clear")], doNothing, 0);
		objects.fillRadio.setIndex(0);
		return new EditorNewPane(objects);
	},	
	getEditor:pane=>{
		var layout = {};
		layout.width = pane.widthSelector.getNumber();
		layout.height = pane.heightSelector.getNumber();
		layout.entranceSide = LEFT;
		layout.entrancePosition = Math.floor(layout.height/2);
		layout.exitSide = RIGHT;
		layout.exitPosition = Math.floor(layout.height/2);
		switch (pane.fillRadio.index) {
			case 0: layout.grid = newArray2d(layout.width, layout.height, 0); break;
			case 1: layout.grid = newArray2d(layout.width, layout.height, 1); break;
		}
		return new WalkOnceEditor(layout);
	},
}