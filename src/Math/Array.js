function randomTerm(ray) {
	return ray[Math.floor(Math.random() * ray.length)];
}

function randomTermWeighted(ray, weightgen = ()=>1) {
	var weights = ray.map(oj=>Math.max(0, weightgen(oj)));
	var total = 0;
	var upto = weights.map(wuh=>total+=wuh);
	var rand = Math.random()*total;
	var dex = upto.findIndex(oj=>oj>=rand);
	return ray[dex];
}

function maxTerm(ray, criteria) {
	return ray.reduce((accum, cur) => {
		let newVal = criteria(cur);
		//console.log(cur, newVal);
		if (newVal >= accum.val)
			return {item: cur, val: newVal}
		else
			return accum;
	}, {item: ray[0], val: -Infinity}).item;
}

function newArray2d(i, j, fill = 0) {
	return new Array(i).fill(fill).map(()=>new Array(j).fill(fill));
}

function slice2d(ray) {
	return ray.map(row=>row.slice());
}

//https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
function transposeArray(array) {
	var newArray = [];
	for(var i = 0; i < array[0].length; i++){
		newArray.push([]);
	}
	for(var i = 0; i < array.length; i++){
		for(var j = 0; j < array[0].length; j++){
			newArray[j].push(array[i][j]);
		}
	}
	return newArray;
}