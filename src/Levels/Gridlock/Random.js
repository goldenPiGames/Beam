class LevelGridlockRandom extends GridlockLevel {
	constructor(layout) {
		if (!layout)
			layout = {};
		if (typeof layout.direction != "number")
			layout.direction = RIGHT;
		if (!layout.width) {
			layout.width = Math.floor(5 + 2 * rng.get());
		}
		if (!layout.height) {
			layout.height = Math.floor(5 + 2 * rng.get());
		}
		if (!layout.position)
			layout.position = Math.floor(rng.get() * (layout.direction%2 ? layout.height : layout.width));
		layout.mode = "Gridlock";
		var json = JSON.stringify(layout);
		super(layout);
		this.json = json;
		console.log(json);
	}
}