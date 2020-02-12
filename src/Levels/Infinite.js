class InfiniteSelectScreen extends Screen {
	constructor() {
		super();
		this.buttons = [
			new BubbleButton(WIDTH-50, HEIGHT-50, 45, ()=>switchScreen(new MainMenu()), bubbleDrawIReturn),
			new Button(20, 20, 200, 30, "Toggle Gates", ()=> {levelIterator = new InfiniteToggleGatesIterator(); startLevel()}),
			new Button(20, 70, 200, 30, "Pipe Path", ()=> {levelIterator = new InfinitePipePathIterator(); startLevel()}),
			new Button(20, 120, 200, 30, "Walk Once", ()=> {levelIterator = new InfiniteWalkOnceIterator(); startLevel()}),
		];
	}
	update() {
		this.buttons.forEach(butt=>butt.update());
	}
	draw() {
		this.buttons.forEach(butt=>butt.draw());
	}
}

class InfiniteToggleGatesIterator {
	constructor() {
		
	}
	firstLevel() {
		return new LevelToggleRandom();
	}
	nextLevel() {
		return new LevelToggleRandom();
	}
}

class InfinitePipePathIterator {
	constructor() {
		
	}
	firstLevel() {
		return new LevelPipeRandom();
	}
	nextLevel(prev) {
		return new LevelPipeRandom({entranceSide:directionOpposite(prev.beamExitSide)});
	}
}

class InfiniteWalkOnceIterator {
	constructor() {
		
	}
	firstLevel() {
		return new LevelOnceRandom();
	}
	nextLevel(prev) {
		return new LevelOnceRandom({entranceSide:directionOpposite(prev.beamExitSide)});
	}
}

function bubbleDrawIInfinity() {
	ctx.lineWidth = .06*this.radius;
	ctx.beginPath();
	ctx.arc(this.x+this.radius/3, this.y, this.radius/3, -Math.PI*3/4, Math.PI*3/4);
	ctx.arc(this.x-this.radius/3, this.y, this.radius/3, -Math.PI*1/4, Math.PI*1/4, true);
	ctx.closePath();
	ctx.stroke();
}