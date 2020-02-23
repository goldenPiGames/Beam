//I made most of this at around 3AM on February 23 2020.
class LevelSameRandom extends SameLevel {
	constructor(layout) {
		if (!layout)
			layout = {};
		if (typeof layout.direction != "number")
			layout.direction = RIGHT;
		if (!layout.width) {
			layout.width = Math.floor(5 + 4 * rng.get());
		}
		if (!layout.height) {
			layout.height = Math.floor(5 + 4 * rng.get());
		}
		if (!layout.numColors) {
			layout.numColors = Math.floor(3 + 2 * rng.get());
		}
		var cycles = 0;
		var downs = 0;
		var downs2 = 0;
		var done = false;
		var gridt = [newArray2d(layout.width, layout.height, 0)];
		while (!done) {
			cycles++;
			if (cycles >= 6969) {
				console.log(gridt);
				throw "no";
			}
			var nextep = new SameGameGenStepper(gridt[gridt.length-1], layout.numColors).getNextStep();
			if (nextep) {
				gridt.push(nextep);
				downs = 0;
			} else {
				downs++;
				if (downs >= 12 && gridt.length > 1) {
					downs = 0;
					gridt.splice(-1);
					downs2++;
					if (downs2 >= 6) {
						downs2 = 0;
						gridt.splice(1);
					}
				}
			}
			if (gridt[gridt.length-1].reduce((a, col)=> a && col[col.length-1], true))
				done = true;
		}
		console.log(gridt);
		//Grid is initially generated one-indexed and y+up
		layout.grid = gridt[gridt.length-1].map(col=>col.map(b=>b-1).reverse());
		super(layout);
	}
}

class SameGameGenStepper {
	constructor(lastep, numColors) {
		this.lastep = slice2d(lastep);
		this.curstep = slice2d(this.lastep);
		this.numColors = numColors;
		this.heights = this.lastep.map(col=>col.filter(b=>b).length);
		this.totalAfter = this.heights.reduce((a,b)=>a+b);
		this.totalAll = this.lastep.length*this.lastep[0].length;
		this.totalLeft = this.totalAll - this.totalAfter;
	}
	getNextStep() {
		//if (this.totalLeft < 2)
		//	return false;
		this.color = Math.floor(Math.random()*this.numColors+1);
		var startX, startY;
		var downs = 0;
		this.group = [];
		while (this.group.length <= 0) {
			var startX = Math.floor(Math.random()*this.lastep.length);
			var startY = Math.floor(Math.random()*(this.heights[startX]+1));
			if (this.insertIfPossible(startX, startY, true)) {
				
			} else {
				downs++;
				if (downs > 16)
					return false;
			}
		}
		downs = 0;
		var maxSize = Math.max(2, 2+rng.get()*this.totalAll*2.5/this.totalLeft)
		//console.log(this)
		//console.log(downs < 16, this.group, this.group.length, this.group.length < maxSize, maxSize)
		while (downs < 16 && this.group.length < maxSize) {
			var from = randomTerm(this.group);
			var direct = directionRandom(true);
			//console.log(from, direct);
			if (this.insertIfPossible(from.x+directionDX(direct), from.y+directionDY(direct))) {
				downs = 0;
			} else {
				downs++;
			}
		}
		//console.log(this.group)
		if (this.group.length < 2)
			return false;
		//makes sure there aren't any lonesome blank spaces at the top
		var lastOpen = false;
		var lastLone = false;
		for (var i = 0; i < this.curstep.length; i++) {
			if (lastLone && this.curstep[this.curstep.length-1])
				return false;
			lastLone = !this.curstep[i][this.curstep[i].length-1] && this.curstep[i][this.curstep[i].length-2] && !lastOpen;
			lastOpen = !this.curstep[i][this.curstep[i].length-1];
		}
		if (lastLone)
			return false;
		let toret = this.curstep.map(col=>col.map(b=>b==-1?this.color:b));
		toret.added = this.group;
		return toret;
	}
	insertIfPossible(x, y, first) {
		if (x < 0 || x >= this.curstep.length || y < 0 || y >= this.curstep[x].length)
			return false;
		if (this.heights[x] >= this.curstep[x].length)
			return false;
		if (y > this.heights[x])
			return false;
		var hypoth = slice2d(this.curstep);
		hypoth[x].splice(y, 0, -1);
		hypoth[x].pop();
		for (var i = 0; i < hypoth.length; i++) {
			for (var j = 0; j < hypoth[i].length; j++) {
				if (hypoth[i][j] == -1) {
					//make sure no current group members are next to other blocks of the same color
					if (i > 0 && hypoth[i-1][j] == this.color || i < hypoth.length-1 && hypoth[i+1][j] == this.color || j > 0 && hypoth[i][j-1] == this.color || j < hypoth[i].length-1 && hypoth[i][j+1] == this.color)
						return false;
					//make sure it doesn't push any members out of the group
					if (!(first || i > 0 && hypoth[i-1][j] == -1 || i < hypoth.length-1 && hypoth[i+1][j] == -1 || j > 0 && hypoth[i][j-1] == -1 || j < hypoth[i].length-1 && hypoth[i][j+1] == -1))
						return false;
				}
			}
		}
		this.curstep = hypoth;
		this.refreshGroup();
		return true;
	}
	refreshGroup() {
		this.group = [];
		for (var i = 0; i < this.curstep.length; i++) {
			for (var j = 0; j < this.curstep[i].length; j++) {
				if (this.curstep[i][j] == -1) {
					this.group.push({x:i,y:j});
				}
			}
		}
		this.heights = this.curstep.map(col=>col.filter(b=>b).length);
	}
}

