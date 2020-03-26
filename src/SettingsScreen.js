class SettingsScreen extends Screen {
	constructor(returnTo) {
		super();
		this.returnTo = returnTo;
		this.returnButton = new BubbleButton(WIDTH-50, 50, 45, ()=>{runnee=this.returnTo}, bubbleDrawIReturn);
		this.tabs = new Tabs(0, 0, WIDTH-100, 40, SETTINGS_TAB_LIST.map(ta=>lg(ta.lTitle)), num=>this.setTab(num), ()=>this.tabIndex);
		this.setTab(0);
	}
	update() {
		this.tabs.update();
		this.subscreen.update();
		this.returnButton.update();
	}
	draw() {
		this.tabs.draw();
		this.subscreen.draw();
		this.returnButton.draw();
	}
	setTab(dex) {
		if (this.tabIndex === dex)
			return false;
		this.tabIndex = dex;
		hideTextInput();
		this.subscreen = new (SETTINGS_TAB_LIST[this.tabIndex].cons)();
	}
}

class SettingsScreenGeneral {
	constructor() {
		this.musicSlider = new Slider(50, 200, WIDTH-100, 30, lg("Settings-Music"), 0, 1, val=>{settings.music=val;setMusicVolume(val);saveSettings();}, ()=>settings.music, ()=>asInfuriatingPercent(settings.music));
		this.sfxSlider = new Slider(50, 300, WIDTH-100, 30, lg("Settings-SFX"), 0, 1, val=>{settings.sfx=val;setSFXVolume(val);saveSettings();}, ()=>settings.sfx, ()=>asInfuriatingPercent(settings.sfx));
		this.objects = [
			this.musicSlider,
			this.sfxSlider,
		]
	}
	update() {
		this.objects.forEach(oj=>oj.update());
		if (this.sfxSlider.held && this.sfxSlider.held % 15 == 1)
			playSFX("blip1");
	}
	draw() {
		this.objects.forEach(oj=>oj.draw());
	}
}

class SettingsScreenPalette {
	constructor() {
		this.normalPicker = new ColorPicker(10, 60, lg("Palette-Normal"), val=>this.changeColor("normal", val), settings.normal_color);
		this.backgroundPicker = new ColorPicker(310, 60, lg("Palette-Background"), val=>this.changeColor("background", val), settings.background_color);
		this.hoverPicker = new ColorPicker(10, 260, lg("Palette-Hover"), val=>this.changeColor("hover", val), settings.hover_color);
		this.clickPicker = new ColorPicker(310, 260, lg("Palette-Click"), val=>this.changeColor("click", val), settings.click_color);
		this.colorblindBox = new Checkbox(10, 460, 256, 30, lg("Settings-Colorblind"), val=>settings.colorblind=val, settings.colorblind);
		//this.allowChangeBox = new Checkbox(//TODO prevent game from changing palette
		this.objects = [
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
		this.objects.forEach(oj=>oj.draw());
	}
	changeColor(which, val) {
		settings[which+"_color"] = val;
		palette[which] = val;
		saveSettings();
	}
}


class SettingsScreenFont {
	constructor() {
		this.radios = [
			...FONT_FAMILIES.map((oj, dex) => new FontRadio(20, 60+30*dex, 300, 30, oj, this)),
			...FONTS_INCLUDED.map((oj, dex) => new FontRadio(20, 200+30*dex, 300, 30, oj, this)),
			new FontRadioOther(20, HEIGHT-120, 300, 30, this),
		];
	}
	update() {
		this.radios.forEach(oj => oj.update());
	}
	draw() {
		this.radios.forEach(oj => oj.draw());
	}
	setRadio(newsel) {
		this.radios.forEach(rad=>rad.selected = (rad == newsel));
		settings.font = newsel.font;
	}
}

const FONT_FAMILIES = [
	"monospace",
	"serif",
	"sans-serif",
];

const FONTS_INCLUDED = [
	"OpenDyslexic",
	"Determination Mono",
	"Futura Medium",
];

class FontRadio extends RadioButtonElement {
	constructor(x, y, width, height, font, parent) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.font = font;
		this.parent = parent;
		this.selected = this.font == settings.font;
	}
	update() {
		this.updateMouse();
		if (this.hovered)
			hovered = true;
		if (this.clicked) {
			this.parent.setRadio(this);
		}
	}
	draw() {
		this.drawBubble();
		
		ctx.fillStyle = this.selected ? palette.click : this.hovered ? palette.hover : palette.normal;
		ctx.font = (this.height * 4/5) + "px " + this.font;
		ctx.textAlign = "left";
		ctx.textBaseline = "middle";
		
		ctx.fillText(this.font, this.x + this.height, this.y + (this.height/2));
	}
}

class FontRadioOther extends FontRadio {
	constructor(x, y, width, height, parent) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.parent = parent;
	}
	update() {
		this.font = textInput.value;
		this.updateMouse();
		if (this.hovered)
			hovered = true;
		if (this.clicked) {
			this.parent.setRadio(this);
		}
	}
	draw() {
		
	}
}

const SETTINGS_TAB_LIST = [
	{lTitle:"SettingsTab-General", desc:"Change music and SFX volume, profanity, and a few other things.", cons:SettingsScreenGeneral},
	{lTitle:"SettingsTab-Palette", desc:"Adjust the color palette of the interface.", cons:SettingsScreenPalette},
	{lTitle:"SettingsTab-Font", desc:"Choose which font is used to display the interface.", cons:SettingsScreenFont},
]

function bubbleDrawISettings() {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius/2, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fill();
	for (var i = 0; i < 8; i++) {
		var theta = i * Math.PI/4;
		ctx.beginPath();
		ctx.moveTo(this.x+this.radius/2*Math.cos(theta-Math.PI/12), this.y+this.radius/2*Math.sin(theta-Math.PI/12));
		ctx.lineTo(this.x+this.radius*2/3*Math.cos(theta-Math.PI/20), this.y+this.radius*2/3*Math.sin(theta-Math.PI/20));
		ctx.lineTo(this.x+this.radius*2/3*Math.cos(theta+Math.PI/20), this.y+this.radius*2/3*Math.sin(theta+Math.PI/20));
		ctx.lineTo(this.x+this.radius/2*Math.cos(theta+Math.PI/12), this.y+this.radius/2*Math.sin(theta+Math.PI/12));
		ctx.closePath();
		ctx.fill();
	}
	ctx.fillStyle = palette.background;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius/5, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fill();
}