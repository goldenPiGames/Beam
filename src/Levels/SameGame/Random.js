class LevelSameRandom extends SameLevel {
	constructor(layout) {
		if (typeof layout == "number")
			layout = {entranceSide : layout}
	}
}