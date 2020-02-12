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

function randomN(max = 1) {
	return -max + 2 * max * Math.random();
}

function round(num, precision) {
	var mult = Math.pow(10, precision);
	return Math.round(num*mult)/mult;
}

function PRound(num, seed) {
	var whole = Math.floor(num);
	var partial = num-whole;
	if (seed == undefined)
		return whole + ((Math.random() < partial) ? 1 : 0);
	return whole + ((seed < partial) ? 1 : 0);
}

function raffle(weight, item) {
	var args = Array.prototype.slice.call(arguments);
	var weights = [];
	var totalWeight = 0;
	var items = [];
	while (args.length > 0) {
		let newWeight = args.shift();
		totalWeight += newWeight;
		weights.push(newWeight);
		items.push(args.shift());
	}
	var chosen = totalWeight * Math.random();
	var i = 0;
	var soFar = 0;
	while (i < weights.length) {
		soFar += weights[i];
		if (chosen < soFar)
			return items[i];
		i++;
	}
	return null;
}


function asPercent(num, precision) {
	return round(num*100, precision)+"%";
}

function fillLeft(str, length, filler="0") {
	str = "" + str;
	while(str.length < length) {
		str = filler+str;
	}
	return str;
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

function differenceBetweenColors(c1, c2) {
	return Math.abs(parseInt(c1.substring(1, 3), 16) - parseInt(c2.substring(1, 3), 16)) + Math.abs(parseInt(c1.substring(3, 5), 16) - parseInt(c2.substring(3, 5), 16)) + Math.abs(parseInt(c1.substring(5, 7), 16) - parseInt(c2.substring(5, 7), 16))
}
