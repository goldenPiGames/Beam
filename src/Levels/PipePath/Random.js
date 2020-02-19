class LevelPipeRandom extends PipeLevel {
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
		var path = pathgen.getPathPlusOut();
		console.log(path);
		layout.pipeGrid = new Array(layout.width).fill(-1).map(()=>new Array(layout.height).fill(-1));
		for (var i = 1; i < path.length - 1; i++) {
			layout.pipeGrid[path[i].x][path[i].y] = (path[i-1].x == path[i+1].x || path[i-1].y == path[i+1].y) ? 0 : 1;
		}
		for (var i = 0; i < layout.pipeGrid.length; i++) {
			for (var j = 0; j < layout.pipeGrid[i].length; j++) {
				if (layout.pipeGrid[i][j] == -1)
					layout.pipeGrid[i][j] = rng.get() < .4 ? 0 : 1;
			}
		}
		console.log(JSON.stringify(layout));
		super(layout);
		this.index = layout.index;
	}
}