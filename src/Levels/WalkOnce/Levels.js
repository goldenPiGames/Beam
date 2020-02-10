class LevelOnceSBend extends OnceLevel {
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

class LevelOnceMGrid extends OnceLevel {
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

class LevelOnceSymPip extends OnceLevel {
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
LevelOnceSymPip.prototype.lLevelHints = "OnceSymPip-Hints";

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