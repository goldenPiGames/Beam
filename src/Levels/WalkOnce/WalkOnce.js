class OnceLevel extends DragPathLevel {
	constructor(layout) {
		layout.width = layout.grid.length;
		layout.height = layout.grid[0].length;
		layout.gap = 0;
		super(layout, {gap:0});
		this.pieces = layout.grid.map((row, i) => row.map((pis, j) => pis ? new OnceTile(i, j) : new OnceEmpty(i, j)));
		for (var i = 0; i < layout.grid.length; i++) {
			this.pieces[i] = [];
			for (var j = 0; j < layout.grid[i].length; j++) {
				this.pieces[i][j] = layout.grid[i][j] ? new OnceTile(i, j) : new OnceEmpty(i, j);
			}
		}
		//console.log(this)
		this.pieces.forEach(row=>row.forEach(pis=>pis.setParent(this)));
		this.path = [this.pieces[this.gridStartX][this.gridStartY]];
		this.lastPiece = this.pieces[this.gridEndX][this.gridEndY];
		this.evalPath();
	}
	update() {
		//super.update();
		this.pieces.forEach(row=>row.forEach(pis=>pis.update()));
		this.checkClickAlert();
		if (this.evalPath()) {
			this.win();
		}
	}
	evalPath() {
		this.beamStopX = null;
		this.beamPath = new Path2D();
		var x;
		var y;
		var bx = this.beamStartX;
		var by = this.beamStartY;
		this.beamPath.moveTo(bx, by);
		var p;
		this.pieces.forEach(row=>row.forEach(pis=>pis.tagged=false));
		for (var i = 0; i < this.path.length; i++) {
			let pis = this.path[i];
			if (pis.tagged)
				throw "already tagged somehow";
			pis.tagged = true;
			bx = pis.displayX + pis.displayWidth/2;
			by = pis.displayY + pis.displayHeight/2;
			this.beamPath.lineTo(bx, by);
		}
		if (this.path[this.path.length-1] == this.lastPiece && !this.pieces.find(row=>row.find(pis=>pis.holdUp()))) {
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
			this.drawExitArrow();
		this.pieces.forEach(row=>row.forEach(pis=>pis.draw()));
		drawBeam(this.beamPath);
		if (this.beamStopX)
			drawBeamStop(this.beamStopX, this.beamStopY);
	}
	win() {
		this.pieces.forEach(row=>row.forEach(pis=>pis.hovered = false));
		this.beamStopX = null;
		super.win();
	}
}
OnceLevel.prototype.mode = "WalkOnce";
OnceLevel.prototype.lModeName = "WalkOnce-Name";
OnceLevel.prototype.lModeRules = "WalkOnce-Rules";
OnceLevel.prototype.lModeHints = "WalkOnce-Hints";

//----------------------------------------------------------- Pieces ----------------------------------------------------------------------------
class OncePiece extends DragPathTile {
	constructor(x, y) {
		super();
		this.gridX = x;
		this.gridY = y;
	}
	setParent(parent) {
		this.parent = parent;
		this.neighborsD = [null, null, null, null];
		if (this.gridY > 0)
			this.neighborsD[UP] = this.parent.pieces[this.gridX][this.gridY-1];
		if (this.gridX < this.parent.pieces.length-1)
			this.neighborsD[RIGHT] = this.parent.pieces[this.gridX+1][this.gridY];
		if (this.gridY < this.parent.pieces[this.gridX].length-1)
			this.neighborsD[DOWN] = this.parent.pieces[this.gridX][this.gridY+1];
		if (this.gridX > 0)
			this.neighborsD[LEFT] = this.parent.pieces[this.gridX-1][this.gridY];
		this.neighborsL = this.neighborsD.filter(n=>n);
		this.updateDisplayPosition();
	}
}

class OnceTile extends OncePiece {
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
		return this.neighborsL.indexOf(pis) >= 0;
	}
	draw() {
		ctx.strokeStyle = this.hovered ? palette.hover : palette.normal;
		ctx.lineWidth = 2;
		ctx.strokeRect(this.displayX+1, this.displayY+1, this.displayWidth-2, this.displayHeight-2);
		ctx.strokeStyle = this.hovered ? palette.hover : this.tagged ? palette.beam : palette.normal;
		ctx.beginPath();
		ctx.arc(this.displayX+this.displayWidth/2, this.displayY+this.displayHeight/2, this.displayHeight/5, 0, 2*Math.PI);
		ctx.stroke();
	}
	holdUp() {
		return !this.tagged;
	}
}

class OnceEmpty extends OncePiece {
	draw() {
		ctx.lineWidth = 3;
		ctx.strokeStyle = palette.normal;
		ctx.beginPath();
		ctx.moveTo(this.displayX, this.displayY);
		ctx.lineTo(this.displayX+this.displayWidth, this.displayY+this.displayHeight);
		ctx.moveTo(this.displayX+this.displayWidth, this.displayY);
		ctx.lineTo(this.displayX, this.displayY+this.displayHeight);
		ctx.stroke();
	}
	canLinkTo(pis) {
		return false;
	}
	holdUp() {
		return false;
	}
}