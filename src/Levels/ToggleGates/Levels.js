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

Levels.ToggleAlternating = class LevelToggleAlternating extends ToggleLevel {
	constructor() {
		super({
			gates : [
				[1,0,0,0,0,0,0],
				[1,1,0,0,0,0,0],
				[0,1,1,0,0,0,0],
				[0,0,1,1,0,0,0],
				[0,0,0,1,1,0,0],
				[0,0,0,0,1,1,0],
				[0,0,0,0,0,1,1],
				[0,0,0,0,0,0,1],
			],
			direction : 1,
		});
	}
}


Levels.ToggleMirrorHall = class LevelToggleMirrorHall extends ToggleLevel {
	constructor() {
		super({
			gates : [
				[1,1,1,0,1,0,0,1],
				[0,1,0,1,1,0,1,1],
				[1,0,1,1,1,0,1,0],
				[0,1,1,1,0,1,0,1],
				[1,0,1,1,1,1,0,0],
				[1,0,0,1,0,1,1,1],
				[0,1,1,0,1,1,1,0],
				[1,1,0,0,0,1,1,1],
			],
			direction : 1,
		});
	}
}
/*chugga's playthrough: https://youtu.be/JoEok5sLuuk?t=536
(transposed)
				[1,0,1,0, , , , ],
				[1,1,0,1,0, , , ],
				[1,0,1,1, , , , ],
				[0,1,1,1,1, , , ],
				[ , , ,0,1,0,1,0],
				[0,0,0,1,1,1,1,1],
				[ , , , ,0,1,1,1],
				[ , , , ,0,1,0,1],
				
plus this shitty video	https://youtu.be/gNTK2Xk81M8?t=63
				[1,0,1,0, , , , ],
				[1,1,0,1,0, , , ],
				[1,0,1,1,1,0,1,0],
				[0,1,1,1,1, , , ],
				[1,1,1,0,1,0,1,0],
				[0,0,0,1,1,1,1,1],
				[ , , , ,0,1,1,1],
				[ , , , ,0,1,0,1],
	solutions: 11111111 or 01111000
gate-major but with nulls:

				[1,1,1,0,null,0,null,null],
				[0,1,0,1,null,0,null,null],
				[1,0,1,1,null,0,null,null],
				[0,1,1,1,0,1,null,null],
				[null,0,null,1,1,1,0,0],
				[null,null,null,null,0,1,1,1],
				[null,null,null,null,1,1,1,0],
				[null,null,null,null,0,1,1,1],
*/

Levels.ToggleGateGud = class LevelToggleGateGut extends ToggleLevel {
	constructor() {
		super({
			direction:1,
			gates:[
				[1,0,1,1,0,0,0],
				[1,1,0,0,1,0,0],
				[0,1,1,0,1,1,0],
				[1,0,1,1,0,1,0],
				[0,0,0,0,1,0,1],
				[0,0,0,1,1,1,0],
				[0,0,0,0,0,0,1],
			],
		});
	}
}

Levels.ToggleLoss = class LevelToggleLoss extends ToggleLevel {
	constructor() {
		super({
			direction:1,
			gates:[
				[0,0,0,0,0,1,1],
				[1,1,1,0,0,0,0],
				[0,0,0,0,1,1,1],
				[0,0,0,1,0,0,0],
				[1,1,0,0,1,1,1],
				[0,0,0,0,0,0,1],
				[0,1,1,0,0,0,1],
			],
		});
	}
}

const SEQ_MAIN_TOGGLE = {
	id : "MainToggle",
	mode : "ToggleGates",
	music : SONGREC.main.ToggleGates,
	levelIDs : [
		"Toggle1",
		"Toggle2",
		"ToggleFirstTrick",
		"ToggleAlternating",
		"ToggleMirrorHall",
		"ToggleGateGud",
		"ToggleLoss",
	]
}