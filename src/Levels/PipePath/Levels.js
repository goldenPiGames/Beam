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

Levels.PipeAround = class LevelPipeAround extends PipeLevel {
	constructor() {
		super({
			entranceSide:3,
			exitSide:1,
			entrancePosition:0,
			exitPosition:0,
			pipeGrid:[
				[0,1,1,1],
				[0,0,0,0],
				[1,0,1,0],
				[1,0,1,0],
				[0,1,1,0],
				[1,1,1,1],
			],
		});
	}
}

//TODO quest for the single straight piece?

const SEQ_MAIN_PIPE = {
	id : "MainPipe", 
	levelIDs : [
		"PipeStraight",
		"PipeSBend",
		"Pipe3",
		"PipeReal",
		"PipeAround",
	]
}