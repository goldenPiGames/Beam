const PIPE_PATH_EDITOR_MIN_WIDTH = 4;
const PIPE_PATH_EDITOR_MAX_WIDTH = 12;
const PIPE_PATH_EDITOR_MIN_HEIGHT = 4;
const PIPE_PATH_EDITOR_MAX_HEIGHT = 10;

class PipePathEditor extends Editor {
	constructor(layout) {
		if (!layout) {
			layout = {
				mode : "PipePath",
				pipeGrid : [
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
		layout.mode = "PipePath";
		layout.width = layout.pipeGrid.length;
		layout.height = layout.pipeGrid[0].length;
		super(layout);
		this.tabIndex = 0;
		this.tabs = new Tabs(100, HEIGHT-35, WIDTH-200, 35, [lg("PipePathEditor-TabType"), lg("PipePathEditor-TabAddRow"), lg("PipePathEditor-TabRemoveRow"), lg("PipePathEditor-TabAddColumn"), lg("PipePathEditor-TabRemoveColumn"), lg("PipePathEditor-TabEntrance"), lg("PipePathEditor-TabExit")], t=>this.setTab(t), ()=>this.tabIndex);
		this.redoGrid();
	}
	reconstructGridLevel() {
		this.gridLevel = new GridLevel(this.layout, {gap:1/4,margin:MAZE_EDITOR_MARGIN});
	}
	redoBorder() {
		this.reconstructGridLevel();
		this.setTab();
	}
	redoGrid() {
		this.reconstructGridLevel();
		this.pieces = this.layout.pipeGrid.map((row, i) => row.map((pis, j) => new PipeEditorPiece(this.gridLevel.gridToPixX(i), this.gridLevel.gridToPixY(j), this.gridLevel.gridScale / 2, pis)));
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
		this.layout.pipeGrid = this.pieces.map(col=>col.map(pis=>pis.type));
		return this.layout;
	}
}
PipePathEditor.prototype.gridName = "pipeGrid";
PipePathEditor.prototype.minWidth = PIPE_PATH_EDITOR_MIN_WIDTH;
PipePathEditor.prototype.maxWidth = PIPE_PATH_EDITOR_MAX_WIDTH;
PipePathEditor.prototype.minHeight = PIPE_PATH_EDITOR_MIN_HEIGHT;
PipePathEditor.prototype.maxHeight = PIPE_PATH_EDITOR_MAX_HEIGHT;

class PipeEditorPiece extends UIObject {
	constructor(x, y, radius, type) {
		super();
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.iradius = Math.floor(radius/3);
		this.ithoff = Math.asin(this.iradius/this.radius);
		this.type = type;
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
			this.type = this.type ? 0 : 1;
		}
	}
	draw() {
		//console.log("bup")
		ctx.strokeStyle = this.drawHovered ? palette.hover : palette.normal;
		this.drawHovered = false;
		ctx.lineWidth = 3;
		this.vtheta = directionTheta(this.rotation);
		if (this.type) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius-2, this.vtheta+this.ithoff+Math.PI/2, this.vtheta-this.ithoff);
			ctx.lineTo(this.x + this.iradius*Math.SQRT2 * Math.cos(this.vtheta-Math.PI/4) - 2*Math.cos(this.vtheta), this.y + this.iradius*Math.SQRT2 * Math.sin(this.vtheta-Math.PI/4) - 2*Math.sin(this.vtheta));
			ctx.lineTo(this.x + this.iradius*Math.SQRT2 * Math.cos(this.vtheta+Math.PI*3/4) - 2*Math.cos(this.vtheta+Math.PI/2), this.y + this.iradius*Math.SQRT2 * Math.sin(this.vtheta+Math.PI*3/4) - 2*Math.sin(this.vtheta+Math.PI/2));
			ctx.closePath();
			ctx.stroke();
			
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius-2, this.vtheta+this.ithoff, this.vtheta-this.ithoff+Math.PI/2);
			ctx.lineTo(this.x + this.iradius*Math.SQRT2 * Math.cos(this.vtheta+Math.PI/4), this.y + this.iradius*Math.SQRT2 * Math.sin(this.vtheta+Math.PI/4));
			ctx.closePath();
			ctx.stroke();
		} else {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius-2, this.vtheta+this.ithoff+Math.PI, this.vtheta-this.ithoff);
			ctx.closePath();
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius-2, this.vtheta+this.ithoff, this.vtheta-this.ithoff+Math.PI);
			ctx.closePath();
			ctx.stroke();
		}
	}
}

const EDITOR_MODE_PIPE_PATH = {
	id:"PipePath",
	lName:"PipePath-Name",
	getPane:()=>{
		var objects = {};
		objects.widthSelector = new NumberSelector(WIDTH/2, 50, 110, 110, PIPE_PATH_EDITOR_MIN_WIDTH, PIPE_PATH_EDITOR_MAX_WIDTH, 6);
		objects.widthLabel = new LabelAbove(objects.widthSelector, 28, lg("PipePathEditorNew-Width"));
		objects.heightSelector = new NumberSelector(WIDTH/2+130, 50, 110, 110, PIPE_PATH_EDITOR_MIN_HEIGHT, PIPE_PATH_EDITOR_MAX_HEIGHT, 6);
		objects.heightLabel = new LabelAbove(objects.heightSelector, 28, lg("PipePathEditorNew-Height"));
		objects.fillRadio = new RadioButtons(WIDTH/2, 200, 140, 30, [lg("PipePathEditorNew-Straight"), lg("PipePathEditorNew-Curved"), lg("PipePathEditorNew-Random")], doNothing, 0);
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
			case 0: layout.pipeGrid = newArray2d(layout.width, layout.height, 0); break;
			case 1: layout.pipeGrid = newArray2d(layout.width, layout.height, 1); break;
			case 2: layout.pipeGrid = newArray2dLambda(layout.width, layout.height, (i, j)=>Math.random()<.6?1:0); break;
		}
		return new PipePathEditor(layout);
	},
}