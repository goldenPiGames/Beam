class LevelPipeIntro extends PipeLevel {
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

class LevelPipeReal extends PipeLevel {
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