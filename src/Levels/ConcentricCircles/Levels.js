class LevelConcentricSingle extends ConcentricLevel {
	constructor() {
		super({
			also : [
				[1],
				],
			direction : 1,
		});
	}
}

class LevelConcentricDouble extends ConcentricLevel {
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

class LevelConcentricCascade3 extends ConcentricLevel {
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

class LevelConcentricReverse4 extends ConcentricLevel {
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