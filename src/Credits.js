const SURVEY_LINK = "https://docs.google.com/forms/d/e/1FAIpQLScTvIdMyTqUgND45HIuLQV5N0OWx3OxumZzlcQllSS432loDg/viewform?usp=sf_link";
const DISCORD_LINK = "https://discord.gg/ErnbtbJ";
const PATREON_LINK = "https://www.patreon.com/goldenPiGames";

const CREDITS_HEADING_GAP = 36;
const CREDITS_BUTTON_HEIGHT = 36;
const CREDITS_SCROLL_SPEED = 60;
const CREDITS_AUTO_SPEED = 2;

class CreditsScreen extends Screen {
	constructor() {
		super();
		this.levelSources = [];
		MAIN_LEVEL_SEQS.forEach(seq => {
			seq.levelIDs.forEach((id, dex)=>{
				var sauce = lg(id+"-Source");
				var lev = Levels[id];
				if (!sauce)
					return false;
				this.levelSources.push({
					name: lg("Credits-LevelName", {"seq":lg("Seq-"+seq.id), "index":dex}),
					source: sauce,
				});
			});
		});
		this.creditsArea = new CreditsArea(0, WIDTH-100);
		this.creditsArea.addHeading(lg("Credits-IDid"));
		this.creditsArea.addText("Prexot (goldenPiGames)");
		this.creditsArea.addMultipleButtons(
			{text:"Kongregate", href:"https://www.kongregate.com/accounts/goldenPiGames"},
			{text:"Newgrounds", href:"https://goldenpigames.newgrounds.com/"},
			{text:"itch", href:"https://goldenpigames.itch.io/"},
			{text:"YouTube", href:"https://www.youtube.com/channel/UCb4QliR5GWppUqOLXBYKYHw"},
			{text:"Patreon", href:PATREON_LINK},
			{text:"Discord", href:DISCORD_LINK},
		);
		this.creditsArea.addHeading(lg("Credits-Sources"));
		this.levelSources.forEach(sauce => this.creditsArea.addDouble(sauce.name, sauce.source));
		this.creditsArea.addDouble(lg("Credits-SourcesRest"), lg("Credits-SourcesOriginal"));
		getLangCredits().forEach(ld => {
			this.creditsArea.addHeading(ld.name);
			this.creditsArea.addTexts(ld.credits);
		});
		this.creditsArea.addHeading(lg("Credits-TranslationBegHead"));
		this.creditsArea.addTexts(lg("Credits-TranslationBegLines"));
		this.creditsArea.addHeading(lg("Credits-SpecialThanks"));
		this.creditsArea.addTexts([
			"Delaware Games Collective",
			"UD Board Game Club",
			"@ihartnia",
		]);
		this.creditsArea.finalize();
		let creditsArea = this.creditsArea;
		this.pauseButton = new BubbleButton(WIDTH-50, 50, 45, ()=>{this.creditsArea.togglePause()}, function() {
				if (creditsArea.moving) {
					bubbleDrawIPause.call(this);
				} else {
					bubbleDrawIPlay.call(this);
				}});
		this.scrollBar = new ScrollBar(WIDTH-50, 100, 50, HEIGHT-200, HEIGHT, this.creditsArea.maxScroll+this.creditsArea.height, val=>this.creditsArea.scroll=val, ()=>this.creditsArea.scroll);
		this.returnButton = new BubbleButton(WIDTH-50, HEIGHT-50, 45, ()=>switchScreen(new MainMenu()), bubbleDrawIReturn);
		this.objects = [
			this.pauseButton,
			this.scrollBar,
			this.creditsArea,
			this.returnButton,
		];
	}
	update() {
		this.objects.forEach(oj=>oj.update());
	}
	draw() {
		/*ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillStyle = palette.normal;
		ctx.font = "25px "+settings.font;
		ctx.fillText(lg("Credits-Me"), 5, 5);
		ctx.fillText("Prexot (goldenPiGames)", 20, 30);
		ctx.fillText(lg("Credits-Music"), 5, 100);
		ctx.fillText(lg("Credits-MusicVarious"), 20, 125);
		ctx.fillText(lg("Credits-MusicVisit"), 35, 150);*/
		this.objects.forEach(oj=>oj.draw());
	}
}

class CreditsArea extends UIObject {
	constructor(x, width) {
		super();
		this.x = x;
		this.y = 0;
		this.width = width;
		this.height = HEIGHT;
		this.scroll = 0;//this.height;
		this.maxScroll = 1500;
		this.curry = this.height;
		this.objects = [];
		this.moving = true;
	}
	update() {
		this.updateMouse();
		if (this.moving) {
			this.scroll += CREDITS_AUTO_SPEED;
			if (this.scroll > this.maxScroll)
				this.scroll = 0;
		}
		if (this.hovered && mouse.scrolled) {
			//this.moving = false;
			if (mouse.scrolled < 0)
				this.scroll = Math.max(0, this.scroll-CREDITS_SCROLL_SPEED);
			else
				this.scroll = Math.min(this.maxScroll, this.scroll+CREDITS_SCROLL_SPEED);
		}
		if (this.draggedY) {
			this.scroll = Math.max(0, Math.min(this.maxScroll, this.scroll-this.draggedY));
			this.moving = false;
		}
		this.objects.forEach(oj=>oj.update());
	}
	draw() {
		this.objects.forEach(oj=>oj.draw());
	}
	addHeading(text) {
		this.objects.push(new ScrollingText(this, text, this.x+this.width/2, this.curry+CREDITS_HEADING_GAP, 28, "center"));
		this.curry += CREDITS_HEADING_GAP+32;
	}
	addText(text) {
		this.objects.push(new ScrollingText(this, text, this.x+this.width/2, this.curry, 20, "center"));
		this.curry += 24;
	}
	addTexts(ray) {
		ray.forEach(t=>this.addText(t));
	}
	addDouble(textL, textR) {
		this.objects.push(new ScrollingText(this, textL, this.x+this.width/2-5, this.curry, 20, "right"));
		this.objects.push(new ScrollingText(this, textR, this.x+this.width/2+5, this.curry, 20, "left"));
		this.curry += 24;
	}
	addMultipleButtons(...butts) {
		var len = butts.length;
		butts.forEach((oj, dex) => this.objects.push(new ScrollingButton(this, this.x+this.width*dex/len, this.curry, this.width/len, CREDITS_BUTTON_HEIGHT, oj.text, oj.href ? ()=>{window.open(oj.href); this.held = false} : oj.handler)));
		this.curry += CREDITS_BUTTON_HEIGHT+4;
	}
	finalize() {
		this.maxScroll = this.curry + 5;
	}
	togglePause() {
		this.moving = !this.moving;
	}
}

class ScrollingText extends UIObject {
	constructor(scroller, text, x, y, height, align) {
		super();
		this.scroller = scroller;
		this.text = text;
		this.x = x;
		this.y = y;
		this.height = height;
		this.align = align;
	}
	update() {
		
	}
	draw() {
		ctx.textAlign = this.align;
		ctx.textBaseline = "top";
		ctx.fillStyle = palette.normal;
		ctx.font = this.height + "px " + settings.font;
		ctx.fillText(this.text, this.x, this.y-this.scroller.scroll);
	}
}

class ScrollingButton extends Button {
	constructor(scroller, ...rest) {
		super(...rest);
		this.scroller = scroller;
		this.baseY = this.y;
	}
	update() {
		this.y = this.baseY - this.scroller.scroll;
		//console.log(this.y);
		super.update();
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