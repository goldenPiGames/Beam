Levels.SameIntro = class LevelSameIntro extends SameLevel {
	constructor() {
		super({
			grid : [
				[0,0,0],
				[0,1,0],
				[1,1,1],
			],
			direction : 1,
		});
	}
}

Levels.SameSlideDemo = class LevelSameSlideDemo extends SameLevel {
	constructor() {
		super({
			grid : [
				[1,0],
				[2,2],
				[1,0],
			],
			direction : 1,
		});
	}
}

Levels.SameTower1 = class LevelSameTower1 extends SameLevel {
	constructor() {
		super({
			grid : [
				[1,0,1,2],
				[2,0,1,2],
			],
			direction : 1,
		});
	}
}
//LevelSameTower1.prototype.lLevelHints = "SameTower1-Hints";