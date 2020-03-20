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

Levels.MazeRCTMini = class LevelMazeRCTMini extends MazeLevel { //Mini Maze from Roller Coaster Tycoon
	constructor() {
		super({
			gridDownRight : [
				[3,2,0,2,2,2,2,1],
				[3,2,3,2,2,2,1,1],
				[1,3,2,2,3,1,2,0],
				[0,1,3,2,0,2,3,1],
				[1,1,3,2,2,1,1,1],
				[1,1,0,3,2,0,0,1],
				[1,2,1,1,3,1,3,1],
				[3,1,1,2,0,1,1,1],
				[1,1,0,3,2,0,1,1],
				[0,2,2,2,2,2,0,0],
			],
			entranceSide : LEFT,
			entrancePosition : 7,
			exitSide : RIGHT,
			exitPosition : 0,
		});
	}
}

//TODO Emerald Temple from Cactus McCoy

const SEQ_MAIN_MAZE = {
	id : "MainMaze",
	levelIDs : [
		"MazeStraight",
		"MazeU",
		"Maze3",
		"MazeRCTMini",
	]
}