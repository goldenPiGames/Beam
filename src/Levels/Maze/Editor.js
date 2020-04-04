class MazeEditor extends Editor {
	constructor(layout) {
		if (!layout) {
			layout = {
				mode : "Maze",
				gridDownRight : [
					[3,3,3,3,3,3,1],
					[3,3,3,3,3,3,1],
					[3,3,3,3,3,3,1],
					[3,3,3,3,3,3,1],
					[3,3,3,3,3,3,1],
					[3,3,3,3,3,3,1],
					[3,3,3,3,3,3,1],
					[2,2,2,2,2,2,0],],
				entranceSide : LEFT,
				entrancePosition : 3,
				exitSide : RIGHT,
				exitPosition : 3,
			}
		}
		layout.width = layout.gridDownRight.length;
		layout.height = layout.gridDownRight[0].length;
		layout.gap = 0;
		super(layout);
		this.tabIndex = 0;
		this.tabs = new Tabs(100, HEIGHT-35, WIDTH-200, 35, [lg("MazeEditor-TabWall"), lg("MazeEditor-TabAddRow"), lg("MazeEditor-TabRemoveRow"), lg("MazeEditor-TabAddColumn"), lg("MazeEditor-TabRemoveColumn"), lg("MazeEditor-TabEntrance"), lg("MazeEditor-TabExit")], t=>this.setTab(t), ()=>this.tabIndex);
		this.redoGrid();
	}
	redoGrid() {
		console.log(this.layout);
		this.layout.gap = 0;
		this.gridLevel = new GridLevel(this.layout);
		this.wallsRight = [];
		for (var i = 0; i < this.layout.gridDownRight.length-1; i++) {
			this.wallsRight[i] = [];
			for (var j = 0; j < this.layout.gridDownRight[i].length; j++) {
				this.wallsRight[i][j] = new MazeEditorWallVert(this.gridLevel.gridToPixX(i+1/2), this.gridLevel.gridToPixY(j-1/2), this.gridLevel.gridToPixY(j+1/2), this.layout.gridDownRight[i][j] % 2);
			}
		}
		this.wallsDown = [];
		for (var i = 0; i < this.layout.gridDownRight.length; i++) {
			this.wallsDown[i] = [];
			for (var j = 0; j < this.layout.gridDownRight[i].length-1; j++) {
				this.wallsDown[i][j] = new MazeEditorWallHoriz(this.gridLevel.gridToPixX(i-1/2), this.gridLevel.gridToPixX(i+1/2), this.gridLevel.gridToPixY(j+1/2), this.layout.gridDownRight[i][j] >= 2);
			}
		}
		this.setTab();
	}
	update() {
		this.tabs.update();
		switch (this.tabIndex) {
			case 0:
				this.wallsRight.forEach(col=>col.forEach(wal=>wal.update()));
				this.wallsDown.forEach(col=>col.forEach(wal=>wal.update()));
				break;
			case 1:
				this.stripes.forEach(s=>s.update());
				var clicked = this.stripes.find(s=>s.clicked);
				if (clicked)
					this.addRow(clicked.jVert);
				break;
			case 2:
				this.stripes.forEach(s=>s.update());
				var clicked = this.stripes.find(s=>s.clicked);
				if (clicked)
					this.removeRow(clicked.jVert, clicked.jHoriz);
				break;
			case 3:
				this.stripes.forEach(s=>s.update());
				var clicked = this.stripes.find(s=>s.clicked);
				if (clicked)
					this.addColumn(clicked.iHoriz);
				break;
			case 4:
				this.stripes.forEach(s=>s.update());
				var clicked = this.stripes.find(s=>s.clicked);
				if (clicked)
					this.removeColumn(clicked.iHoriz, clicked.iVert);
				break;
		}
	}
	draw() {
		this.tabs.draw();
		ctx.strokeStyle = palette.normal;
		this.gridLevel.drawBorder();
		this.wallsRight.forEach(col=>col.forEach(wal=>wal.draw()));
		this.wallsDown.forEach(col=>col.forEach(wal=>wal.draw()));
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
				for (var j = 0; j < this.layout.height; j++) {
					this.stripes.push(new MazeEditorStripeHoriz(50, this.gridLevel.gridToPixY(j-1/2), WIDTH-100, this.gridLevel.gridScale, this, j));
				}
				break;
			case 2: //-row
				this.stripes = [];
				this.stripes.push(new MazeEditorStripeHoriz(50, this.gridLevel.gridToPixY(-1/2), WIDTH-100, this.gridLevel.gridScale, this, 0, 0));
				for (var j = 1; j < this.layout.height-1; j++) {
					this.stripes.push(new MazeEditorStripeHoriz(50, this.gridLevel.gridToPixY(j-1/2), WIDTH-100, this.gridLevel.gridScale/2, this, j, j-1));
					this.stripes.push(new MazeEditorStripeHoriz(50, this.gridLevel.gridToPixY(j), WIDTH-100, this.gridLevel.gridScale/2, this, j, j));
				}
				this.stripes.push(new MazeEditorStripeHoriz(50, this.gridLevel.gridToPixY(this.layout.height-3/2), WIDTH-100, this.gridLevel.gridScale, this, this.layout.height-1, this.layout.height-2));
				break;
			case 3: //+col
				this.stripes = [];
				for (var i = 0; i < this.layout.width; i++) {
					this.stripes.push(new MazeEditorStripeVert(this.gridLevel.gridToPixX(i-1/2), 50, this.gridLevel.gridScale, HEIGHT-100, this, i));
				}
				break;
			case 4: //-col
				this.stripes = [];
				this.stripes.push(new MazeEditorStripeVert(this.gridLevel.gridToPixX(-1/2), 50, this.gridLevel.gridScale, HEIGHT-100, this, 0, 0));
				for (var i = 1; i < this.layout.width-1; i++) {
					this.stripes.push(new MazeEditorStripeVert(this.gridLevel.gridToPixX(i-1/2), 50, this.gridLevel.gridScale/2, HEIGHT-100, this, i, i-1));
					this.stripes.push(new MazeEditorStripeVert(this.gridLevel.gridToPixX(i), 50, this.gridLevel.gridScale/2, HEIGHT-100, this, i, i));
				}
				this.stripes.push(new MazeEditorStripeVert(this.gridLevel.gridToPixX(this.layout.width-3/2), 50, this.gridLevel.gridScale, HEIGHT-100, this, this.layout.width-1, this.layout.width-2));
				break;
		}
	}
	getLayout() {
		this.layout.gap = undefined;
		this.layout.gridDownRight = newArray2d(this.layout.width, this.layout.height, 0);
		this.wallsRight.forEach((col, i)=>col.forEach((wal, j)=>{
			if (wal.open)
				this.layout.gridDownRight[i][j] += 1;
		}));
		this.wallsDown.forEach((col, i)=>col.forEach((wal, j)=>{
			if (wal.open)
				this.layout.gridDownRight[i][j] += 2;
		}));
		return this.layout;
	}
	addRow(jVert) {
		this.getLayout();
		if (this.layout.height >= 12) {
			qAlert(lg("MazeEditor-MaxHeight"));
			return false;
		}
		this.layout.height++;
		this.layout.gridDownRight.forEach(col=>col.splice(jVert, 0, (col[jVert]&1)+2));
		this.redoGrid();
	}
	removeRow(jVert, jHoriz) {
		this.getLayout();
		if (this.layout.height <= 4) {
			qAlert(lg("MazeEditor-MinHeight"));
			return false;
		} else if (jVert == jHoriz) {
			this.layout.height--;
			//this.layout.gridDownRight.splice(iHoriz, 1);
			this.layout.gridDownRight.forEach(col=>col.splice(jVert, 1));
			this.redoGrid();
		} else if (jVert-1 == jHoriz) {
			this.layout.height--;
			//this.layout.gridDownRight.splice(iVert, 2, this.layout.gridDownRight[iVert].map((o,j)=>(o&2)+(this.layout.gridDownRight[iHoriz][j]&1)));
			this.layout.gridDownRight.forEach(col=>col.splice(jHoriz, 2, (col[jHoriz]&1) + (col[jVert]&2)));
			this.redoGrid();
		} else {
			return false;
		}
	}
	addColumn(iHoriz) {
		this.getLayout();
		if (this.layout.width >= 16) {
			qAlert(lg("MazeEditor-MaxWidth"));
			return false;
		}
		this.layout.width++;
		this.layout.gridDownRight.splice(iHoriz, 0, this.layout.gridDownRight[iHoriz].map(o=>(o&2)+1));
		this.redoGrid();
	}
	removeColumn(iHoriz, iVert) {
		this.getLayout();
		if (this.layout.width <= 4) {
			qAlert(lg("MazeEditor-MinWidth"));
			return false;
		} else if (iHoriz == iVert) {
			this.layout.width--;
			this.layout.gridDownRight.splice(iHoriz, 1);
			this.redoGrid();
		} else if (iHoriz-1 == iVert) {
			this.layout.width--;
			this.layout.gridDownRight.splice(iVert, 2, this.layout.gridDownRight[iVert].map((o,j)=>(o&2)+(this.layout.gridDownRight[iHoriz][j]&1)));
			this.redoGrid();
		} else {
			return false;
		}
	}
}

