
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
	if (sin == null) {
		music.pause();
		return;
	}
	if (typeof sin == "string") {
		sin = SONG_HASH[sin];
	}
	if (sin == song) {
		music.play();
		return;
	}
	song = sin;
	musicIsAlt = false;
	music.src = song.src;
	music.currentTime = 0;
	music.volume = settings.music;
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
	playMusic(randomTerm(songList));
}

function setMusicVolume(pingas) {
	if (!music)
		return;
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
	if (!jukeboxSpecs.shuffle && song && song.loopEnd && music.currentTime >= song.loopEnd) {
		var d = song.loopEnd - song.loopStart;
		//music.pause();
		music.currentTime -= d;
		//music.play();
	}
}