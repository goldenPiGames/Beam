const VERSION_KONGREGATE = false;
const VERSION_NEWGROUNDS = false;
const VERSION_ARMOR_GAMES = false;
const VERSION_COOLMATH = true;
const FULLSCREEN_BUTTONS = false;
const ALWAYS_RESIZE = true;
const EXTERNAL_LINKS = false;
const MULTIPLAYER_IN = false;
const STRIP_SONGS = "coolmath";
var SITELOCKS = ["https://www.coolmathgames.com", "www.coolmathgames.com", "edit.coolmathgames.com", "www.stage.coolmathgames.com", "edit-stage.coolmathgames.com", "dev.coolmathgames.com", "m.coolmathgames.com", "https://www.coolmath-games.com", "www.coolmath-games.com", "edit.coolmath-games.com", "edit-stage.coolmath-games.com", "dev.coolmath-games.com", "m.coolmath-games.com", "C:/HTML5/Beam/submitCoolMath"];

let url = window.location.href;
console.log(url);
var sitelockFound = SITELOCKS.find(s=>url.includes(s));
if (!sitelockFound) {
	throw "this isn't the right site";
}

var coolmathSplash = new Image();
coolmathSplash.src = "src/CoolmathGamesSplash.png";

document.title = "Beam - Play it now at CoolmathGames.com";

function submitToAPI(key, value) {
	//console.log(key + " : " + value);
	try {
		if (key == "LevelStart") {
			console.log("start : " + value);
			parent.cmgGameEvent("start", value);
		} else if (key == "LevelReplay") {
			console.log("replay : " + value);
			parent.cmgGameEvent("replay", value);
		}
	} catch (e) {
		
	}
}

function unlockAllLevels() {
	MAIN_LEVEL_SEQS.forEach(seq=> {
		var prog = localStorage.setItem("Beam"+seq.id+"Progress", seq.levelIDs.length - 1);
	});
	if (runnee instanceof LevelSelectLinearScreen) {
		switchScreen(new LevelSelectLinearScreen());
	}
	qAlert(lg("Coolmath-UnlockAllLevels"))
}