class LevelGridlockRandom extends GridlockLevel {
	constructor(layout) {
		if (!layout)
			layout = {};
		if (typeof layout.direction != "number")
			layout.direction = RIGHT;
		if (!layout.width) {
			layout.width = Math.floor(6 + 2 * rng.get());
		}
		if (!layout.height) {
			layout.height = Math.floor(6 + 2 * rng.get());
		}
		if (!layout.position)
			layout.position = Math.floor((layout.direction%2 ? layout.height : layout.width)/2 - 1.2  + rng.get() * 2.4);
		
		var slider = new GridlockGenSlider(layout.width, layout.height, []);
		if (layout.direction%2) {//horizontal
			slider.addPiece({
					x:Math.floor(rng.get()*(layout.width-1)),
					y:layout.position,
					horiz:true,
					len:2,
					gap:true,
				});
		console.log(JSON.parse(JSON.stringify(slider.pieces)));
			slider.setForbiddenArea({
					x:0,
					y:layout.position,
					width:layout.width,
					height:1,
				});
		} else {//vertical
			slider.addPiece({
					x:layout.position,
					y:Math.floor(rng.get()*(layout.height-1)),
					horiz:true,
					len:2,
					gap:true,
				});
			slider.setForbiddenArea({
					x:layout.position,
					y:0,
					width:1,
					height:layout.height,
				});
		}
		console.log(JSON.parse(JSON.stringify(slider.pieces)));
		var downs = 0;
		while (downs < 16) {
			var pis = {
				horiz:rng.get()<(layout.direction%2?.3:.7),
				len:Math.floor(2+1.7*rng.get())
			};
			if (pis.horiz) {
				pis.x = Math.floor(rng.get()*(layout.width-pis.len+1));
				pis.y = Math.floor(rng.get()*layout.height);
			} else {
				pis.x = Math.floor(rng.get()*layout.width);
				pis.y = Math.floor(rng.get()*(layout.height-pis.len+1));
			}
			if (slider.addPiece(pis))
				downs = 0;
			else
				downs++;
		}
		slider.removeForbiddenArea();
		var moves = 0;
		console.log(JSON.parse(JSON.stringify(slider.pieces)));
		while (moves < 127) {
			slider.moveOne();
			moves++;
			//console.log(moves);
		}
		console.log(JSON.parse(JSON.stringify(slider.pieces)));
		layout.pieces = slider.pieces;
		layout.mode = "Gridlock";
		var json = JSON.stringify(layout);
		super(layout);
		this.json = json;
		console.log(json);
	}
}

class GridlockGenSlider {
	constructor(width, height, pieces) {
		this.width = width;
		this.height = height;
		this.pieces = pieces;
		
	}
	addPiece(data) {
		data.width = data.horiz ? data.len : 1;
		data.height = !data.horiz ? data.len : 1;
		if (!this.isPlaceOccupied(data)) {
			this.pieces.push(data);
			return true;
		} else {
			return false;
		}
	}
	moveOne() {
		var moves = 0;
		var pis = randomTerm(this.pieces);
		console.log(pis);
		var dir = pis.horiz + Math.floor(rng.get()*2)*2;
		while (!this.isPlaceOccupied(pis, pis.x+directionDX(dir), pis.y+directionDY(dir)) && moves < 10) {
			pis.x += directionDX(dir);
			pis.y += directionDY(dir);
			moves++;
			//console.log(moves);
		}
	}
	isSpaceOccupied(i, j) {
		return this.pieces.find(pis => i >= pis.x && i < pis.x + pis.width && j >= pis.y && j < pis.y + pis.height);
	}
	isPlaceOccupied(com, x = com.x, y = com.y, width = com.width, height = com.height) {
		//console.log(com, x, y, width, height);
		if (x < 0 || x + width > this.width || y < 0 || y + height > this.height)
			return "wall";
		return this.pieces.find(pis => pis != com && x + width > pis.x && x < pis.x + pis.width && y + height > pis.y && y < pis.y + pis.height);
	}
	setForbiddenArea(data) {
		data.forbidden = true;
		this.pieces.push(data);
	}
	removeForbiddenArea() {
		this.pieces = this.pieces.filter(pis=>!pis.forbidden);
	}
}