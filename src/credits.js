class Credits extends Screen {
	constructor() {
		super();
		this.objects = [
			new Label(0, 0, settings.width, settings.height, "ME", "IT WAS ALL ME I CAN DO ANYTHING HAHAHAHAHHAHAHAHAHHAHAHAHHAHAHAH!!!!!!!!!!!1!!!!!!!11!1!one!!"),
			new Button(settings.width-200, mainHeight()-50, 190, 40, "Return", "Stop basking in the glorious presence of the mere mention of my existence and do something else, like play the game or listen to some music.", ()=>switchScreen(MainMenu)),
		];
	}
}