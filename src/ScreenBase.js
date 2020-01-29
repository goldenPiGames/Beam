class Screen {
	constructor() {
		
	}
	update() {
		this.objects.forEach(oj => oj.update());
	}
	draw() {
		clearBack();
		this.objects.forEach(oj => oj.draw());
	}
}
Screen.prototype.isScreen = true;

var ScreenBase = {
	isScreen : true,
	resize : function() {
		
	},
	update : function() {
		this.objects.forEach(oj => oj.update());
	},
	draw : function() {
		clearBack();
		this.objects.forEach(oj => oj.draw());
	},
}

function switchScreen(to) {
	if (typeof to == "function") {
		if (to.prototype.isScreen)
			to = new to();
		else {
			to();
			return;
		}
	}
	runnee = to;
	particles.push(new ColorFade(4, 0, 0));
}