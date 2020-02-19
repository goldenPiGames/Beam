class LevelSameIntro extends SameLevel {
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

class LevelSameTower1 extends SameLevel {
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