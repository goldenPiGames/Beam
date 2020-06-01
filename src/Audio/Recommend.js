var lastRecommendedSongs;
var askedMusic

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

function recommendSilence() {
	playMusic(null);
}

const SONGREC = {
	mainMenu : ["Decisions"],
	main : {
		PipePath : ["Exit the Premises", "Broken Record Blues", "Blip Stream"],
		Maze : ["Blue Sky", "Deep Valley 2", "遥かなる冒険"],
		WalkOnce : ["Flex", "Labyrinth", "ステージ4"],
		ToggleGates : ["Lost Place", "Investigation 3", "決戦の地へ"],
		Gridlock : ["Beatdown City", "Feel It In Your Feet", "Boat Paint", "勝利を信じて"],
		SameGame : ["レイピアを継ぐ少女", "神秘の海を越えて", "ステージ5"],
		ConcentricCircles : ["Up In My Jam (All Of A Sudden)", "March of the Spoons", "Pixelland"],
	},
	infinite : {
		PipePath : ["Fearless First"],
		Maze : [],
		WalkOnce : ["Labyrinth"],
		ToggleGates : [],
		Gridlock : [],
		SameGame : [],
		ConcentricCircles : [],
	},
	race : {
		PipePath : ["Chaoz Fantasy", "Chaoz Fantasy (8-bit)", "聖域決戦"],
		Maze : ["Raid FolkMetal 2", "Raid FolkMetal", "Rapid 4", "Prairie 5", "Blue Sky"],
		WalkOnce : ["Dramatic", "Dramatic 3", "Dramatic 4", "Deadly Sins"],
		ToggleGates : ["Flap", "Dramatic 2", "Secret Power"],
		Gridlock : ["Dueling With Cyborg Ninjas", "Dark Anthem"],
		SameGame : ["まだ見ぬ明日への誓い", "レイピアを継ぐ少女", "勝利を信じて"],
		ConcentricCircles : ["Gambles"],
	},
	boss : ["Don't Sleep", "Collapse of the Labyrinth"],
}



class MusicAskScreen extends Screen {
	constructor() {
		super();
		this.dontAsk = false;
		this.objects = [
			...MUSICASK_OPTIONS.map((o, i)=>new Button(WIDTH/3, HEIGHT/3+i*HEIGHT/10, WIDTH/3, 45, lg(o.lName), ()=>this.optClicked(o))),
			new Checkbox(WIDTH/4, HEIGHT-35, WIDTH/2, 30, lg("MusicAsk-DontAsk"), val=>this.dontAsk=val, false),
		];
	}
	update() {
		this.objects.forEach(oj=>oj.update());
	}
	draw() {
		ctx.fillStyle = palette.normal;
		drawTextInRect(lg("MusicAsk-Heading"), 10, 20, WIDTH-20, HEIGHT/4);
		this.objects.forEach(oj=>oj.draw());
	}
	optClicked(op) {
		console.log(op)
		for (var p in op.specs) {
			jukeboxSpecs[p] = op.specs[p];
		}
		settings.musicDontAsk = this.dontAsk ? jukeboxSpecs : false;
		saveSettings();
		filterSongList();
		setMusicShuffle(jukeboxSpecs.shuffle);
		if (op.jukebox)
			runnee = new Jukebox(new MainMenu());
		else
			runnee = new MainMenu();
	}
}
MusicAskScreen.prototype.overrideTouch = false;

const MUSICASK_OPTIONS = [
	{
		lName : "MusicAsk-RecommendAny",
		specs: {
			genre : 0,
			intensityMin : 0,
			intensityMax : 1,
			shuffle : false,
			recommend : true,
		}
	},
	{
		lName : "MusicAsk-RecommendCalm",
		specs: {
			genre : 0,
			intensityMin : 0,
			intensityMax : 1/4,
			shuffle : false,
			recommend : true,
		}
	},
	{
		lName : "MusicAsk-RecommendChiptune",
		specs: {
			genre : 1,
			intensityMin : 0,
			intensityMax : 1,
			shuffle : false,
			recommend : true,
		}
	},
	{
		lName : "MusicAsk-Jukebox",
		jukebox : true,
		specs: {
			genre : 0,
			intensityMin : 0,
			intensityMax : 1,
			shuffle : false,
			recommend : false,
		}
	},
	{
		lName : "MusicAsk-Nothing",
		specs: {
			genre : 0,
			intensityMin : 0,
			intensityMax : 1,
			shuffle : false,
			recommend : false,
		}
	},
	
]

function loadMusicRec() {
	jukeboxSpecs = settings.musicDontAsk;
	filterSongList();
	setMusicShuffle(jukeboxSpecs.shuffle);
}

//checks to make sure I didn't misspell any of the song names
function checkSongRec(from = SONGREC, key = "start") {
	if (Array.isArray(from)) {
		from.forEach(s=>{
			if(!SONG_HASH[s])
				throw s;
			else {
				//console.log(SONG_HASH[s].src);
				if (!SONG_HASH[s].used)
					SONG_HASH[s].used = key
			}
		});
	} else {
		for (var thing in from) {
			checkSongRec(from[thing], key+"."+thing);
		}
	}
}
