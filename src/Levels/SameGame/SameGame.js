class SameLevel extends GridLevel {
	constructor(layout) {
		var width = layout.grid.length;
		var height = layout.grid[0].length;
		super({
			width : width,
			height : height,
			gap : 0,
			entranceSide : directionOpposite(layout.direction),
			entrancePosition : height-1,
			exitSide : layout.direction,
			exitPosition : height-1,
		});
		this.direction = layout.direction;
		this.initGrid = layout.grid;
		this.reset(false);
		this.resetButton = new BubbleButton(WIDTH/2, HEIGHT-35, 30, ()=>this.reset(true), bubbleDrawIReset);
	}
	reset(re) {
		if (re)
			playSFX("blipdown");
		this.blockGrid = this.initGrid.map((col,x)=>col.map((pis,y)=>new SameBlock(x, y, pis, this)));
		this.refreshList();
		this.evalPath();
	}
	refreshList() {
		this.blockList = this.blockGrid.reduce((a,c)=>a.concat(c)).filter(a=>a).reverse();
	}
	update() {
		this.resetButton.update();
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
	}
	draw() {
		this.drawBorder();
		this.resetButton.draw();
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
		this.refreshList();
		this.blockList.forEach(b=>b.fall());
		if (this.evalPath())
			this.win();
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
}
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
	}
	draw() {
		ctx.lineWidth = 4;
		ctx.fillStyle = ["#0000FF", "#00FF00", "#FFFF00", "#FF00FF", "#FF8000", "#008000"][this.color];
		ctx.fillRect(this.displayX, this.displayY, this.displayWidth, this.displayHeight);
		ctx.strokeStyle = this.drawHovered ? settings.hover_color : settings.normal_color;
		ctx.strokeRect(this.displayX+2, this.displayY+2, this.displayWidth-4, this.displayHeight-4);
		this.drawHovered = false;
	}
	updateDisplayPosition() {
		this.displayWidth = this.parent.gridScale;
		this.displayHeight = this.parent.gridScale;
		this.displayX = this.parent.gridToPixX(this.gridX - 1/2);
		this.displayYGoal = this.parent.gridToPixY(this.gridY - 1/2);
	}
	fall() {
		this.updateDisplayPosition();
	}
}