Levels.Gridlock1 = class LevelGridlock1 extends GridlockLevel {
	constructor() {
		super({
			width : 1,
			height : 4,
			pieces : [
				{x:0, y:0, len:2, horiz:false},
			],
			direction : 1,
			position : 1,
		});
	}
}

Levels.Gridlock2 = class LevelGridlock2 extends GridlockLevel {
	constructor() {
		super({
			width : 3,
			height : 4,
			pieces : [
				{x:2, y:0, len:2, horiz:false},
				{x:1, y:2, len:2, horiz:true},
			],
			direction : 1,
			position : 1,
		});
	}
}

Levels.Gridlock4 = class LevelGridlock4 extends GridlockLevel {
	constructor() {
		super({
			width : 4,
			height : 6,
			pieces : [
				{x:0, y:0, len:2, horiz:false},
				{x:3, y:0, len:2, horiz:false},
				{x:0, y:2, len:3, horiz:true},
				{x:1, y:3, len:3, horiz:true},
			],
			direction : 1,
			position : 1,
		});
	}
}

Levels.GridlockThruDemo = class LevelGridlockThruDemo extends GridlockLevel {
	constructor() {
		super({
			width : 3,
			height : 4,
			pieces : [
				{x:0, y:1, len:2, horiz:true},
				{x:2, y:0, len:2, horiz:false},
			],
			direction : 1,
			position : 1,
		});
	}
}

Levels.GridlockThruDouble = class LevelGridlockThruDouble extends GridlockLevel {
	constructor() {
		super({
			width : 6,
			height : 6,
			pieces : [
				{x:0, y:2, len:2, horiz:true},
			],
			direction : 1,
			position : 2,
		});
	}
}

Levels.GridlockFR1 = class LevelGridlockFR1 extends GridlockLevel {
	constructor() {
		super({
			direction:1,
			width:5,
			height:6,
			position:2,
			pieces: [
				{x:2, y:2,len:2, horiz:true},
				{x:2, y:5,len:2, horiz:true},
				{x:1, y:4,len:2, horiz:false},
				{x:3, y:3,len:2, horiz:false},
				{x:3, y:0,len:2, horiz:true},
				{x:2, y:0,len:2, horiz:false},
				{x:2, y:3,len:2, horiz:false},
				{x:4, y:1,len:2, horiz:false},
				{x:0, y:1,len:2, horiz:true},
				{x:0, y:2,len:3, horiz:false},
				{x:1, y:2,len:2, horiz:false},
			],
		});
	}
}


//TODO make more original levels
Levels.GridlockRH3 = class LevelGridlockRH3 extends GridlockLevel {
	constructor() {
		super({
			width : 5,
			height : 6,
			pieces : [
				{x:0, y:0, len:2, horiz:false},
				{x:1, y:0, len:2, horiz:false},
				{x:2, y:0, len:2, horiz:true},
				{x:2, y:1, len:2, horiz:true},
				{x:4, y:0, len:2, horiz:false},
				{x:0, y:2, len:2, horiz:true},
				{x:2, y:2, len:2, horiz:false},
				{x:2, y:4, len:2, horiz:false},
				{x:3, y:2, len:3, horiz:false},
				{x:4, y:3, len:2, horiz:false},
			],
			direction : 1,
			position : 2,
		});
	}
}

const SEQ_MAIN_GRIDLOCK = {
	id : "MainGridlock",
	levelIDs : [
		"Gridlock1",
		"Gridlock2",
		"GridlockFR1",
		//"GridlockThruDouble",
		//"Gridlock4",
		//"GridlockThruDemo",
		"GridlockRH3",
	]
}