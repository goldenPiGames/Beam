const PALETTE_NAMES = ["background", "normal", "beam", "hover", "click", "disabled", "samegame0", "samegame1", "samegame2", "samegame3", "samegame4", "samegame5", "samegame6", "samegame7", "player"];
const RAINBOW_7 = ["#FF0000", "#FF8000", "#FFFF00", "#00FF00", "#0000FF", "#4000FF", "#8000FF"];

var palette = {
	
}

function loadPaletteFromSettings() {
	PALETTE_NAMES.forEach(nom => palette[nom] = settings[nom+"_color"]);
	palette["samegame-1"] = palette.background;
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
		return lg("Color-dark", {"hue":nhue});
	else if (hsl[2] > 67)
		return lg("Color-light", {"hue":nhue})
	else
		return nhue;
}

function changeSingleColor(which, val) {
	settings[which+"_color"] = val;
	palette[which] = val;
	saveSettings();
}

var currentScint = 0;

function getColorScint(time) {
	time = time % (0x100 * 6);
	if (time < 0x100)
		return "#ff"+fillLeft((time-0x000).toString(16), 2, "0")+"00";
	else if (time < 0x200)
		return "#"+fillLeft((0x1FF-time).toString(16), 2, "0")+"ff00";
	else if (time < 0x300)
		return "#00ff"+fillLeft((time-0x200).toString(16), 2, "0");
	else if (time < 0x400)
		return "#00"+fillLeft((0x3FF-time).toString(16), 2, "0")+"ff";
	else if (time < 0x500)
		return "#"+fillLeft((time-0x400).toString(16), 2, "0")+"00ff";
	else
		return "#ff00"+fillLeft((0x5FF-time).toString(16), 2, "0");
}

function scintBeam(d = 1) {
	if (settings.rainbowBeam) {
		currentScint += d;
		palette.beam = getColorScint(currentScint);
	}
}

function drawScintTest() {
	ctx.globalAlpha = 1;
	for (var i = 0; i < 0x600; i+= 2) {
		ctx.fillStyle = getColorScint(i);
		ctx.fillRect(i/2, 0, 2, HEIGHT);
	}
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