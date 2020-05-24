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
		this.positionSlider = new Slider(midx, 205, swid, 50, lg("Jukebox-Position"), 0, 60, setMusicPosition, getMusicPosition, getMusicPosition);
		this.volumeSlider = new Slider(midx, 265, swid, 30, lg("Jukebox-Volume"), 0, 1, val=>{settings.music=val;setMusicVolume(val);saveSettings();}, ()=>settings.music, ()=>asPercent(settings.music));
		this.setSliderBounds();
		this.focusOutPauseCheckbox = new Checkbox(midx, 300, swid, 24, lg("Settings-FocusOutPause"), val=>{settings.focusOutPause=val;saveSettings();}, settings.focusOutPause);
		this.sortButtons = new RadioButtons(midx, 340, swid/2, 24, [lg("Jukebox-SortBy"), lg("Jukebox-SortName")], dex=>this.setSort(dex), jukeboxSpecs.sort);
		this.intensityMinSlider = new Slider(midx, 400, swid/2-10, 25, lg("Jukebox-MinimumIntensity"), 0, 1, val=>this.setIntensityMin(val), ()=>jukeboxSpecs.intensityMin, ()=>getIntensityDesc(jukeboxSpecs.intensityMin));
		this.intensityMaxSlider = new Slider(midx, 430, swid/2-10, 25, lg("Jukebox-MaximumIntensity"), 0, 1, val=>this.setIntensityMax(val), ()=>jukeboxSpecs.intensityMax, ()=>getIntensityDesc(jukeboxSpecs.intensityMax));
		this.favCheckbox = new Checkbox(midx+swid/2, 460, swid/2, 24, lg("Jukebox-FavsOnly"), val=>this.setFavsOnly(val), jukeboxSpecs.favsOnly);
		this.genreButtons = new RadioButtons(midx+swid/2, 340, swid/2, 24, MUSIC_GENRES.map(n=>lg("Jukebox-Genre-"+n)), val=>this.setGenre(val), jukeboxSpecs.genre);
		this.changeRadio = new RadioButtons(midx, HEIGHT-90, swid/2, 30, [lg("Jukebox-Manual"), lg("Jukebox-Shuffle"), lg("Jukebox-Recommend")], val=>this.setChange(val), jukeboxSpecs.recommend ? 2 : jukeboxSpecs.shuffle ? 1 : 0);
		this.saveDefaultButton = new Button(midx+swid/2+5, HEIGHT-40, swid/2, 35, lg("Jukebox-SaveDefault"), ()=>this.saveDefault());
		this.objects = [
			this.songMenu,
			this.returnButton,
			this.pauseButton,
			this.linkButton,
			this.favButton,
			this.positionSlider,
			this.volumeSlider,
			this.focusOutPauseCheckbox,
			this.sortButtons,
			this.favCheckbox,
			this.intensityMinSlider,
			this.intensityMaxSlider,
			this.changeRadio,
			this.genreButtons,
			this.saveDefaultButton,
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
		ctx.fillStyle = palette.background;
		ctx.fillRect(0, 0, WIDTH, HEIGHT);
		ctx.globalAlpha = 1;
		this.objects.forEach(oj=>oj.draw());
	}
	setSliderBounds() {
		this.positionSlider.max = song ? (jukeboxSpecs.shuffle ? music.duration : song.loopEnd) || music.duration : 60;
	}
	refreshList() {
		filterSongList();
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
	setChange(val) {
		switch (val) {
			case 0:
				jukeboxSpecs.shuffle = false;
				jukeboxSpecs.recommend = false;
				break;
			case 1:
				jukeboxSpecs.shuffle = true;
				jukeboxSpecs.recommend = false;
				recommendSongs(lastRecommendedSongs);
				break;
			case 2:
				jukeboxSpecs.shuffle = false;
				jukeboxSpecs.recommend = true;
				if (!song)
					recommendSongs(lastRecommendedSongs);
				break;
		}
		setMusicShuffle(jukeboxSpecs.shuffle);
		this.setSliderBounds();
	}
	setGenre(val) {
		jukeboxSpecs.genre = val;
		this.refreshList();
	}
	saveDefault() {
		settings.musicDontAsk = jukeboxSpecs;
		saveSettings();
	}
}

class JukeboxLinkPopup extends OverScreen {
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
		if (this.clickedOutside()) {
			runnee = this.returnTo;
			return;
		}
		this.buttons.forEach(butt=>butt.update());
	}
	draw() {
		this.returnTo.draw();
		this.fillBackAndFrame(.7, .4);
		this.buttons.forEach(butt=>butt.draw());
	}
}


var songList = SONG_LIST.slice();

var jukeboxSpecs = {
	sort : 0,
	intensityMin : 0,
	intensityMax : 1,
	favsOnly : false,
	shuffle : false,
	recommend : true,
	genre : 0,
}

function filterSongList() {
	songList = SONG_LIST.slice().filter(s=>s.intensity>=jukeboxSpecs.intensityMin && s.intensity<=jukeboxSpecs.intensityMax);
	if (jukeboxSpecs.favsOnly)
		songList = songList.filter(s=>s.fav);
	if (jukeboxSpecs.genre) {
		var genreName = MUSIC_GENRES[jukeboxSpecs.genre];
		songList = songList.filter(s=>s[genreName]);
	}
	SONG_LIST.forEach(s=>s.s=false);
	songList.forEach(s=>s.s=true);
	switch (jukeboxSpecs.sort) {
		case 0: songList.sort((a,b)=> a.by < b.by ? -1 : 1); break;
		case 1: songList.sort((a,b)=> a.name < b.name ? -1 : 1); break;
	}
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