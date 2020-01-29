const MUSIC_LIST = [
	{name:"Decisions",            by:"Eric Matyas", site:"https://soundimage.org/introspective/"},
	{name:"Blue Ridge",           by:"Eric Matyas", site:"http://soundimage.org/quiet-peaceful-mellow/"},
	{name:"Nostalgic 2",          by:"PeriTune",      yt:"rAwL5hyQbhU", site:"https://peritune.com/nostalgic2/"},
	{name:"BattleField 2",        by:"PeriTune",      yt:"SWDVaQ8WAyM", site:"https://peritune.com/battlefield2/",loopStart:9, loopEnd:91.33},
	{name:"Mountainside",         by:"Eric Matyas", site:"https://soundimage.org/quiet-peaceful-mellow/"},
	{name:"Fuji",                 by:"Eric Matyas", site:"http://soundimage.org/naturescience/"},
	{name:"Hong Kong Midnight",   by:"Eric Matyas", site:"https://soundimage.org/world/"},
	{name:"Havoc",                by:"PeriTune",      yt:"yfE5y2uiBX0", site:"https://peritune.com/havoc", loopStart:4.304, loopEnd:112.101},
	{name:"Urban Jungle 2061",    by:"Eric Matyas", site:"http://soundimage.org/sci-fi/"},
	{name:"Dueling With Cyborg Ninjas", by:"Darren Curtis", yt:"j1TSpz7Itso", site:"https://www.darrencurtismusic.com"},
	{name:"Don't Sleep",          by:"Ucchii 0",      yt:"pluUDQCBSso", site:"https://creofuga.net/audios/106981", loopStart:13.81606, loopEnd:97.81608, ogg:true},
	{name:"Feel It In Your Feet", by:"Darren Curtis", yt:"PkQoZNEVZ-4", site:"https://www.darrencurtismusic.com/piano", alt:true},
	{name:"Breeze",               by:"PeriTune",      yt:"RINkM_o-e4I", site:"https://peritune.com/breeze/"},
	{name:"Breeze 2",             by:"PeriTune",      yt:"fVm5ul0y0kk", site:"https://peritune.com/breeze2/"},
	{name:"Still of Night",       by:"Eric Matyas",   site:"https://soundimage.org/city-urban/"},
	{name:"Dusty Memories",       by:"Darren Curtis", yt:"F0k_5H7_OT4", site:"https://www.darrencurtismusic.com/sad-music"},
	{name:"Raid",                 by:"PeriTune",      yt:"T-l4yZGZRZc", site:"https://peritune.com/raid/"},
	{name:"Raid FolkMetal",       by:"PeriTune",      yt:"zpXKr5VK5go", site:"https://peritune.com/raid_folkmetal/"},
	{name:"Kuukan o Tsukishi Mono", by:"Ucchii 0",    yt:"vcJNE87j7js", loopStart:5.903, loopEnd:141.480},
	{name:"Underwater Coolness",  by:"Eric Matyas", site:"https://soundimage.org/nature-science-3/"},
	{name:"War of the Pianos",    by:"Darren Curtis", yt:"CP8HoV4ArHw", site:"https://www.darrencurtismusic.com"},
	{name:"Massacre on Teddy Bear Hill", by:"Darren Curtis", yt:"qG5e8cmoL_s", site:"https://www.darrencurtismusic.com/hybrid-other"},
	{name:"Tempest",              by:"Darren Curtis", yt:"NsSYDbyQteg", site:"https://www.darrencurtismusic.com"},
	{name:"Deep Valley 2",        by:"PeriTune",      yt:"iStkj9BMmWw", site:"https://peritune.com/deep_valley2/"},
	{name:"Prairie",              by:"PeriTune",      yt:"iMkX3NxQYv0", site:"https://peritune.com/prairie/", ogg:true},
	{name:"Exotic",               by:"PeriTune",      yt:"ykiWQdzt4GI", site:"https://peritune.com/exotic/"},
	{name:"Blast 2",              by:"PeriTune",      yt:"3orQ-zmYZiQ", site:"https://peritune.com/blast2/", ogg:true},
	{name:"Beatdown City",        by:"Darren Curtis", yt:"qL4u3u5WKgU", site:"https://www.darrencurtismusic.com"},
	{name:"Let's Party 2",        by:"PeriTune",      yt:"rb8gRa6tTMY", site:"https://peritune.com/lets-party2/"},
	{name:"Up In My Jam (All Of A Sudden)", by:"Kubbi", yt:"6DB6hBRPsWc", site:"https://kubbimusic.com/track/up-in-my-jam-all-of-a-sudden"},
	{name:"Night 2",              by:"PeriTune",      yt:"GO8FavhnqiU", site:"https://peritune.com/night2/"},
	{name:"Machinery",            by:"PeriTune",      yt:"7zT8zYYyxFg", site:"https://peritune.com/machinery/"},
	{name:"BattleField 4",        by:"PeriTune",      yt:"IR1aVoMOoRs", site:"https://peritune.com/battlefield4/", ogg:true},
	{name:"Firmament",            by:"PeriTune",      yt:"4cBY3v4NCsw", site:"https://peritune.com/firmament/", loopStart:8.365, loopEnd:109.615, alt:true},
	{name:"Firmament 2",          by:"PeriTune",      yt:"QlyLJjhyLK8", site:"https://peritune.com/firmament2/", alt:true},
	{name:"Rapid",                by:"PeriTune",      yt:"pjc00EfBuKo", site:"https://peritune.com/rapid/"},
	{name:"Flap",                 by:"PeriTune",      yt:"vHINNBwmbBE", site:"https://peritune.com/flap/"},
	{name:"Seahorse Dreams",      by:"Kubbi",         yt:"DLvrDRRaftQ", site:"https://kubbimusic.com/track/seahorse-dreams"},
	{name:"Rapid 4",              by:"PeriTune",      yt:"g3c-dHAI-ts", site:"https://peritune.com/rapid4/"},
	{name:"Minstrel 2",           by:"PeriTune",      yt:"FLCe8BZRIOM", site:"https://peritune.com/minstrel2/", alt:true},
	{name:"Gothic Dark",          by:"PeriTune",      yt:"brZWB8cdBDs", site:"https://peritune.com/gothic_dark/", loopStart:10.977, loopEnd:89.727},//loopStart:7.482, loopEnd:86.232},
	{name:"Dark Anthem",          by:"Darren Curtis", yt:"G-VY51L2AQU", site:"https://www.darrencurtismusic.com"},// loopStart:0, loopEnd:201.175},//loopStart:8.743, loopEnd:200.673},//
	{name:"Glory Eternal",        by:"Darren Curtis", yt:"Qx1ypzkhTy0", site:"https://www.darrencurtismusic.com"},
	{name:"Secret Power",         by:"Ucchii 0",      yt:"ivspAGvhA8E", site:"https://creofuga.net/audios/106993", loopStart:16.093, loopEnd:330.35, ogg:true},
	{name:"Boat Paint",           by:"Al Gorgeous", site:"https://soundcloud.com/al-goregous/boat-paint"},
	{name:"Strategy 3",           by:"PeriTune",      yt:"tqS-DwicQCo", site:"https://peritune.com/strategy3/"},
	{name:"Dramatic",             by:"PeriTune",      yt:"o2GeoGLDjDg", site:"https://peritune.com/dramatic1/"},
	{name:"Dramatic 2",           by:"PeriTune",      yt:"okBKjTPrzA4", site:"https://peritune.com/dramatic2/"},
	{name:"Dramatic 4",           by:"PeriTune",      yt:"dpBh5abRTh8", site:"https://peritune.com/dramatic4/"},
	{name:"Samurai Sake Showdown",by:"Darren Curtis", yt:"NOGZX7Z4wSI", site:"https://www.darrencurtismusic.com", loopStart:0.7, loopEnd:69.664},
	{name:"Unknown World 2",      by:"PeriTune",      yt:"OpsZR7O5H-A", site:"https://peritune.com/unknownworld2/", alt:true},
	{name:"Demise",               by:"PeriTune",      yt:"Ouj_cwWJdmo", site:"https://peritune.com/demise/", loopStart:13.111, loopEnd:99.403},
	{name:"Seiiki Kessen",        by:"Ucchii 0",      yt:"6Yx2__wLYek", loopStart:11.380, loopEnd:169.484},
];
var MUSIC_HASH = {};
MUSIC_LIST.forEach(function(sing, dex) {
	sing.description = "\"" + sing.name + "\" by " + sing.by + ". Click to listen.";
	MUSIC_HASH[sing.name + " - " + sing.by] = sing;
	MUSIC_HASH[sing.name] = sing;
	sing.index = dex;
});

