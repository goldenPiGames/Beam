Levels.OnceSBend = class LevelOnceSBend extends OnceLevel {
	constructor() {
		super({
			grid : transposeArray([
				[0,1,1],
				[1,1,0],
			]),
			entranceSide : 3,
			entrancePosition : 1,
			exitSide : 1,
			exitPosition : 0,
		});
	}
}

Levels.OnceMGrid = class LevelOnceMGrid extends OnceLevel {
	constructor() {
		super({
			grid : transposeArray([
				[1,1,1,1],
				[1,1,1,1],
			]),
			entranceSide : 3,
			entrancePosition : 0,
			exitSide : 1,
			exitPosition : 0,
		});
	}
}

Levels.Once3x5 = class LevelOnce3x5 extends OnceLevel { //One of Bonte's games
	constructor() {
		super({
			grid : [
				[1,1,1,1,1],
				[1,1,1,1,1],
				[1,1,1,1,1],
			],
			entranceSide : 3,
			entrancePosition : 2,
			exitSide : 1,
			exitPosition : 2,
		});
	}
}

Levels.OnceSymPip = class LevelOnceSymPip extends OnceLevel {
	constructor() {
		super({
			grid : [
				[1,1,1,1,1],
				[1,1,1,0,1],
				[1,0,1,1,1],
				[1,1,1,1,1],
			],
			entranceSide : 3,
			entrancePosition : 2,
			exitSide : 1,
			exitPosition : 2,
		});
	}
}
//LevelOnceSymPip.prototype.lLevelHints = "OnceSymPip-Hints";

/*class LevelOnceStraight extends OnceLevel {
	constructor() {
		super({
			width : 3,
			height : 5,
			entranceSide : 3,
			entrancePosition : 2,
			exitSide : 1,
			exitPosition : 2,
		});
	}
}*/

Levels.OnceIronFortress = class LevelOnceIronFortress extends OnceLevel { //Reference to Epic Battle Fantasy 5
	constructor() {
		super({
			grid:[
				[0,1,1,1,1,1,1],
				[1,1,1,1,0,0,1],
				[1,0,0,1,1,1,1],
				[1,1,1,1,1,1,1],
				[1,1,1,0,0,1,1],
				[1,0,1,1,1,1,0],
				[1,1,0,1,1,1,1],
				[1,1,1,1,0,0,1],
				[1,1,1,1,1,1,1],
			],
			entranceSide:3,
			exitSide:1,
			entrancePosition:3,
			exitPosition:3,
		});
	}
}

Levels.OnceFR1 = class LevelOnceFR1 extends OnceLevel {
	constructor() {
		super({
			grid:[
				[1,1,0,1,1],
				[1,1,0,1,1],
				[1,1,1,1,0],
				[1,1,1,1,1],
				[1,1,1,1,1],
				[0,1,1,0,1],
				[1,1,1,0,1],
				[1,0,1,1,1],
			],
			entranceSide:3,
			exitSide:1,
			entrancePosition:3,
			exitPosition:0,
		});
	}
}

Levels.OnceSectorsHard = class LevelOnceSectorsHard extends OnceLevel {
	constructor() {
		super({
			entranceSide:3,
			entrancePosition:0,
			exitSide:1,
			exitPosition:8,
			grid:[
				[1,1,1,1,0,1,1,1,1],
				[1,1,1,1,0,1,1,0,1],
				[1,1,1,1,1,1,1,1,1],
				[1,1,1,1,0,1,1,1,1],
				[1,1,1,1,0,0,0,0,1],
				[1,0,0,1,1,1,1,1,1],
				[1,1,1,1,0,1,1,1,1],
				[1,1,1,1,0,1,0,1,1],
				[1,1,1,1,1,1,0,1,1],
				[1,1,1,1,0,1,1,1,1],
				[1,1,1,1,0,1,1,1,1],
			],
		});
	}
}


const SEQ_MAIN_ONCE = {
	id : "MainOnce",
	mode : "WalkOnce",
	music : SONGREC.main.WalkOnce,
	levelIDs : [
		"OnceSBend",
		"OnceMGrid",
		"Once3x5",
		"OnceSymPip",
		"OnceIronFortress",
		"OnceFR1",
		"OnceSectorsHard",
	]
}