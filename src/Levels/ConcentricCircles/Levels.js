Levels.ConcentricSingle = class LevelConcentricSingle extends ConcentricLevel {
	constructor() {
		super({
			also : [
				[1],
				],
			direction : 1,
		});
	}
}

Levels.ConcentricDouble = class LevelConcentricDouble extends ConcentricLevel {
	constructor() {
		super({
			also : [
				[1,0],
				[0,1]
				],
			direction : 1,
		});
	}
}

Levels.ConcentricCascade3 = class LevelConcentricCascade3 extends ConcentricLevel {
	constructor() {
		super({
			also : [
				[1,0,0],
				[1,1,0],
				[1,1,1],
				],
			direction : 1,
		});
	}
}

Levels.ConcentricReverse4 = class LevelConcentricReverse4 extends ConcentricLevel {
	constructor() {
		super({
			also : [
				[1,1,1,1],
				[0,1,1,1],
				[0,0,1,1],
				[0,0,0,1],
				],
			direction : 1,
		});
	}
}