const SONG_LIST = [
	{name:"Decisions",            by:"Eric Matyas", site:"https://soundimage.org/introspective/"},
	{name:"Hong Kong Midnight",   by:"Eric Matyas", site:"https://soundimage.org/world/"},
	{name:"Still of Night",       by:"Eric Matyas",   site:"https://soundimage.org/city-urban/"},
	{name:"Urban Jungle 2061",    by:"Eric Matyas", site:"http://soundimage.org/sci-fi/"},
	{name:"Underwater Coolness",  by:"Eric Matyas", site:"https://soundimage.org/nature-science-3/"},
	{name:"Dusty Memories",       by:"Darren Curtis", yt:"F0k_5H7_OT4", site:"https://www.darrencurtismusic.com/sad-music"},
	{name:"Feel It In Your Feet", by:"Darren Curtis", yt:"PkQoZNEVZ-4", site:"https://www.darrencurtismusic.com/piano"},
	{name:"Deep Valley 2",        by:"PeriTune",      yt:"iStkj9BMmWw", site:"https://peritune.com/deep_valley2/"},
	{name:"Firmament",            by:"PeriTune",      yt:"4cBY3v4NCsw", site:"https://peritune.com/firmament/", loopStart:8.365, loopEnd:109.615, alt:true},
	{name:"Firmament 2",          by:"PeriTune",      yt:"QlyLJjhyLK8", site:"https://peritune.com/firmament2/", alt:true},
	{name:"Investigation 3",      by:"PeriTune",      yt:"NhpYAtmA-mk", site:"https://peritune.com/investigation3/"},
	{name:"Lost Place",           by:"PeriTune",      yt:"L7XPGa67poA", site:"https://peritune.com/lost-place/"},
	{name:"Night 2",              by:"PeriTune",      yt:"GO8FavhnqiU", site:"https://peritune.com/night2/"},
	{name:"Boat Paint",           by:"Al Gorgeous", site:"https://soundcloud.com/al-goregous/boat-paint"},
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
	if (sing.pat)
		sing.siteList.push({name:"Patreon", href:"https://www.patreon.com/"+sing.pat});
});