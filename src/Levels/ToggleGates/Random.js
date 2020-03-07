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
			if (layout.numSwitches && rng.get() < .8)
				layout.numGates = layout.numGates;
			else
				layout.numGates = Math.floor(4 + 3 * rng.get());
		}
		if (!layout.numSwitches) {
			if (rng.get() < .8)
				layout.numSwitches = layout.numGates;
			else
				layout.numSwitches = Math.floor(4 + 2 * rng.get());
		}
		if (!layout.solution) {
			layout.solution = new Array(layout.numSwitches).fill(0).map(()=>rng.get()<.3);
			layout.solution[Math.floor(layout.numSwitches*rng.get())] = true;
			layout.solution[Math.floor(layout.numSwitches*rng.get())] = true;
		}
		var corrects = layout.solution.map((a,d)=>d).filter((a,d)=>layout.solution[d]);
		var incorrects = layout.solution.map((a,d)=>d).filter((a,d)=>!layout.solution[d]);
		layout.gates = new Array(layout.numGates).fill(0).map((a, dex)=>{
			var gat = new Array(layout.numSwitches).fill(0);
			let corrLeft = Math.floor(rng.get() * (corrects.length - 1) / 2) * 2 + 1;
			if (layout.numGates == layout.numSwitches) {
				gat[dex] = 1;
				if (layout.solution[dex])
					corrLeft--;
			}
			while (corrLeft > 0) {
				let cdex = corrects[Math.floor(corrects.length*rng.get())];
				if (!gat[cdex]) {
					gat[cdex] = 1;
					corrLeft--;
				}
			}
			incorrects.forEach(idex => gat[idex] = rng.get() < .5 ? 1 : gat[idex])
			return gat;
		});
		layout.mode = "ToggleGates";
		var json = JSON.stringify(layout);
		super(layout);
		this.json = json;
		console.log(json);
	}
}