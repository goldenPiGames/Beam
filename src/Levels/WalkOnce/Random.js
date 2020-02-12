class LevelOnceRandom extends OnceLevel {
	constructor(layout) {
		if (typeof layout == "number")
			layout = {entranceSide : layout}
		if (!layout)
			layout = {};
		if (layout.entranceSide == undefined) {
			layout.entranceSide = Math.floor(Math.random()*4);
		}
		if (layout.exitSide == undefined) {
			layout.exitSide = Math.floor(Math.random()*4);
			if (layout.exitSide == layout.entranceSide)
				layout.exitSide = (layout.entranceSide + 2) % 4;
		}
		if (!layout.width) {
			layout.width = Math.floor(6 + 3 * Math.random());
		}
		if (!layout.height) {
			layout.height = Math.floor(4 + 3 * Math.random());
		}
		if (layout.entrancePosition == undefined) {
			layout.entrancePosition = Math.floor(Math.random()*(layout.entranceSide%2?layout.height:layout.width));
		}
		if (layout.exitPosition == undefined) {
			layout.exitPosition = Math.floor(Math.random()*(layout.exitSide%2?layout.height:layout.width));
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
		console.log(JSON.stringify(layout));
		super(layout);
	}
}