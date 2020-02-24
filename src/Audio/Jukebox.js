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
		this.songMenu = new ScrollMenu(0, 0, midx-10, HEIGHT, playMusic, songList, "by", "description", ()=>true, (val)=>val==song);
		if (song)
			this.songMenu.scrollToSelected();
		this.returnButton = new BubbleButton(WIDTH-50, 50, 45, ()=>{runnee=this.returnTo}, bubbleDrawIReturn);
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
		this.sortButtons = new RadioButtons(midx, 300, swid/2, 24, [lg("Jukebox-SortBy"), lg("Jukebox-SortName")], dex=>this.setSort(dex), jukeboxSpecs.sort);
		this.intensityMinSlider = new Slider(midx, 360, swid/2-5, 25, lg("Jukebox-MinimumIntensity"), 0, 1, val=>this.setIntensityMin(val), ()=>jukeboxSpecs.intensityMin, ()=>getIntensityDesc(jukeboxSpecs.intensityMin));
		this.intensityMaxSlider = new Slider(midx, 390, swid/2-5, 25, lg("Jukebox-MaximumIntensity"), 0, 1, val=>this.setIntensityMax(val), ()=>jukeboxSpecs.intensityMax, ()=>getIntensityDesc(jukeboxSpecs.intensityMax));
		this.favCheckbox = new Checkbox(midx+swid/2, 450, swid/2, 24, lg("Jukebox-FavsOnly"), val=>this.setFavsOnly(val), jukeboxSpecs.favsOnly);
		this.shuffleCheckbox = new Checkbox(midx, HEIGHT-35, swid, 30, lg("Jukebox-Shuffle"), val=>this.setShuffle(val), jukeboxSpecs.shuffle);
		this.genreButtons = new RadioButtons(midx+swid/2, 300, swid/2, 24, MUSIC_GENRES.map(n=>lg("Jukebox-Genre-"+n)), val=>this.setGenre(val), jukeboxSpecs.genre);
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
			this.intensityMinSlider,
			this.intensityMaxSlider,
			this.shuffleCheckbox,
			this.genreButtons,
		];
	}
	update() {
		if (song != this.lastSong || !this.positionSlider.max) {
			this.lastSong = song;
			this.setSliderBounds();
		}
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
		this.positionSlider.max = song ? (jukeboxSpecs.shuffle ? music.duration : song.loopEnd) || music.duration : 60;
	}
	refreshList() {
		songList = SONG_LIST.slice().filter(s=>s.intensity>=jukeboxSpecs.intensityMin && s.intensity<=jukeboxSpecs.intensityMax);
		if (jukeboxSpecs.favsOnly)
			songList = songList.filter(s=>s.fav);
		if (jukeboxSpecs.genre) {
			var genreName = MUSIC_GENRES[jukeboxSpecs.genre];
			songList = songList.filter(s=>s[genreName]);
		}
		switch (jukeboxSpecs.sort) {
			case 0: songList.sort((a,b)=> a.by < b.by ? -1 : 1); break;
			case 1: songList.sort((a,b)=> a.name < b.name ? -1 : 1); break;
		}
		if (this.songMenu) {
			this.songMenu.setItems(songList);
			this.songMenu.scrollToSelected();
		}
	}
	setSort(val) {
		jukeboxSpecs.sort = val;
		this.refreshList();
	}
	setFavsOnly(val) {
		jukeboxSpecs.favsOnly = val;
		this.refreshList();
	}
	setIntensityMin(val) {
		val = Math.round(val*4)/4;
		if (jukeboxSpecs.intensityMin == val)
			return;
		jukeboxSpecs.intensityMin = val;
		if (val > jukeboxSpecs.intensityMax)
			jukeboxSpecs.intensityMax = val;
		this.refreshList();
	}
	setIntensityMax(val) {
		val = Math.round(val*4)/4;
		if (jukeboxSpecs.intensityMax == val)
			return;
		jukeboxSpecs.intensityMax = val;
		if (val < jukeboxSpecs.intensityMin)
			jukeboxSpecs.intensityMin = val;
		this.refreshList();
		//this.setSliderBounds();
	}
	setShuffle(val) {
		jukeboxSpecs.shuffle = val;
		setMusicShuffle(jukeboxSpecs.shuffle)
		this.setSliderBounds();
	}
	setGenre(val) {
		jukeboxSpecs.genre = val;
		this.refreshList();
	}
}
//TODO add intensity selectors
//TODO add shuffle

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


var songList = SONG_LIST.slice();

var jukeboxSpecs = {
	sort : 0,
	intensityMin : 0,
	intensityMax : 1,
	favsOnly : false,
	shuffle : false,
	genre : 0,
}

function getIntensityDesc(val) {
	return lg("Jukebox-Intensities")[val*4];
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