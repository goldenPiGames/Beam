const VERSION_ARMOR_GAMES = true;
const VERSION_KONGREGATE = false;
const VERSION_NEWGROUNDS = false;
const VERSION_COOLMATH = false;
const FULLSCREEN_BUTTONS = false;
const ALWAYS_RESIZE = false;
const EXTERNAL_LINKS = true;
const MULTIPLAYER_IN = true;
const STRIP_SONGS = "armor";

//https://armorgames.readme.io/docs/usage
document.domain = "armorgames.com";
var ag = null;
var agiChecks;

function checkForAGI() {
	if (agiChecks > 1000) {
		console.log("AGI loading abandoned");
		return;
	}
	try {
		console.log(parent.agi);
		if (typeof parent.agi !== 'undefined') {
			ag = new ArmorGames({
				user_id: parent.apiAuth.user_id,
				auth_token: parent.apiAuth.auth_token,
				game_id: parent.apiAuth.game_id,
				api_key: 'D2133A6B-D315-420E-9D35-B301F4A471D6',
				agi: parent.agi
			});

			// ... you can start doing AG requests
		} else {
			agiChecks++;
			window.setTimeout(checkForAGI, 250);
		}
	} catch(err) {
		agiChecks++;
		window.setTimeout(checkForAGI, 250);
	}
}

function submitToAPI(key, value) {
	//TODO something
}

document.addEventListener("DOMContentLoaded", function(event) {
	console.log("AGI loading attempt started");
	agiChecks = 0;
	checkForAGI();
});