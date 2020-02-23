
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

function asPercent(num, precision) {
	return round(num*100, precision)+"%";
}

function asInfuriatingPercent(num) {
	if (num >= 1)
		return "100%"
	if (num <= .01)
		return "00%";
	var tens = Math.floor(num*10);
	var oned = (num*100)%10;
	var ones;
	if (oned < 2)
		ones = 1;
	else if (oned < 5)
		ones = 3;
	else if (oned < 8)
		ones = 7;
	else
		ones = 9;
	return tens + "" + ones + "%";
}

function fillLeft(str, length, filler="0") {
	str = "" + str;
	while(str.length < length) {
		str = filler+str;
	}
	return str;
}


function differenceBetweenColors(c1, c2) {
	return Math.abs(parseInt(c1.substring(1, 3), 16) - parseInt(c2.substring(1, 3), 16)) + Math.abs(parseInt(c1.substring(3, 5), 16) - parseInt(c2.substring(3, 5), 16)) + Math.abs(parseInt(c1.substring(5, 7), 16) - parseInt(c2.substring(5, 7), 16))
}
