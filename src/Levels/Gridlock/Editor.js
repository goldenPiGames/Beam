const GRIDLOCK_EDITOR_MIN_WIDTH = 4;
const GRIDLOCK_EDITOR_MAX_WIDTH = 7;
const GRIDLOCK_EDITOR_MIN_HEIGHT = 4;
const GRIDLOCK_EDITOR_MAX_HEIGHT = 7;

class GridlockEditor extends Editor {
	constructor(layout) {
		if (!layout) {
			layout = {
				width : 5,
				height : 5,
				pieces : [],
				direction : RIGHT,
				position : 2,
			}
		}
		layout.mode = "Gridlock";
		//layout.width = layout.also.length;
		super(layout);
		this.tabIndex = -1;
		this.tabs = new Tabs(100, HEIGHT-35, WIDTH-200, 35, [lg("GridlockEditor-TabAddRow"), lg("GridlockEditor-TabRemoveRow"), lg("GridlockEditor-TabAddColumn"), lg("GridlockEditor-TabRemoveColumn"), lg("GridlockEditor-TabExit")], t=>this.setTab(t), ()=>this.tabIndex);
		this.objects = [
			new GridlockEditorDragFrom(0, HEIGHT/2-140, 70, 70, this, 2, true),
			new GridlockEditorDragFrom(0, HEIGHT/2-70, 70, 70, this, 3, true),
			new GridlockEditorDragFrom(0, HEIGHT/2, 70, 70, this, 2, false),
			new GridlockEditorDragFrom(0, HEIGHT/2+70, 70, 70, this, 3, false),
			this.tabs,
		]
		this.redoGrid();
	}
	reconstructGridLevel() {
		this.gridLevel = new GridLevel({
			width : this.layout.width,
			height : this.layout.height,
			entranceSide : directionOpposite(this.layout.direction),
			entrancePosition : this.layout.position,
			exitSide : this.layout.direction,
			exitPosition : this.layout.position,
		}, {gap:0.05,margin:MAZE_EDITOR_MARGIN});
	}
	redoBorder() {
		this.reconstructGridLevel();
		this.pieces.forEach(pis=>pis.checkThru());
		this.setTab();
	}
	redoGrid() {
		this.reconstructGridLevel();
		this.pieces = this.layout.pieces.map(pis=>new GridlockEditorPiece(pis, this));
		this.tabIndex = -1;
		//this.pieces.forEach(pis=>pis.setParent(this));
	}
	update() {
		this.objects.forEach(oj=>oj.update());
		if (this.stripes) {
			this.stripes.forEach(oj=>oj.update());
			var clicked = this.stripes.find(s=>s.clicked);
			if (clicked) {
				this.setExit(clicked.side, clicked.position);
			}
			if (this.pieces.find(pis=>pis.held))
				this.setTab(-1);
		}
		this.pieces.forEach(pis=>pis.update());
		//console.log(this.pieces);
		this.pieces = this.pieces.filter(pis=>!pis.dead);
	}
	draw() {
		ctx.strokeStyle = palette.normal;
		this.gridLevel.drawBorder();
		this.objects.forEach(oj=>oj.draw());
		if (this.stripes)
			this.stripes.forEach(oj=>oj.draw());
		this.pieces.forEach(pis=>pis.draw());
	}
	getLayout() {
		//this.layout.also = this.checks.map(col=>col.map(cze=>cze.value?1:0));
		this.layout.pieces = this.pieces.map(pis=>pis.getLayout());
		return this.layout;
	}
	isPlaceOccupied(com, x = com.gridX, y = com.gridY, width = com.gridWidth, height = com.gridHeight) {
		if (x < 0 || x + width > this.layout.width || y < 0 || y + height > this.layout.height)
			return "wall";
		return this.pieces.find(pis => pis != com && x + width > pis.gridX && x < pis.gridX + pis.gridWidth && y + height > pis.gridY && y < pis.gridY + pis.gridHeight);
	}
	setTab(dex) {
		if (typeof dex != "number")
			dex = this.tabIndex;
		switch (dex) {
			case -1:
				this.tabIndex = -1;
				this.stripes = null;
				break;
			case 0: //+row
				this.tabIndex = -1;
				this.stripes = null;
				this.addRow();
				break;
			case 1: //-row
				this.tabIndex = -1;
				this.stripes = null;
				this.removeRow();
				break;
			case 2: //+col
				this.tabIndex = -1;
				this.stripes = null;
				this.addColumn();
				break;
			case 3: //-col
				this.tabIndex = -1;
				this.stripes = null;
				this.removeColumn();
				break;
			case 4: //exit
				this.tabIndex = -1;
				this.tabIndex = 4;
				this.stripes = this.getEdgeStripes().filter(oj=>!(oj.side == this.layout.direction && oj.position == this.layout.position));
				break;
		}
	}
	addRow() {
		this.getLayout();
		if (this.layout.height >= GRIDLOCK_EDITOR_MAX_HEIGHT) {
			qAlert(lg("Editor-MaxHeight"));
			return false;
		}
		this.layout.height++;
		this.redoGrid();
	}
	removeRow() {
		this.getLayout();
		if (this.layout.height <= GRIDLOCK_EDITOR_MIN_HEIGHT) {
			qAlert(lg("Editor-MinHeight"));
			return false;
		}
		this.layout.height--;
		if ((this.layout.entranceSide == LEFT || this.layout.entranceSide == RIGHT) && this.layout.position >= this.layout.height)
			this.layout.position--;
		this.layout.pieces = this.layout.pieces.filter(pis=>pis.horiz?pis.y<this.layout.height:(pis.y+pis.len-1<this.layout.height));
		this.redoGrid();
	}
	addColumn() {
		this.getLayout();
		if (this.layout.width >= GRIDLOCK_EDITOR_MAX_WIDTH) {
			qAlert(lg("Editor-MaxWidth"));
			return false;
		}
		this.layout.width++;
		this.redoGrid();
	}
	removeColumn() {
		this.getLayout();
		if (this.layout.width <= GRIDLOCK_EDITOR_MIN_WIDTH) {
			qAlert(lg("Editor-MinWidth"));
			return false;
		}
		this.layout.width--;
		if ((this.layout.entranceSide == LEFT || this.layout.entranceSide == RIGHT) && this.layout.position >= this.layout.width)
			this.layout.position--;
		this.layout.pieces = this.layout.pieces.filter(pis=>pis.horiz?pis.x+pis.len-1<this.layout.width:(pis.x<this.layout.width));
		this.redoGrid();
	}
	setExit(side, position) {
		//console.log(side, position);
		this.layout.direction = side;
		this.layout.position = position;
		this.redoBorder();
	}
}


