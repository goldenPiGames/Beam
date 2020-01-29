//https://jsfiddle.net/L3rfzy05/

function force_ushort(x) {
	return x & 0xFFFF;
}
function force_uchar(x) {
	return x & 0xFF;
}
var sm64rng = {
	rng : 0,
	rng_function : function(input) {
		if (input == undefined)
			input = this.rng;
		if (input == 0x560A) {
			input = 0;
		}
		var S0 = force_ushort(force_uchar(input) << 8);
		S0 = S0 ^ input;
		input = force_ushort((S0 & 0xFF) << 8) | force_ushort((S0 & 0xFF00) >> 8);
		S0 = force_ushort(force_ushort(force_uchar(S0) << 1) ^ force_ushort(input));
		// vvv wtf isn't S1 declared as 'unsigned short'? assuming it doesn't matter...
		var S1 = force_ushort(force_ushort(S0 >> 1) ^ 0xFF80);
		if ((S0 & 1) == 0) {
		if (S1 == 0xAA55) {
			input = 0;
		} else {
			input = force_ushort(S1 ^ 0x1FF4);
		}
		} else {
			input = force_ushort(S1 ^ 0x8180);
		}
		// doing this here; where this is done omitted from the video, but assumedly in caller
		this.rng = force_ushort(input);
		//console.log(this.rng)
		return this.rng;
	},
}