Levels.PipeStraight = class LevelPipeStraight extends PipeLevel {
	constructor() {
		super({
			pipeGrid : [
			[0],
			[0],
			[0],
			],
			entranceSide : 3,
			entrancePosition : 0,
			exitSide : 1,
			exitPosition : 0,
		});
	}
}

Levels.PipeSBend = class LevelPipeSBend extends PipeLevel {
	constructor() {
		super({
			pipeGrid : [
				[0,0],
				[1,1],
				[1,0],
			],
			entranceSide : 3,
			entrancePosition : 0,
			exitSide : 1,
			exitPosition : 1,
		});
	}
}

Levels.Pipe3 = class LevelPipeIntro extends PipeLevel {
	constructor() {
		super({
			pipeGrid : [
			[1,1,1],
			[0,1,1],
			[1,0,1],
			],
			entranceSide : 3,
			entrancePosition : 1,
			exitSide : 1,
			exitPosition : 1,
		});
	}
}

Levels.PipeReal = class LevelPipeReal extends PipeLevel {
	constructor() {
		super({
			pipeGrid : [
			[1,0,1,0,1],
			[0,1,1,1,0],
			[1,1,1,0,1],
			[0,1,0,1,0],
			[1,0,0,1,0],
			[1,0,1,1,1],
			],
			entranceSide : 3,
			entrancePosition : 2,
			exitSide : 1,
			exitPosition : 2
		});
	}
}