Levels.SameIntro = class LevelSameIntro extends SameLevel {
	constructor() {
		super({
			grid : [
				[0,0,0],
				[0,1,0],
				[1,1,1],
			],
			direction : 1,
		});
	}
	draw() {
		super.draw();
		ctx.font = "30px "+settings.font;
		ctx.fillStyle = palette.normal;
		ctx.textAlign = "left";
		ctx.textBaseline = "bottom";
		ctx.fillText(lg("SameGame-ColorblindAlert"), 70, 65);
	}
}

Levels.SameSlideDemo = class LevelSameSlideDemo extends SameLevel {
	constructor() {
		super({
			grid : [
				[1,0],
				[2,2],
				[1,0],
			],
			direction : 1,
		});
	}
}

Levels.SameTower1 = class LevelSameTower1 extends SameLevel {
	constructor() {
		super({
			grid : [
				[1,0,1,2],
				[2,0,1,2],
			],
			direction : 1,
		});
	}
}

Levels.SameMeet = class LevelSameMeet extends SameLevel {
	constructor() {
		super({
			grid : [
				[0,0,0,3,3],
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0],
				[0,0,0,0,0],
				[3,0,0,0,0],
			],
			direction : 1,
		});
	}
}

//TODO meet

//Teken directly from random, before I decided to make it smaller.
Levels.SameLemonadePreShrink = class LevelSameLemonade extends SameLevel {
	constructor() {
		super({
			direction:1,
			grid:[
				[2,2,2,1,1,1,1],
				[3,3,2,2,2,3,3],
				[0,3,3,2,2,2,3],
				[0,0,0,3,2,3,3],
				[3,3,3,3,3,2,1],
			],
		});
	}
}

Levels.SameLemonade = levelClassFromJSON({"direction":1,"grid":[[2,2,2,1,1],[3,3,2,2,3],[0,0,2,3,3],[3,3,3,2,1]],"mode":"SameGame","width":4,"height":5});

Levels.SamePinch = levelClassFromJSON({"width":6,"height":7,"direction":1,"grid":[[1,3,1,1,0,0,0],[1,3,1,1,0,2,2],[1,2,1,0,0,0,1],[1,1,1,3,1,0,3],[0,2,2,0,0,0,3],[2,3,3,1,1,1,3]],"mode":"SameGame"});

Levels.SameFRHard = class LevelSameFRHard extends SameLevel {
	constructor() {
		super({
			direction:1,
			width:7,
			height:8,
			numColors:4,
			grid:[
				[2,0,0,0,0,2,2,2],
				[1,1,0,1,1,2,2,1],
				[3,2,2,2,3,3,3,0],
				[1,3,2,2,2,0,0,1],
				[1,1,1,3,3,3,1,1],
				[1,3,2,2,2,2,2,2],
				[1,1,1,1,1,0,3,0],
			],
		});
	}
}


const SEQ_MAIN_SAME = {
	id : "MainSame",
	mode : "SameGame",
	music : SONGREC.main.SameGame,
	levelIDs : [
		"SameIntro",
		"SameSlideDemo",
		"SameTower1",
		"SameLemonade",
		"SamePinch",
		"SameFRHard",
	]
}