class MazeEditorWallVert extends UIObject {
	constructor(x, yTop, yBottom, open) {
		super();
		this.x = x;
		this.yTop = yTop;
		this.yBottom = yBottom;
		this.yMiddle = (this.yBottom + this.yTop) / 2;
		this.radius = (this.yBottom - this.yTop) / 2;
		this.open = open;
	}
	intersectsMouse() {
		return (Math.abs(mouse.x - this.x) + Math.abs(mouse.y - this.yMiddle)) < this.radius;
	}
	update() {
		this.updateMouse();
		if (this.clicked)
			this.open = !this.open;
		if (this.hovered) {
			hovered = true;
			this.drawHovered = true;
		}
	}
	draw() {
		ctx.strokeStyle = this.drawHovered ? palette.hover : palette.normal;
		ctx.globalAlpha = this.open ? this.drawHovered ? .5 : .2 : 1;
		this.drawHovered = false;
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.moveTo(this.x, this.yTop);
		ctx.lineTo(this.x, this.yBottom);
		ctx.stroke();
	}
}

class MazeEditorWallHoriz extends UIObject {
	constructor(xLeft, xRight, y, open) {
		super();
		this.xLeft = xLeft;
		this.xRight = xRight;
		this.y = y;
		this.xMiddle = (this.xRight + this.xLeft) / 2;
		this.radius = (this.xRight - this.xLeft) / 2;
		this.open = open;
	}
	intersectsMouse() {
		return (Math.abs(mouse.x - this.xMiddle) + Math.abs(mouse.y - this.y)) < this.radius;
	}
	update() {
		this.updateMouse();
		if (this.clicked)
			this.open = !this.open;
		if (this.hovered) {
			hovered = true;
			this.drawHovered = true;
		}
	}
	draw() {
		//console.log("b", this.x, this.y, this.drawHovered);
		ctx.strokeStyle = this.drawHovered ? palette.hover : palette.normal;
		ctx.globalAlpha = this.open ? this.drawHovered ? .5 : .2 : 1;
		this.drawHovered = false;
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.moveTo(this.xLeft, this.y);
		ctx.lineTo(this.xRight, this.y);
		ctx.stroke();
	}
}

