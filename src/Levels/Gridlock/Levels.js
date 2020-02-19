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

class LevelGridlock4 extends GridlockLevel {
	constructor() {
		super({
			width : 4,
			height : 6,
			pieces : [
				new GridlockPiece(0, 0, 2, false),
				new GridlockPiece(3, 0, 2, false),
				new GridlockPiece(0, 2, 3, true),
				new GridlockPiece(1, 3, 3, true),
			],
			direction : 1,
			position : 1,
		});
	}
}