const TOGGLE_GATES_EDITOR_MIN_GATES = 2;
const TOGGLE_GATES_EDITOR_MAX_GATES = 12;
const TOGGLE_GATES_EDITOR_MIN_SWITCHES = 2;
const TOGGLE_GATES_EDITOR_MAX_SWITCHES = 12;

class ToggleGatesEditor extends Editor {
	constructor(layout) {
		if (!layout) {
			layout = {
				gates : [
					[1,0,0],
					[0,1,0],
					[0,0,1],],
				direction : RIGHT,
			}
		}
		layout.mode = "ToggleGates";
		super(layout);
		this.tabIndex = 0;
		//this.tabs = new Tabs(100, HEIGHT-35, WIDTH-200, 35, [lg("MazeEditor-TabWall"), lg("MazeEditor-TabAddRow"), lg("MazeEditor-TabRemoveRow"), lg("MazeEditor-TabAddColumn"), lg("MazeEditor-TabRemoveColumn"), lg("MazeEditor-TabEntrance"), lg("MazeEditor-TabExit")], t=>this.setTab(t), ()=>this.tabIndex);
		this.redoGrid();
	}
	reconstructGridLevel() {
		this.gridLevel = new GridLevel({width:this.layout.gates.length, height:this.layout.gates[0].length}, {gap:0,margin:50});
	}
	redoGrid() {
		this.reconstructGridLevel();
		this.checks = this.layout.gates.map((row, i) => row.map((cze, j) => new ToggleGatesEditorCheck(this.gridLevel.gridToPixX(i), this.gridLevel.gridToPixY(j), this.gridLevel.gridScale*.45, cze, i==j)));
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
		ctx.fillText(lg("ToggleGatesEditor-Gates"), WIDTH/2, this.gridLevel.gridToPixY(-1/2)-10);
		ctx.textAlign = "right";
		//ctx.fillText(lg("ToggleGatesEditor-Inner"), this.gridLevel.gridToPixX(-1/2)-10, this.gridLevel.gridToPixY(-1/2)-10);
		ctx.textBaseline = "middle";
		ctx.fillText(lg("ToggleGatesEditor-Switches"), this.gridLevel.gridToPixX(-1/2)-10, HEIGHT/2);
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		//ctx.fillText(lg("ToggleGatesEditor-Outer"), this.gridLevel.gridToPixX(this.layout.gates.length-1/2), this.gridLevel.gridToPixY(this.layout.gates.length-1/2));
	}
	getLayout() {
		this.layout.gates = this.checks.map(col=>col.map(cze=>cze.value?1:0));
		return this.layout;
	}
}
ToggleGatesEditor.prototype.gridName = "gates";

class ToggleGatesEditorCheck extends UIObject {
	constructor(x, y, radius, start) {
		super();
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.value = start;
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

const EDITOR_MODE_TOGGLE_GATES = {
	id:"ToggleGates",
	lName:"ToggleGates-Name",
	getPane:()=>{
		var objects = {};
		objects.gatesSelector = new NumberSelector(WIDTH/2, 50, 110, 110, TOGGLE_GATES_EDITOR_MIN_GATES, TOGGLE_GATES_EDITOR_MAX_GATES, 5);
		objects.gatesLabel = new LabelAbove(objects.gatesSelector, 28, lg("ToggleGatesEditorNew-Gates"));
		objects.switchesSelector = new NumberSelector(WIDTH/2+130, 50, 110, 110, TOGGLE_GATES_EDITOR_MIN_SWITCHES, TOGGLE_GATES_EDITOR_MAX_SWITCHES, 5);
		objects.switchesLabel = new LabelAbove(objects.switchesSelector, 28, lg("ToggleGatesEditorNew-Switches"));
		return new EditorNewPane(objects);
	},
	getEditor:pane=>{
		var layout = {};
		layout.direction = RIGHT;
		var gates = pane.gatesSelector.getNumber();
		var switches = pane.switchesSelector.getNumber();
		layout.gates = newArray2d(gates, switches, 0);
		layout.direction = RIGHT;
		return new ToggleGatesEditor(layout);
	},
}