class MazeEditorStripeHoriz extends UIObject {
	constructor(x, y, width, height, parent, jVert, jHoriz) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.parent = parent;
		this.walls = [];
		this.jVert = jVert;
		this.jHoriz = jHoriz;
		//console.log(this.parent);
		if (typeof jVert == "number") {
			for (var i = 0; i < this.parent.layout.width-1; i++) {
				//console.log(iHoriz, j)
				this.walls.push(this.parent.wallsRight[i][jVert]);
			}
		}
		if (typeof jHoriz == "number") {
			for (var i = 0; i < this.parent.layout.width; i++) {
				//console.log(iHoriz, j)
				this.walls.push(this.parent.wallsDown[i][jHoriz]);
			}
		}
		
	}
	update() {
		this.updateMouse();
		if (this.hovered) {
			hovered = true;
			this.walls.forEach(wa=>wa.drawHovered = true);
		}
	}
	draw() {
		
	}
}

class MazeEditorStripeVert extends UIObject {
	constructor(x, y, width, height, parent, iHoriz, iVert) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.parent = parent;
		this.walls = [];
		this.iHoriz = iHoriz;
		this.iVert = iVert;
		//console.log(this.parent);
		if (typeof iHoriz == "number") {
			for (var j = 0; j < this.parent.layout.height-1; j++) {
				//console.log(iHoriz, j)
				this.walls.push(this.parent.wallsDown[iHoriz][j]);
			}
		}
		if (typeof iVert == "number") {
			for (var j = 0; j < this.parent.layout.height; j++) {
				//console.log(iHoriz, j)
				this.walls.push(this.parent.wallsRight[iVert][j]);
			}
		}
	}
	update() {
		this.updateMouse();
		if (this.hovered) {
			hovered = true;
			this.walls.forEach(wa=>wa.drawHovered = true);
		}
	}
	draw() {
		
	}
}
