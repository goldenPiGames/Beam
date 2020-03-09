class LevelMazeRandom extends MazeLevel {
	constructor(layout) {
		if (!layout)
			layout = {};
		if (layout.entranceSide == undefined) {
			layout.entranceSide = directionRandom(true);
		}
		if (layout.exitSide == undefined) {
			layout.exitSide = directionRandom(true);
			if (layout.exitSide == layout.entranceSide)
				layout.exitSide = directionOpposite(layout.entranceSide);
		}
		if (!layout.width) {
			layout.width = Math.floor(8 + 5 * rng.get());
		}
		if (!layout.height) {
			layout.height = Math.floor(6 + 4 * rng.get());
		}
		if (layout.entrancePosition == undefined) {
			layout.entrancePosition = Math.floor(rng.get()*(layout.entranceSide%2?layout.height:layout.width));
		}
		if (layout.exitPosition == undefined) {
			layout.exitPosition = Math.floor(rng.get()*(layout.exitSide%2?layout.height:layout.width));
		}
		var pathgen = new RandomPathGenerator(layout);
		//console.log(pathgen);
		pathgen.dPath();
		var path = pathgen.getPath();
		console.log(path);
		layout.gridTo = newArray2d(layout.width, layout.height, 9);
		for (var i = 0; i < path.length; i++) {
			layout.gridTo[path[i].x][path[i].y] = typeof path[i].d == "number" ? path[i].d : 8;
		}
		for (var i = 0; i < layout.gridTo.length; i++) {
			for (var j = 0; j < layout.gridTo[i].length; j++) {
				if (layout.gridTo[i][j] == 9) {
					let dir = directionRandom(true);
					let tries = 0;
					while (i == 0 && dir == LEFT || i == layout.gridTo.length-1 && dir == RIGHT || j == 0 && dir == UP || j == layout.gridTo[0].length-1 && dir == DOWN || tries < 20 && layout.gridTo[i+directionDX(dir)][j+directionDY(dir)] == directionOpposite(dir)) {
						tries++;
						dir = directionRandom(true);
					}
					if (tries >= 20)
						dir = 8;
					layout.gridTo[i][j] = dir;
				}
			}
		}
		//TODO make final check to make sure there are no separate areas
		layout.mode = "Maze";
		var json = JSON.stringify(layout);
		super(layout);
		this.json = json;
		console.log(json);
	}
}