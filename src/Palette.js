const PALETTE_NAMES = ["background", "normal", "beam", "hover", "click", "disabled", "samegame0", "samegame1", "samegame2", "samegame3", "samegame4", "samegame5", "samegame6", "samegame7"];

var palette = {
	
}

function loadPaletteFromSettings() {
	PALETTE_NAMES.forEach(nom => palette[nom] = settings[nom+"_color"]);
}

function getColorDescription(color) {
	var r = parseInt(color.substring(1, 3), 16);
	var g = parseInt(color.substring(3, 5), 16);
	var b = parseInt(color.substring(5, 7), 16);
	var hsl = rgb2hsl(r, g, b);
	var lhue = "";
	if (hsl[2] < 5)
		return lg("Color-black");
	else if (hsl[2] > 95)
		return lg("Color-white");
	else if (hsl[1] < 10)
		lhue = "grey";
	else {
		lhue = "hue"+(Math.round(hsl[0]/30)%12);
	}
	var nhue = lg("Color-"+lhue);
	if (hsl[2] < 33)
		return lg("Color-dark").replace("<hue>", nhue);
	else if (hsl[2] > 67)
		return lg("Color-light").replace("<hue>", nhue);
	else
		return nhue;
}

//https://stackoverflow.com/questions/39118528/rgb-to-hsl-conversion
function rgb2hsl(r, g, b) {
    // see https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation
    // convert r,g,b [0,255] range to [0,1]
	r = r / 255,
    g = g / 255,
    b = b / 255;
	// get the min and max of r,g,b
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    // lightness is the average of the largest and smallest color components
    var lum = (max + min) / 2;
    var hue;
    var sat;
    if (max == min) { // no saturation
        hue = 0;
        sat = 0;
    } else {
        var c = max - min; // chroma
        // saturation is simply the chroma scaled to fill
        // the interval [0, 1] for every combination of hue and lightness
        sat = c / (1 - Math.abs(2 * lum - 1));
        switch(max) {
            case r:
                // hue = (g - b) / c;
                // hue = ((g - b) / c) % 6;
                hue = (g - b) / c + (g < b ? 6 : 0);
                break;
            case g:
                hue = (b - r) / c + 2;
                break;
            case b:
                hue = (r - g) / c + 4;
                break;
        }
    }
    hue = Math.round(hue * 60); // °
    sat = Math.round(sat * 100); // %
    lum = Math.round(lum * 100); // %
	return [hue, sat, lum];
}

function bubbleDrawIPalette() {
	ctx.fillStyle = "#FF0000";
	ctx.beginPath();
	ctx.arc(this.x, this.y-this.radius/2, this.radius/3, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#00FF00";
	ctx.beginPath();
	ctx.arc(this.x-this.radius*Math.sqrt(3)/4, this.y+this.radius/4, this.radius/3, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#0000FF";
	ctx.beginPath();
	ctx.arc(this.x+this.radius*Math.sqrt(3)/4, this.y+this.radius/4, this.radius/3, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fill();
}