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
			pipeGrid:[
				[0,1,1,1],
				[0,0,0,0],
				[1,0,1,0],
				[1,0,1,0],
				[0,1,1,0],
				[1,1,1,1],
			],
			entranceSide:3,
			exitSide:1,
			entrancePosition:0,
			exitPosition:0,
		});
	}
}

/*Levels.PipeSWStraight = class LevelPipeSStraight extends PipeLevel {
	constructor() {
		super({
			entranceSide:3,
			entrancePosition:7,
			exitSide:1,
			exitPosition:5,
			pipeGrid:[
				[1,1,0,0,0,0,0,0],
				[0,0,1,0,0,0,1,0],
				[0,1,0,0,0,1,0,0],
				[1,0,1,0,0,0,0,0],
				[0,1,0,1,0,1,0,1],
				[0,1,0,0,1,0,0,1],
				[0,0,1,0,1,1,0,1],
				[0,0,0,1,0,0,1,0]
			],
		});
	}
}*/
Levels.PipeSWStraight = levelClassFromJSON({"width":8,"height":8,"entranceSide":3,"entrancePosition":7,"exitSide":1,"exitPosition":5,"pipeGrid":[[1,1,0,0,0,0,0,0],[0,0,1,0,0,0,1,0],[0,1,0,0,0,1,0,0],[1,0,1,0,0,0,0,0],[0,1,0,1,0,1,0,1],[0,1,0,0,1,0,0,1],[0,0,1,0,1,1,0,1],[0,0,0,1,0,0,1,0]],"mode":"PipePath"});

Levels.PipeStraightSearch = class LevelPipeStraightSearch extends PipeLevel {
	constructor() {
		super({
			entranceSide:3,
			exitSide:1,
			entrancePosition:4,
			exitPosition:4,
			pipeGrid:[
				[1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1],
				[1,0,1,1,1,1,1],
				[1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1],
				[1,1,1,1,1,1,1],
				//[1,1,1,1,1,1,1],
				//[1,1,1,1,1,1,1],
				//[1,1,1,1,1,1,1],
				//[1,1,1,1,1,1,1],
			],
		});
	}
}

const SEQ_MAIN_PIPE = {
	id : "MainPipe",
	mode : "PipePath",
	music : SONGREC.main.PipePath,
	levelIDs : [
		"PipeStraight",
		"PipeSBend",
		"Pipe3",
		"PipeReal",
		"PipeAround",
		"PipeSWStraight",
		"PipeStraightSearch",
	]
}