var settings = {
	//lang : "en",
	music : .8,
	sfx : .8,
	profanity : false,
	font : "sans-serif",
	sfxSystem : "audio",
	background_color : "#000000",
	normal_color : "#FFFFFF",
	beam_color : "#FF0000",
	hover_color : "#00DDFF",
	click_color : "#00FF00",
	disabled_color : "#808080",
}

function mainHeight() {
	return settings.height - settings.infoHeight;
}

function loadSettings() {
	var loaded = localStorage.getItem("BeamSettings");
	if (loaded) {
		loaded = JSON.parse(loaded);
		for (sett in loaded) {
			settings[sett] = loaded[sett];
		}
	}
	setMusicVolume(settings.music);
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
