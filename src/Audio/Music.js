
//this.particles.push(new MusicInfoBar(name));
var music;
var songName;
var song;
var musicIsAlt;
//var canPlayOgg = !!(music.canPlayType && music.canPlayType('audio/ogg; codecs="vorbis"'));

function initMusic() {
	music = document.getElementById("Music");
	setMusicShuffle(jukeboxSpecs.shuffle);
}

function playMusic(sin) {
	if (!music) {
		//return;
	}
	if (sin == null) {
		music.pause();
		return;
	}
	if (typeof sin == "string") {
		sin = SONG_HASH[sin];
	}
	//console.log(sin, song, music.src, sin.src)
	if (sin == song && sin == songLast) {
		if (music.paused)
			music.play();
		return;
	}
	song = sin;
	songLast = sin;
	musicIsAlt = false;
	music.src = song.src;
	music.currentTime = 0;
	music.volume = settings.music;
	if (settings.music)
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

function setMusicShuffle(val) {
	if (val) {
		if (typeof music.loop == 'boolean') {
			music.loop = false;
		} else {
			music.removeEventListener('ended', awkwardLoopSubstitute, false);
		}
		music.addEventListener('ended', shuffleMusic, false);
	} else {
		music.removeEventListener('ended', shuffleMusic, false);
		if (typeof music.loop == 'boolean') {
			music.loop = true;
		} else {
			music.addEventListener('ended', awkwardLoopSubstitute, false);
		}
	}
}

function awkwardLoopSubstitute() {
	this.currentTime = 0;
	this.play();
}

function shuffleMusic() {
	var failsafe = 10;
	var toplay = null;
	while(failsafe > 0 && (!toplay || toplay == song)) {
		failsafe--;
		toplay = randomTerm(songList);
	}
	playMusic(toplay)
}

function setMusicVolume(pingas) {
	if (!music)
		return;
	var sp;
	//console.log(music.volume, pingas);
	if (!pingas) {
		if (music.volume) {
			music.pause();
			//music.currentTime = 0;
			songLast = song;
		}
	} else if (!music.volume) {
		sp = true;
	}
	music.volume = pingas;
	if (sp) {
		playMusic(song);
	}
}

function getMusicPosition() {
	return !song ? 0 : music.currentTime.toFixed(2);
}

function setMusicPosition(tim) {
	if (tim == tim)
		music.currentTime = tim;
}

function musicLoopCheck() {
	//console.log(music.currentTime);
	if (!jukeboxSpecs.shuffle && song && song.loopEnd && music.currentTime >= song.loopEnd) {
		var d = song.loopEnd - song.loopStart;
		//music.pause();
		music.currentTime -= d;
		//music.play();
	}
}

var musicWasPlaying = true;

function musicFocus() {
	if (settings.focusOutPause) {
		if (musicWasPlaying)
			music.play();
	}
}

function musicFocusOut() {
	if (settings.focusOutPause) {
		musicWasPlaying = !music.paused;
		music.pause();
	}
}