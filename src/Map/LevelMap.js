/**
* The internal way that levels are kept.
*/
class LevelMap {
	constructor (dataNode, dataEdge, filename) {
		var progstir = localStorage.getItem("BeamProgress"+filename);
		if (progstir) {
			this.progress = JSON.parse(progstir);
		} else {
			this.progress = {};
			this.saveProgress();
		}
		this.nodes = dataNode.map(dat=>new LevelSelectNode(dat, this));
		this.nodeSet = {};
		this.nodes.forEach(nod=>this.nodeSet[nod.id] = nod);
		this.edges = dataEdge.map(dat=>new LevelSelectEdge(dat, this.progress, this));
	}
	saveProgress() {
		
	}
}


class LevelMapNode extends UIObject {
	constructor(data, parent) {
		super();
		this.id = data.id;
		this.x = data.x;
		this.y = data.y;
		this.froms = [];
		this.tos = [];
		this.parent = parent;
	}
}

class LevelMapEdge extends UIObject {
	constructor(data, progress, parent) {
		super();
		this.id = data.id;
		this.progress = progress[this.id];
		this.name = lg("LevelSet-"+data.id);
		this.prev = parent.nodeSet[data.previd];
		this.next = parent.nodeSet[data.nextid];
		this.prev.tos.push(this);
		this.next.froms.push(this);
		this.levels = data.levels;
		this.detectRadius = 15;
		this.parent = parent;
	}
}

class MainLevelIterator extends LevelIterator {
	constructor(set, starting = 0) {
		super();
		this.set = set;
		this.index = starting - 1;
	}
	nextLevel(prev) {
		this.index++;
		
		if (this.index >= this.set.levels.length) {
			this.index = "";
			return new MainPrismNode(this.set, prev);
		} else {
			return new (this.set.levels[this.index])();
		}
	}
	drawBack() {
		if (this.index >= 0)
			this.drawBackText(this.index);
	}
}
