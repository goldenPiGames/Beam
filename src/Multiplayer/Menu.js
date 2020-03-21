class MultiplayerMenu extends Screen {
	constructor() {
		super();
		this.buttons = [
			/*...alternateHybridButtons(WIDTH/8, HEIGHT/8, WIDTH/4, HEIGHT/4, [
					{text:lg("RaceMenu-TimeTrial"), drawI:bubbleDrawIPlay, handler:()=>{hideTextInput(); switchScreen(new InfiniteSelectScreen({race:true}))}},
					//{text:lg("RaceMenu-HeadToHead"), drawI:bubbleDrawIPlay, handler:()=>switchScreen(new CreditsScreen())},
					{text:lg("RaceMenu-Host"), drawI:bubbleDrawIPlay, handler:()=>switchScreen(new HostSettingsScreen())},
					{text:lg("RaceMenu-Join"), drawI:bubbleDrawIPlay, handler:()=>switchScreen(new JoinMultiplayerScreen())},
				]),*/
			new ParagraphButton(5, 5, 250, HEIGHT-110, lg("RaceMenu-TimeTrial"), lg("RaceMenu-TimeTrial-Desc"), ()=>{hideTextInput(); switchScreen(new InfiniteSelectScreen({race:true}))}),
			new ParagraphButton(WIDTH-500, 5, 490, 190, lg("RaceMenu-Host"), lg("RaceMenu-Host-Desc"), ()=>switchScreen(new HostSettingsScreen())),
			new ParagraphButton(WIDTH-500, 200, 490, HEIGHT-300, lg("RaceMenu-Join"), lg("RaceMenu-Join-Desc"), ()=>switchScreen(new JoinMultiplayerScreen())),
			new BubbleButton(50, HEIGHT-50, 45, ()=>{hideTextInput(); switchScreen(new MainMenu())}, bubbleDrawIReturn),
		];
		setTextInput(WIDTH-170, HEIGHT-90, 160, 30, "Name");
		textInput.value = settings.name;
		//console.log(textInput.value, settings.name);
	}
	update() {
		if (textInput.value) {
			settings.name = textInput.value;
			saveSettings();
		}
		this.currHelp = null;
		this.buttons.forEach(oj=>oj.update());
	}
	draw() {
		this.buttons.forEach(oj=>oj.draw());
	}
}

function bubbleDrawIRace() {
	var sqnum = 5;
	var sqsize = this.radius/sqnum;
	for (var i = 0; i < sqnum; i++) {
		for (var j = 0; j < sqnum; j++) {
			if ((i + j) % 2 == 0) {
				ctx.fillRect(this.x+sqsize*(i-sqnum/2), this.y+sqsize*(j-sqnum/2), sqsize, sqsize);
			}
		}
	}
}

class ParagraphButton extends UIObject {
	constructor(x, y, width, height, head, para, handler = doNothing) {
		super(x, y, width, height);
		this.head = head;
		this.para = para;
		this.handler = handler;
	}
	update() {
		super.update();
		if (this.hovered)
			hovered = true;
		if (this.clicked)
			this.handler();
	}
	draw() {
		ctx.globalAlpha = 1;
		var color = this.clicked ? palette.click : this.hovered ? palette.hover : palette.normal;
		ctx.lineWidth = BUTTON_BORDER_WIDTH;
		ctx.strokeStyle = color;
		
		ctx.fillStyle = palette.background;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		
		var bbw = BUTTON_BORDER_WIDTH;
		ctx.strokeRect(this.x + bbw/2, this.y + bbw/2, this.width - bbw, this.height - bbw);
		
		ctx.fillStyle = color;
		drawTextInRect(this.head, this.x+5, this.y+5, this.width-10, 25);
		drawParagraphInRect(this.para, this.x+5, this.y+50, this.width-10, this.height-50, 20);
	}
}