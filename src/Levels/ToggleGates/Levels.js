class LevelToggleSingle extends ToggleLevel {
	constructor() {
		super({
			gates : [
				[1],
			],
			direction : 1,
		});
	}
}

class LevelToggleDouble extends ToggleLevel {
	constructor() {
		super({
			gates : [
				[1,0],
				[0,1],
			],
			direction : 1,
		});
	}
}

class LevelToggleFirstTrick extends ToggleLevel {
	constructor() {
		super({
			gates : [
				[1,0,0],
				[0,1,1],
				[0,0,1],
			],
			direction : 1,
		});
	}
}

//https://youtu.be/JoEok5sLuuk?t=536