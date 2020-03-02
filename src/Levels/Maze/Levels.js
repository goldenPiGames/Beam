Levels.MazeStraight = class LevelMazeStraight extends MazeLevel {
	constructor() {
		super({
			gridTo : [
				[1],
				[1],
				[9],
			],
			entranceSide : 3,
			entrancePosition : 0,
			exitSide : 1,
			exitPosition : 0,
		});
	}
}

Levels.MazeU = class LevelMazeU extends MazeLevel {
	constructor() {
		super({
			gridTo : [
				[2,1],
				[9,0],
			],
			entranceSide : 3,
			entrancePosition : 0,
			exitSide : 1,
			exitPosition : 0,
		});
	}
}

Levels.Maze3 = class LevelMaze3 extends MazeLevel {
	constructor() {
		super({
			gridTo : [
				[1,0,0],
				[1,0,0],
				[2,9,3],
			],
			entranceSide : 3,
			entrancePosition : 1,
			exitSide : 1,
			exitPosition : 1,
		});
	}
}

const SEQ_MAIN_MAZE = {
	id : "MainMaze",
	levelIDs : [
		"MazeStraight",
		"MazeU",
		"Maze3",
	]
}