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
	}
	update() {
		this.wallsRight.forEach(col=>col.forEach(wal=>wal.update()));
		this.wallsDown.forEach(col=>col.forEach(wal=>wal.update()));
	}
	draw() {
		ctx.strokeStyle = palette.normal;
		this.gridLevel.drawBorder();
		this.wallsRight.forEach(col=>col.forEach(wal=>wal.draw()));
		this.wallsDown.forEach(col=>col.forEach(wal=>wal.draw()));
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
		if (this.hovered)
			hovered = true;
	}
	draw() {
		ctx.strokeStyle = this.hovered ? palette.hover : palette.normal;
		ctx.globalAlpha = this.open ? this.hovered ? .5 : .2 : 1;
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
		if (this.hovered)
			hovered = true;
	}
	draw() {
		ctx.strokeStyle = this.hovered ? palette.hover : palette.normal;
		ctx.globalAlpha = this.open ? this.hovered ? .5 : .2 : 1;
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.moveTo(this.xLeft, this.y);
		ctx.lineTo(this.xRight, this.y);
		ctx.stroke();
	}
}