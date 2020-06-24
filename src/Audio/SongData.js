const CC_BY_3 = "Creative Commons Attribution 3.0 License";
const CC_BY_4 = "Creative Commons Attribution 4.0 International License";
const MUSIC_GENRES = ["all", "chiptune"];


const SONG_LIST_ABS = [
	//Jon Matson / Al Gorgeous / Al Goregeous
	{name:"Beach Buns", intensity:1/4, armor:1,
		by:"Al Gorgeous", sc:"al-goregous/beach-buns"},
	{name:"Boat Paint", intensity:1/4, kong:1, armor:1,
		by:"Al Gorgeous", sc:"al-goregous/boat-paint"},
	
	//Asher Please
	{name:"Broken Record Blues", fname:"Sunday Night Sailing", intensity:1/4, kong:1, armor:1,
		by:"Asher Please", site:"https://distrokid.com/hyperfollow/asherplease/break-beater", siten:"DistroKid", yt:"5OPUFBZOzdU", sc:"asherplease/broken-record-blues", spot:"45jYDG8Jx7xnjMtunTcZh9"},
	{name:"Saturday Morning Mood", intensity:0, armor:1,
		by:"Asher Please", site:"https://distrokid.com/hyperfollow/asherplease/break-beater", siten:"DistroKid", yt:"i6W33mnXeCg", sc:"asherplease/saturday-morning-mood-1", spot:"45jYDG8Jx7xnjMtunTcZh9"},
	/*{name:"Broken Record Blues", intensity:1/4,
		by:"Asher Please", sc:"asherplease/broken-record-blues"},
	*/
	
	//Darren Curtis
	{name:"A Robust Crew", intensity:1/4,
		by:"Darren Curtis", yt:"OY_gV_3A7MU", site:"https://www.darrencurtismusic.com/freemusic", siten:"DarrenCurtisMusic.com", pat:"darrencurtismusic"},
	{name:"Beatdown City", intensity:3/4, kong:1, armor:1,
		by:"Darren Curtis", yt:"qL4u3u5WKgU", site:"https://www.darrencurtismusic.com", siten:"DarrenCurtisMusic.com", sc:"desperate-measurez/beatdown-city-80s-action-theme-royalty-free", pat:"darrencurtismusic"},
	{name:"Dark Anthem", intensity:3/4,
		by:"Darren Curtis", yt:"G-VY51L2AQU", site:"https://www.darrencurtismusic.com", siten:"DarrenCurtisMusic.com", pat:"darrencurtismusic"},
	{name:"Dueling With Cyborg Ninjas", intensity:1,
		by:"Darren Curtis", yt:"j1TSpz7Itso", site:"https://www.darrencurtismusic.com", siten:"DarrenCurtisMusic.com", sc:"desperate-measurez/dueling-with-cyborg-ninjas-sci-fi-royalty-free-music", pat:"darrencurtismusic"},
	{name:"Dusty Memories", intensity:1/4,
		by:"Darren Curtis", yt:"F0k_5H7_OT4", site:"https://www.darrencurtismusic.com/sad-music", siten:"DarrenCurtisMusic.com", pat:"darrencurtismusic"},
	{name:"Feel It In Your Feet", intensity:1/2, kong:1, armor:1,
		by:"Darren Curtis", yt:"PkQoZNEVZ-4", site:"https://www.darrencurtismusic.com/piano", siten:"DarrenCurtisMusic.com", pat:"darrencurtismusic"},
	{name:"Massacre on Teddy Bear Hill", intensity:3/4,
		by:"Darren Curtis", yt:"qG5e8cmoL_s", site:"https://www.darrencurtismusic.com/hybrid-other", siten:"DarrenCurtisMusic.com", sc:"desperate-measurez/massacre-on-teddy-bear-hill-royalty-free-music", pat:"darrencurtismusic"},
	{name:"Samurai Sake Showdown", intensity:3/4, loopStart:0.7, loopEnd:69.664,
		by:"Darren Curtis", yt:"NOGZX7Z4wSI", site:"https://www.darrencurtismusic.com", siten:"DarrenCurtisMusic.com", sc:"desperate-measurez/samurai-sake-showdown-asian-royalty-free-music", pat:"darrencurtismusic"},
	{name:"War of the Pianos", intensity:1/2,
		by:"Darren Curtis", yt:"CP8HoV4ArHw", site:"https://www.darrencurtismusic.com", siten:"DarrenCurtisMusic.com", sc:"desperate-measurez/war-of-the-pianos-royalty-free", pat:"darrencurtismusic"},
	
	//Eric Matyas / SoundImage
	{name:"Decisions", intensity:0, bpm:95.34, kong:1, armor:1,
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
	//{name:"Toilet Story 4", intensity:1/2, chiptune:1,
	//	by:"Ghidorah", site:"https://modarchive.org/index.php?request=view_by_moduleid&query=63621", siten:"The Mod Archive"},//site:"https://www.last.fm/music/Ghidorah/_/Toilet+Story+4", siten:"last.fm"}, //
	
	//Jeremy Blake / RedMeansRecording
	{name:"Flex", intensity:3/4, kong:1, armor:1,
		by:"Jeremy Blake", yt:"btp2AZVWekM", sc:"jeremyblake", pat:"redmeansrecording"},
	{name:"Turn Up, Let's Go", intensity:1/2, hop:1, vocals:1,
		by:"Jeremy Blake", yt:"btp2AZVWekM", sc:"jeremyblake", pat:"redmeansrecording"},
	
	//Kevin MacLeod / Incompetech
	{name:"Blip Stream", intensity:1/2, chiptune:1, kong:1, armor:1,
		by:"Kevin MacLeod", yt:"9np9KK4ccuA", site:"https://incompetech.com/music/royalty-free/index.html?isrc=usuan1500056", siten:"Incompetech", sc:"kevin-9-1/blip-stream", pat:"kmacleod"},
	{name:"Exit the Premises", intensity:3/4, kong:1, armor:1,
		by:"Kevin MacLeod", yt:"Yy-NyPTRYU8", site:"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1500029", siten:"Incompetech", sc:"kevin-9-1/exit-the-premises", pat:"kmacleod"},
	{name:"Fearless First", intensity:1/4, kong:1, armor:1,
		by:"Kevin MacLeod", yt:"NrwsOuJ2VvY", site:"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1600058", siten:"Incompetech", sc:"kevin-9-1/fearless-first", pat:"kmacleod"},
	{name:"March of the Spoons", intensity:1/4, kong:1, armor:1,
		by:"Kevin MacLeod", yt:"JFxJdBhP5dc", site:"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1700008", siten:"Incompetech", sc:"kevin-9-1/march-of-the-spoons", pat:"kmacleod"},
	{name:"Pixelland", intensity:1/2, chiptune:1, kong:1, armor:1,
		by:"Kevin MacLeod", yt:"Z-bi29z4Z1k", site:"https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1500076", siten:"Incompetech", sc:"kevin-9-1/pixelland", pat:"kmacleod"},
	{name:"Who Likes to Party", intensity:1/2,
		by:"Kevin MacLeod", yt:"O-2DwDG0EqM", site:"https://incompetech.com/music/royalty-free/index.html?isrc=usuan1200075", siten:"Incompetech", pat:"kmacleod"},
	
	//Kubbi
	{name:"Up In My Jam (All Of A Sudden)", fname:"Up In My Jam", intensity:3/4, kong:1, armor:1,
		by:"Kubbi", yt:"6DB6hBRPsWc", site:"https://kubbimusic.com/track/up-in-my-jam-all-of-a-sudden", siten:"KubbiMusic.com", sc:"kubbi/up-in-my-jam-all-of-a-sudden", ng:538102},
	{name:"Seahorse Dreams", intensity:3/4, kong:1, armor:1,
		by:"Kubbi", yt:"DLvrDRRaftQ", site:"https://kubbimusic.com/track/seahorse-dreams", siten:"KubbiMusic.com", sc:"kubbi/seahorse-dreams", ng:538406},
	
	//ParagonX9
	{name:"Blue Sky", intensity:1/2, kong:1, armor:1,
		by:"ParagonX9", yt:"QdL18RWUS8E", ng:5437},
	{name:"Chaoz Fantasy", intensity:3/4, kong:1, armor:1,
		by:"ParagonX9", yt:"pxIuZC26hXU", sc:"paragonx9/chaozfantasy", ng:85046},
	{name:"Chaoz Fantasy (8-bit)", intensity:3/4, chiptune:1, kong:1, armor:1,
		by:"ParagonX9", sc:"paragonx9/paragonx9-chaoz-fantasy-8-bit", ng:486695},
	
	//PeriTune / Sei Mutsuki / むつき醒
	{name:"Climbing (Retro)", intensity:1/2, armor:1,
		by:"PeriTune", yt:"oMi4OrwpClE", site:"https://peritune.com/climbing/", siten:"PeriTune.com", sc:"sei_peridot/sei_peridot/climbing_retro", license:CC_BY_4},
	{name:"Deep Valley 2", intensity:0, kong:1, armor:1,
		by:"PeriTune", yt:"iStkj9BMmWw", site:"https://peritune.com/deep_valley2/", siten:"PeriTune.com", sc:"sei_peridot/deep-valley2", license:CC_BY_4},
	{name:"Demise", intensity:1, loopStart:13.111, loopEnd:99.403,
		by:"PeriTune", yt:"Ouj_cwWJdmo", site:"https://peritune.com/demise/", siten:"PeriTune.com", sc:"sei_peridot/demise"},
	{name:"Dramatic", intensity:1, kong:1, armor:1,
		by:"PeriTune", yt:"o2GeoGLDjDg", site:"https://peritune.com/dramatic1/", siten:"PeriTune.com", sc:"sei_peridot/dramatic"},
	{name:"Dramatic 2", intensity:1,
		by:"PeriTune", yt:"okBKjTPrzA4", site:"https://peritune.com/dramatic2/", siten:"PeriTune.com", sc:"sei_peridot/dramatic3"},
	{name:"Dramatic 3", intensity:1,
		by:"PeriTune", yt:"_tR_JxExIfo", site:"https://peritune.com/dramatic3/", siten:"PeriTune.com", sc:"sei_peridot/dramatic3"},
	{name:"Dramatic 4", intensity:3/4,
		by:"PeriTune", yt:"dpBh5abRTh8", site:"https://peritune.com/dramatic4/", siten:"PeriTune.com", sc:"sei_peridot/dramatic4"},
	{name:"Dungeon Tower", intensity:1/2, armor:1,
		by:"PeriTune", yt:"C03wgPMeeUs", site:"https://peritune.com/dungeon_tower/", siten:"PeriTune.com", sc:"sei_peridot/dungeon-tower"},
	{name:"Firmament", intensity:1/4, loopStart:8.365, loopEnd:109.615, alt:true, armor:1,
		by:"PeriTune", yt:"4cBY3v4NCsw", site:"https://peritune.com/firmament/", siten:"PeriTune.com", sc:"sei_peridot/firmament-calm", license:CC_BY_4},
	{name:"Firmament 2", intensity:1/4, alt:true, armor:1,
		by:"PeriTune", yt:"QlyLJjhyLK8", site:"https://peritune.com/firmament2/", siten:"PeriTune.com", sc:"sei_peridot/firmament2_calm", license:CC_BY_4},
	{name:"Flap", intensity:3/4, 
		by:"PeriTune", yt:"vHINNBwmbBE", site:"https://peritune.com/flap/", siten:"PeriTune.com", sc:"sei_peridot/flap", license:CC_BY_4},
	{name:"Gothic Dark", intensity:1, loopStart:10.977, loopEnd:89.727, armor:1,
		by:"PeriTune", yt:"brZWB8cdBDs", site:"https://peritune.com/gothic_dark/", siten:"PeriTune.com", sc:"sei_peridot/gothic-dark", license:CC_BY_4},
	{name:"Havoc", intensity:1, loopStart:4.304, loopEnd:112.101,
		by:"PeriTune", yt:"yfE5y2uiBX0", site:"https://peritune.com/havoc", siten:"PeriTune.com", sc:"sei_peridot/havoc", license:CC_BY_4},
	{name:"Investigation 3", intensity:1/4, kong:1, armor:1,
		by:"PeriTune", yt:"NhpYAtmA-mk", site:"https://peritune.com/investigation3/", siten:"PeriTune.com", sc:"sei_peridot/investigation3", license:CC_BY_4},
	{name:"Labyrinth", intensity:1/4, kong:1, armor:1,
		by:"PeriTune", yt:"_VCW-VJ1wvo", site:"https://peritune.com/labyrinth/", siten:"PeriTune.com", sc:"sei_peridot/labyrinth", license:CC_BY_4},
	{name:"Let's Party 2", intensity:1/2,
		by:"PeriTune", yt:"rb8gRa6tTMY", site:"https://peritune.com/lets-party2/", siten:"PeriTune.com", sc:"sei_peridot/lets-party2", license:CC_BY_4},
	{name:"Lost Place", intensity:1/2, kong:1, armor:1,
		by:"PeriTune", yt:"L7XPGa67poA", site:"https://peritune.com/lost-place/", siten:"PeriTune.com", sc:"sei_peridot/lost-place", license:CC_BY_4}, 
	{name:"Night 2", intensity:1/2,
		by:"PeriTune", yt:"GO8FavhnqiU", site:"https://peritune.com/night2/", siten:"PeriTune.com", sc:"sei_peridot/peritunematerial-night2royalty-free-music", license:CC_BY_4},
	{name:"Prairie", intensity:3/4,
		by:"PeriTune", yt:"iMkX3NxQYv0", site:"https://peritune.com/prairie/", siten:"PeriTune.com", sc:"sei_peridot/prairie", license:CC_BY_4},
	{name:"Prairie 4", intensity:3/4,
		by:"PeriTune", yt:"EOlXXpqlS5k", site:"https://peritune.com/prairie4", siten:"PeriTune.com", sc:"sei_peridot/prairie4", licence:CC_BY_4},
	{name:"Prairie 5", intensity:1, kong:1, armor:1,
		by:"PeriTune", yt:"XerGSyUXCUc", site:"https://peritune.com/prairie5", siten:"PeriTune.com", sc:"sei_peridot/prairie5", licence:CC_BY_4},
	{name:"Raid 3", intensity:1, armor:1,
		by:"PeriTune", yt:"Vp-jDXwjOxM", site:"https://peritune.com/raid3/", siten:"PeriTune.com", sc:"sei_peridot/raid3", license:CC_BY_4},
	{name:"Raid FolkMetal", intensity:1, armor:1,
		by:"PeriTune", yt:"zpXKr5VK5go", site:"https://peritune.com/raid_folkmetal/", siten:"PeriTune.com", sc:"sei_peridot/raid_folkmetal", license:CC_BY_4},
	{name:"Raid FolkMetal 2", intensity:1, armor:1,
		by:"PeriTune", yt:"0w-rRQq67HE", site:"https://peritune.com/raid_folkmetal2/", siten:"PeriTune.com", sc:"sei_peridot/raid_folkmetal2", license:CC_BY_4},
	{name:"Rapid 2", intensity:3/4,
		by:"PeriTune", yt:"amnMq-0nv5A", site:"https://peritune.com/rapid2/", siten:"PeriTune.com", sc:"sei_peridot/rapid2"},
	{name:"Rapid 4", intensity:1,
		by:"PeriTune", yt:"g3c-dHAI-ts", site:"https://peritune.com/rapid4/", siten:"PeriTune.com", sc:"sei_peridot/rapid4"},
	{name:"Steam Fortress", intensity:3/4, kong:1, armor:1,
		by:"PeriTune", yt:"odfg3GNRP0M", site:"https://peritune.com/steam_fortress/", siten:"PeriTune.com", sc:"sei_peridot/steam-fortress"},
	{name:"Unknown World 2", intensity:1/2, alt:true,
		by:"PeriTune", yt:"OpsZR7O5H-A", site:"https://peritune.com/unknownworld2/", siten:"PeriTune.com", sc:"sei_peridot/unknownworld2", license:CC_BY_4}, //alt sc:"sei_peridot/unknownworld2_harp"
	{name:"World OP", intensity:1/4, armor:1,
		by:"PeriTune", yt:"b1S2WGS5LHs", site:"https://peritune.com/world_op/", siten:"PeriTune.com", sc:"sei_peridot/world-op", license:CC_BY_4},
	
	
	//{name:"Heartbeam 1", bpm:128, //intensity:1/4, 
	//	by:"Prexot"},
	
	//TeknoAXE
	{name:"Edge of Tomorrow", intensity:1/2,
		by:"TeknoAXE", yt:"hqsI5atn1U4", site:"http://teknoaxe.com/Link_Code_3.php?q=1242", siten:"TeknoAXE.com", license:CC_BY_4},
	{name:"Inside Prism City", intensity:1/4,
		by:"TeknoAXE", yt:"GW2gm806RUc", site:"http://teknoaxe.com/Link_Code_2.php?q=170", siten:"TeknoAXE.com", license:CC_BY_4},
	{name:"Sunrise Over Los Angeles", intensity:1/4,
		by:"TeknoAXE", yt:"Atzw6dxu-L0", site:"https://teknoaxe.com/Link_Code_3.php?q=1307", siten:"TeknoAXE.com", license:CC_BY_4},
	{name:"This is My City", intensity:1/4,
		by:"TeknoAXE", yt:"08aevamNz60", site:"https://teknoaxe.com/Link_Code_3.php?q=1404", siten:"TeknoAXE.com", license:CC_BY_4},
		
	//TheFatRat
	{name:"Unity", intensity:3/4, hop:1, vocals:1, kong:1, armor:1, //TODO make it loop
		by:"TheFatRat", yt:"n8X9_MgEdCg", site:"https://lnk.to/thefatratunity", siten:"Linkfire", spot:"1cxmFr3tma40mHVD1NsLAV", ng:621134, license:CC_BY_3},
	
	
	{name:"Looked Back Saw Nothing - Kenyon", bpm:100, intensity:0,
		by:"Twin Musicom", yt:"A1LiBWXE_08", site:"http://www.twinmusicom.org/song/273/looked-back-saw-nothing-kenyon", siten:"TwinMusicom.org", license:CC_BY_4},
	
	//Ucchii0
	{name:"Collapse of the Labyrinth", intensity:1, chiptune:1, bpm:145, loopStart:108.161, loopEnd:232.294, kong:1, armor:1,
		by:"Ucchii 0", yt:"RiLqC-sFl6U", sc:"vskktqtpbuqs/chiptunecollapse-of-the-labyrinthucchii0"},
	{name:"Don't Sleep", intensity:1, loopStart:13.81606, loopEnd:97.81608, bpm:160, kong:1, armor:1,
		by:"Ucchii 0", yt:"pluUDQCBSso", site:"https://creofuga.net/audios/106981", siten:"CreoFuga"},
	{name:"Gambles", intensity:3/4, bpm:155, kong:1, armor:1,
		by:"Ucchii 0", yt:"lp7oqpZW7xQ"},
	{name:"Secret Power", intensity:1, loopStart:16.093, loopEnd:330.35, bpm:165, intensity:1,
		by:"Ucchii 0", yt:"ivspAGvhA8E", site:"https://creofuga.net/audios/106993", siten:"CreoFuga"},
	{name:"空間を突きし者", fname:"Kuukan o Tsukishi Mono", intensity:1, loopStart:5.903, loopEnd:141.480,
		by:"Ucchii 0", yt:"vcJNE87j7js"},
	{name:"聖域決戦", fname:"Seiiki Kessen", intensity:1, loopStart:11.380, loopEnd:169.484,
		by:"Ucchii 0", yt:"6Yx2__wLYek"},
	
	//YouFulca / Wingless Seraph
	{name:"Deadly Sins", intensity:3/4, loopStart:11.475668934240362, loopEnd:90.53138321995465, kong:1, armor:1,
		by:"YouFulca", site:"https://wingless-seraph.net/material-music_battle.html", siten:"Wingless Seraph"},
	{name:"Get Along", intensity:3/4, chiptune:1, loopStart:3.5554875283446714, loopEnd:62.29578231292517, armor:1,
		by:"YouFulca", site:"https://wingless-seraph.net/material-music_battle.html", siten:"Wingless Seraph"},
	{name:"Never Surrender", intensity:1, loopStart:3.6729931972789114, loopEnd:54.53356009070295, armor:1,
		by:"YouFulca", site:"https://wingless-seraph.net/material-music_dangeon.html", siten:"Wingless Seraph"},
	{name:"Never Surrender (8bit)", intensity:3/4, chiptune:1, loopStart:3.3784353741496598, loopEnd:54.23882086167801, kong:1, armor:1,
		by:"YouFulca", site:"https://wingless-seraph.net/material-music_8bit.html", siten:"Wingless Seraph"},
	{name:"まだ見ぬ明日への誓い", fname:"Battle Madaminu", intensity:1, loopStart:5.434172335600907, loopEnd:88.98675736961451, kong:1, armor:1,
		by:"YouFulca", site:"https://wingless-seraph.net/material-music_battle.html", siten:"Wingless Seraph"},
	{name:"ステージ4", fname:"Stage 4", intensity:3/4, chiptune:1, loopStart:0.09997732426303856, loopEnd:43.736281179138324, kong:1, armor:1,
		by:"YouFulca", site:"https://wingless-seraph.net/material-music_8bit.html", siten:"Wingless Seraph"},
	{name:"ステージ5", fname:"Stage 5", intensity:1/2, chiptune:1, loopStart:7.65827664399093, loopEnd:56.79172335600907, kong:1, armor:1,
		by:"YouFulca", site:"https://wingless-seraph.net/material-music_8bit.html", siten:"Wingless Seraph"},
	{name:"レイピアを継ぐ少女", fname:"Battle Rapier", intensity:1, loopStart:9.5762358276644, loopEnd:72.32124716553288, kong:1, armor:1,
		by:"YouFulca", site:"https://wingless-seraph.net/material-music_battle.html", siten:"Wingless Seraph"},
	{name:"勝利を信じて", fname:"Battle 1", intensity:3/4, chiptune:1, loopStart:6.1998185941043085, loopEnd:54.19823129251701, kong:1, armor:1,
		by:"YouFulca", site:"https://wingless-seraph.net/material-music_8bit.html", siten:"Wingless Seraph"},
	{name:"決戦の地へ", fname:"Dungeon 03", intensity:1/2, chiptune:1, loopStart:18.659954648526078, loopEnd:77.73732426303854, kong:1, armor:1,
		by:"YouFulca", site:"https://wingless-seraph.net/material-music_8bit.html", siten:"Wingless Seraph"},
	{name:"神秘の海を越えて", fname:"Voyage", intensity:0, loopStart:14.865419501133786, loopEnd:125.07396825396826, kong:1, armor:1,
		by:"YouFulca", site:"https://wingless-seraph.net/material-music_field.html", siten:"Wingless Seraph"},
	{name:"遥かなる冒険", fname:"Field 01", intensity:1/4, chiptune:1, loopStart:4.933741496598639, loopEnd:65.56698412698412, kong:1, armor:1,
		by:"YouFulca", site:"https://wingless-seraph.net/material-music_8bit.html", siten:"Wingless Seraph"},
]
//Because some sites have an upload size limit.
const SONG_LIST = STRIP_SONGS ? SONG_LIST_ABS.filter(s=>s[STRIP_SONGS]) : SONG_LIST_ABS;

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
	if (sing.spot)
		sing.siteList.push({name:"Spotify", href:"https://open.spotify.com/album/"+sing.spot});
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

