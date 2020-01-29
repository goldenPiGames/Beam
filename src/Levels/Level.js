//var Levels = {};

class LevelWrapper extends Screen {
	constructor(level) {
		super();
		this.level = level;
	}
	update() {
		this.level.update();
		if (this.level.won) {
			nextLevel();
		}
	}
	draw() {
		ctx.globalAlpha = 1;
		this.level.draw();
	}
}

class Level {
	win() {
		this.won = true;
	}
}

/**
For any levels that use a grid.
Arguments: {
	width : number of columns
	height : number of rows
	gap : empty gap between object and border
	entranceSide : 
	entrancePosition : 
	exitSide : 
	exitPosition : 
}
*/
class GridLevel extends Level {
	constructor(args) {
		super();
		this.gridWidth = args.width;
		this.gridHeight = args.height;
		this.gridScale = Math.floor(Math.min(WIDTH / (this.gridWidth+2*args.gap+1), HEIGHT / (this.gridHeight+2*args.gap+1)) / 2) * 2;
		this.gridXOffset = (WIDTH/2 - this.gridScale*(this.gridWidth-1)/2);
		this.gridYOffset = (HEIGHT/2 - this.gridScale*(this.gridHeight-1)/2);
		//set entrances
		this.beamEntranceSide = args.entranceSide;
		switch (this.beamEntranceSide) {
			case 0: this.beamEntrancePosition = this.gridToPixX(args.entrancePosition);
					break;
			case 1: this.beamEntrancePosition = this.gridToPixY(args.entrancePosition);
					break;
			case 2: this.beamEntrancePosition = this.gridToPixX(args.entrancePosition);
					break;
			case 3: this.beamEntrancePosition = this.gridToPixY(args.entrancePosition);
					break;
		}
		this.beamExitSide = args.exitSide;
		switch (this.beamExitSide) {
			case 0: this.beamExitPosition = this.gridToPixX(args.exitPosition);
					break;
			case 1: this.beamExitPosition = this.gridToPixY(args.exitPosition);
					break;
			case 2: this.beamExitPosition = this.gridToPixX(args.exitPosition);
					break;
			case 3: this.beamExitPosition = this.gridToPixY(args.exitPosition);
					break;
		}
		//set borders
		this.borderTop = this.gridYOffset - this.gridScale * (args.gap + 1/2);
		this.borderRight = this.gridXOffset + this.gridScale * (this.gridWidth + args.gap - 1/2);
		this.borderBottom = this.gridYOffset + this.gridScale * (this.gridHeight + args.gap - 1/2);
		this.borderLeft = this.gridXOffset - this.gridScale * (args.gap + 1/2);
		//Creates a path for the border, so it doesn't have to create it again every frame
		//The border is rectangular with gaps in it for the beam to enter and exit
		this.borderPath = new Path2D();
		var gop;
		this.borderPath.moveTo(this.borderLeft, this.borderTop);
		//top
		if (this.beamEntranceSide == 0 || this.beamExitSide == 0) {
			gop = this.beamEntranceSide == 0 ? this.beamEntrancePosition : this.beamExitPosition;
			this.borderPath.lineTo(gop - 20, this.borderTop);
			this.borderPath.moveTo(gop + 20, this.borderTop);
		}
		this.borderPath.lineTo(this.borderRight, this.borderTop);
		//right
		if (this.beamEntranceSide == 1 || this.beamExitSide == 1) {
			gop = this.beamEntranceSide == 1 ? this.beamEntrancePosition : this.beamExitPosition;
			this.borderPath.lineTo(this.borderRight, gop - 20);
			this.borderPath.moveTo(this.borderRight, gop + 20);
		}
		this.borderPath.lineTo(this.borderRight, this.borderBottom);
		//bottom
		if (this.beamEntranceSide == 2 || this.beamExitSide == 2) {
			gop = this.beamEntranceSide == 2 ? this.beamEntrancePosition : this.beamExitPosition;
			this.borderPath.lineTo(gop + 20, this.borderBottom);
			this.borderPath.moveTo(gop - 20, this.borderBottom);
		}
		this.borderPath.lineTo(this.borderLeft, this.borderBottom);
		//left
		if (this.beamEntranceSide == 3 || this.beamExitSide == 3) {
			gop = this.beamEntranceSide == 3 ? this.beamEntrancePosition : this.beamExitPosition;
			this.borderPath.lineTo(this.borderLeft, gop + 20);
			this.borderPath.moveTo(this.borderLeft, gop - 20);
		}
		this.borderPath.lineTo(this.borderLeft, this.borderTop);
		this.borderPath.closePath();
	}
	gridToPixX(x) {
		return this.gridXOffset + x * this.gridScale;
	}
	gridToPixY(y) {
		return this.gridYOffset + y * this.gridScale;
	}
	pixToGridX(x) {
		return (x - this.gridXOffset) / this.gridScale;
	}
	pixToGridY(y) {
		return (y - this.gridYOffset) / this.gridScale;
	}
}