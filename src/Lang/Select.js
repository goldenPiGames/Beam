class LangSelectScreen extends Screen {
	constructor() {
		super();
		this.buttons = [];
		var x = 20;
		var y = 90;
		for (var i = 0; i < LANGUAGES.length; i++) {
			this.buttons.push(new LangSelectScreenButton(x, y, 200, 30, LANGUAGES[i], this));
			y += 40;
			if (y >= HEIGHT-50) {
				x += 250;
				y = 90;
			}
		}
	}
	update() {
		this.buttons.forEach(butt=>butt.update());
	}
	draw() {
		this.buttons.forEach(butt=>butt.draw());
	}
	langClicked(lang) {
		settings.lang = lang;
		saveSettings();
		runnee = new MainMenu();
	}
}

class LangSelectScreenButton extends Button {
	constructor(x, y, width, height, lang, parent) {
		super(x, y, width, height, LANG[lang]["Lang-Name"], function() {
			this.parent.langClicked(this.lang);
		});
		this.lang = lang;
		this.parent = parent;
	}
}