function doMainMenu() {
	switchScreen(MainMenu);
}

class MainMenu extends Screen {
	constructor() {
		super();
		this.buttons = [
			new BubbleButton(WIDTH/2, HEIGHT-200, 45, ()=>continueGame(), function() {
					var path = new Path2D();
					path.moveTo(this.x-this.radius/3, this.y-this.radius/2);
					path.lineTo(this.x+this.radius/2, this.y);
					path.lineTo(this.x-this.radius/3, this.y+this.radius/2);
					ctx.fill(path);
				}),
			//new Button(WIDTH/2, HEIGHT-100, 400, 45, "Jukebox", ()=>switchScreen(Jukebox)),
			//new Button(WIDTH/2, mainHeight()-100, 400, 45, "Credits", ()=>switchScreen(Credits)),
			//new Button(WIDTH/2, mainHeight()-50, 400, 45, "Settings", doSettings),
		]
		//if (differenceBetweenColors(settings.normal_color, settings.background_color) < 72)
			//this.objects.push(new EmergencyColorResetter(0, mainHeight()-20, 200, 20));
	}
	update() {
		this.buttons.forEach(oj=>oj.update());
	}
	draw() {
		ctx.font = "100px sans-serif";
		ctx.textAlign = "center";
		ctx.fillStyle = "#FF0000";
		ctx.fillText("Beam", canvas.width/2, 10);
		this.buttons.forEach(oj=>oj.draw());
	}
}



class BubbleButton extends UIObject {
	constructor(x, y, radius, handler = doNothing, drawI = doNothing) {
		super();
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.handler = handler;
		this.drawI = drawI;
	}
	update() {
		super.update();
		if (this.hovered)
			hovered = true;
		if (this.clicked)
			this.handler();
	}
	draw() {
		ctx.lineWidth = 4;
		var color = this.clicked ? settings.click_color : (this.hovered ? settings.hover_color : settings.normal_color);
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		ctx.closePath();
		ctx.stroke();
		this.drawI();
		
	}
}