function Jukebox() {
	var thisser = this;
	var midx = settings.width/2;
	var thic = 190;
	var ritx = settings.width-thic-10;;
	this.songMenu = new ScrollMenu(0, 0, midx-10, mainHeight()-49, function(elem) {
			playMusic(elem);
			thisser.pauseButton.text = "Pause";
			thisser.switchButton.active = elem.alt;
			thisser.siteButton.active = elem.site;
			thisser.youtubeButton.active = elem.yt;
			thisser.setSliderBounds();
		}, MUSIC_LIST, "by", "description", function(){return true}, function(val){return val == song}),
	this.returnButton = new Button(ritx, mainHeight()-50, thic, 40, "Main Menu", "Return to the main menu.", function(){switchScreen(MainMenu)}),
	this.pauseButton = new Button(midx, 10, thic, 40, music.paused?"Play":"Pause", "Play or pause the current music.", function(){if(music.paused) {music.play(); this.text = "Pause"} else {music.pause(); this.text = "Play"}}),
	this.switchButton = new Button(midx, 60, thic, 40, "Switch", "Switch between the versions of this song.", switchMusic);
	this.switchButton.active = false;
	this.siteButton = new Button(ritx, 10, thic, 40, "Artist's site", "See the current music on the artist's site. You might need to allow popups for this to work.", function(){window.open(song.site)}, false),
	this.siteButton.active = song && song.site;
	this.youtubeButton = new Button(ritx, 60, thic, 40, "YouTube", "See the current music on YouTube. You might need to enable popups for this to work.", function(){window.open("https://youtu.be/"+song.yt)}, false),
	this.youtubeButton.active = song && song.yt;
	var swid = Math.floor(midx/3)-3;
	this.sortOrderButton = new Button(5, mainHeight()-45, swid-10, 40, "Index", "Sort the songs by the order used in the game.", function(){MUSIC_LIST.sort(function(a,b){return a.index - b.index}); thisser.songMenu.putItems()}),
	this.sortNameButton = new Button(swid+5, mainHeight()-45, swid-10, 40, "Name", "Sort the songs by alphabetical order.", function(){MUSIC_LIST.sort(function(a,b){return a.name < b.name ?-1:1}); thisser.songMenu.putItems()}),
	this.sortArtistButton = new Button(2*swid+5, mainHeight()-45, swid-10, 40, "Artist", "Sort the songs by artist.", function(){MUSIC_LIST.sort(function(a,b){return a.by < b.by ?-1:1}); thisser.songMenu.putItems()}),
	this.positionSlider = new Slider(midx, 300, midx-10, 50, "Position", "Change the position of the music", 0, 60, setMusicPosition, getMusicPosition)
	this.setSliderBounds();
	this.objects = [
		this.songMenu,
		this.returnButton,
		this.pauseButton,
		this.switchButton,
		this.siteButton,
		this.youtubeButton,
		this.sortOrderButton,
		this.sortNameButton,
		this.sortArtistButton,
		this.positionSlider,
	]
}
Jukebox.prototype = Object.create(ScreenBase);
Jukebox.prototype.update = function() {
	if (!this.positionSlider.max)
		this.setSliderBounds();
	this.objects.forEach(oj=>oj.update());
}
Jukebox.prototype.setSliderBounds = function () {
	this.positionSlider.max = song ? song.loopEnd || music.duration : 60;
}
/*Jukebox.prototype.update = function() {
	this.objects.forEach(function(oj) {
		oj.update();
	});
}
Jukebox.prototype.draw = function() {
	clearBack();
	this.objects.forEach(function(oj) {
		//console.log(oj)
		oj.draw();
	});
}*/

