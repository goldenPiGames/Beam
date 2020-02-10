class LevelToggleSingle extends ToggleLevel {
	constructor() {
		super({
			numSwitches : 1,
			gates : [
				[0],
			],
			direction : 1,
		});
	}
}

class LevelToggleDouble extends ToggleLevel {
	constructor() {
		super({
			numSwitches : 2,
			gates : [
				[0],
				[1],
			],
			direction : 1,
		});
	}
}

class LevelToggleFirstTrick extends ToggleLevel {
	constructor() {
		super({
			numSwitches : 3,
			gates : [
				[0],
				[1, 2],
				[2],
			],
			direction : 1,
		});
	}
}

//https://youtu.be/JoEok5sLuuk?t=536