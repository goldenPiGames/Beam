/**
* The internal way that the level select screen is displayed.
* I'm scrapping this idea because it's a bad idea, I come to realize after working on it for four days.
*/
function continueGame() {
	var progstir = localStorage.getItem("BeamProgress");
	var map = new LevelMap(MAIN_DATA_NODES, MAIN_DATA_EDGES, "Main");
}

class LevelSelectScreen extends Screen {
	constructor() {
		super();
		this.returnButton = new BubbleButton(50, HEIGHT-50, 45, ()=>switchScreen(new MainMenu()), bubbleDrawIReturn);
		this.playButton = new BubbleButton(WIDTH-50, HEIGHT-50, 45, ()=>this.tryPlay(), bubbleDrawIPlay);
		this.hoveredEdgeLast = null;
	}
	update() {
		this.hoveredEdgeLast = this.hoveredEdge;
		this.hoveredEdge = null;
		this.nodes.forEach(n=>n.update());
		this.edges.forEach(e=>e.update());
		this.returnButton.update();
		this.playButton.update();
		if (this.hoveredEdge) {
			if (this.hoveredEdge != this.hoveredEdgeLast) {
				this.beadsHover = new LevelSelectBottomBeads(this.hoveredEdge);
			}
		} else {
			this.beadsHover = null;
		}
		if (this.beadsHover)
			this.beadsHover.update();
		else if (this.beadsSelect)
			this.beadsSelect.update();
	}
	draw() {
		this.returnButton.draw();
		this.playButton.draw();
		ctx.globalAlpha = 1;
		this.nodes.forEach(n=>n.draw());
		if (this.beadsHover)
			this.beadsHover.draw();
		else if (this.beadsSelect)
			this.beadsSelect.draw();
	}
	edgeClicked(edge) {
		this.selectedEdge = edge;
		this.beadsSelect = new LevelSelectBottomBeads(edge);
	}
	edgeHovered(edge) {
		this.hoveredEdge = edge;
		this.beadsHover = new LevelSelectBottomBeads(edge);
		
	}
	tryPlay() {
		if (this.selectedEdge) {
			levelIterator = new MainLevelIterator(this.selectedEdge, this.beadsSelect.index);
			startLevel();
			return true;
		} else
			return false;
	}
}

class LevelSelectNode extends UIObject {
	constructor(mapNode, parent) {
		super();
		this.mapNode = mapNode;
		this.id = this.mapNode.id;
		this.baseX = this.mapNode.x;
		this.baseY = this.mapNode.y;
		this.froms = [];
		this.tos = [];
		this.parent = parent;
	}
	update() {
		this.displayX = this.baseX;
		this.displayY = this.baseY;
	}
	draw() {
		this.froms.forEach(f=>f.draw());
	}
}

class LevelSelectEdge extends UIObject {
	constructor(mapEdge, parent) {
		super();
		this.mapEdge = mapEdge;
		this.id = data.id;
		this.progress = progress[this.id];
		this.name = lg("LevelSet-"+data.id);
		this.prev = parent.nodeSet[this.mapEdge.prev.id];
		this.next = parent.nodeSet[this.mapEdge.next.id];
		this.prev.tos.push(this);
		this.next.froms.push(this);
		this.levels = data.levels;
		this.detectRadius = 15;
		this.parent = parent;
	}
	intersectsMouse() {
		return distanceToSegment(mouse.x, mouse.y, this.prev.displayX, this.prev.displayY, this.next.displayX, this.next.displayY) <= this.detectRadius;
	}
	update() {
		super.update();
		if (this.clicked) {
			this.parent.edgeClicked(this);
		}
		if (this.hovered) {
			this.parent.edgeHovered(this);
		}
	}
	draw() {
		ctx.lineWidth = 4;
		ctx.strokeStyle = this.parent.selectedEdge == this ? palette.click : this.hovered ? palette.hover : palette.normal;
		ctx.beginPath();
		ctx.moveTo(this.prev.displayX, this.prev.displayY);
		ctx.lineTo(this.next.displayX, this.next.displayY);
		ctx.stroke();
	}
}

class LevelSelectBottomBeads extends UIObject {
	constructor(edge) {
		super();
		this.edge = edge;
		this.index = 0;
		this.beads = edge.levels.map((lev, dex, ray)=>new LevelSelectBottomBeadsBead(WIDTH*(.15+.7*(dex+1)/(ray.length+1)), dex, this));
	}
	update() {
		this.beads.forEach(b=>b.update());
	}
	draw() {
		ctx.globalAlpha = 1;
		ctx.lineWidth = 4;
		ctx.strokeStyle = palette.normal;
		ctx.beginPath();
		ctx.moveTo(this.beads[0].x, this.beads[0].y);
		ctx.lineTo(this.beads[this.beads.length-1].x, this.beads[this.beads.length-1].y);
		ctx.stroke();
		this.beads.forEach(b=>b.draw());
		ctx.textBaseline = "bottom";
		ctx.font = "30px "+settings.font;
		ctx.fillStyle = palette.normal;
		ctx.fillText(this.edge.name, WIDTH/2, HEIGHT-60);
	}
	beadClicked(dex) {
		this.index = dex;
	}
}

