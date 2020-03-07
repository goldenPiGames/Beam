class LevelOnceRandom extends OnceLevel {
	constructor(layout) {
		if (typeof layout == "number")
			layout = {entranceSide : layout}
		if (!layout)
			layout = {};
		if (layout.entranceSide == undefined) {
			layout.entranceSide = Math.floor(rng.get()*4);
		}
		if (layout.exitSide == undefined) {
			layout.exitSide = Math.floor(rng.get()*4);
			if (layout.exitSide == layout.entranceSide)
				layout.exitSide = (layout.entranceSide + 2) % 4;
		}
		if (!layout.width) {
			layout.width = Math.floor(6 + 3 * rng.get());
		}
		if (!layout.height) {
			layout.height = Math.floor(4 + 3 * rng.get());
		}
		if (layout.entrancePosition == undefined) {
			layout.entrancePosition = Math.floor(rng.get()*(layout.entranceSide%2?layout.height:layout.width));
		}
		if (layout.exitPosition == undefined) {
			layout.exitPosition = Math.floor(rng.get()*(layout.exitSide%2?layout.height:layout.width));
		}
		var pathgen = new RandomPathGenerator(layout);
		//console.log(pathgen);
		pathgen.fleshOut();
		var path = pathgen.getPath();
		console.log(path);
		layout.grid = new Array(layout.width).fill(-1).map(()=>new Array(layout.height).fill(0));
		for (var i = 0; i < path.length; i++) {
			layout.grid[path[i].x][path[i].y] = 1;
		}
		layout.mode = "WalkOnce";
		var json = JSON.stringify(layout);
		super(layout);
		this.json = json;
		console.log(json);
	}
}