class GridlockEditorPiece extends UIObject {
	constructor(data, parent) {
		super();
		this.gridX = data.x;
		this.gridY = data.y;
		this.gridWidth = data.horiz ? data.len : 1;
		this.gridHeight = !data.horiz ? data.len : 1;
		this.gridLength = data.len;
		this.movesHoriz = data.horiz;
		this.thruGapR = 10;
		if (parent)
			this.setParent(parent);
	}
	setParent(parent) {
		this.parent = parent;
		this.updateDisplayPosition();
	}
	update() {
		super.update();
		if (this.hovered)
			hovered = true;
		if (this.clicked) {
			//this.findDragBounds();
		}
		if (this.held) {
			this.displayX += this.draggedX;
			this.displayY += this.draggedY;
		}
		if (this.released) {
			this.snapToGrid();
		}
		if (!this.held && (this.gridX == undefined || this.gridY == undefined)) {
			this.dead = true;
		}
	}
	draw() {
		ctx.lineWidth = 3;
		ctx.strokeStyle = this.held ? palette.click : this.hovered ? palette.hover : palette.normal;
		if (this.thru) {
			if (this.movesHoriz) {
				ctx.strokeRect(this.displayX+1, this.displayY+1, this.displayWidth-2, this.displayHeight/2-this.thruGapR);
				ctx.strokeRect(this.displayX+1, this.displayY+this.displayHeight/2+this.thruGapR-1, this.displayWidth-2, this.displayHeight/2-this.thruGapR);
			} else {
				ctx.strokeRect(this.displayX+1, this.displayY+1, this.displayWidth/2-this.thruGapR, this.displayHeight-2);
				ctx.strokeRect(this.displayX+this.displayWidth/2+this.thruGapR-1, this.displayY+1, this.displayWidth/2-this.thruGapR, this.displayHeight-2);
			}
		} else {
			ctx.strokeRect(this.displayX+1, this.displayY+1, this.displayWidth-2, this.displayHeight-2);
		}
	}
	snapToGrid() {
		if (this.released && (mouse.lastX < this.parent.gridLevel.gridToPixX(-1/2) || mouse.lastY < this.parent.gridLevel.gridToPixY(-1/2) || mouse.lastX > this.parent.gridLevel.gridToPixX(this.parent.layout.width-1/2) || mouse.lastY > this.parent.gridLevel.gridToPixY(this.parent.layout.height-1/2))) {
			this.dead = true;
			return false;
		}
		var newX = Math.round(this.parent.gridLevel.pixToGridX(this.displayX) + 1/2);
		var newY = Math.round(this.parent.gridLevel.pixToGridY(this.displayY) + 1/2);
		if (!this.parent.isPlaceOccupied(this, newX, newY)) {
			this.gridX = newX;
			this.gridY = newY;
		}
		if (this.gridX == undefined) {
			this.dead = true;
			return false;
		}
		this.updateDisplayPosition();
	}
	updateDisplayPosition() {
		this.displayWidth = this.parent.gridLevel.gridScale * (this.gridWidth - .1);
		this.displayHeight = this.parent.gridLevel.gridScale * (this.gridHeight - .1);
		if (typeof this.gridX == "number") {
			this.displayX = this.parent.gridLevel.gridToPixX(this.gridX - 1/2 + .05);
		} else {
			this.displayX = mouse.x - this.displayWidth/2;
			this.held = true;
		}
		if (typeof this.gridY == "number") {
			this.displayY = this.parent.gridLevel.gridToPixY(this.gridY - 1/2 + .05);
		} else {
			this.displayY = mouse.y - this.displayHeight/2;
			this.held = true;
		}
		this.checkThru();
	}
	checkThru() {
		this.thru = false;
		if (this.parent.layout.direction % 2) {//horizontal
			if (this.movesHoriz && this.gridY == this.parent.layout.position)
				this.thru = true;
		} else {//vertical
			if (!this.movesHoriz && this.gridX == this.parent.layout.position)
				this.thru = true;
		}
	}
	getLayout() {
		return {
			x : this.gridX,
			y : this.gridY,
			len : this.gridLength,
			horiz : this.movesHoriz,
		}
	}
}

