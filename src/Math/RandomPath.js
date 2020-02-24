class RandomPathGenerator extends GridLevel {
	constructor(layout) {
		super(layout);
		this.constructBasicPath();
	}
	constructBasicPath() {
		this.path = [{x:this.gridStartX,y:this.gridStartY}];
		this.retag();
		var cycles = 0;
		var downs = 0;
		while (!this.isAtEnd()) {
			cycles++;
			if (cycles >= 696969) {
				console.log(this);
				throw "no";
			}
			if (this.tryExtendPath()) {
				downs = 0;
			} else {
				downs++;
			}
			if (downs >=4) {
				this.rewind(1);
			}
			if (cycles % 3 == 0 && !this.isClearToExit()) {
				this.rewind(3);
			}
		}
	}
	retag() {
		this.taggedGrid = new Array(this.gridWidth).fill(0).map(()=>new Array(this.gridHeight).fill(0));
		this.path.forEach(oj=>this.taggedGrid[oj.x][oj.y]=1);
	}
	tryExtendPath() {
		var d = Math.floor(rng.get()*4);
		var now = this.path[this.path.length-1];
		var then = {x:now.x+directionDX(d), y:now.y+directionDY(d)};
		if (!this.isOpen(then.x, then.y))
			return false;
		this.path.push(then);
		this.taggedGrid[then.x][then.y] = 1;
		return true;
	}
	rewind(amount) {
		this.path.splice(Math.max(1, this.path.length-amount));
		this.retag();
	}
	isInBounds(x, y) {
		return !(x < 0 || y < 0 || x >= this.gridWidth || y >= this.gridHeight);
	}
	isOpen(x, y) {
		return this.isInBounds(x, y) && !this.taggedGrid[x][y]
	}
	/**
	* Uses the right-hand rule to determine whether it is possible for the path to continue to the end.
	*/
	isClearToExit() {
		var head = this.path[this.path.length-1];
		var x, y, d;
		if (this.isOpen(head.x+1, head.y)) {
			x = head.x+1;
			y = head.y;
			d = DOWN;
		} else if (this.isOpen(head.x, head.y+1)) {
			x = head.x;
			y = head.y+1;
			d = LEFT;
		} else if (this.isOpen(head.x-1, head.y)) {
			x = head.x-1;
			y = head.y;
			d = UP;
		} else if (this.isOpen(head.x, head.y-1)) {
			x = head.x;
			y = head.y-1;
			d = RIGHT;
		} else {
			return false;
		}
		var bot = new PathGenRightHandCrawler(this, x, y, d);
		return bot.determine();
	}
	isAtEnd() {
		var last = this.path[this.path.length-1];
		return last.x == this.gridEndX && last.y == this.gridEndY;
	}
	getPath() {
		return this.path;
	}
	getPathPlusOut() {
		return [{x:this.gridStartOutX, y:this.gridStartOutY}, ...this.path, {x:this.gridEndOutX, y:this.gridEndOutY}];
	}
	dPath() {
		for (var i = 0; i < this.path.length-1; i++) {
			this.path[i].d = directionFromXY(this.path[i+1].x - this.path[i].x, this.path[i+1].y - this.path[i].y);
		}
	}
	fleshOut() {
		var downs = 0;
		while (downs < 16) {
			if (this.tryFlesh())
				downs = 0;
			else
				downs++;
		}
	}
	tryFlesh() {
		if (this.path.length <= 1)
			return false;
		var i = Math.floor(rng.get()*(this.path.length-1));
		var o1 = this.path[i];
		var o2 = this.path[i+1];
		//console.log(i);
		//console.log(this.path);
		var d = directionFromXY(o2.x-o1.x, o2.y-o1.y);
		var dr = rng.get() < .5 ? directionLeft(d) : directionRight(d);
		var n1 = {x:o1.x+directionDX(dr), y:o1.y+directionDY(dr)};
		if (!this.isOpen(n1.x, n1.y))
			return false;
		var n2 = {x:o2.x+directionDX(dr), y:o2.y+directionDY(dr)};
		if (!this.isOpen(n2.x, n2.y))
			return false;
		//console.log("adding", n1, n2)
		this.path.splice(i+1, 0, n1, n2);
		this.taggedGrid[n1.x][n1.y] = 1;
		this.taggedGrid[n2.x][n2.y] = 1;
		return true;
	}
}

class PathGenRightHandCrawler {
	constructor(parent, x, y, d) {
		this.parent = parent;
		this.x = x;
		this.y = y;
		this.d = d;
		this.xInit = x;
		this.yInit = y;
		this.dInit = d;
	}
	determine() {
		var crash = 0;
		while (crash < 1000) {
			if (this.x == this.parent.gridEndX && this.y == this.parent.gridEndY)
				return true;
			this.d = directionRight(this.d);
			var stuck = 0;
			while (!this.parent.isOpen(this.x+directionDX(this.d), this.y+directionDY(this.d))) {
				if (stuck >= 4)
					return false;
				stuck++;
				this.d = directionLeft(this.d);
			}
			this.x += directionDX(this.d);
			this.y += directionDY(this.d);
			//yes, this can technically lead to some false negatives involving one-way passages but i honestly don't feel like fixing it
			if (this.x == this.xInit && this.y == this.yInit)
				return false;
		}
		return false;
	}
}