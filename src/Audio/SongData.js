const SONG_LIST = [
	{name:"Decisions",
		by:"Eric Matyas", site:"https://soundimage.org/introspective/", siten:"SoundImage.org", sc:"eric-matyas/decisions",
		bpm:95.34},
	{name:"Hong Kong Midnight",
		by:"Eric Matyas", site:"https://soundimage.org/world/", siten:"SoundImage.org"},
	{name:"Light Years", 
		by:"Eric Matyas", site:"https://soundimage.org/naturescience-2/", siten:"SoundImage.org", sc:"eric-matyas/light-years-1"},
	{name:"Mysterious Deep",
		by:"Eric Matyas", site:"https://soundimage.org/nature-science-3/", siten:"SoundImage.org"},
	{name:"Still of Night",
		by:"Eric Matyas", site:"https://soundimage.org/city-urban/", siten:"SoundImage.org", sc:"eric-matyas/still-of-night"},
	{name:"Urban Jungle 2061",
		by:"Eric Matyas", site:"http://soundimage.org/sci-fi/", siten:"SoundImage.org", sc:"eric-matyas/urban-jungle-2061"},
	{name:"Underwater Coolness",
		by:"Eric Matyas", site:"https://soundimage.org/nature-science-3/", siten:"SoundImage.org"},
	{name:"Dark Anthem",
		by:"Darren Curtis", yt:"G-VY51L2AQU", site:"https://www.darrencurtismusic.com", siten:"DarrenCurtisMusic.com", pat:"darrencurtismusic"},
	{name:"Dusty Memories",
		by:"Darren Curtis", yt:"F0k_5H7_OT4", site:"https://www.darrencurtismusic.com/sad-music", siten:"DarrenCurtisMusic.com", pat:"darrencurtismusic"},
	{name:"Feel It In Your Feet",
		by:"Darren Curtis", yt:"PkQoZNEVZ-4", site:"https://www.darrencurtismusic.com/piano", siten:"DarrenCurtisMusic.com", pat:"darrencurtismusic"},
	{name:"Deep Valley 2",
		by:"PeriTune", yt:"iStkj9BMmWw", site:"https://peritune.com/deep_valley2/", siten:"PeriTune.com", sc:"sei_peridot/deep-valley2"},
	{name:"Firmament",
		by:"PeriTune", yt:"4cBY3v4NCsw", site:"https://peritune.com/firmament/", siten:"PeriTune.com", sc:"sei_peridot/firmament-calm",
		loopStart:8.365, loopEnd:109.615, alt:true},
	{name:"Firmament 2",
		by:"PeriTune", yt:"QlyLJjhyLK8", site:"https://peritune.com/firmament2/", siten:"PeriTune.com", sc:"sei_peridot/firmament2_calm", alt:true},
	{name:"Investigation 3",
		by:"PeriTune", yt:"NhpYAtmA-mk", site:"https://peritune.com/investigation3/", siten:"PeriTune.com", sc:"sei_peridot/investigation3"},
	{name:"Lost Place",
		by:"PeriTune", yt:"L7XPGa67poA", site:"https://peritune.com/lost-place/", siten:"PeriTune.com", sc:"sei_peridot/lost-place"},
	{name:"Night 2", 
		by:"PeriTune", yt:"GO8FavhnqiU", site:"https://peritune.com/night2/", siten:"PeriTune.com", sc:"sei_peridot/night-2"},
	{name:"Boat Paint",
		by:"Al Gorgeous", sc:"al-goregous/boat-paint"},
	{name:"Up In My Jam (All Of A Sudden)",
		by:"Kubbi", yt:"6DB6hBRPsWc", site:"https://kubbimusic.com/track/up-in-my-jam-all-of-a-sudden", siten:"KubbiMusic.com", sc:"kubbi/up-in-my-jam-all-of-a-sudden", ng:538102},
	{name:"Flex",
	by:"Jeremy Blake", yt:"dK0C536YxA0"},
	{name:"Looked Back Saw Nothing - Kenyon",
		by:"Twin Musicom", yt:"A1LiBWXE_08", site:"http://www.twinmusicom.org/song/273/looked-back-saw-nothing-kenyon", siten:"TwinMusicom.org",
		bpm:100},
	{name:"Inside Prism City",
		by:"TeknoAXE", yt:"GW2gm806RUc", site:"http://teknoaxe.com/Link_Code_2.php?q=170", siten:"TeknoAXE.com"},
]
var SONG_HASH = {};
SONG_LIST.forEach(function(sing, dex) {
	sing.description = "\"" + sing.name + "\" by " + sing.by + ". Click to listen.";
	sing.src = "src/Audio/Songs/" + (sing.name + "-" + sing.by).replace(/\s/g, "") + ".mp3";
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