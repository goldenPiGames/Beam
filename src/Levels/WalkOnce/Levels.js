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

Levels.OnceFR1 = class LevelOnceFR1 extends OnceLevel {
	constructor() {
		super({
			grid:[
				[0,0,0,1,1],
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


const SEQ_MAIN_ONCE = {
	id : "MainOnce",
	levelIDs : [
		"OnceSBend",
		"OnceMGrid",
		"OnceSymPip",
		"OnceFR1",
	]
}