class ToggleLevel extends Level {
	constructor(layout, pex) {
		super(layout);
		let numGates = layout.gates.length;
		let numSwitches = layout.gates[0].length;
		this.direction = typeof pex == "number" ? pex : layout.direction;
		var switchXStart, switchYStart, switchXInc, switchYInc, gateXStart, gateYStart, gateXInc, gateYInc, gateOrient;
		switch (layout.direction) {
			case 0: this.beamEntranceSide = 2;
					this.beamExitSide = 0;
					this.beamEntrancePosition = WIDTH*2/3;
					this.beamExitPosition = WIDTH*2/3;
					gateXStart = WIDTH*2/3;//TODO switch locations for directions other that right
					gateXInc = 0;
					gateYInc = -Math.floor(HEIGHT / (numGates + 2));
					gateYStart = HEIGHT/2 - numGates*gateYInc/2;
					gateOrient = false;
					break;
			case RIGHT: this.beamEntranceSide = LEFT;
					this.beamExitSide = RIGHT;
					this.beamEntrancePosition = HEIGHT*2/3;
					this.beamExitPosition = HEIGHT*2/3;
					switchYStart = HEIGHT*1/3;
					switchYInc = 0;
					switchXInc = Math.floor(WIDTH / (numSwitches + 2));
					switchXStart = WIDTH/2 - (numSwitches-1)*switchXInc/2;
					gateYStart = HEIGHT*2/3;
					gateYInc = 0;
					gateXInc = Math.floor(WIDTH / (numGates + 2));
					gateXStart = WIDTH/2 - (numGates-1)*gateXInc/2;
					gateOrient = true;
					break;
			case 2: this.beamEntranceSide = 0;
					this.beamExitSide = 2;
					this.beamEntrancePosition = WIDTH*2/3;
					this.beamExitPosition = WIDTH*2/3;
					gateXStart = WIDTH*2/3;
					gateXInc = 0;
					gateYInc = Math.floor(HEIGHT / (numGates + 2));
					gateYStart = HEIGHT/2 - (numGates-1)*gateYInc/2;
					gateOrient = false;
					break;
			case 3: this.beamEntranceSide = 1;//these other directions might not actually work
					this.beamExitSide = 3;
					this.beamEntrancePosition = HEIGHT*2/3;
					this.beamExitPosition = HEIGHT*2/3;
					gateYStart = HEIGHT*2/3;
					gateYInc = 0;
					gateXInc = -Math.floor(WIDTH / (numGates + 2));
					gateXStart = WIDTH/2 - numGates*gateXInc/2;
					gateOrient = true;
					break;
		}
		//console.log(numSwitches, numGates, switchXStart, switchYStart, switchXInc, switchYInc, gateXStart, gateYStart, gateXInc, gateYInc, gateOrient);
		this.switches = [];
		for (var i = 0; i < numSwitches; i++) {
			this.switches[i] = new ToggleSwitch(switchXStart + switchXInc * i, switchYStart + switchYInc * i);
		}
		this.gates = [];
		for (var i = 0; i < numGates; i++) {
			this.gates[i] = new ToggleGate(layout.gates[i].map((is,dex)=>is?this.switches[dex]:null).filter(a=>a), gateXStart + gateXInc * i, gateYStart + gateYInc * i, gateOrient);
		}
		this.blocked = this.gates[0];
	}
	update() {
		//super.update();
		this.switches.forEach(pis=>pis.update());
		this.gates.forEach(pis=>pis.update());
		if (this.evalPath()) {
			this.win();
		}
	}
	evalPath() {
		this.blocked = this.gates.find(pis=>pis.shut);
		return !this.blocked;
	}
	draw() {
		ctx.globalAlpha = 1;
		this.switches.forEach(pis=>pis.draw());
		this.gates.forEach(pis=>pis.draw());
		var beamPath = new Path2D();
		switch (this.beamEntranceSide) {
			case 0: beamPath.moveTo(this.beamEntrancePosition, 0);
					break;
			case 1: beamPath.moveTo(WIDTH, this.beamEntrancePosition);
					break;
			case 2: beamPath.moveTo(this.beamEntrancePosition, HEIGHT);
					break;
			case 3: beamPath.moveTo(0, this.beamEntrancePosition);
					break;
		}
		if (this.blocked) {
			beamPath.lineTo(this.blocked.x, this.blocked.y);
			drawBeamStop(this.blocked.x, this.blocked.y);
		} else {
			switch (this.beamExitSide) {
				case 0: beamPath.lineTo(this.beamExitPosition, 0);
						break;
				case 1: beamPath.lineTo(WIDTH, this.beamExitPosition);
						break;
				case 2: beamPath.lineTo(this.beamExitPosition, HEIGHT);
						break;
				case 3: beamPath.lineTo(0, this.beamExitPosition);
						break;
			}
		}
		drawBeam(beamPath);
	}
	win() {
		this.switches.forEach(pis=>pis.hovered = false);
		super.win();
	}
}
ToggleLevel.prototype.mode = "ToggleGates";
ToggleLevel.prototype.lModeName = "ToggleGates-Name";
ToggleLevel.prototype.lModeRules = "ToggleGates-Rules";
ToggleLevel.prototype.lModeHints = "ToggleGates-Hints";

//----------------------------------------------------------- Switch ----------------------------------------------------------------------------

class ToggleSwitch extends UIObject {
	constructor(x, y) {
		super();
		this.x = x;
		this.y = y;
		this.radius = 30;
		this.on = false;
	}
	update() {
		this.updateMouse();
		if (this.hovered)
			hovered = true;
		if (this.clicked) {
			this.on = !this.on;
			playSFX(this.on ? "blip1" : "blipdown");
		}
	}
	draw() {
		//console.log("bup")
		ctx.strokeStyle = this.hovered ? palette.hover : palette.normal;
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius-1, 0, 2*Math.PI);
		ctx.closePath();
		ctx.stroke();
		if (this.on) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius/2, 0, 2*Math.PI);
			ctx.closePath();
			ctx.stroke();
		}
	}
	scrambleRotation() {
		this.rotation = Math.floor(Math.random() * (this.type == 0 ? 2 : 4));
	}
}

//----------------------------------------------------------- Gate ----------------------------------------------------------------------------

class ToggleGate extends UIObject {
	constructor(switches, x, y, direction) {
		super();
		this.switches = switches;
		this.x = x;
		this.y = y;
		this.radius = 60;
		this.pillarRadius = 10;
		this.shut = true;
		this.pillarAX = direction ? this.x : (this.x - this.radius);
		this.pillarAY = direction ? this.y - this.radius : this.y;
		this.pillarBX = direction ? this.x : (this.x + this.radius);
		this.pillarBY = direction ? this.y + this.radius : this.y;
	}
	update() {
		this.shut = this.switches.reduce((acc, cur) => acc + cur.on, 1) % 2;
	}
	draw() {
		//console.log("bup")
		this.hovered = this.switches.find(s=>s.hovered);
		ctx.strokeStyle = this.hovered ? palette.hover : palette.normal;
		ctx.lineWidth = 3;
		if (this.shut) {
			ctx.beginPath();
			ctx.moveTo(this.pillarAX, this.pillarAY);
			ctx.lineTo(this.pillarBX, this.pillarBY);
			ctx.stroke();
		}
		ctx.beginPath();
		ctx.arc(this.pillarAX, this.pillarAY, this.pillarRadius, 0, 2*Math.PI);
		ctx.closePath();
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(this.pillarBX, this.pillarBY, this.pillarRadius, 0, 2*Math.PI);
		ctx.closePath();
		ctx.stroke();
	}
}