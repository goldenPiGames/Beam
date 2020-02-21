class GameMenu extends Screen {
	constructor(wrap) {
		super();
		this.wrap = wrap;
		this.width = 300;
		this.height = HEIGHT;
		this.x = 0;
		this.y = 0;
		this.objects = [
			new Button(this.x, this.y+100, this.width, 30, lg("GameMenu-Quit"), ()=>runnee=new GameMenuQuitConfirm(this))
		];
	}
	update() {
		this.wrap.jukeboxButton.update();
		this.wrap.hintButton.update();
		if (runnee == this && mouse.clicked && !this.intersectsMouse()) {
			runnee = this.wrap;
			return;
		}
		this.objects.forEach(oj=>oj.update());
	}
	draw() {
		this.wrap.draw();
		ctx.fillStyle = settings.background_color;
		ctx.globalAlpha = .3;
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.globalAlpha = .7;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.globalAlpha = 1;
		this.wrap.jukeboxButton.draw();
		this.wrap.hintButton.draw();
		this.objects.forEach(oj=>oj.draw());
	}
}
GameMenu.prototype.intersectsMouse = UIObject.prototype.intersectsMouse;
GameMenu.prototype.overrideTouch = false;


class GameMenuQuitConfirm extends Screen {
	constructor(returnTo) {
		super();
		this.returnTo = returnTo;
		this.x = WIDTH/3;
		this.y = HEIGHT/3;
		this.width = WIDTH/3;
		this.height = HEIGHT/3;
		this.buttons = [
			new Button(this.x+this.width/10, this.y+this.height/2, this.width*4/5, this.height/5, lg("GameMenu-QuitConfirm"), ()=>runnee=new MainMenu()),
			new Button(this.x+this.width/10, this.y+this.height*3/4, this.width*4/5, this.height/5, lg("GameMenu-QuitCancel"), ()=>runnee=this.returnTo),
		];
	}
	update() {
		if (mouse.clicked && !this.intersectsMouse()) {
			runnee = this.returnTo;
			return;
		}
		this.buttons.forEach(butt=>butt.update());
	}
	draw() {
		this.returnTo.draw();
		ctx.fillStyle = settings.background_color;
		ctx.globalAlpha = .7;
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.globalAlpha = 1;
		ctx.lineWidth = 4;
		ctx.strokeStyle = settings.normal_color;
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = settings.normal_color;
		drawTextInRect(lg("GameMenu-Quit"), this.x, this.y, this.width, this.height/2);
		this.buttons.forEach(butt=>butt.draw());
	}
}
GameMenuQuitConfirm.prototype.intersectsMouse = UIObject.prototype.intersectsMouse;

function bubbleDrawIMenu() {
	ctx.lineWidth = this.radius*.1;
	ctx.moveTo(this.x-this.radius/2, this.y-this.radius/3);
	ctx.lineTo(this.x+this.radius/2, this.y-this.radius/3);
	ctx.moveTo(this.x-this.radius/2, this.y);
	ctx.lineTo(this.x+this.radius/2, this.y);
	ctx.moveTo(this.x-this.radius/2, this.y+this.radius/3);
	ctx.lineTo(this.x+this.radius/2, this.y+this.radius/3);
	ctx.stroke();
}