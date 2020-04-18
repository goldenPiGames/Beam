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

Levels.ConcentricCascramble31425 = class LevelConcentricCascramble31425 extends ConcentricLevel {
	constructor() {
		super({
			also : [
				[1,1,0,1,1],
				[0,1,0,0,1],
				[1,1,1,1,1],
				[0,1,0,1,1],
				[0,0,0,0,1],
				],
			direction : 1,
		});
	}
}

Levels.ConcentricRound3 = class LevelConcentricRound3 extends ConcentricLevel {
	constructor() {
		super({
			also : [
				[1,0,1],
				[1,1,0],
				[0,1,1],
				],
			direction : 1,
		});
	}
}

Levels.ConcentricRound4 = class LevelConcentricRound3 extends ConcentricLevel {
	constructor() {
		super({
			also : [
				[1,1,0,1],
				[1,1,1,0],
				[0,1,1,1],
				[1,0,1,1],
				],
			direction : 1,
		});
	}
}

const SEQ_MAIN_CONCENTRIC = {
	id : "MainConcentric",
	mode : "ConcentricCircles",
	music : SONGREC.main.ConcentricCircles,
	levelIDs : [
		"ConcentricSingle",
		"ConcentricDouble",
		"ConcentricCascade3",
		"ConcentricReverse4",
		"ConcentricCascramble31425",
		"ConcentricRound3",
		"ConcentricRound4",
	]
}