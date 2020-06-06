class SettingsScreen extends Screen {
	constructor(returnTo) {
		super();
		this.returnTo = returnTo;
		this.langStarted = settings.lang;
		this.returnButton = new BubbleButton(WIDTH-50, 50, 45, ()=>this.exit(), bubbleDrawIReturn);
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
		hideInputs();
		this.subscreen = new (SETTINGS_TAB_LIST[this.tabIndex].cons)(this);
	}
	relangTabs() {
		this.tabs.tabs.forEach((tab,dex)=>tab.text = lg(SETTINGS_TAB_LIST[dex].lTitle));
	}
	exit() {
		saveSettings();
		hideInputs();
		if (this.returnTo instanceof MainMenu && this.langStarted != settings.lang)
			runnee = new MainMenu();
		else
			runnee = this.returnTo;
	}
}

class SettingsScreenGeneral {
	constructor() {
		this.musicSlider = new Slider(50, 160, WIDTH-100, 30, lg("Settings-Music"), 0, 1, val=>{settings.music=val;setMusicVolume(val);saveSettings();}, ()=>settings.music, ()=>asInfuriatingPercent(settings.music));
		this.focusOutPauseCheckbox = new Checkbox(69, this.musicSlider.y+35, WIDTH/2, 24, lg("Settings-FocusOutPause"), val=>{settings.focusOutPause=val;saveSettings();}, settings.focusOutPause);
		this.sfxSlider = new Slider(50, 240, WIDTH-100, 30, lg("Settings-SFX"), 0, 1, val=>{settings.sfx=val;setSFXVolume(val);saveSettings();}, ()=>settings.sfx, ()=>asPercent(settings.sfx));
		this.cursorParticlesCheckbox = new Checkbox(50, 330, WIDTH/2, 24, lg("Settings-CursorParticles"), val=>{settings.cursorParticles=val;saveSettings();}, settings.cursorParticles);
		this.bgNumberSlider = new Slider(50, 400, (WIDTH-100)*.8, 30, lg("Settings-BGNumber"), 0, .8, val=>{settings.bgNumber=val;saveSettings();}, ()=>settings.bgNumber, ()=>asPercent(settings.bgNumber));
		this.alertDragCheckbox = new Checkbox(50, 450, WIDTH/2, 24, lg("Settings-AlertDrag"), val=>{settings.alertDrag=val;saveSettings();}, settings.alertDrag);
		this.objects = [
			this.musicSlider,
			this.focusOutPauseCheckbox,
			this.sfxSlider,
			this.cursorParticlesCheckbox,
			this.bgNumberSlider,
			this.alertDragCheckbox,
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
		var marg = (WIDTH-3*255)/4;
		var x1 = Math.floor(marg);
		var x2 = Math.floor(2*marg+255);
		var x3 = Math.floor(3*marg+255*2);
		var y1 = 110;
		var y2 = 330;
		this.tabIndex = 0;
		this.normalPicker = new ColorPicker(x1, y1, lg("Palette-Normal"), val=>changeSingleColor("normal", val), settings.normal_color);
		this.backgroundPicker = new ColorPicker(x2, y1, lg("Palette-Background"), val=>changeSingleColor("background", val), settings.background_color);
		this.disabledPicker = new ColorPicker(x3, y1, lg("Palette-Disabled"), val=>changeSingleColor("disabled", val), settings.disabled_color);
		this.hoverPicker = new ColorPicker(x1, y2, lg("Palette-Hover"), val=>changeSingleColor("hover", val), settings.hover_color);
		this.clickPicker = new ColorPicker(x2, y2, lg("Palette-Click"), val=>changeSingleColor("click", val), settings.click_color);
		this.beamPicker = new ColorPicker(x3, y2, lg("Palette-Beam"), val=>changeSingleColor("beam", val), settings.beam_color);
		this.colorblindBox = new Checkbox(10, 500, 256, 30, lg("Settings-Colorblind"), val=>settings.colorblind=val, settings.colorblind);
		this.rainbowBox = new Checkbox(x3, 300, y2-74, 30, lg("Settings-RainbowBeam"), val=>this.setRainbowBeam(val), settings.rainbowBeam);
		this.tabs = new Tabs(0, 40, WIDTH-100, 40, [lg("Palette-General"), lg("Palette-SameGame")], num=>this.setTab(num), ()=>this.tabIndex);
		this.samegamePickers = [
			new ColorPicker(x1, y1, lg("Palette-SameGame0"), val=>changeSingleColor("samegame0", val), settings.samegame0_color),
			new ColorPicker(x2, y1, lg("Palette-SameGame1"), val=>changeSingleColor("samegame1", val), settings.samegame1_color),
			new ColorPicker(x3, y1, lg("Palette-SameGame2"), val=>changeSingleColor("samegame2", val), settings.samegame2_color),
			new ColorPicker(x1, y2, lg("Palette-SameGame3"), val=>changeSingleColor("samegame3", val), settings.samegame3_color),
			new ColorPicker(x2, y2, lg("Palette-SameGame4"), val=>changeSingleColor("samegame4", val), settings.samegame4_color),
			new ColorPicker(x3, y2, lg("Palette-SameGame5"), val=>changeSingleColor("samegame5", val), settings.samegame5_color),
		]
		this.objects = [
			[
				this.normalPicker,
				this.backgroundPicker,
				this.disabledPicker,
				this.hoverPicker,
				this.clickPicker,
				this.colorblindBox,
				this.rainbowBox,
			],
			[
				...this.samegamePickers,
				this.colorblindBox,
			],
		];
	}
	update() {
		this.tabs.update();
		this.objects[this.tabIndex].forEach(oj=>oj.update());
		if (!settings.rainbowBeam)
			this.beamPicker.update();
	}
	draw() {
		this.tabs.draw();
		this.objects[this.tabIndex].forEach(oj=>oj.draw());
		if (!settings.rainbowBeam)
			this.beamPicker.draw();
	}
	setRainbowBeam(val) {
		settings.rainbowBeam = val;
		if (settings.rainbowBeam) {
			if (levelIterator && levelIterator instanceof LinearLevelIterator) {
				palette.beam = levelIterator.seq.color;
			} else {
				scintBeam(0);
			}
		} else {
			palette.beam = settings.beam_color;
		}
	}
	setTab(now) {
		this.tabIndex = now;
	}
}


class SettingsScreenFont {
	constructor() {
		this.radios = [
			...FONT_FAMILIES.map((oj, dex) => new FontRadio(20, 60+30*dex, 300, 30, oj, this)),
			...FONTS_INCLUDED.map((oj, dex) => new FontRadio(20, 200+30*dex, 300, 30, oj, this)),
		];
		this.radios.push(new FontRadioOther(20, HEIGHT-180, 300, 30, this, this.radios.find(r=>r.selected)));
	}
	update() {
		this.radios.forEach(oj => oj.update());
	}
	draw() {
		this.radios.forEach(oj => oj.draw());
	}
	setRadio(newsel) {
		this.radios.forEach(rad=>rad.selected = (rad == newsel));
		setFont(newsel.font);
	}
}

const FONT_FAMILIES = [
	"monospace",
	"serif",
	"sans-serif",
];

const FONTS_INCLUDED = [
	"OpenDyslexic",
	//"Determination Mono",
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
	constructor(x, y, width, height, parent, already) {
		super();
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.parent = parent;
		this.selected = !already;
		setTextInput(0, x+height, y, width-height, height, lg("SettingsFont-Other"));
		if (this.selected)
			textInput0.value = settings.font;
	}
	update() {
		this.fontLast = this.font || "";
		this.font = textInput0.value;
		this.updateMouse();
		if (this.hovered)
			hovered = true;
		if (this.clicked || !this.selected && this.font != this.fontLast) {
			this.parent.setRadio(this);
		} else if (this.selected && this.font && this.font != this.fontLast) {
			setFont(this.font);
		}
	}
	draw() {
		this.drawBubble();
		ctx.fillStyle = palette.normal;
		drawParagraphInRect(lg("Settings-FontOtherDesc"), this.x, this.y+this.height+5, WIDTH-this.x*2, 300, this.height*.8);
	}
}

const SETTINGS_TAB_LIST = [
	{lTitle:"SettingsTab-General", cons:SettingsScreenGeneral},
	{lTitle:"SettingsTab-Palette", cons:SettingsScreenPalette},
	{lTitle:"SettingsTab-Font", cons:SettingsScreenFont},
	{lTitle:"SettingsTab-Lang", cons:SettingsScreenLang},
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