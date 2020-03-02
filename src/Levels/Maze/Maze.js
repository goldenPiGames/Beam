class MazeLevel extends GridLevel {
	constructor(layout) {
		super({
			width : layout.gridTo.length,
			height : layout.gridTo[0].length,
			gap : 0,
			entranceSide : layout.entranceSide,
			entrancePosition : layout.entrancePosition,
			exitSide : layout.exitSide,
			exitPosition : layout.exitPosition,
		});
		this.tiles = [];
		for (var i = 0; i < layout.gridTo.length; i++) {
			this.tiles[i] = [];
			for (var j = 0; j < layout.gridTo[i].length; j++) {
				this.tiles[i][j] = new MazeTile(i, j, layout.gridTo[i][j]);
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
		if (this.evalPath()) {
			this.win();
		}
	}
	cutPath(pis) {
		if (this.path[this.path.length-1] == pis)
			return false;
		playSFX("blipdown");
		let cutdex = this.path.indexOf(pis);
		if (cutdex > -1)
			this.path.splice(cutdex+1);
	}
	cutPathHeadOnly(pis) {
		if (this.path[this.path.length-2] == pis)
			this.cutPath(pis);
	}
	tryLinkTo(pis) {
		let head = this.path[this.path.length-1];
		if (head.canLinkTo(pis)) {
			playSFX("blip1");
			this.path.push(pis);
			pis.tagged = true;
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
	
}
MazeLevel.prototype.lModeName = "Maze-Name";
MazeLevel.prototype.lModeRules = "Maze-Rules";
MazeLevel.prototype.lModeHints = "Maze-Hints";


//----------------------------------------------------------- Pieces ----------------------------------------------------------------------------
class MazeTile extends UIObject {
	constructor(x, y, dir) {
		super();
		this.gridX = x;
		this.gridY = y;
		this.dir = dir;
		this.neighborsD = [null, null, null, null];
	}
	setParent(parent) {
		this.parent = parent;
		if (this.dir <= 3) {
			var neigh = this.parent.tiles[this.gridX+directionDX(this.dir)][this.gridY+directionDY(this.dir)];
			if (neigh) {
				this.neighborsD[this.dir] = neigh;
				neigh.addNeighbor(this, directionOpposite(this.dir));
			}
			//this.neighborsL = this.neighborsD.filter(n=>n);
		}
		this.updateDisplayPosition();
	}
	addNeighbor(neigh, side) {
		this.neighborsD[side] = neigh;
	}
	updateDisplayPosition() {
		this.displayX = this.parent.gridToPixX(this.gridX - 1/2);
		this.displayY = this.parent.gridToPixY(this.gridY - 1/2);
		this.displayWidth = this.parent.gridScale;
		this.displayHeight = this.parent.gridScale;
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
}