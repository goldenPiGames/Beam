const MAIN_DATA_NODES = [
	{id:"start", x:20, y:200},
	{id:"base", x:140, y:200},
	{id:"up1", x:240, y:130},
	{id:"mid1", x:240, y:200},
	{id:"down1", x:240, y:270},
	{id:"downf2", x:370, y:340},
]

const MAIN_DATA_EDGES = [
	{id:"Intro", previd:"start", nextid:"base", dir:RIGHT, levels: [
			LevelToggle1,
			LevelGridlock1,
			//LevelToggleFirstTrick,
		]},
	{id:"PipeIntro", previd:"base", nextid:"up1", dir:RIGHT, levels: [
			LevelPipeStraight,
			LevelPipeSBend,
			LevelPipeIntro,
		]},
	{id:"ToggleIntro", previd:"base", nextid:"mid1", dir:RIGHT, levels: [
			LevelToggle2,
			LevelToggleFirstTrick,
		]},
	{id:"MazeIntro", previd:"base", nextid:"down1", dir:RIGHT, levels: [
			LevelMazeStraight,
			LevelMazeU,
			LevelMaze3,
		]},
	{id:"OnceIntro", previd:"down1", nextid:"downf2", dir:RIGHT, levels: [
			LevelOnceSBend,
			LevelOnceMGrid,
			LevelOnceSymPip,
		]},
]
