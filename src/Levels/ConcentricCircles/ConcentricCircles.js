const CONCENTRIC_START_ROTATIONS = [Math.PI*1/12, Math.PI*2/12, Math.PI*3/12, Math.PI*4/12, Math.PI*5/12, Math.PI*7/12, Math.PI*8/12, Math.PI*9/12, Math.PI*10/12, Math.PI*11/12];
const CONCENTRIC_GAP_LENGTH = Math.PI*.04;

class ConcentricLevel extends Level {
	constructor(layout, pex) {
		super(layout);
		let numRings = layout.also.length;
		if (numRings > CONCENTRIC_START_ROTATIONS.length)
			throw "you can't have those many rings";
		var switchXStart, switchYStart, switchXInc, switchYInc, gateXStart, gateYStart, gateXInc, gateYInc, gateOrient;
		this.direction = typeof pex == "number" ? pex : layout.direction;
		switch (this.direction) {
			case UP: this.beamEntranceSide = DOWN;
					this.beamExitSide = UP;
					this.beamEntrancePosition = WIDTH/2;
					this.beamExitPosition = WIDTH/2;
					break;
			case RIGHT: this.beamEntranceSide = LEFT;
					this.beamExitSide = RIGHT;
					this.beamEntrancePosition = HEIGHT/2;
					this.beamExitPosition = HEIGHT/2;
					break;
			case DOWN: this.beamEntranceSide = UP;
					this.beamExitSide = DOWN;
					this.beamEntrancePosition = WIDTH/2;
					this.beamExitPosition = WIDTH/2;
					break;
			case LEFT: this.beamEntranceSide = RIGHT;
					this.beamExitSide = LEFT;
					this.beamEntrancePosition = HEIGHT/2;
					this.beamExitPosition = HEIGHT/2;
					break;
		}
		var ringRStart = HEIGHT/16;
		var ringRInterval = (HEIGHT*3/4)/numRings/2;
		var rots = CONCENTRIC_START_ROTATIONS.slice();
		this.rings = [];
		for (var i = 0; i < numRings; i++) {
			this.rings[i] = new ConcentricRing(ringRStart + ringRInterval*i, ringRInterval, ...rots.splice(Math.floor(Math.random()*rots.length), 1));
		}
		this.rings.forEach((rin,dex)=>rin.setAlso(this.rings.filter((nir,xed)=>layout.also[dex][xed])));
		this.ringsOI = this.rings.slice().reverse();
		let failsafe = 0;
		while (this.evalPath() && failsafe < 69) {
			//this.rings.forEach(rin=>rin.scrambleRotation());
			failsafe++;
		}
		this.beamStopX = null;
	}
	update() {
		this.rings.forEach(rin=>rin.update());
		if (this.evalPath()) {
			this.win();
		}
	}
	evalPath() {
		this.beamStopX = null;
		this.beamPath = new Path2D();
		var blocked;
		var bx = this.beamEntrancePosition;
		var by = this.beamEntrancePosition;
		var theta = directionTheta(this.direction);
		blocked = this.ringsOI.find(rin=>rin.blocks(theta));
		switch (this.direction) {
			case 0: this.beamPath.moveTo(this.beamEntrancePosition, HEIGHT);
					by = blocked ? blocked.y + blocked.radiusOuter : 0;
					break;
			case 1: this.beamPath.moveTo(0, this.beamEntrancePosition);
					//this.pieces.forEach(pis => console.log(this.beamEntrancePosition, pis.displayY, pis.displayHeight));
					bx = blocked ? blocked.x - blocked.radiusOuter : WIDTH;
					break;
			case 2: this.beamPath.moveTo(this.beamEntrancePosition, 0);
					by = blocked ? blocked.y - blocked.radiusOuter : HEIGHT;
					break;
			case 3: this.beamPath.moveTo(WIDTH, this.beamEntrancePosition);
					bx = blocked ? blocked.x + blocked.radiusOuter : 0;
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
		ctx.globalAlpha = 1;
		this.rings.forEach(rin=>rin.draw());
		drawBeam(this.beamPath);
		if (this.beamStopX)
			drawBeamStop(this.beamStopX, this.beamStopY);
	}
	win() {
		this.rings.forEach(rin=>{rin.drawHovered = false; rin.drawHeld = false});
		this.beamStopX = null;
		super.win();
	}
}
ConcentricLevel.prototype.mode = "ConcentricCircles";
ConcentricLevel.prototype.lModeName = "ConcentricCircles-Name";
ConcentricLevel.prototype.lModeRules = "ConcentricCircles-Rules";
ConcentricLevel.prototype.lModeHints = "ConcentricCircles-Hints";

class ConcentricRing extends UIObject {//TODO prevent them from being aligned at the start
	constructor(inner, width, theta) {
		super();
		this.x = WIDTH/2;
		this.y = HEIGHT/2;
		this.radiusInner = inner;
		this.radiusOuter = inner + width;
		this.gapLen = CONCENTRIC_GAP_LENGTH;
		this.gapLenI = CONCENTRIC_GAP_LENGTH*this.radiusOuter/(this.radiusInner+this.radiusOuter)*2;
		this.gapTheta = theta;
	}
	setAlso(soal) {
		this.also = soal.filter(bup=>bup!=this);
	}
	intersectsMouse() {
		let dist = Math.sqrt((mouse.x - (this.displayX || this.x)) ** 2 + (mouse.y - (this.displayY || this.y))**2);
		return dist >= this.radiusInner && dist < this.radiusOuter;
	}
	update() {
		super.update();
		if (this.held) {
			this.drawHeld = true;
			this.gapTheta = (this.gapTheta + this.draggedTheta) % Math.PI;
			this.also.forEach(rin=>rin.rotateAlso(this.draggedTheta));
		} else if (this.hovered && !mouse.down) {
			this.drawHovered = true;
			hovered = true;
			this.also.forEach(rin=>rin.hoverAlso());
		}
	}
	rotateAlso(amount) {
		this.drawHeld = true;
		this.gapTheta = (this.gapTheta + amount) % Math.PI;
	}
	hoverAlso() {
		this.drawHovered = true;
	}
	blocks(theta) {
		let off = (this.gapTheta - theta + 2*Math.PI) % Math.PI;
		return (off >= this.gapLen && off <= Math.PI - this.gapLen);
	}
	draw() {
		ctx.strokeStyle = this.drawHeld ? palette.click : this.drawHovered ? palette.hover : palette.normal;
		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.arc(this.x, this.y, this.radiusInner+2, this.gapTheta+this.gapLenI, this.gapTheta+Math.PI-this.gapLenI);
		ctx.arc(this.x, this.y, this.radiusOuter-2, this.gapTheta+Math.PI-this.gapLen, this.gapTheta+this.gapLen, true);
		ctx.closePath();
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.arc(this.x, this.y, this.radiusInner+2, this.gapTheta-Math.PI+this.gapLenI, this.gapTheta-this.gapLenI);
		ctx.arc(this.x, this.y, this.radiusOuter-2, this.gapTheta-this.gapLen, this.gapTheta-Math.PI+this.gapLen, true);
		ctx.closePath();
		ctx.stroke();
		this.drawHeld = false;
		this.drawHovered = false;
	}
}