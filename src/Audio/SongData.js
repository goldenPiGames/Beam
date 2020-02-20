const SONG_LIST = [
	{name:"Boat Paint", intensity:1/4,
		by:"Al Gorgeous", sc:"al-goregous/boat-paint"},
	{name:"Beatdown City", intensity:3/4,
		by:"Darren Curtis", yt:"qL4u3u5WKgU", site:"https://www.darrencurtismusic.com", siten:"DarrenCurtisMusic.com", sc:"desperate-measurez/beatdown-city-80s-action-theme-royalty-free", pat:"darrencurtismusic"},
	{name:"Dark Anthem", intensity:3/4,
		by:"Darren Curtis", yt:"G-VY51L2AQU", site:"https://www.darrencurtismusic.com", siten:"DarrenCurtisMusic.com", pat:"darrencurtismusic"},
	{name:"Dueling With Cyborg Ninjas", intensity:1,
		by:"Darren Curtis", yt:"j1TSpz7Itso", site:"https://www.darrencurtismusic.com", siten:"DarrenCurtisMusic.com", sc:"desperate-measurez/dueling-with-cyborg-ninjas-sci-fi-royalty-free-music", pat:"darrencurtismusic"},
	{name:"Dusty Memories", intensity:0,
		by:"Darren Curtis", yt:"F0k_5H7_OT4", site:"https://www.darrencurtismusic.com/sad-music", siten:"DarrenCurtisMusic.com", pat:"darrencurtismusic"},
	{name:"Feel It In Your Feet", intensity:1/2,
		by:"Darren Curtis", yt:"PkQoZNEVZ-4", site:"https://www.darrencurtismusic.com/piano", siten:"DarrenCurtisMusic.com", pat:"darrencurtismusic"},
	{name:"Massacre on Teddy Bear Hill", intensity:3/4,
		by:"Darren Curtis", yt:"qG5e8cmoL_s", site:"https://www.darrencurtismusic.com/hybrid-other", siten:"DarrenCurtisMusic.com", sc:"desperate-measurez/massacre-on-teddy-bear-hill-royalty-free-music", pat:"darrencurtismusic"},
	{name:"Samurai Sake Showdown", intensity:3/4, loopStart:0.7, loopEnd:69.664,
		by:"Darren Curtis", yt:"NOGZX7Z4wSI", site:"https://www.darrencurtismusic.com", siten:"DarrenCurtisMusic.com", sc:"desperate-measurez/samurai-sake-showdown-asian-royalty-free-music", pat:"darrencurtismusic"},
	{name:"War of the Pianos",
		by:"Darren Curtis", yt:"CP8HoV4ArHw", site:"https://www.darrencurtismusic.com", siten:"DarrenCurtisMusic.com", sc:"desperate-measurez/war-of-the-pianos-royalty-free", pat:"darrencurtismusic"},
	{name:"Decisions", intensity:0, bpm:95.34,
		by:"Eric Matyas", site:"https://soundimage.org/introspective/", siten:"SoundImage.org", sc:"eric-matyas/decisions"},
	{name:"Hong Kong Midnight", intensity:0,
		by:"Eric Matyas", site:"https://soundimage.org/world/", siten:"SoundImage.org"},
	{name:"Light Years", intensity:1/4,
		by:"Eric Matyas", site:"https://soundimage.org/naturescience-2/", siten:"SoundImage.org", sc:"eric-matyas/light-years-1"},
	{name:"Mysterious Deep", intensity:0,
		by:"Eric Matyas", site:"https://soundimage.org/nature-science-3/", siten:"SoundImage.org"},
	{name:"Still of Night", intensity:0,
		by:"Eric Matyas", site:"https://soundimage.org/city-urban/", siten:"SoundImage.org", sc:"eric-matyas/still-of-night"},
	{name:"Urban Jungle 2061", intensity:1/4,
		by:"Eric Matyas", site:"http://soundimage.org/sci-fi/", siten:"SoundImage.org", sc:"eric-matyas/urban-jungle-2061"},
	{name:"Underwater Coolness", intensity:1/4,
		by:"Eric Matyas", site:"https://soundimage.org/nature-science-3/", siten:"SoundImage.org"},
	{name:"Flex", intensity:3/4,
		by:"Jeremy Blake", yt:"dK0C536YxA0"},
	{name:"Blip Stream", intensity:1/2,
		by:"Kevin MacLeod", yt:"9np9KK4ccuA", site:"https://incompetech.com/music/royalty-free/index.html?isrc=usuan1500056", siten:"Incompetech", sc:"kevin-9-1/blip-stream", pat:"kmacleod"},
	{name:"Exit the Premises", intensity:3/4,
		by:"Kevin MacLeod", yt:"Yy-NyPTRYU8", site:"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1500029", siten:"Incompetech", sc:"kevin-9-1/exit-the-premises", pat:"kmacleod"},
	{name:"Fearless First", intensity:1/4,
		by:"Kevin MacLeod", yt:"NrwsOuJ2VvY", site:"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1600058", siten:"Incompetech", sc:"kevin-9-1/fearless-first", pat:"kmacleod"},
	{name:"Pixelland", intensity:1/4,
		by:"Kevin MacLeod", yt:"Z-bi29z4Z1k", site:"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1500076", siten:"Incompetech", sc:"kevin-9-1/pixelland", pat:"kmacleod"},
	{name:"Who Likes to Party", intensity:1/2,
		by:"Kevin MacLeod", yt:"O-2DwDG0EqM", site:"https://incompetech.com/music/royalty-free/index.html?isrc=usuan1200075", siten:"Incompetech", pat:"kmacleod"},
	{name:"Up In My Jam (All Of A Sudden)", intensity:3/4,
		by:"Kubbi", yt:"6DB6hBRPsWc", site:"https://kubbimusic.com/track/up-in-my-jam-all-of-a-sudden", siten:"KubbiMusic.com", sc:"kubbi/up-in-my-jam-all-of-a-sudden", ng:538102},
	{name:"Seahorse Dreams", intensity:3/4,
		by:"Kubbi", yt:"DLvrDRRaftQ", site:"https://kubbimusic.com/track/seahorse-dreams", siten:"KubbiMusic.com", sc:"kubbi/seahorse-dreams", ng:538406},
	{name:"Deep Valley 2", intensity:0,
		by:"PeriTune", yt:"iStkj9BMmWw", site:"https://peritune.com/deep_valley2/", siten:"PeriTune.com", sc:"sei_peridot/deep-valley2"},
	{name:"Firmament", loopStart:8.365, loopEnd:109.615, alt:true, intensity:1/4,
		by:"PeriTune", yt:"4cBY3v4NCsw", site:"https://peritune.com/firmament/", siten:"PeriTune.com", sc:"sei_peridot/firmament-calm"},
	{name:"Firmament 2", intensity:1/4,
		by:"PeriTune", yt:"QlyLJjhyLK8", site:"https://peritune.com/firmament2/", siten:"PeriTune.com", sc:"sei_peridot/firmament2_calm", alt:true},
	{name:"Gothic Dark", intensity:1, loopStart:10.977, loopEnd:89.727,
		by:"PeriTune", yt:"brZWB8cdBDs", site:"https://peritune.com/gothic_dark/", siten:"PeriTune.com", sc:"sei_peridot/gothic-dark"},
	{name:"Havoc", intensity:1, loopStart:4.304, loopEnd:112.101,
		by:"PeriTune", yt:"yfE5y2uiBX0", site:"https://peritune.com/havoc", siten:"PeriTune.com", sc:"sei_peridot/havoc"},
	{name:"Investigation 3", intensity:1/4,
		by:"PeriTune", yt:"NhpYAtmA-mk", site:"https://peritune.com/investigation3/", siten:"PeriTune.com", sc:"sei_peridot/investigation3"},
	{name:"Let's Party 2", intensuty:1/2,
		by:"PeriTune", yt:"rb8gRa6tTMY", site:"https://peritune.com/lets-party2/", siten:"PeriTune.com", sc:"sei_peridot/lets-party2"},
	{name:"Lost Place", intensity:1/4,
		by:"PeriTune", yt:"L7XPGa67poA", site:"https://peritune.com/lost-place/", siten:"PeriTune.com", sc:"sei_peridot/lost-place"},
	{name:"Night 2", intensity:1/2,
		by:"PeriTune", yt:"GO8FavhnqiU", site:"https://peritune.com/night2/", siten:"PeriTune.com", sc:"sei_peridot/night-2"},
	{name:"Raid FolkMetal", intensity:1,
		by:"PeriTune", yt:"zpXKr5VK5go", site:"https://peritune.com/raid_folkmetal/", siten:"PeriTune.com", sc:"sei_peridot/raid_folkmetal"},
	{name:"Raid FolkMetal 2", intensity:1,
		by:"PeriTune", yt:"0w-rRQq67HE", site:"https://peritune.com/raid_folkmetal2/", siten:"PeriTune.com", sc:"sei_peridot/raid_folkmetal2"},
	{name:"Unknown World 2", intensity:1/2, alt:true,
		by:"PeriTune", yt:"OpsZR7O5H-A", site:"https://peritune.com/unknownworld2/", siten:"PeriTune.com", sc:"sei_peridot/unknownworld2"}, //alt sc:"sei_peridot/unknownworld2_harp"
	{name:"Inside Prism City", intensity:1/4,
		by:"TeknoAXE", yt:"GW2gm806RUc", site:"http://teknoaxe.com/Link_Code_2.php?q=170", siten:"TeknoAXE.com"},
	{name:"Looked Back Saw Nothing - Kenyon", bpm:100, intensity:0,
		by:"Twin Musicom", yt:"A1LiBWXE_08", site:"http://www.twinmusicom.org/song/273/looked-back-saw-nothing-kenyon", siten:"TwinMusicom.org",},
	{name:"Don't Sleep", intensity:1, loopStart:13.81606, loopEnd:97.81608, bpm:160,
		by:"Ucchii 0", yt:"pluUDQCBSso", site:"https://creofuga.net/audios/106981", siten:"CreoFuga"},
	{name:"Gambles", intensity:1, bpm:155,
		by:"Ucchii 0", yt:"lp7oqpZW7xQ"},
	{name:"Secret Power", intensity:1, loopStart:16.093, loopEnd:330.35, bpm:165, intensity:1,
		by:"Ucchii 0", yt:"ivspAGvhA8E", site:"https://creofuga.net/audios/106993", siten:"CreoFuga"},
	{name:"空間を突きし者", fname:"Kuukan o Tsukishi Mono", intensity:1, loopStart:5.903, loopEnd:141.480,
		by:"Ucchii 0", yt:"vcJNE87j7js"},
	{name:"聖域決戦", fname:"Seiiki Kessen", intensity:1, loopStart:11.380, loopEnd:169.484,
		by:"Ucchii 0", yt:"6Yx2__wLYek"},
]
var SONG_HASH = {};
SONG_LIST.forEach(function(sing, dex) {
	sing.description = "\"" + sing.name + "\" by " + sing.by + ". Click to listen.";
	if (!sing.iname)
		sing.iname = ((sing.fname || sing.name) + "-" + sing.by).replace(/\s/g, "");
	sing.src = "src/Audio/Songs/" + sing.iname + ".mp3";
	SONG_HASH[sing.iname] = sing;
	SONG_HASH[sing.name + " - " + sing.by] = sing;
	SONG_HASH[sing.name] = sing;
	sing.index = dex;
	sing.siteList = [];
	if (sing.site)
		sing.siteList.push({name:sing.siten, href:sing.site});
	if (sing.yt)
		sing.siteList.push({name:"YouTube", href:"https://www.youtube.com/watch?v="+sing.yt});
	if (sing.sc)
		sing.siteList.push({name:"SoundCloud", href:"https://soundcloud.com/"+sing.sc});
	if (sing.ng)
		sing.siteList.push({name:"Newgrounds", href:"https://www.newgrounds.com/audio/listen/"+sing.ng});
	if (sing.pat)
		sing.siteList.push({name:"Patreon", href:"https://www.patreon.com/"+sing.pat});
});

function loadFavSongs() {
	var loaded = localStorage.getItem("FavSongs");
	if (loaded) {
		var favs = JSON.parse(loaded);
		SONG_LIST.forEach(sing => sing.fav = favs[sing.iname]);
	}
}

function toggleFavSong(sing) {
	if (sing) {
		sing.fav = !sing.fav;
		var favs;
		var loaded = localStorage.getItem("FavSongs");
		if (favs) {
			favs = JSON.parse(loaded);
			favs[sing.iname] = sing.fav;
		} else {
			favs = {};
			SONG_LIST.forEach(sang => favs[sang.iname] = sang.fav);
		}
		localStorage.setItem("FavSongs", JSON.stringify(favs));
	}
}

