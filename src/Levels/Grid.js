
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
	constructor(layout, args = {}) {
		super(layout);
		//console.log(layout);
		if (!args.gap)
			args.gap = 0;
		if (!args.margin)
			args.margin = 0;
		this.gridWidth = layout.width;
		this.gridHeight = layout.height;
		this.gridScale = Math.floor(Math.min((WIDTH-(70+args.margin)*2) / (this.gridWidth+2*args.gap), (HEIGHT-(70+args.margin)*2) / (this.gridHeight+2*args.gap)) / 2) * 2;
		this.gridXOffset = (WIDTH/2 - this.gridScale*(this.gridWidth-1)/2);
		this.gridYOffset = (HEIGHT/2 - this.gridScale*(this.gridHeight-1)/2);
		this.entranceSide = layout.entranceSide;
		this.entrancePosition = layout.entrancePosition;
		this.exitSide = layout.exitSide;
		this.exitPosition = layout.exitPosition;
		//set entrances
		this.beamEntranceSide = layout.entranceSide;
		switch (this.beamEntranceSide) {
			case 0: this.beamEntrancePosition = this.gridToPixX(layout.entrancePosition);
					this.gridStartX = layout.entrancePosition;
					this.gridStartY = 0;
					this.gridStartOutX = this.gridStartX;
					this.gridStartOutY = -1;
					break;
			case 1: this.beamEntrancePosition = this.gridToPixY(layout.entrancePosition);
					this.gridStartX = layout.width-1;
					this.gridStartY = layout.entrancePosition;
					this.gridStartOutX = this.gridWidth;
					this.gridStartOutY = this.gridStartY;
					break;
			case 2: this.beamEntrancePosition = this.gridToPixX(layout.entrancePosition);
					this.gridStartX = layout.entrancePosition;
					this.gridStartY = this.gridHeight-1;
					this.gridStartOutX = this.gridStartX;
					this.gridStartOutY = this.gridStartY+1;
					break;
			case 3: this.beamEntrancePosition = this.gridToPixY(layout.entrancePosition);
					this.gridStartX = 0;
					this.gridStartY = layout.entrancePosition;
					this.gridStartOutX = -1;
					this.gridStartOutY = this.gridStartY;
					break;
		}
		this.beamExitSide = layout.exitSide;
		switch (this.beamExitSide) {
			case 0: this.beamExitPosition = this.gridToPixX(layout.exitPosition);
					this.gridEndX = layout.exitPosition;
					this.gridEndY = 0;
					this.gridEndOutX = this.gridEndX;
					this.gridEndOutY = -1;
					break;
			case 1: this.beamExitPosition = this.gridToPixY(layout.exitPosition);
					this.gridEndX = layout.width-1;
					this.gridEndY = layout.exitPosition;
					this.gridEndOutX = this.gridWidth;
					this.gridEndOutY = this.gridEndY;
					break;
			case 2: this.beamExitPosition = this.gridToPixX(layout.exitPosition);
					this.gridEndX = layout.exitPosition;
					this.gridEndY = this.gridHeight-1;
					this.gridEndOutX = this.gridEndX;
					this.gridEndOutY = this.gridEndY+1;
					break;
			case 3: this.beamExitPosition = this.gridToPixY(layout.exitPosition);
					this.gridEndX = 0;
					this.gridEndY = layout.exitPosition;
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
		var gopR = this.gridScale/2;
		var gop;
		this.borderPath.moveTo(this.borderLeft, this.borderTop);
		//top
		if (this.beamEntranceSide == UP || this.beamExitSide == UP) {
			gop = this.beamExitSide == UP ? this.beamExitPosition : this.beamEntrancePosition;
			this.borderPath.lineTo(gop - gopR, this.borderTop);
			this.borderPath.moveTo(gop + gopR, this.borderTop);
		}
		this.borderPath.lineTo(this.borderRight, this.borderTop);
		//right
		if (this.beamEntranceSide == RIGHT || this.beamExitSide == RIGHT) {
			gop = this.beamExitSide == RIGHT ? this.beamExitPosition : this.beamEntrancePosition;
			this.borderPath.lineTo(this.borderRight, gop - gopR);
			this.borderPath.moveTo(this.borderRight, gop + gopR);
		}
		this.borderPath.lineTo(this.borderRight, this.borderBottom);
		//bottom
		if (this.beamEntranceSide == DOWN || this.beamExitSide == DOWN) {
			gop = this.beamExitSide == DOWN ? this.beamExitPosition : this.beamEntrancePosition;
			this.borderPath.lineTo(gop + gopR, this.borderBottom);
			this.borderPath.moveTo(gop - gopR, this.borderBottom);
		}
		this.borderPath.lineTo(this.borderLeft, this.borderBottom);
		//left
		if (this.beamEntranceSide == LEFT || this.beamExitSide == LEFT) {
			gop = this.beamExitSide == LEFT ? this.beamExitPosition : this.beamEntrancePosition;
			this.borderPath.lineTo(this.borderLeft, gop + gopR);
			this.borderPath.moveTo(this.borderLeft, gop - gopR);
		}
		this.borderPath.lineTo(this.borderLeft, this.borderTop);
		//this.borderPath.closePath();
		this.calcBeamEnds();
		this.exitArrowPath = new Path2D();
		switch (this.beamExitSide) {
			case UP:
				this.exitArrowPath.moveTo(this.beamEndX, this.borderTop - 10);
				this.exitArrowPath.lineTo(this.beamEndX, this.borderTop - 30);
				break;
			case RIGHT:
				this.exitArrowPath.moveTo(this.borderRight + 10, this.beamEndY);
				this.exitArrowPath.lineTo(this.borderRight + 30, this.beamEndY);
				break;
			case DOWN:
				this.exitArrowPath.moveTo(this.beamEndX, this.borderBottom + 10);
				this.exitArrowPath.lineTo(this.beamEndX, this.borderBottom + 30);
				break;
			case LEFT:
				this.exitArrowPath.moveTo(this.borderLeft - 10, this.beamEndY);
				this.exitArrowPath.lineTo(this.borderLeft - 30, this.beamEndY);
				break;
		}
	}
	drawBorder() {
		ctx.globalAlpha = 1;
		ctx.strokeStyle = palette.normal;
		ctx.lineWidth = 4;
		ctx.stroke(this.borderPath);
	}
	drawExitArrow() {
		ctx.strokeStyle = palette.beam;
		ctx.stroke(this.exitArrowPath);
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