class InfiniteSelectScreen extends Screen {
	constructor(specs) {
		super();
		this.modeButtons = new RadioButtons(10, 10, 200, 30, INFINITE_MODES.map(mod=>lg(mod.lName)), dex=>this.modeClicked(dex));
		this.beginButton = new BubbleButton(WIDTH-50, HEIGHT-50, 45, ()=>this.tryPlay(), bubbleDrawIPlay);
		this.seedCheckbox = new Checkbox(WIDTH-170, 10, 160, 30, lg("Infinite-PRNG"), val=>this.toggleSeed(val), false);
		this.raceCheckbox = new Checkbox(WIDTH-400, 10, 190, 30, lg("Infinite-TimeTrial"), val=>this.toggleRace(val), false);
		this.returnButton = new BubbleButton(50, HEIGHT-50, 45, ()=>switchScreen(new MainMenu()), bubbleDrawIReturn),
		this.objects = [
			this.returnButton,
			this.modeButtons,
			this.beginButton,
			this.seedCheckbox,
			this.raceCheckbox,
		];
		this.seedSelector = new CodeNumberSelector(this.seedCheckbox.x, 100, this.seedCheckbox.width, 100, 4, 16);
		this.objectsSeedOnly = [
			this.seedSelector,
		];
		this.goalSelector = new NumberSelector(this.raceCheckbox.x, 100, this.raceCheckbox.width, 100, 1, 99, 5, 10);
		this.goalLabel = new LabelAbove(this.goalSelector, 30, lg("TimeTrial-Goal"));
		this.objectsRaceOnly = [
			this.goalSelector,
			this.goalLabel,
		];
		if (VERSION_KONGREGATE) {
			this.objectsRaceOnly.push(
				new TimeTrialDurationButton(WIDTH/2, HEIGHT/2, 100, 60, this, 0),
				new TimeTrialDurationButton(WIDTH/2+110, HEIGHT/2, 100, 60, this, 1),
				new TimeTrialDurationButton(WIDTH/2+220, HEIGHT/2, 100, 60, this, 2),
			);
		}
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
		if (this.doingRace) {
			this.objectsRaceOnly.forEach(butt=>butt.draw());
			ctx.fillStyle = palette.normal;
			if (VERSION_KONGREGATE && this.modeButtons.index >= 0) {
				drawParagraphInRect(lg(this.doingSeed?"TimeTrial-KongregateNoPRNG":this.objectsRaceOnly.find(o=>o.showSelected)?"TimeTrial-KongregateYes":"TimeTrial-KongregateLength"), WIDTH/3, HEIGHT/2+80, WIDTH*2/3-10, HEIGHT/2-100, 26);
			}
		}
	}
	tryPlay() {
		if (this.modeButtons.index >= 0) {
			var rngseed = null;
			var mode = INFINITE_MODES[this.modeButtons.index];
			if (this.doingSeed) {
				rngseed = this.seedSelector.getNumber()
				rng = new SM64RNG(rngseed);
			} else {
				rng = new JSRandom();
			}
			if (this.doingRace) {
				var num = this.goalSelector.getNumber();
				//console.log(num);
				if (num <= 0) {
					return false;
				}
				recommendSongs([...SONGREC.race[mode.id], ...SONGREC.main[mode.id]]);
				levelIterator = new TimeTrialIterator(mode, num, rngseed);
			} else {
				recommendSongs([...SONGREC.infinite[mode.id], ...SONGREC.main[mode.id]]);
				levelIterator = new InfiniteIterator(mode);
			}
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
		if (this.beaten > 0) {
			submitToAPI("TotalInfinite"+this.mode.id, 1);
		}
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
	{id:"PipePath", lName:"PipePath-Name", getLevel:(pex)=>new LevelPipeRandom({
			entranceSide:directionOpposite(pex)
		}), submitKong:[8,15,30]},
	{id:"Maze", lName:"Maze-Name", getLevel:(pex)=>new LevelMazeRandom({
			entranceSide:directionOpposite(pex)
		}), submitKong:[12,30,60]},
	{id:"WalkOnce", lName:"WalkOnce-Name", getLevel:(pex)=>new LevelOnceRandom({
			entranceSide:directionOpposite(pex)
		}), submitKong:[10,24,50]},
	{id:"ToggleGates", lName:"ToggleGates-Name", getLevel:(pex)=>new LevelToggleRandom({
			direction: pex
		}), submitKong:[7,12,20]},
	{id:"SameGame", lName:"SameGame-Name", getLevel:(pex)=>new LevelSameRandom({
			direction: pex
		}), submitKong:[6,10,16]},
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

class TimeTrialDurationButton extends UIObject {
	constructor(x, y, width, height, screen, index) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.screen = screen;
		this.index = index;
		this.lastMode = -1;
		this.length = null;
	}
	update() {
		super.update();
		if (this.hovered)
			hovered = true;
		let currMode = this.screen.modeButtons.index;
		if (currMode != this.lastMode) {
			this.lastMode = currMode;
			this.length = INFINITE_MODES[currMode].submitKong[this.index];
			if (this.selected)
				this.screen.goalSelector.setNumber(this.length);
		}
		this.showSelected = this.screen.goalSelector.getNumber() == this.length && this.screen.seedCheckbox.checked == false;
		if (!this.showSelected)
			this.selected = false;
		if (this.clicked) {
			this.screen.seedCheckbox.checked = false;
			this.screen.seedCheckbox.handler(false);
			if (this.length) {
				this.screen.goalSelector.setNumber(this.length);
			}
			this.selected = true;
			this.showSelected = true;
		}
	}
	draw() {
		if (!this.length)
			return;
		var color = this.showSelected ? palette.click : this.hovered ? palette.hover : palette.normal;
		ctx.lineWidth = BUTTON_BORDER_WIDTH;
		ctx.strokeStyle = color;
		ctx.fillStyle = palette.background;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		this.stroke();
		ctx.fillStyle = color;
		drawTextInRect(this.length, this.x+BUTTON_BORDER_WIDTH*2, this.y+BUTTON_BORDER_WIDTH*2, this.width-BUTTON_BORDER_WIDTH*4, this.height-BUTTON_BORDER_WIDTH*4);
	}
}