//this.particles.push(new MusicInfoBar(name));
var music = document.createElement("audio");
var songName;
var song;
var musicIsAlt;
//var canPlayOgg = !!(music.canPlayType && music.canPlayType('audio/ogg; codecs="vorbis"'));

function initMusic() {
	music.preload = "auto";
	music.controls = "none";
	music.style.display = "none";
	if (typeof music.loop == 'boolean') {
		music.loop = true;
	} else {
		music.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
		}, false);
	}
	document.body.appendChild(music);
}

function playMusic(sin) {
	if (sin == null) {
		music.pause();
		return;
	}
	if (typeof sin == "string") {
		sin = MUSIC_HASH[sin];
	}
	if (sin == song) {
		music.play();
		return;
	}
	song = sin;
	musicIsAlt = false;
	songName = song.name + " - " + song.by;
	var unsce = songName.replace(/\s/g, "");
	var end = "mp3"//(canPlayOgg && song.ogg) ? "ogg" : "mp3";
	music.src = "src/Music/"+unsce+"."+end;
	music.currentTime = 0;
	music.play();
}

function switchMusic() {
	if (song.alt) {
		var tim = music.currentTime;
		musicIsAlt = !musicIsAlt;
		var unsce = songName.replace(/\s/g, "");
		var end = "mp3"//(canPlayOgg && song.ogg) ? "ogg" : "mp3";
		music.src = "src/Music/" + unsce+(musicIsAlt ? "_Alt" : "") + "." + end;
		music.currentTime = tim;
		music.play();
	}
}

