const PALETTE_NAMES = ["background", "normal", "beam", "hover", "click", "disabled"];

var palette = {
	
}

function loadPaletteFromSettings() {
	PALETTE_NAMES.forEach(nom => palette[nom] = settings[nom+"_color"]);
}

class PaletteScreen extends Screen {
	constructor(returnTo) {
		super();
		this.returnTo = returnTo;
		//TODO make these actually change stuff
		this.returnButton = new BubbleButton(WIDTH-50, 50, 45, ()=>switchScreen(this.returnTo), bubbleDrawIReturn);
		this.normalPicker = new ColorPicker(10, 10, "Normal", val=>{settings.normal_color=val; loadPaletteFromSettings()}, settings.normal_color);
		this.backgroundPicker = new ColorPicker(310, 10, "Background", val=>{settings.background_color=val; loadPaletteFromSettings()}, settings.background_color);
		this.hoverPicker = new ColorPicker(10, 210, "Hover", val=>{settings.hover_color=val; loadPaletteFromSettings()}, settings.hover_color);
		this.clickPicker = new ColorPicker(310, 210, "Click", val=>{settings.click_color=val; loadPaletteFromSettings()}, settings.click_color);
		this.colorblindBox = new Checkbox(10, 410, 256, 30, "Colorblind-Friendly", val=>settings.colorblind=val, settings.colorblind);
		//this.allowChangeBox = new Checkbox(//TODO prevent game from changing palette
		this.objects = [
			this.returnButton,
			this.normalPicker,
			this.backgroundPicker,
			this.hoverPicker,
			this.clickPicker,
			this.colorblindBox,
		];
	}
	update() {
		this.objects.forEach(oj=>oj.update());
	}
	draw() {
		ctx.fillStyle = palette.normal;
		let head = this.backgroundPicker.header;
		ctx.fillRect(head.x, head.y, head.width, head.height+10);
		this.objects.forEach(oj=>oj.draw());
	}
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