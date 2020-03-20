class CreditsScreen extends Screen {
	constructor() {
		super();
		this.returnButton = new BubbleButton(WIDTH-50, 50, 45, ()=>switchScreen(new MainMenu()), bubbleDrawIReturn);
	}
	update() {
		this.returnButton.update();
	}
	draw() {
		this.returnButton.draw();
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillStyle = palette.normal;
		ctx.font = "25px "+settings.font;
		ctx.fillText(lg("Credits-Me"), 5, 5);
		ctx.fillText("Prexot (goldenPiGames)", 20, 30);
		ctx.fillText(lg("Credits-Music"), 5, 100);
		ctx.fillText(lg("Credits-MusicVarious"), 20, 125);
		ctx.fillText(lg("Credits-MusicVisit"), 35, 150);
	}
}

function bubbleDrawICredits() {
	ctx.lineWidth = .08*this.radius;
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.font = (this.radius*5/4)+"px sans-serif";
	ctx.fillText("c", this.x, this.y);
	//TODO also draw inner circle
}