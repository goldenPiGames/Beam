class MultiplayerMenu extends Screen {
	constructor() {
		super();
		this.buttons = [
			...alternateHybridButtons(WIDTH/8, HEIGHT/8, WIDTH/4, HEIGHT/4, [
					{text:lg("RaceMenu-TimeTrial"), drawI:bubbleDrawIPlay, handler:()=>switchScreen(new InfiniteSelectScreen({race:true}))},
					//{text:lg("RaceMenu-HeadToHead"), drawI:bubbleDrawIPlay, handler:()=>switchScreen(new CreditsScreen())},
					{text:lg("RaceMenu-Host"), drawI:bubbleDrawIPlay, handler:()=>switchScreen(new HostSettingsScreen())},
					{text:lg("RaceMenu-Join"), drawI:bubbleDrawIPlay, handler:()=>switchScreen(new JoinMultiplayerScreen())},
				]),
			new BubbleButton(50, HEIGHT-50, 45, ()=>switchScreen(new MainMenu()), bubbleDrawIReturn),
		];
		setTextInput(WIDTH-170, 10, 160, 30, "Name");
		textInput.value = settings.name;
	}
	update() {
		this.buttons.forEach(oj=>oj.update());
		if (textInput.value) {
			settings.name = textInput.value;
			saveSettings();
		}
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