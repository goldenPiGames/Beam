const EDITOR_MODE_WALK_ONCE = {
	id:"PipePath",
	lName:"PipePath-Name",
	getPane:()=>{
		var objects = {};
		objects.widthSelector = new NumberSelector(WIDTH/2, 50, 110, 110, PIPE_PATH_EDITOR_MIN_WIDTH, PIPE_PATH_EDITOR_MAX_WIDTH, 6);
		objects.widthLabel = new LabelAbove(objects.widthSelector, 28, lg("PipePathEditorNew-Width"));
		objects.heightSelector = new NumberSelector(WIDTH/2+130, 50, 110, 110, PIPE_PATH_EDITOR_MIN_HEIGHT, PIPE_PATH_EDITOR_MAX_HEIGHT, 6);
		objects.heightLabel = new LabelAbove(objects.heightSelector, 28, lg("PipePathEditorNew-Height"));
		objects.fillRadio = new RadioButtons(WIDTH/2, 200, 140, 30, [lg("PipePathEditorNew-Straight"), lg("PipePathEditorNew-Curved"), lg("PipePathEditorNew-Random")], doNothing, 0);
		objects.fillRadio.setIndex(0);
		return new EditorNewPane(objects);
	},
	getEditor:pane=>{
		var layout = {};
		layout.width = pane.widthSelector.getNumber();
		layout.height = pane.heightSelector.getNumber();
		layout.entranceSide = LEFT;
		layout.entrancePosition = Math.floor(layout.height/2);
		layout.exitSide = RIGHT;
		layout.exitPosition = Math.floor(layout.height/2);
		switch (pane.fillRadio.index) {
			case 0: layout.pipeGrid = newArray2d(layout.width, layout.height, 0); break;
			case 1: layout.pipeGrid = newArray2d(layout.width, layout.height, 1); break;
			case 2: layout.pipeGrid = newArray2dLambda(layout.width, layout.height, (i, j)=>Math.random()<.6?1:0); break;
		}
		return new PipePathEditor(layout);
	},
}