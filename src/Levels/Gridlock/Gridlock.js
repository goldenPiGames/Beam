//TODO change layout so it has data instead of actual pieces
class GridlockLevel extends GridLevel {
	constructor(layout) {
		super({
			width : layout.width,
			height : layout.height,
			gap : 0.05,
			entranceSide : (2 + layout.direction) % 4,
			entrancePosition : layout.position,
			exitSide : layout.direction,
			exitPosition : layout.position,
		});
		this.direction = layout.direction;
		this.width = layout.width;
		this.height = layout.height;
		this.pieces = layout.pieces;
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
					blocked = this.pieces.filter(pis => this.beamEntrancePosition >= pis.displayX && this.beamEntrancePosition <= pis.displayX + pis.displayWidth).sort((a, b) => a.displayY - b.displayY)[0];
					by = blocked ? blocked.displayY + blocked.displayHeight : this.beamEndY;
					break;
			case RIGHT:
					//this.pieces.forEach(pis => console.log(this.beamEntrancePosition, pis.displayY, pis.displayHeight));
					blocked = this.pieces.filter(pis => this.beamEntrancePosition >= pis.displayY && this.beamEntrancePosition <= pis.displayY + pis.displayHeight).sort((a, b) => a.displayX - b.displayX)[0];
					bx = blocked ? blocked.displayX : this.beamEndX;
					break;
			case DOWN:
					blocked = this.pieces.filter(pis => this.beamEntrancePosition >= pis.displayX && this.beamEntrancePosition <= pis.displayX + pis.displayWidth).sort((a, b) => a.displayY - b.displayY)[0];
					by = blocked ? blocked.displayY : this.beamEndY;
					break;
			case LEFT:
					blocked = this.pieces.filter(pis => this.beamEntrancePosition >= pis.displayY && this.beamEntrancePosition <= pis.displayY + pis.displayHeight).sort((a, b) => a.displayX - b.displayX)[0];
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
}
GridlockLevel.prototype.lModeName = "Gridlock-Name";
GridlockLevel.prototype.lModeRules = "Gridlock-Rules";
GridlockLevel.prototype.lModeHints = "Gridlock-Hints";

class GridlockPiece extends UIObject {
	constructor(x, y, length, movesHoriz) {
		super();
		this.gridX = x;
		this.gridY = y;
		this.gridWidth = movesHoriz ? length : 1;
		this.gridHeight = !movesHoriz ? length : 1;
		this.movesHoriz = movesHoriz;
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
		ctx.strokeStyle = this.held ? settings.click_color : this.hovered ? settings.hover_color : settings.normal_color;
		ctx.strokeRect(this.displayX+1, this.displayY+1, this.displayWidth-2, this.displayHeight-2);
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
	updateDisplayPosition() {
		this.displayWidth = this.parent.gridScale * (this.gridWidth - .1);
		this.displayHeight = this.parent.gridScale * (this.gridHeight - .1);
		this.displayX = this.parent.gridToPixX(this.gridX - 1/2 + .05);
		this.displayY = this.parent.gridToPixY(this.gridY - 1/2 + .05);
	}
}