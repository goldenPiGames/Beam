class InfiniteSelectScreen extends Screen {
	constructor() {
		super();
		this.modeButtons = new RadioButtons(10, 10, 200, 30, INFINITE_MODES.map(mod=>lg(mod.lName)), dex=>this.modeClicked(dex));
		this.beginButton = new BubbleButton(WIDTH-50, HEIGHT-50, 45, ()=>this.tryPlay(), bubbleDrawIPlay);
		this.seedCheckbox = new Checkbox(WIDTH-170, HEIGHT/2, 160, 30, "Seed PRNG", val=>this.toggleSeed(val), false);
		this.raceCheckbox = new Checkbox(WIDTH-370, HEIGHT/2, 160, 30, "Race", val=>this.toggleRace(val), false);
		this.objects = [
			new BubbleButton(WIDTH-50, 50, 45, ()=>switchScreen(new MainMenu()), bubbleDrawIReturn),
			this.modeButtons,
			this.beginButton,
			this.seedCheckbox,
			this.raceCheckbox,
		];
		this.seedSelector = new NumberSelector(this.seedCheckbox.x, this.seedCheckbox.y+this.seedCheckbox.height, this.seedCheckbox.width, 100, 4, 16);
		this.objectsSeedOnly = [
			this.seedSelector,
		];
		this.goalSelector = new NumberSelector(this.raceCheckbox.x, this.raceCheckbox.y+this.raceCheckbox.height, this.raceCheckbox.width, 100, 2);
		this.objectsRaceOnly = [
			this.goalSelector,
		];
	}
	update() {
		this.objects.forEach(butt=>butt.update());
		if (this.doingSeed)
			this.objectsSeedOnly.forEach(butt=>butt.update());
		if (this.doingRace)
			this.objectsRaceOnly.forEach(butt=>butt.update());
	}
	draw() {
		this.objects.forEach(butt=>butt.draw());
		if (this.doingSeed)
			this.objectsSeedOnly.forEach(butt=>butt.draw());
		if (this.doingRace)
			this.objectsRaceOnly.forEach(butt=>butt.draw());
	}
	modeClicked(dex) {
		
	}
	tryPlay() {
		if (this.modeButtons.index >= 0) {
			if (this.doingSeed) {
				rng = new SM64RNG(this.seedSelector.getNumber());
			}
			if (this.doingRace) {
				var num = this.goalSelector.getNumber();
				//console.log(num);
				if (num <= 0) {
					return false;
				}
				levelIterator = new RaceIterator(INFINITE_MODES[this.modeButtons.index].getLevel, num);
			} else
				levelIterator = new InfiniteIterator(INFINITE_MODES[this.modeButtons.index].getLevel);
			startLevel();
			return true;
		} else
			return false;
	}
	toggleSeed(val) {
		this.doingSeed = val;
	}
	toggleRace(val) {
		this.doingRace = val;
	}
}

class InfiniteIterator extends LevelIterator {
	constructor(stageGetter) {
		super();
		this.beaten = 0;
		this.stageGetter = stageGetter;
	}
	firstLevel() {
		return this.stageGetter(1);
	}
	nextLevel(prev) {
		this.beaten++;
		return this.stageGetter(prev.beamExitSide);
	}
	drawBack() {
		this.drawBackText(this.beaten);
	}
}

class RaceIterator extends InfiniteIterator {
	constructor(stageGetter, goal) {
		super(stageGetter);
		this.goal = goal;
		this.timeTaken = 0;
	}
	firstLevel() {
		this.startTime = Date.now();
		return super.firstLevel();
	}
	nextLevel(prev) {
		if (this.beaten < this.goal-1) {
			this.timeTaken += prev.wrapper.timeTaken;
			return super.nextLevel(prev);
		} else {
			this.finished = true;
			this.finishTime = Date.now();
			return new RaceEndScreen(directionOpposite(prev.beamExitSide), this.timeTaken);
		}
	}
	drawBack(wrap) {
		this.timeTaken += lastFrameDelay;
		if (!this.finished) {
			this.drawBackText(this.goal - this.beaten);
			ctx.globalAlpha = 1;
			var now = Date.now();
			//var elap = now - this.startTime;
			var mins = Math.floor(this.timeTaken/60000);
			var secs = Math.floor((this.timeTaken%60000)/1000);
			drawTextInRect(mins+":"+secs.toString().padStart(2,"0"), WIDTH/4, 5, WIDTH/2, 35);
			//drawTextInRect(this.timeTaken+wrap.timeTaken, WIDTH/4, 5, WIDTH/2, 35)
		}
	}
}

const INFINITE_MODES = [
	{lName:"ToggleGates-Name", getLevel:(pex)=>new LevelToggleRandom({
			direction: pdir
		})},
	{lName:"PipePath-Name", getLevel:(pex)=>new LevelPipeRandom({
			entranceSide:directionOpposite(pex)
		})},
	{lName:"WalkOnce-Name", getLevel:(pex)=>new LevelOnceRandom({
			entranceSide:directionOpposite(pex)
		})},
];

function bubbleDrawIInfinity() {
	ctx.lineWidth = .06*this.radius;
	ctx.beginPath();
	ctx.arc(this.x+this.radius*2/5, this.y, this.radius/3, -Math.PI*3/4, Math.PI*3/4);
	ctx.arc(this.x-this.radius*2/5, this.y, this.radius/3, -Math.PI*1/4, Math.PI*1/4, true);
	ctx.closePath();
	ctx.stroke();
}