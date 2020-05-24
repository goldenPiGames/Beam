class PipeLevel extends GridLevel {
	constructor(layout) {
		layout.width = layout.pipeGrid.length;
		layout.height = layout.pipeGrid[0].length;
		super(layout, {gap:1/2});
		this.pieces = layout.pipeGrid.map((row, i) => row.map((pis, j) => new PipePiece(this.gridToPixX(i), this.gridToPixY(j), this.gridScale / 2, pis)));
		/*for (var i = 0; i < pipeGrid.length; i++) {
			this.pieces[i] = [];
			for (var j = 0; j < pipeGrid[i].length; j++) {
				this.pieces[i][j] = new PipePiece(this.gridToPixX(i), this.gridToPixY(j), this.gridScale / 2, pipeGrid[i][j]);
			}
		}*/
		//this.makeBorderPath();
		//Make sure it's not already solved to begin with
		let failsafe = 0;
		while (this.evalPath() && failsafe < 69) {
			this.pieces.forEach(row=>row.forEach(pis=>pis.scrambleRotation()));
			failsafe++;
		}
		//this.beamStopX = null;
	}
	update() {
		//super.update();
		this.pieces.forEach(row=>row.forEach(pis=>pis.update()));
		if (this.evalPath()) {
			this.win();
		}
	}
	evalPath() {
		this.beamStopX = null;
		this.beamPath = new Path2D();
		var d = (this.entranceSide + 2) % 4;
		var x = this.gridStartOutX;
		var y = this.gridStartOutY;
		var bx = this.beamStartX;
		var by = this.beamStartY;
		this.beamPath.moveTo(bx, by);
		var i = 0;
		var p;
		while (i < 6969) {
			i++;
			x += directionDX(d);
			y += directionDY(d);
			if (x < 0 || y < 0 || x >= this.pieces.length || y >= this.pieces[x].length) {
				if (x == this.gridEndOutX && y == this.gridEndOutY) {
					switch (d) {
						case 0: by = 0;
								break;
						case 1: bx = WIDTH;
								break;
						case 2: by = HEIGHT;
								break;
						case 3: bx = 0;
								break;
					}
					this.beamPath.lineTo(bx, by);
					return true;
				} else {
					switch (d) {
						case 0: by = this.borderTop;
								break;
						case 1: bx = this.borderRight;
								break;
						case 2: by = this.borderBottom;
								break;
						case 3: bx = this.borderLeft;
								break;
					}
					this.beamPath.lineTo(bx, by);
					this.beamStopX = bx;
					this.beamStopY = by;
					return false;
				}
			}
			var p = this.pieces[x][y];
			let ld = d;
			d = p.outFrom(d);
			if (d == null) {
				bx = p.x - directionDX(ld)*p.radius;
				by = p.y - directionDY(ld)*p.radius;
				this.beamPath.lineTo(bx, by);
				this.beamStopX = bx;
				this.beamStopY = by;
				return false;
			} else {
				bx = p.x;
				by = p.y;
				this.beamPath.lineTo(bx, by);
			}
		}
	}
	draw() {
		this.drawBorder();
		drawBeam(this.beamPath);
		this.pieces.forEach(row=>row.forEach(pis=>pis.draw()));
		if (this.beamStopX)
			drawBeamStop(this.beamStopX, this.beamStopY);
	}
	win() {
		this.pieces.forEach(row=>row.forEach(pis=>pis.hovered = false));
		this.beamStopX = null;
		super.win();
	}
}
PipeLevel.prototype.mode = "PipePath";
PipeLevel.prototype.lModeName = "PipePath-Name";
PipeLevel.prototype.lModeRules = "PipePath-Rules";
PipeLevel.prototype.lModeHints = "PipePath-Hints";

//----------------------------------------------------------- Pipe Piece ----------------------------------------------------------------------------

class PipePiece extends UIObject {
	constructor(x, y, radius, type) {
		super();
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.iradius = Math.floor(radius/3);
		this.ithoff = Math.asin(this.iradius/this.radius);
		this.type = type;
		this.scrambleRotation();
	}
	update() {
		super.update();
		if (this.hovered)
			hovered = true;
	}
	onclick() {
		playSFX("blip1");
		this.rotation = (this.rotation + 1) % (this.type == 0 ? 2 : 4);
	}
	draw() {
		//console.log("bup")
		ctx.strokeStyle = this.hovered ? palette.hover : palette.normal;
		ctx.lineWidth = 3;
		this.vtheta = directionTheta(this.rotation);
		if (this.type) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius-2, this.vtheta+this.ithoff+Math.PI/2, this.vtheta-this.ithoff);
			ctx.lineTo(this.x + this.iradius*Math.SQRT2 * Math.cos(this.vtheta-Math.PI/4) - 2*Math.cos(this.vtheta), this.y + this.iradius*Math.SQRT2 * Math.sin(this.vtheta-Math.PI/4) - 2*Math.sin(this.vtheta));
			ctx.lineTo(this.x + this.iradius*Math.SQRT2 * Math.cos(this.vtheta+Math.PI*3/4) - 2*Math.cos(this.vtheta+Math.PI/2), this.y + this.iradius*Math.SQRT2 * Math.sin(this.vtheta+Math.PI*3/4) - 2*Math.sin(this.vtheta+Math.PI/2));
			ctx.closePath();
			ctx.stroke();
			
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius-2, this.vtheta+this.ithoff, this.vtheta-this.ithoff+Math.PI/2);
			ctx.lineTo(this.x + this.iradius*Math.SQRT2 * Math.cos(this.vtheta+Math.PI/4), this.y + this.iradius*Math.SQRT2 * Math.sin(this.vtheta+Math.PI/4));
			ctx.closePath();
			ctx.stroke();
		} else {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius-2, this.vtheta+this.ithoff+Math.PI, this.vtheta-this.ithoff);
			ctx.closePath();
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius-2, this.vtheta+this.ithoff, this.vtheta-this.ithoff+Math.PI);
			ctx.closePath();
			ctx.stroke();
		}
	}
	outFrom(into) {
		switch (this.type+","+this.rotation+":"+into) {
			case "0,0:0": return 0;
			case "0,0:2": return 2;
			case "0,1:1": return 1;
			case "0,1:3": return 3;
			case "1,0:2": return 1;
			case "1,0:3": return 0;
			case "1,1:0": return 1;
			case "1,1:3": return 2;
			case "1,2:0": return 3;
			case "1,2:1": return 2;
			case "1,3:1": return 0;
			case "1,3:2": return 3;
			default : return null;
		}
	}
	scrambleRotation() {
		this.rotation = Math.floor(Math.random() * (this.type == 0 ? 2 : 4));
	}
}