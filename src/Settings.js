var settings = {
	//lang : "en",
	music : .8,
	sfx : .8,
	focusOutPause : true,
	profanity : false,
	font : "sans-serif",
	sfxSystem : "audio",
	background_color : "#000000",
	normal_color : "#FFFFFF",
	beam_color : "#FF0000",
	hover_color : "#00DDFF",
	click_color : "#00FF00",
	disabled_color : "#808080",
	samegame0_color : "#0000FF",
	samegame1_color : "#00FF00",
	samegame2_color : "#FFFF00",
	samegame3_color : "#FF00FF",
	samegame4_color : "#FF8000",
	samegame5_color : "#008000",
	samegame6_color : "#808080",
	samegame7_color : "#808000",
	player_color : "#7F7F7F",
	colorblind : false,
	rainbowBeam : true,
	name : "Anon " + Math.floor((Math.random()*36**4)).toString(36).toUpperCase(),
	musicDontAsk : false,
	bgNumber : 1/5,
	alertDrag : true,
	cursorParticles : true,
}

function loadSettings() {
	var loaded = localStorage.getItem("BeamSettings");
	if (loaded) {
		loaded = JSON.parse(loaded);
		for (sett in loaded) {
			settings[sett] = loaded[sett];
		}
	}
	loadFavSongs();
	loadPaletteFromSettings();
	setMusicVolume(settings.music);
	applyFont(settings.font);
}

function saveSettings() {
	localStorage.setItem("BeamSettings", JSON.stringify(settings));
}

function profane() {
	return settings.profanity;
}

function doSettings() {
	runnee = new SettingsScreen();
}

function setFont(now) {
	settings.font = now;
	applyFont(settings.font);
}

function applyFont(now) {
	document.body.font = now;
	if (inputs)
		inputs.forEach(i=>i.style.fontFamily=now);
}