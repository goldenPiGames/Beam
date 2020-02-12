class LevelToggleRandom extends ToggleLevel {
	constructor(layout) {
		if (!layout)
			layout = {};
		if (typeof layout.direction != "number")
			layout.direction = RIGHT;
		if (layout.solution) {
			layout.numSwitches = solution.length;
		}
		if (!layout.numGates) {
			if (layout.numSwitches && Math.random() < .8)
				layout.numGates = layout.numGates;
			else
				layout.numGates = Math.floor(4 + 3 * Math.random());
		}
		if (!layout.numSwitches) {
			if (Math.random() < .8)
				layout.numSwitches = layout.numGates;
			else
				layout.numSwitches = Math.floor(4 + 2 * Math.random());
		}
		if (!layout.solution) {
			layout.solution = new Array(layout.numSwitches).fill(0).map(()=>Math.random()<.3);
			layout.solution[Math.floor(layout.numSwitches*Math.random())] = true;
			layout.solution[Math.floor(layout.numSwitches*Math.random())] = true;
		}
		var corrects = layout.solution.map((a,d)=>d).filter((a,d)=>layout.solution[d]);
		var incorrects = layout.solution.map((a,d)=>d).filter((a,d)=>!layout.solution[d]);
		layout.gates = new Array(layout.numGates).fill(0).map((a, dex)=>{
			var gat = new Array(layout.numSwitches).fill(0);
			let corrLeft = Math.floor(Math.random() * (corrects.length - 1) / 2) * 2 + 1;
			if (layout.numGates == layout.numSwitches) {
				gat[dex] = 1;
				if (layout.solution[dex])
					corrLeft--;
			}
			while (corrLeft > 0) {
				let cdex = corrects[Math.floor(corrects.length*Math.random())];
				if (!gat[cdex]) {
					gat[cdex] = 1;
					corrLeft--;
				}
			}
			incorrects.forEach(idex => gat[idex] = Math.random() < .5 ? 1 : gat[idex])
			return gat;
		});
		console.log(layout);
		super(layout);
	}
}