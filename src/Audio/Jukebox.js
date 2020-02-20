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
		this.refreshList();
		this.songMenu = new ScrollMenu(0, 0, midx-10, HEIGHT, function(elem) {
				playMusic(elem);
				thisser.pauseButton.text = "Pause";
				thisser.setSliderBounds();
			}, this.songList, "by", "description", ()=>true, (val)=>val==song),
		this.returnButton = new BubbleButton(WIDTH-50, 50, 45, ()=>{runnee=this.returnTo}, bubbleDrawIReturn),
		this.pauseButton = new BubbleButton(midx+50, 50, 45, ()=>{if (music.paused) music.play(); else music.pause()}, function() {
				if (!music.paused) {
					bubbleDrawIPause.call(this);
				} else {
					bubbleDrawIPlay.call(this);
				}});
		this.linkButton = new BubbleButton(midx+50, 150, 45, ()=>{if (song) runnee=new JukeboxLinkPopup(this)}, bubbleDrawIHyperlink);
		this.favButton = new BubbleButton(midx+150, 150, 45, ()=>toggleFavSong(song), function() {
				if (song && song.fav) {
					bubbleDrawIHeartFull.call(this);
				} else {
					bubbleDrawIHeart.call(this);
				}});
		var swid = Math.floor(WIDTH - midx) - 10;
		this.positionSlider = new Slider(midx, 205, swid, 50, "Position", 0, 60, setMusicPosition, getMusicPosition);
		this.volumeSlider = new Slider(midx, 265, swid, 30, "Volume", 0, 1, val=>{settings.music=val;setMusicVolume(val);saveSettings();}, ()=>settings.music, ()=>asInfuriatingPercent(settings.music));
		this.setSliderBounds();
		this.sortButtons = new RadioButtons(midx, 450, swid/2, 24, [lg("Jukebox-SortBy"), lg("Jukebox-SortName")], dex=>this.setSort(dex), jukeboxSpecs.sort);
		this.favCheckbox = new Checkbox(midx+swid/2, 450, swid/2, 24, lg("Jukebox-FavsOnly"), val=>this.setFavsOnly(val), jukeboxSpecs.favsOnly);
		this.objects = [
			this.songMenu,
			this.returnButton,
			this.pauseButton,
			this.linkButton,
			this.favButton,
			this.positionSlider,
			this.volumeSlider,
			this.sortButtons,
			this.favCheckbox,
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
	refreshList() {
		this.songList = SONG_LIST.slice();
		if (jukeboxSpecs.favsOnly)
			this.songList = this.songList.filter(s=>s.fav);
		switch (jukeboxSpecs.sort) {
			case 0: this.songList.sort((a,b)=> a.by < b.by ? -1 : 1); break;
			case 1: this.songList.sort((a,b)=> a.name < b.name ? -1 : 1); break;
		}
		if (this.songMenu)
			this.songMenu.setItems(this.songList);
	}
	setSort(val) {
		jukeboxSpecs.sort = val;
		this.refreshList();
	}
	setFavsOnly(val) {
		jukeboxSpecs.favsOnly = val;
		this.refreshList();
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

var jukeboxSpecs = {
	sort : 0,
	intensityMin : 0,
	intensityMax : 1,
	favsOnly : false,
}

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