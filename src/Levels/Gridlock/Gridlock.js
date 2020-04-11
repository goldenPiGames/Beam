//TODO change layout so it has data instead of actual pieces
class GridlockLevel extends GridLevel {
	constructor(layout) {
		layout.entranceSide = directionOpposite(layout.direction);
		layout.entrancePosition = layout.position,
		layout.exitSide = layout.direction,
		layout.exitPosition = layout.position,
		super(layout, {gap:0.05});
		this.direction = layout.direction;
		this.width = layout.width;
		this.height = layout.height;
		this.pieces = layout.pieces.map(d=>new GridlockPiece(d));
		this.pieces.forEach(pis=>pis.setParent(this));
		this.evalPath();
		this.beamStopX = null;
	}
	update() {
		this.pieces.forEach(pis=>pis.update());
		if (this.evalPath()) {
			this.win();
		}
	}
	evalPath() {
		this.beamStopX = null;
		this.beamPath = new Path2D();
		var blocked;
		var bx = this.beamStartX;
		var by = this.beamStartY;
		this.beamPath.moveTo(bx, by);
		//It uses the beam's and pieces' display position instead of their grid position because that's how you separate model and view.
		//Just kidding, it's so that the beam goes through as soon as you drag the last piece out of the way, instead of waiting until you set it down.
		switch (this.direction) {
			case UP:
					blocked = this.pieces.filter(pis => !pis.thru && this.beamEntrancePosition >= pis.displayX && this.beamEntrancePosition <= pis.displayX + pis.displayWidth).sort((a, b) => b.displayY - a.displayY)[0];
					by = blocked ? blocked.displayY + blocked.displayHeight : this.beamEndY;
					break;
			case RIGHT:
					//this.pieces.forEach(pis => console.log(this.beamEntrancePosition, pis.displayY, pis.displayHeight));
					blocked = this.pieces.filter(pis => !pis.thru && this.beamEntrancePosition >= pis.displayY && this.beamEntrancePosition <= pis.displayY + pis.displayHeight).sort((a, b) => a.displayX - b.displayX)[0];
					bx = blocked ? blocked.displayX : this.beamEndX;
					break;
			case DOWN:
					blocked = this.pieces.filter(pis => !pis.thru && this.beamEntrancePosition >= pis.displayX && this.beamEntrancePosition <= pis.displayX + pis.displayWidth).sort((a, b) => a.displayY - b.displayY)[0];
					by = blocked ? blocked.displayY : this.beamEndY;
					break;
			case LEFT:
					blocked = this.pieces.filter(pis => !pis.thru && this.beamEntrancePosition >= pis.displayY && this.beamEntrancePosition <= pis.displayY + pis.displayHeight).sort((a, b) => b.displayX - a.displayX)[0];
					bx = blocked ? blocked.displayX + blocked.displayWidth : this.beamEndX;
					break;
		}
		this.beamPath.lineTo(bx, by);
		if (blocked) {
			this.beamStopX = bx;
			this.beamStopY = by;
			return false;
		} else
			return true;
	}
	draw() {
		this.drawBorder();
		this.pieces.forEach(pis=>pis.draw());
		drawBeam(this.beamPath);
		if (this.beamStopX)
			drawBeamStop(this.beamStopX, this.beamStopY);
	}
	isSpaceOccupied(i, j) {
		return this.pieces.find(pis => i >= pis.gridX && i < pis.gridX + pis.gridWidth && j >= pis.gridY && j < pis.gridY + pis.gridHeight);
	}
	isPlaceOccupied(com, x = com.gridX, y = com.gridY, width = com.gridWidth, height = com.gridHeight) {
		if (x < 0 || x + width > this.layout.width || y < 0 || y + height > this.layout.height)
			return "wall";
		return this.pieces.find(pis => pis != com && x + width > pis.gridX && x < pis.gridX + pis.gridWidth && y + height > pis.gridY && y < pis.gridY + pis.gridHeight);
	}
	win() {
		this.pieces.forEach(pis=>pis.snapEnd());
		super.win();
	}
}
GridlockLevel.prototype.lModeName = "Gridlock-Name";
GridlockLevel.prototype.lModeRules = "Gridlock-Rules";
GridlockLevel.prototype.lModeHints = "Gridlock-Hints";

