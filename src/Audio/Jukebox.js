class Jukebox extends Screen {
	constructor(returnTo, draw) {
		super();
		this.returnTo = returnTo;
		this.drawBack = draw || returnTo;
		clearBack();
		this.drawBack.draw();
		this.backsnap = ctx.getImageData(0, 0, WIDTH, HEIGHT);
		var thisser = this;
		var midx = WIDTH*.6;
		this.songList = SONG_LIST.slice();
		this.songMenu = new ScrollMenu(0, 0, midx-10, HEIGHT-49, function(elem) {
				playMusic(elem);
				thisser.pauseButton.text = "Pause";
				//thisser.switchButton.active = elem.alt;
				//thisser.siteButton.active = elem.site;
				//thisser.youtubeButton.active = elem.yt;
				thisser.setSliderBounds();
			}, this.songList, "by", "description", ()=>true, (val)=>val==song),
		this.returnButton = new BubbleButton(WIDTH-50, 50, 45, ()=>{runnee=this.returnTo}, bubbleDrawIReturn),
		this.pauseButton = new BubbleButton(WIDTH*2/3, 50, 45, ()=>{if (music.paused) music.play(); else music.pause()}, function() {
				if (!music.paused) {
					bubbleDrawIPause.apply(this);
				} else {
					bubbleDrawIPlay.apply(this);
				}}),
		this.linkButton = new BubbleButton(WIDTH*2/3, 150, 45, ()=>{if (song) runnee=new JukeboxLinkPopup(this)}, bubbleDrawIHyperlink);
		//this.siteButton = new Button(ritx, 10, thic, 40, "Artist's site", ()=>{window.open(song.site)}, false),
		//this.siteButton.active = song && song.site;
		//this.youtubeButton = new Button(ritx, 60, thic, 40, "YouTube", ()=>{window.open("https://youtu.be/"+song.yt)}, false),
		//this.youtubeButton.active = song && song.yt;
		var swid = Math.floor(midx/3)-3;
		this.sortOrderButton = new Button(5, HEIGHT-45, swid-10, 40, "Index", ()=>{this.songList.sort((a,b)=>a.index-b.index); thisser.songMenu.putItems()}),
		this.sortNameButton = new Button(swid+5, HEIGHT-45, swid-10, 40, "Name", ()=>{this.songList.sort((a,b)=>a.name < b.name ?-1:1); thisser.songMenu.putItems()}),
		this.sortArtistButton = new Button(2*swid+5, HEIGHT-45, swid-10, 40, "Artist", ()=>{this.songList.sort((a,b)=>a.by < b.by ?-1:1); thisser.songMenu.putItems()}),
		this.positionSlider = new Slider(midx, 300, WIDTH-midx-10, 50, "Position", 0, 60, setMusicPosition, getMusicPosition);
		this.volumeSlider = new Slider(midx, 400, WIDTH-midx-10, 30, "Volume", 0, 1, val=>{settings.music=val;setMusicVolume(val);saveSettings();}, ()=>settings.music, ()=>asInfuriatingPercent(settings.music));
		this.setSliderBounds();
		this.objects = [
			this.songMenu,
			this.returnButton,
			this.pauseButton,
			this.linkButton,
			//this.siteButton,
			//this.youtubeButton,
			this.sortOrderButton,
			this.sortNameButton,
			this.sortArtistButton,
			this.positionSlider,
			this.volumeSlider,
		];
	}
	update() {
		if (!this.positionSlider.max)
			this.setSliderBounds();
		this.objects.forEach(oj=>oj.update());
	}
	draw() {
		ctx.putImageData(this.backsnap, 0, 0);
		ctx.globalAlpha = .9;
		ctx.fillStyle = settings.background_color;
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.globalAlpha = 1;
		this.objects.forEach(oj=>oj.draw());
	}
	setSliderBounds() {
		this.positionSlider.max = song ? song.loopEnd || music.duration : 60;
	}
}

class JukeboxLinkPopup extends Screen {
	constructor(returnTo) {
		super();
		this.returnTo = returnTo;
		this.x = WIDTH/3;
		this.y = HEIGHT/3;
		this.width = WIDTH/3;
		this.height = HEIGHT/3;
		this.buttons = song.siteList.map((sit, dex) => new Button(this.x+this.width/10, this.y+5+50*dex, this.width*4/5, 40, sit.name, ()=>window.open(sit.href)));
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
		ctx.globalAlpha = .4;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.globalAlpha = 1;
		ctx.lineWidth = 4;
		ctx.strokeStyle = settings.normal_color;
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		this.buttons.forEach(butt=>butt.draw());
	}
}
JukeboxLinkPopup.prototype.intersectsMouse = UIObject.prototype.intersectsMouse;

function bubbleDrawIJukebox() {
	ctx.lineWidth = .08*this.radius;
	ctx.beginPath();
	ctx.ellipse(this.x-.4*this.radius, this.y+.5*this.radius, .2*this.radius, .14*this.radius, 0, 0, 2 * Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.ellipse(this.x+.3*this.radius, this.y+.4*this.radius, .2*this.radius, .14*this.radius, 0, 0, 2 * Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(this.x-.24*this.radius, this.y+.5*this.radius);
	ctx.lineTo(this.x-.24*this.radius, this.y-.4*this.radius);
	ctx.lineTo(this.x+.46*this.radius, this.y-.5*this.radius);
	ctx.lineTo(this.x+.46*this.radius, this.y+.4*this.radius);
	ctx.stroke();
}