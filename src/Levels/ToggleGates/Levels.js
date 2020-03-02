Levels.Toggle1 = class LevelToggle1 extends ToggleLevel {
	constructor() {
		super({
			gates : [
				[1],
			],
			direction : 1,
		});
	}
}
//LevelToggle1.prototype.lLevelHints = "Toggle1-Hints";

Levels.Toggle2 = class LevelToggle2 extends ToggleLevel {
	constructor() {
		super({
			gates : [
				[1,0],
				[0,1],
			],
			direction : 1,
		});
	}
}

Levels.ToggleFirstTrick = class LevelToggleFirstTrick extends ToggleLevel {
	constructor() {
		super({
			gates : [
				[1,0,0],
				[0,1,1],
				[0,0,1],
			],
			direction : 1,
		});
	}
}

//https://youtu.be/JoEok5sLuuk?t=536

const SEQ_MAIN_TOGGLE = {
	id : "MainToggle",
	levelIDs : [
		"Toggle1",
		"Toggle2",
		"ToggleFirstTrick",
	]
}