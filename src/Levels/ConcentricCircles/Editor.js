const CONCENTRIC_CIRCLES_EDITOR_MIN_RINGS = 2;
const CONCENTRIC_CIRCLES_EDITOR_MAX_RINGS = 7;

class ConcentricCirclesEditor extends Editor {
	constructor(layout) {
		if (!layout) {
			layout = {
				also : [
					[1,0,0],
					[0,1,0],
					[0,0,1],],
				direction : RIGHT,
			}
		}
		layout.mode = "ConcentricCircles";
		//layout.width = layout.also.length;
		super(layout);
		this.tabIndex = 0;
		//this.tabs = new Tabs(100, HEIGHT-35, WIDTH-200, 35, [lg("MazeEditor-TabWall"), lg("MazeEditor-TabAddRow"), lg("MazeEditor-TabRemoveRow"), lg("MazeEditor-TabAddColumn"), lg("MazeEditor-TabRemoveColumn"), lg("MazeEditor-TabEntrance"), lg("MazeEditor-TabExit")], t=>this.setTab(t), ()=>this.tabIndex);
		this.redoGrid();
	}
	reconstructGridLevel() {
		this.gridLevel = new GridLevel({width:this.layout.also.length, height:this.layout.also.length}, {gap:0,margin:50});
	}
	redoGrid() {
		this.reconstructGridLevel();
		this.checks = this.layout.also.map((row, i) => row.map((cze, j) => new ConcentricCirclesEditorCheck(this.gridLevel.gridToPixX(i), this.gridLevel.gridToPixY(j), this.gridLevel.gridScale*2/5, cze, i==j)));
	}
	update() {
		this.checks.forEach(col=>col.forEach(cze=>cze.update()));
	}
	draw() {
		this.checks.forEach(col=>col.forEach(cze=>cze.draw()));
		ctx.font = "40px "+settings.font;
		ctx.fillStyle = palette.normal;
		ctx.textAlign = "center";
		ctx.textBaseline = "bottom";
		ctx.fillText(lg("ConcentricCirclesEditor-Cause"), WIDTH/2, this.gridLevel.gridToPixY(-1/2)-10);
		ctx.textAlign = "right";
		ctx.fillText(lg("ConcentricCirclesEditor-Inner"), this.gridLevel.gridToPixX(-1/2)-10, this.gridLevel.gridToPixY(-1/2)-10);
		ctx.textBaseline = "middle";
		ctx.fillText(lg("ConcentricCirclesEditor-Effect"), this.gridLevel.gridToPixX(-1/2)-10, HEIGHT/2);
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText(lg("ConcentricCirclesEditor-Outer"), this.gridLevel.gridToPixX(this.layout.also.length-1/2), this.gridLevel.gridToPixY(this.layout.also.length-1/2));
	}
	getLayout() {
		this.layout.also = this.checks.map(col=>col.map(cze=>cze.value?1:0));
		return this.layout;
	}
}
ConcentricCirclesEditor.prototype.gridName = "also";

class ConcentricCirclesEditorCheck extends UIObject {
	constructor(x, y, radius, start, locked) {
		super();
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.value = start || locked;
		this.locked = locked;
	}
	update() {
		this.updateMouse();
		if (this.hovered)
			hovered = true;
		if (this.clicked && !this.locked)
			this.value = !this.value;
	}
	draw() {
		ctx.lineWidth = BUTTON_BORDER_WIDTH;
		ctx.strokeStyle = this.locked ? palette.disabled : this.hovered ? palette.hover : palette.normal;
		ctx.fillStyle = this.value ? palette.click : palette.background;
		
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius-BUTTON_BORDER_WIDTH/2, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}
}

const EDITOR_MODE_CONCENTRIC_CIRCLES = {
	id:"ConcentricCircles",
	lName:"ConcentricCircles-Name",
	getPane:()=>{
		var objects = {};
		objects.ringsSelector = new NumberSelector(WIDTH/2, 50, 110, 110, CONCENTRIC_CIRCLES_EDITOR_MIN_RINGS, CONCENTRIC_CIRCLES_EDITOR_MAX_RINGS, 4);
		objects.ringsLabel = new LabelAbove(objects.ringsSelector, 28, lg("ConcentricCirclesEditorNew-Rings"));
		return new EditorNewPane(objects);
	},
	getEditor:pane=>{
		var layout = {};
		var rings = pane.ringsSelector.getNumber();
		layout.also = newArray2dLambda(rings, rings, (i,j)=>i==j?1:0);
		layout.direction = RIGHT;
		return new ConcentricCirclesEditor(layout);
	},
}