class GridlockPiece extends UIObject {
	constructor(data) {
		super();
		this.gridX = data.x;
		this.gridY = data.y;
		this.gridWidth = data.horiz ? data.len : 1;
		this.gridHeight = !data.horiz ? data.len : 1;
		this.movesHoriz = data.horiz;
		this.thruGapR = 10;
	}
	setParent(parent) {
		this.parent = parent;
		if (this.parent.direction % 2) {//horizontal
			if (this.movesHoriz && this.gridY == this.parent.gridStartY)
				this.thru = true;
		} else {//vertical
			if (!this.movesHoriz && this.gridX == this.parent.gridStartX)
				this.thru = true;
		}
		this.updateDisplayPosition();
	}
	update() {
		super.update();
		if (this.hovered)
			hovered = true;
		if (this.clicked) {
			this.findDragBounds();
		}
		if (this.held) {
			if (this.movesHoriz)
				this.displayX = Math.min(Math.max(this.displayX + this.draggedX, this.displayBoundLeft), this.displayBoundRight);
			else
				this.displayY = Math.min(Math.max(this.displayY + this.draggedY, this.displayBoundTop), this.displayBoundBottom);
		}
		if (this.released) {
			this.snapToGrid();
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
	findDragBounds() {
		var s;
		if (this.movesHoriz) {
			s = this.gridX - 1;
			while (s >= 0 && !this.parent.isSpaceOccupied(s, this.gridY)) {
				s--;
			}
			this.gridBoundLeft = s + 1;
			this.displayBoundLeft = this.parent.gridToPixX(this.gridBoundLeft - 1/2);
			s = this.gridX + this.gridWidth;
			while (s < this.parent.gridWidth && !this.parent.isSpaceOccupied(s, this.gridY)) {
				s++;
			}
			this.gridBoundRight = s - this.gridWidth;
			this.displayBoundRight = this.parent.gridToPixX(this.gridBoundRight + this.gridWidth - 1/2) - this.displayWidth;
		} else {
			s = this.gridY - 1;
			while (s >= 0 && !this.parent.isSpaceOccupied(this.gridX, s)) {
				s--;
			}
			this.gridBoundTop = s + 1;
			this.displayBoundTop = this.parent.gridToPixY(this.gridBoundTop - 1/2);
			s = this.gridY + this.gridHeight;
			while (s < this.parent.gridHeight && !this.parent.isSpaceOccupied(this.gridX, s)) {
				s++;
			}
			this.gridBoundBottom = s - this.gridHeight;
			this.displayBoundBottom = this.parent.gridToPixY(this.gridBoundBottom + this.gridHeight - 1/2) - this.displayHeight;
		}
	}
	snapToGrid() {
		if (this.movesHoriz)
			this.gridX = Math.min(Math.max(Math.round(this.parent.pixToGridX(this.displayX) + 1/2), this.gridBoundLeft), this.gridBoundRight);
		else
			this.gridY = Math.min(Math.max(Math.round(this.parent.pixToGridY(this.displayY) + 1/2), this.gridBoundTop), this.gridBoundBottom);
		this.updateDisplayPosition();
	}
	snapEnd() {
		if (this.held) {
			if (this.movesHoriz) {
				if (this.displayX+this.displayWidth/2 > this.parent.beamStartX)
					this.displayX += this.parent.gridScale/4;
				else
					this.displayX -= this.parent.gridScale/4;
			} else {
				if (this.displayY+this.displayHeight/2 > this.parent.beamStartY)
					this.displayY += this.parent.gridScale/4;
				else
					this.displayY -= this.parent.gridScale/4;
			}
			this.snapToGrid();
		}
		this.hovered = false;
		this.held = false;
	}
	updateDisplayPosition() {
		this.displayWidth = this.parent.gridScale * (this.gridWidth - .1);
		this.displayHeight = this.parent.gridScale * (this.gridHeight - .1);
		this.displayX = this.parent.gridToPixX(this.gridX - 1/2 + .05);
		this.displayY = this.parent.gridToPixY(this.gridY - 1/2 + .05);
	}
}