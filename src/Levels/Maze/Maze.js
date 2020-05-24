class MazeLevel extends DragPathLevel {
	constructor(layout) {
		var usingTo;
		var gridUsed;
		if (layout.gridTo) {
			usingTo = true;
			gridUsed = layout.gridTo;
		} else {
			usingTo = false;
			gridUsed = layout.gridDownRight;
		}
		layout.width = gridUsed.length,
		layout.height = gridUsed[0].length,
		super(layout, {gap:0});
		this.tiles = [];
		for (var i = 0; i < gridUsed.length; i++) {
			this.tiles[i] = [];
			for (var j = 0; j < gridUsed[i].length; j++) {
				this.tiles[i][j] = new MazeTile(i, j, gridUsed[i][j], usingTo);
			}
		}
		//console.log(this)
		this.tiles.forEach(row=>row.forEach(pis=>pis.setParent(this)));
		this.path = [this.tiles[this.gridStartX][this.gridStartY]];
		this.lastPiece = this.tiles[this.gridEndX][this.gridEndY];
		this.path[0].addNeighbor("enter", layout.entranceSide);
		this.lastPiece.addNeighbor("exit", layout.exitSide);
		this.evalPath();
	}
	update() {
		//super.update();
		this.tiles.forEach(row=>row.forEach(pis=>pis.update()));
		this.checkClickAlert();
		if (this.evalPath()) {
			this.win();
		}
	}
	evalPath() {
		this.beamStopX = null;
		this.beamPath = new Path2D();
		var d = (this.entranceSide + 2) % 4;
		var x;
		var y;
		var bx = this.beamStartX;
		var by = this.beamStartY;
		this.beamPath.moveTo(bx, by);
		var p;
		this.tiles.forEach(row=>row.forEach(pis=>pis.tagged=false));
		for (var i = 0; i < this.path.length; i++) {
			let pis = this.path[i];
			if (pis.tagged)
				throw "already tagged somehow";
			pis.tagged = true;
			bx = pis.displayX + pis.displayWidth/2;
			by = pis.displayY + pis.displayHeight/2;
			this.beamPath.lineTo(bx, by);
		}
		if (this.path[this.path.length-1] == this.lastPiece) {
			this.beamPath.lineTo(this.beamEndX, this.beamEndY);
			return true;
		} else {
			this.beamStopX = bx;
			this.beamStopY = by;
			return false;
		}
	}
	draw() {
		this.drawBorder();
		if (!this.won)
			ctx.stroke(this.exitArrowPath);
		this.tiles.forEach(row=>row.forEach(pis=>pis.draw()));
		drawBeam(this.beamPath);
		if (this.beamStopX)
			drawBeamStop(this.beamStopX, this.beamStopY);
	}
	win() {
		this.tiles.forEach(row=>row.forEach(pis=>pis.hovered = false));
		this.beamStopX = null;
		super.win();
	}
	getGridDownRight() {
		return (this.tiles.map(col=>col.map(pis=>(pis.neighborsD[RIGHT]?1:0)+(pis.neighborsD[DOWN]?2:0))));
	}
}
MazeLevel.prototype.mode = "Maze";
MazeLevel.prototype.lModeName = "Maze-Name";
MazeLevel.prototype.lModeRules = "Maze-Rules";
MazeLevel.prototype.lModeHints = "Maze-Hints";


//----------------------------------------------------------- Pieces ----------------------------------------------------------------------------
class MazeTile extends DragPathTile {
	constructor(x, y, dir, usingTo) {
		super();
		this.gridX = x;
		this.gridY = y;
		this.dir = dir;
		this.usingTo = usingTo;
		this.neighborsD = [null, null, null, null];
	}
	setParent(parent) {
		this.parent = parent;
		if (this.usingTo) {
			if (this.dir <= 3) {
				this.addTo(this.dir);
				//this.neighborsL = this.neighborsD.filter(n=>n);
			}
		} else {
			if (this.dir >= 2)
				this.addTo(DOWN);
			if (this.dir % 2)
				this.addTo(RIGHT);
		}
		this.updateDisplayPosition();
	}
	update() {
		this.updateMouse();
		if (this.hovered)
			hovered = true;
		if (this.pressed && !this.tagged) {
			this.parent.tryLinkTo(this);
		} else if (this.tagged) {
			if (this.clicked)
				this.parent.cutPath(this);
			else if (this.pressed)
				this.parent.cutPathHeadOnly(this);
		}
	}
	canLinkTo(pis) {
		return this.neighborsD.indexOf(pis) >= 0;
	}
	draw() {
		ctx.strokeStyle = palette.normal;
		ctx.lineWidth = 4;
		ctx.beginPath();
		if (!this.neighborsD[UP]) {
			ctx.moveTo(this.displayX-2, this.displayY);
			ctx.lineTo(this.displayX+this.displayWidth+2, this.displayY);
		}
		if (!this.neighborsD[LEFT]) {
			ctx.moveTo(this.displayX, this.displayY-2);
			ctx.lineTo(this.displayX, this.displayY+this.displayHeight+2);
		}
		ctx.stroke();
		ctx.strokeStyle = this.hovered ? palette.hover : this.tagged ? palette.beam : palette.normal;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.arc(this.displayX+this.displayWidth/2, this.displayY+this.displayHeight/2, this.displayHeight/8, 0, 2*Math.PI);
		ctx.stroke();
	}
	getGridDownRight() {
		return this.tiles.map(col=>col.map(pis=>(pis.neighborsD[RIGHT]?1:0)+(pis.neighborsD[DOWN]?2:0)))
	}
}