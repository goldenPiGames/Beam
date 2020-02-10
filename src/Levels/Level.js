//var Levels = {};

class LevelWrapper extends Screen {
	constructor(level) {
		super();
		this.level = level;
		this.buttons = [
			new BubbleButton(35, 35, 30, ()=>runJukebox(), bubbleDrawIJukebox),
			new BubbleButton(WIDTH-35, 35, 30, ()=>runnee=new HintScreen(this), bubbleDrawIHint),
		];
		this.timeTaken = 0;
	}
	update() {
		this.level.update();
		this.timeTaken++;
		if (this.level.won) {
			nextLevel();
			return;
		}
		this.buttons.forEach(oj=>oj.update());
	}
	draw() {
		ctx.globalAlpha = 1;
		this.level.draw();
		this.buttons.forEach(oj=>oj.draw());
	}
}

class Level {
	win() {
		this.won = true;
	}
	calcBeamEnds() {
		switch (this.beamEntranceSide) {
			case 0: this.beamStartX = this.beamEntrancePosition;
					this.beamStartY = 0;
					break;
			case 1: this.beamStartX = WIDTH;
					this.beamStartY = this.beamEntrancePosition;
					break;
			case 2: this.beamStartX = this.beamEntrancePosition;
					this.beamStartY = HEIGHT;
					break;
			case 3: this.beamStartX = 0;
					this.beamStartY = this.beamEntrancePosition;
					break;
		}
		switch (this.beamExitSide) {
			case 0: this.beamEndX = this.beamExitPosition;
					this.beamEndY = 0;
					break;
			case 1: this.beamEndX = WIDTH;
					this.beamEndY = this.beamExitPosition;
					break;
			case 2: this.beamEndX = this.beamExitPosition;
					this.beamEndY = HEIGHT;
					break;
			case 3: this.beamEndX = 0;
					this.beamEndY = this.beamExitPosition;
					break;
		}
	}
}
Level.prototype.lModeName = "LevelOther-Name";
Level.prototype.lModeRules = "LevelOther-Rules";
Level.prototype.lModeHints = "LevelOther-Hints";

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
					this.gridStartX = args.entrancePosition;
					this.gridStartY = 0;
					this.gridStartOutX = this.gridStartX;
					this.gridStartOutY = -1;
					break;
			case 1: this.beamEntrancePosition = this.gridToPixY(args.entrancePosition);
					this.gridStartX = args.width-1;
					this.gridStartY = args.entrancePosition;
					this.gridStartOutX = this.gridWidth;
					this.gridStartOutY = this.gridStartY;
					break;
			case 2: this.beamEntrancePosition = this.gridToPixX(args.entrancePosition);
					this.gridStartX = args.entrancePosition;
					this.gridStartY = this.gridHeight-1;
					this.gridStartOutX = this.gridStartX;
					this.gridStartOutY = args.gridHeight;
					break;
			case 3: this.beamEntrancePosition = this.gridToPixY(args.entrancePosition);
					this.gridStartX = 0;
					this.gridStartY = args.entrancePosition;
					this.gridStartOutX = -1;
					this.gridStartOutY = this.gridStartY;
					break;
		}
		this.beamExitSide = args.exitSide;
		switch (this.beamExitSide) {
			case 0: this.beamExitPosition = this.gridToPixX(args.exitPosition);
					this.gridEndX = args.exitPosition;
					this.gridEndY = 0;
					this.gridEndOutX = this.gridEndX;
					this.gridEndOutY = -1;
					break;
			case 1: this.beamExitPosition = this.gridToPixY(args.exitPosition);
					this.gridEndX = args.width-1;
					this.gridEndY = args.exitPosition;
					this.gridEndOutX = this.gridWidth;
					this.gridEndOutY = this.gridEndY;
					break;
			case 2: this.beamExitPosition = this.gridToPixX(args.exitPosition);
					this.gridEndX = args.exitPosition;
					this.gridEndY = this.gridHeight-1;
					this.gridEndOutX = this.gridEndX;
					this.gridEndOutY = args.gridHeight;
					break;
			case 3: this.beamExitPosition = this.gridToPixY(args.exitPosition);
					this.gridEndX = 0;
					this.gridEndY = args.exitPosition;
					this.gridEndOutX = -1;
					this.gridEndOutY = this.gridEndY;
					break;
		}
		//set borders
		this.borderTop = this.gridYOffset - this.gridScale * (args.gap + 1/2) - 1;
		this.borderRight = this.gridXOffset + this.gridScale * (this.gridWidth + args.gap - 1/2) + 1;
		this.borderBottom = this.gridYOffset + this.gridScale * (this.gridHeight + args.gap - 1/2) + 1;
		this.borderLeft = this.gridXOffset - this.gridScale * (args.gap + 1/2) - 1;
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
		this.calcBeamEnds();
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