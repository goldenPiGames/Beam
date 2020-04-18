var lastRecommendedSongs;

function recommendSongs(list) {
	if (!list)
		return;
	lastRecommendedSongs = list;
	if (!jukeboxSpecs.recommend)
		return;
	if (typeof list == "string")
		playMusic(list);
	var found = list.find(s=>SONG_HASH[s]&&SONG_HASH[s].s) || list.find(s=>SONG_HASH[s]);
	playMusic(found);
}

const SONGREC = {
	mainMenu : ["Decisions"],
	main : {
		PipePath : ["Exit the Premises", "Sunday Night Sailing", "Blip Stream"],
		Maze : ["Blue Sky", "Deep Valley 2", "遥かなる冒険"],
		WalkOnce : ["Flap", "Firmament", "ステージ4"],
		ToggleGates : ["Lost Place", "Investigation 3", "決戦の地へ"],
		Gridlock : ["Beatdown City", "Feel It In Your Feet", "勝利を信じて"],
		SameGame : ["レイピアを継ぐ少女", "神秘の海を越えて", "ステージ5"],
		ConcentricCircles : ["Gambles", "March of the Spoons", "Pixelland"],
	},
	race : {
		same : ["まだ見ぬ明日への誓い", "レイピアを継ぐ少女"],
	},
	boss : ["Don't Sleep", "Collapse of the Labyrinth"],
}

//checks to make sure I didn't misspell any of the song names
function checkSongRec(from = SONGREC) {
	if (Array.isArray(from)) {
		from.forEach(s=>{
			if(!SONG_HASH[s])
				throw s;
		});
	} else {
		for (var thing in from) {
			checkSongRec(from[thing]);
		}
	}
}
