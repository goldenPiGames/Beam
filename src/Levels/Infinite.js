class InfiniteSelectScreen extends Screen {
	constructor() {
		super();
		this.buttons = [
			new BubbleButton(WIDTH-50, HEIGHT-50, 45, ()=>switchScreen(new MainMenu()), bubbleDrawIReturn),
			new Button(20, 100, 200, 40, "Toggle Gates", ()=> {levelIterator = new InfiniteToggleGatesIterator(); startLevel()}),
			new Button(20, 150, 200, 40, "Pipe Path", ()=> {levelIterator = new InfinitePipePathIterator(); startLevel()}),
			new Button(20, 200, 200, 40, "Walk Once", ()=> {levelIterator = new InfiniteWalkOnceIterator(); startLevel()}),
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
		this.beaten = 0;
	}
	firstLevel() {
		return new LevelToggleRandom();
	}
	nextLevel() {
		this.beaten++;
		return new LevelToggleRandom();
	}
}

class InfinitePipePathIterator {
	constructor() {
		this.beaten = 0;
	}
	firstLevel() {
		return new LevelPipeRandom({
			index:0,
		});
	}
	nextLevel(prev) {
		this.beaten++;
		return new LevelPipeRandom({
			entranceSide:directionOpposite(prev.beamExitSide),
			index:this.beaten,
		});
	}
}

class InfiniteWalkOnceIterator {
	constructor() {
		this.beaten = 0;
	}
	firstLevel() {
		return new LevelOnceRandom({
			index:0,
		});
	}
	nextLevel(prev) {
		this.beaten++;
		return new LevelOnceRandom({
			entranceSide:directionOpposite(prev.beamExitSide),
			index:this.beaten,
		});
	}
}

function bubbleDrawIInfinity() {
	ctx.lineWidth = .06*this.radius;
	ctx.beginPath();
	ctx.arc(this.x+this.radius*2/5, this.y, this.radius/3, -Math.PI*3/4, Math.PI*3/4);
	ctx.arc(this.x-this.radius*2/5, this.y, this.radius/3, -Math.PI*1/4, Math.PI*1/4, true);
	ctx.closePath();
	ctx.stroke();
}