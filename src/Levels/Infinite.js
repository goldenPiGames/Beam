class InfiniteSelectScreen extends Screen {
	constructor() {
		super();
		this.modeButtons = new RadioButtons(10, 10, 200, 30, INFINITE_MODES.map(mod=>lg(mod.lName)), dex=>this.modeClicked(dex));
		this.beginButton = new BubbleButton(WIDTH-50, HEIGHT-50, 45, ()=>this.tryPlay(), bubbleDrawIPlay);
		this.seedCheckbox = new Checkbox(WIDTH-170, HEIGHT/2, 160, 24, "Seed PRNG", val=>this.toggleSeed(val), false);
		this.objects = [
			new BubbleButton(WIDTH-50, 50, 45, ()=>switchScreen(new MainMenu()), bubbleDrawIReturn),
			this.modeButtons,
			this.beginButton,
			this.seedCheckbox,
		];
		this.seedSelector = new NumberSelector(this.seedCheckbox.x, this.seedCheckbox.y+this.seedCheckbox.height, this.seedCheckbox.width, 100, 4, 16);
		this.objectsSeedOnly = [
			this.seedSelector,
		];
	}
	update() {
		this.objects.forEach(butt=>butt.update());
		if (this.doingSeed)
			this.objectsSeedOnly.forEach(butt=>butt.update());
	}
	draw() {
		this.objects.forEach(butt=>butt.draw());
		if (this.doingSeed)
			this.objectsSeedOnly.forEach(butt=>butt.draw());
	}
	modeClicked(dex) {
		
	}
	tryPlay() {
		if (this.modeButtons.index >= 0) {
			if (this.doingSeed) {
				rng = new SM64RNG(this.seedSelector.getNumber);
			}
			levelIterator = new (INFINITE_MODES[this.modeButtons.index].iterCons)();
			startLevel();
		}
	}
	toggleSeed(val) {
		this.doingSeed = val;
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

const INFINITE_MODES = [
	{lName:"ToggleGates-Name", iterCons:InfiniteToggleGatesIterator},
	{lName:"PipePath-Name", iterCons:InfinitePipePathIterator},
	{lName:"WalkOnce-Name", iterCons:InfiniteWalkOnceIterator},
];

function bubbleDrawIInfinity() {
	ctx.lineWidth = .06*this.radius;
	ctx.beginPath();
	ctx.arc(this.x+this.radius*2/5, this.y, this.radius/3, -Math.PI*3/4, Math.PI*3/4);
	ctx.arc(this.x-this.radius*2/5, this.y, this.radius/3, -Math.PI*1/4, Math.PI*1/4, true);
	ctx.closePath();
	ctx.stroke();
}