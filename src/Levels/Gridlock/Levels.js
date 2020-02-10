class LevelGridlock1 extends GridlockLevel {
	constructor() {
		super({
			width : 1,
			height : 4,
			pieces : [
				new GridlockPiece(0, 0, 2, false),
			],
			direction : 1,
			position : 1,
		});
	}
}

class LevelGridlock2 extends GridlockLevel {
	constructor() {
		super({
			width : 3,
			height : 4,
			pieces : [
				new GridlockPiece(2, 0, 2, false),
				new GridlockPiece(1, 2, 2, true),
			],
			direction : 1,
			position : 1,
		});
	}
}

class LevelGridlockFirst4 extends GridlockLevel {
	constructor() {
		super({
			width : 4,
			height : 4,
			pieces : [
				new GridlockPiece(1, 0, 2, false),
				new GridlockPiece(3, 1, 2, false),
			],
			direction : 1,
			position : 1,
		});
	}
}