class GridlockEditorDragFrom extends UIObject {
	constructor(x, y, width, height, parent, len, horiz) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.len = len;
		this.horiz = horiz;
		this.parent = parent;
		this.iwidth = this.width/5*(horiz?len:1);
		this.iheight = this.height/5*(horiz?1:len);
	}
	update() {
		this.updateMouse();
		if (this.hovered)
			hovered = true;
		if (this.clicked)
			this.parent.pieces.push(new GridlockEditorPiece({len:this.len,horiz:this.horiz}, this.parent));
	}
	draw() {
		ctx.strokeStyle = this.held ? palette.click : this.hovered ? palette.hover : palette.normal;
		this.stroke();
		ctx.strokeRect(this.x+this.width/2-this.iwidth/2, this.y+this.height/2-this.iheight/2, this.iwidth, this.iheight);
	}
}

const EDITOR_MODE_GRIDLOCK = {
	id:"Gridlock",
	lName:"Gridlock-Name",
	getPane:()=>{
		var objects = {};
		objects.widthSelector = new NumberSelector(WIDTH/2, 50, 110, 110, GRIDLOCK_EDITOR_MIN_WIDTH, GRIDLOCK_EDITOR_MAX_WIDTH, 6);
		objects.widthLabel = new LabelAbove(objects.widthSelector, 28, lg("GridlockEditorNew-Width"));
		objects.heightSelector = new NumberSelector(WIDTH/2+130, 50, 110, 110, GRIDLOCK_EDITOR_MIN_HEIGHT, GRIDLOCK_EDITOR_MAX_HEIGHT, 6);
		objects.heightLabel = new LabelAbove(objects.heightSelector, 28, lg("GridlockEditorNew-Height"));
		//objects.fillRadio = new RadioButtons(WIDTH/2, 200, 140, 30, [lg("GridlockEditorNew-Empty"), lg("GridlockEditorNew-Full")], doNothing, 0);
		return new EditorNewPane(objects);
	},
	getEditor:pane=>{
		var layout = {};
		layout.width = pane.widthSelector.getNumber();
		layout.height = pane.heightSelector.getNumber();
		layout.direction = RIGHT;
		layout.position = Math.floor((layout.height-1)/2);
		layout.pieces = [];
		return new GridlockEditor(layout);
	},
}