function setMusicVolume(pingas) {
	music.volume = pingas;
}

function getMusicPosition() {
	return !song ? 0 : music.currentTime.toFixed(2);
}
function setMusicPosition(port) {
	/*var p = !music.paused;
	if (p)
		music.pause();
	music.currentTime = port;
	if (p)
		music.play();*/
	music.currentTime = port;
}

function musicLoopCheck() {
	//console.log(music.currentTime);
	if (song && song.loopEnd && music.currentTime >= song.loopEnd) {
		var d = song.loopEnd - song.loopStart;
		//music.pause();
		music.currentTime -= d;
		//music.play();
	}
}

function disableLooping() {
	musicLoopChack = doNothing;
}

/*var musicLoop = document.createElement("audio");
var musicIntro = document.createElement("audio");
var musicPoint = document.createElement("audio");
var music = musicLoop;
var songName;
var song;
var canPlayOgg = !!(music.canPlayType && music.canPlayType('audio/ogg; codecs="vorbis"'));

function initMusic() {
	musicLoop.preload = "auto"; musicIntro.preload = "auto"; musicPoint.preload = "auto";
	musicLoop.controls = "none"; musicIntro.controls = "none"; musicPoint.controls = "none";
	musicLoop.style.display = "none"; musicIntro.style.display = "none";  musicPoint.style.display = "none";
	if (typeof musicLoop.loop == 'boolean') {
		musicLoop.loop = true;
	} else {
		musicLoop.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
		}, false);
	}
	musicIntro.addEventListener('ended', function() {
		this.pause();
		this.src = "";
        music = musicLoop;
		musicLoop.currentTime = 0;
		musicLoop.play();
    }, false);
	musicPoint.addEventListener('ended', function() {
		this.currentTime = song.loopPoint;
		this.play();
	}, false);
	document.body.appendChild(musicIntro);
	document.body.appendChild(musicLoop);
	document.body.appendChild(musicPoint);
}

playMusic = function(sin) {
	if (sin == null) {
		music.pause();
		return;
	}
	//if (settings.music == "Off") {
	//	return false;
	//}
	if (typeof sin == "string") {
		sin = MUSIC_HASH[sin]
	}
	if (sin == song) {
		music.play();
		return;
	}
	song = sin;
	songName = song.name + " - " + song.by;
	unsce = songName.replace(/\s/g, "");
	end = (canPlayOgg && song.ogg) ? "ogg" : "mp3";
	musicIntro.pause();
	musicLoop.pause();
	musicPoint.pause();
	if (song.loopPoint) {
		musicIntro.src = "";
		musicLoop.src = "";
		music = musicPoint;
		musicPoint.src = "src/Music/"+unsce+"."+end;
	} else {
		musicLoop.src = "src/Music/"+unsce+"."+end;
		if (song.intro) {
			music = musicIntro;
			musicIntro.src = "src/Music/"+unsce+"_Intro."+end;
		} else {
			musicIntro.src = "";
			music = musicLoop;
		}
	}
	music.currentTime = 0;
	music.play();
}

function setMusicVolume(pingas) {
	console.log(pingas);
	musicIntro.volume = pingas;
	musicLoop.volume = pingas;
	musicPoint.volume = pingas;
}*/