/*
* I know this is a stupid name.
*/
class LevelSelectBottomBeadsBead extends UIObject {
	constructor(x, index, parent) {
		super();
		this.x = x;
		this.y = HEIGHT-30;
		this.radius = 25;
		this.index = index;
		this.parent = parent;
	}
	update() {
		super.update();
		if (this.clicked) {
			this.parent.beadClicked(this.index);
		}
	}
	draw() {
		var color = this.parent.index == this.index ? palette.click : this.hovered ? palette.hover : palette.normal;
		ctx.strokeStyle = color;
		ctx.fillStyle = palette.background;
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.fillStyle = color;
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
		ctx.font = (this.radius*3/2)+"px sans-serif";
		ctx.fillText(this.index, this.x, this.y);
	}
}

class MainPrismNode extends Level {
	constructor(fromSet, fromLevel) {//TODO Like half of this only works for things coming in from the left, so I'll need to change some things if I have it come in from other directions
		super();
		this.fromEdge = fromSet;
		this.node = this.fromEdge.next;
		this.fromLevel = fromLevel;
		this.prismX = WIDTH/2;
		this.prismY = HEIGHT/2;
		this.beamEntranceSide = directionOpposite(this.fromLevel.beamExitSide);
		this.beamEntrancePosition = HEIGHT/2;
		this.toEdges = this.node.tos.slice().sort((a,b)=>a.next.baseY-b.next.baseY);
		this.toYs = this.toEdges.map((oj, dex, ray) => HEIGHT*(dex+1)/(ray.length+1));
		this.nextButtons = this.toEdges.map((egg, dex) =>new Button(WIDTH-200, this.toYs[dex]-20, 200, 40, egg.name, ()=>this.nextClicked(dex)));
		this.beamExitPaths = this.nextButtons.map((butt, dex, ray) => {
				var paf = new Path2D();
				paf.moveTo(this.prismX, this.prismY);
				paf.bezierCurveTo(this.prismX + 30, this.prismY - (1-(dex+1)/(ray.length+1)*2)*HEIGHT/3, butt.x - 150, butt.y+butt.height/2, butt.x, butt.y+butt.height/2);
				paf.lineTo(butt.x+butt.width, butt.y+butt.height/2);
				return paf;
			});
		this.prismTheta = 0;
		this.prismRadius = 0;
		this.outAlpha = 1.0;//eh
		this.calcBeamEnds();
		this.beamEnterPath = new Path2D();
		this.beamEnterPath.moveTo(this.beamStartX, this.beamStartY);
		this.beamEnterPath.lineTo(this.prismX, this.prismY);
	}
	update() {
		this.outAlpha = Math.min(1, this.outAlpha+.05);
		this.prismTheta -= .06;
		this.prismRadius = 60*this.outAlpha;
		this.nextButtons.forEach(b=>b.update());
	}
	draw() {
		ctx.globalAlpha = 1;
		drawBeam(this.beamEnterPath);
		ctx.globalAlpha = this.outAlpha;
		this.beamExitPaths.forEach(paf=>drawBeam(paf));
		this.nextButtons.forEach(b=>b.draw());
		//draw the central prism
		/*ctx.globalAlpha = 1;
		ctx.lineWidth = 4;
		ctx.strokeStyle = palette.normal;
		ctx.fillStyle = palette.background;
		ctx.moveTo(this.prismX + this.prismRadius * Math.cos(this.prismTheta), this.prismY + this.prismRadius * Math.sin(this.prismTheta));
		for (var i = 1; i <= 3; i++)
			ctx.lineTo(this.prismX + this.prismRadius * Math.cos(this.prismTheta + Math.PI*i/2), this.prismY + this.prismRadius * Math.sin(this.prismTheta + Math.PI*i/2));
		ctx.closePath();
		ctx.fill();
		ctx.stroke();*/
	}
	nextClicked(dex) {
		this.beamExitSide = RIGHT;
		this.beamExitPosition = this.nextButtons[dex].y + this.nextButtons[dex].height/2
		levelIterator = new MainLevelIterator(this.toEdges[dex]);
		nextLevel();
	}
}