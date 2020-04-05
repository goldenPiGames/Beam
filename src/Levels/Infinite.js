class InfiniteSelectScreen extends Screen {
	constructor(specs) {
		super();
		this.modeButtons = new RadioButtons(10, 10, 200, 30, INFINITE_MODES.map(mod=>lg(mod.lName)), dex=>this.modeClicked(dex));
		this.beginButton = new BubbleButton(WIDTH-50, HEIGHT-50, 45, ()=>this.tryPlay(), bubbleDrawIPlay);
		this.seedCheckbox = new Checkbox(WIDTH-170, HEIGHT/2, 160, 30, lg("Infinite-PRNG"), val=>this.toggleSeed(val), false);
		this.raceCheckbox = new Checkbox(WIDTH-370, HEIGHT/2, 160, 30, lg("Infinite-TimeTrial"), val=>this.toggleRace(val), false);
		this.returnButton = new BubbleButton(50, HEIGHT-50, 45, ()=>switchScreen(new MainMenu()), bubbleDrawIReturn),
		this.objects = [
			this.returnButton,
			this.modeButtons,
			this.beginButton,
			this.seedCheckbox,
			this.raceCheckbox,
		];
		this.seedSelector = new CodeNumberSelector(this.seedCheckbox.x, this.seedCheckbox.y+this.seedCheckbox.height, this.seedCheckbox.width, 100, 4, 16);
		this.objectsSeedOnly = [
			this.seedSelector,
		];
		this.goalSelector = new NumberSelector(this.raceCheckbox.x, this.raceCheckbox.y+this.raceCheckbox.height, this.raceCheckbox.width, 100, 1, 99, 5, 10);
		this.objectsRaceOnly = [
			this.goalSelector,
		];
		if (specs) {
			this.setSpecs(specs);
		}
	}
	setSpecs(specs) {
		console.log(specs)
		this.doingRace = specs.race;
		this.modeButtons.setIndex(INFINITE_MODES.findIndex(m=>m.id==specs.mode));
		this.raceCheckbox.checked = this.doingRace;
		this.seedSelector.setNumber(specs.rngseed);
		if (typeof specs.goal == "number")
			this.goalSelector.setNumber(specs.goal);
		this.doingSeed = specs.rng;
		this.seedCheckbox.checked = this.doingSeed;
		if (typeof specs.rngseed == "number")
			this.seedSelector.setNumber(specs.rngseed);
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
	tryPlay() {
		if (this.modeButtons.index >= 0) {
			var rngseed = null;
			if (this.doingSeed) {
				rngseed = this.seedSelector.getNumber()
				rng = new SM64RNG(rngseed);
			}
			if (this.doingRace) {
				var num = this.goalSelector.getNumber();
				//console.log(num);
				if (num <= 0) {
					return false;
				}
				levelIterator = new TimeTrialIterator(INFINITE_MODES[this.modeButtons.index], num, rngseed);
			} else
				levelIterator = new InfiniteIterator(INFINITE_MODES[this.modeButtons.index]);
			startLevel();
			return true;
		} else
			return false;
	}
	modeClicked(dex) {
		
	}
	toggleSeed(val) {
		this.doingSeed = val;
	}
	toggleRace(val) {
		this.doingRace = val;
	}
}

class InfiniteIterator extends LevelIterator {
	constructor(mode) {
		super();
		this.beaten = -1;
		this.mode = mode;
	}
	nextLevel(prev) {
		this.beaten++;
		var level = this.mode.getLevel(prev ? prev.beamExitSide : RIGHT);
		this.lastJSON = level.json;
		return level;
	}
	redoLevel() {
		return levelFromJSON(this.lastJSON);
	}
	drawBack() {
		scintBeam();
		this.drawBackText(this.beaten);
	}
	exit() {
		runnee = new InfiniteSelectScreen();
	}
}

const INFINITE_MODES = [
	{id:"ToggleGates", lName:"ToggleGates-Name", getLevel:(pex)=>new LevelToggleRandom({
			direction: pex
		})},
	{id:"PipePath", lName:"PipePath-Name", getLevel:(pex)=>new LevelPipeRandom({
			entranceSide:directionOpposite(pex)
		})},
	{id:"WalkOnce", lName:"WalkOnce-Name", getLevel:(pex)=>new LevelOnceRandom({
			entranceSide:directionOpposite(pex)
		})},
	{id:"SameGame", lName:"SameGame-Name", getLevel:(pex)=>new LevelSameRandom({
			direction: pex
		})},
	{id:"Maze", lName:"Maze-Name", getLevel:(pex)=>new LevelMazeRandom({
			entranceSide:directionOpposite(pex)
		})},
	/*{id:"Gridlock", lName:"Gridlock-Name", getLevel:(pex)=>new LevelGridlockRandom({
			direction: pex
		})},*/
];

function bubbleDrawIInfinity() {
	ctx.lineWidth = .06*this.radius;
	ctx.beginPath();
	ctx.arc(this.x+this.radius*2/5, this.y, this.radius/3, -Math.PI*3/4, Math.PI*3/4);
	ctx.arc(this.x-this.radius*2/5, this.y, this.radius/3, -Math.PI*1/4, Math.PI*1/4, true);
	ctx.closePath();
	ctx.stroke();
}