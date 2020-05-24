class SameLevel extends GridLevel {
	constructor(layout) {
		layout.width = layout.grid.length;
		layout.height = layout.grid[0].length;
		layout.entranceSide = directionOpposite(layout.direction);
		layout.entrancePosition = layout.direction%2 ? layout.height-1 : 0;
		layout.exitSide = layout.direction;
		layout.exitPosition = layout.direction%2 ? layout.height-1 : 0;
		super(layout, {gap:0});
		this.direction = layout.direction;
		this.initGrid = layout.grid;
		this.reset(false);
		this.resetButton = new BubbleButton(WIDTH/2-50, HEIGHT-35, 30, ()=>this.reset(true), bubbleDrawIReset);
		this.rewindButton = new BubbleButton(WIDTH/2+50, HEIGHT-35, 30, ()=>this.rewind(), bubbleDrawIPlayReverse);
	}
	reset(re) {
		if (re)
			playSFX("blipdown");
		this.history = [this.initGrid];
		this.setGridData(this.initGrid);
		this.evalPath();
	}
	setGridData(data) {
		this.blockGrid = data.map((col,x)=>col.map((pis,y)=>pis<0?null:new SameBlock(x, y, pis, this)));
		this.refreshList();
	}
	getGridData() {
		return this.blockGrid.map(b=>b?b.color:-1);
	}
	rewind() {
		if (this.history.length > 1) {
			playSFX("blipdown");
			this.history.pop();
			this.setGridData(this.history[this.history.length-1]);
		}
	}
	refreshList() {
		this.blockList = this.blockGrid.reduce((a,c)=>a.concat(c), []).filter(a=>a).reverse();
	}
	update() {
		this.resetButton.update();
		this.rewindButton.update();
		this.tryingRemove = false;
		this.hovered = null;
		this.blockList.forEach(b=>b.update());
		if (this.hovered) {
			var group = this.getGroup(this.hovered);
			if (group.length >= 2) {
				hovered = true;
				group.forEach(b=>b.drawHovered=true);
				if (this.tryingRemove) {
					this.removeTagged();
				}
			}
		}
		if (this.evalPath())
			this.win();
	}
	draw() {
		this.drawBorder();
		this.resetButton.draw();
		this.rewindButton.draw();
		this.blockList.forEach(b=>b.draw());
		drawBeam(this.beamPath);
		if (this.beamStopX)
			drawBeamStop(this.beamStopX, this.beamStopY);
	}
	getGroup(pis) {
		this.groupColor = pis.color;
		this.blockList.forEach(b=>b.tagged=false);
		this.maybeCascade(pis.gridX, pis.gridY);
		return this.blockList.filter(b=>b.tagged);
	}
	maybeCascade(x, y) {
		if (this.blockGrid[x] && this.blockGrid[x][y] && !this.blockGrid[x][y].tagged && this.blockGrid[x][y].color == this.groupColor) {
			this.blockGrid[x][y].tagged = true;
			this.maybeCascade(x-1, y);
			this.maybeCascade(x+1, y);
			this.maybeCascade(x, y-1);
			this.maybeCascade(x, y+1);
			return true;
		} else
			return false;
	}
	hover(pis) {
		this.hovered = pis;
	}
	click(pis) {
		this.hovered = pis;
		this.tryingRemove = true;
	}
	removeTagged() {
		playSFX("blip1");
		this.blockGrid = this.blockGrid.map(col=> {
			col = col.filter(b=>!b||!b.tagged);
			while (col.length < this.gridHeight)
				col.unshift(null);
			col.forEach((b,y)=>{if (b) b.gridY=y});
			return col;
		});
		var afterRemoveCol = this.blockGrid.filter(col=>col.find(b=>b));
		if (afterRemoveCol.length < this.blockGrid.length) {
			this.blockGrid = afterRemoveCol;
			this.blockGrid.forEach((col,x)=>col.forEach(b=>b?b.gridX=x:0));
		}
		this.refreshList();
		this.blockList.forEach(b=>b.fall());
		this.history.push(this.getGridData());
	}
	evalPath() {
		this.beamStopX = null;
		this.beamPath = new Path2D();
		var blocked;
		var bx = this.beamStartX;
		var by = this.beamStartY;
		this.beamPath.moveTo(bx, by);
		//recycled from Gridlock
		switch (this.direction) {
			case UP:
					blocked = this.blockList.filter(pis => this.gridStartX == pis.gridX).sort((a, b) => a.gridY - b.gridY)[0];
					by = blocked ? blocked.displayY + blocked.displayHeight : this.beamEndY;
					break;
			case RIGHT:
					blocked = this.blockList.filter(pis => this.gridStartY == pis.gridY).sort((a, b) => a.gridX - b.gridX)[0];
					bx = blocked ? blocked.displayX : this.beamEndX;
					break;
			case DOWN:
					blocked = this.blockList.filter(pis => this.gridStartX == pis.gridX).sort((a, b) => a.gridY - b.gridY)[0];
					by = blocked ? blocked.displayY : this.beamEndY;
					break;
			case LEFT:
					blocked = this.blockList.filter(pis => this.gridStartY == pis.gridY).sort((a, b) => a.gridX - b.gridX)[0];
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
	getGridData() {
		return this.blockGrid.map(c=>c.map(b=>b?b.color:-1));
	}
	getSolutionHints() {
		return this.solution.map((move, dex) => lg("SameGame-SolutionStep", {"move":dex+1, "count":move.length, "color":getSameGameColorDescription(move[0].color), "col":move[0].x+1, "row":move[0].y+1}));
//			Move <move>: Remove <count> <color> at column <col> from left, row <row> from bottom.
	}
}
SameLevel.prototype.mode = "SameGame";
SameLevel.prototype.lModeName = "SameGame-Name";
SameLevel.prototype.lModeRules = "SameGame-Rules";
SameLevel.prototype.lModeHints = "SameGame-Hints";

class SameBlock extends UIObject {
	constructor(x, y, color, parent) {
		super();
		this.gridX = x;
		this.gridY = y;
		this.color = color;
		this.parent = parent;
		this.updateDisplayPosition();
		this.displayY = this.displayYGoal;
		this.displayX = this.displayXGoal;
	}
	update() {
		super.update();
		if (this.hovered)
			this.parent.hover(this);
		if (this.clicked) {
			this.parent.click(this);
		}
		if (this.displayY != this.displayYGoal) {
			this.displayY = Math.min(this.displayYGoal, this.displayY + 20);
		}
		if (this.displayX != this.displayXGoal) {
			this.displayX = Math.max(this.displayXGoal, this.displayX - 20);
		}
	}
	draw() {
		ctx.lineWidth = 4;
		this.drawI();
		ctx.globalAlpha = 1;
		ctx.strokeStyle = this.drawHovered ? palette.hover : palette.normal;
		this.stroke();
		this.drawHovered = false;
	}
	drawI() {
		ctx.globalAlpha = 1;
		//console.log(palette["samegame"+this.color], "samegame"+this.color);
		ctx.fillStyle = palette["samegame"+this.color];
		ctx.fillRect(this.displayX, this.displayY, this.displayWidth, this.displayHeight);
		if (settings.colorblind) {
			ctx.globalAlpha /= 2;
			ctx.strokeStyle = palette.background;
			ctx.fillStyle = palette.background;
			switch (this.color) {
				case 0://vertical stripes
					ctx.lineWidth = 4;
					for (var i = 4; i < this.displayWidth-2; i += 8) {
						ctx.beginPath();
						ctx.moveTo(this.displayX+i, this.displayY);
						ctx.lineTo(this.displayX+i, this.displayY+this.displayHeight);
						ctx.stroke();
					}
					break;
				case 1://horizontal stripes
					ctx.lineWidth = 4;
					for (var i = 4; i < this.displayHeight-2; i += 8) {
						ctx.beginPath();
						ctx.moveTo(this.displayX, this.displayY+i);
						ctx.lineTo(this.displayX+this.displayWidth, this.displayY+i);
						ctx.stroke();
					}
					break;
				case 2://square spots
					for (var i = 8; i < this.displayWidth-4; i += 16) {
						for (var j = 8; j < this.displayHeight-4; j += 16) {
							ctx.fillRect(this.displayX+i, this.displayY+j, 8, 8);
						}
					}
					break;
				case 3://
					ctx.lineWidth = 4;
					for (var i = 6; i < this.displayHeight-6; i += 12) {
						ctx.beginPath();
						ctx.moveTo(this.displayX+2+i, this.displayY+2);
						ctx.lineTo(this.displayX+this.displayWidth-2, this.displayY+this.displayHeight-2-i);
						ctx.stroke();
						ctx.beginPath();
						ctx.moveTo(this.displayX+2, this.displayY+2+i);
						ctx.lineTo(this.displayX+this.displayWidth-2-i, this.displayY+this.displayHeight-2);
						ctx.stroke();
					}
					break;
				case 4:
					ctx.lineWidth = 4;
					for (var i = 6; i < this.displayHeight-6; i += 12) {
						ctx.beginPath();
						ctx.moveTo(this.displayX+this.displayWidth-2-i, this.displayY+2);
						ctx.lineTo(this.displayX+2, this.displayY+this.displayHeight-2-i);
						ctx.stroke();
						ctx.beginPath();
						ctx.moveTo(this.displayX+this.displayWidth-2, this.displayY+2+i);
						ctx.lineTo(this.displayX+i, this.displayY+this.displayHeight-2);
						ctx.stroke();
					}
					break;
			}
		}
	}
	updateDisplayPosition() {
		this.displayWidth = this.parent.gridScale;
		this.displayHeight = this.parent.gridScale;
		this.displayXGoal = this.parent.gridToPixX(this.gridX - 1/2);
		this.displayYGoal = this.parent.gridToPixY(this.gridY - 1/2);
	}
	fall() {
		this.updateDisplayPosition();
	}
}