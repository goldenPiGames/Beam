const WIDTH = 800;
const HEIGHT = 600;
var gameInterval;
var canvas;
var ctx;
var engine;

function startLoading() {
	backDiv = document.getElementById("BackgroundBox");
	canvas = document.getElementById("GraphicsBox");
	ctx = canvas.getContext("2d");
	//gameInterval = setInterval(hasLoaded, 250);
	
	eventCatcher = document.getElementById("GraphicsBox");
	addEvents();
	loadSettings();
	
	startGame();
}

function startGame() {
	ctx.textBaseline = "top";
	initMusic();
	initSFX();
	initInputs();
	nextStartupScreen();
	coreEngine.run();
}

function nextStartupScreen() {
	if (!settings.lang) {
		runnee = new LangSelectScreen();
		return;
	}
	if (!askedMusic) {
		if (!settings.musicDontAsk) {
			runnee = new MusicAskScreen();
			return;
		} else
			loadMusicRec();
	}
	runnee = new MainMenu();
}

function doNothing() {
	
}

function clearBack() {
	ctx.globalAlpha = 1;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = palette.background;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawTextInRect(text, x, y, width, height) {
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = height+"px "+settings.font;
	var wid = ctx.measureText(text).width;
	if (wid > width)
		ctx.font = (height*width/wid)+"px "+settings.font;
	ctx.fillText(text, x+width/2, y+height/2);
}

function drawParagraphInRect(text, x, y, width, height, size) {
	if (!text)
		return;
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.font = size+"px "+settings.font;
	if (Array.isArray(text))
		text = text.join(" <br> ");
	var words = text.split(" ");
	var cx = x;
	var cy = y;
	for (var i = 0; i < words.length; i++) {
		ctx.fillStyle = palette.normal;
		var word = words[i];
		if (word.indexOf("<") >= 0) {
			if (word == "<br>") {
				cy += size;
				cx = x;
			}
		}
		var wwid = ctx.measureText(word).width;
		//console.log(word, cx, cy);
		if (word != "<br>") {
			if (cx + wwid > x + width) {
				cy += size;
				cx = x;
			}
			ctx.fillText(word, cx, cy);
			cx += wwid + ctx.measureText(" ").width;
		}
	}
}

//https://humanwhocodes.com/blog/2009/07/28/the-best-way-to-load-external-javascript/
function loadScript(url, callback){

	var script = document.createElement("script")
	script.type = "text/javascript";
	if (script.readyState){  //IE
		script.onreadystatechange = function(){
			if (script.readyState == "loaded" ||
					script.readyState == "complete"){
				script.onreadystatechange = null;
				callback();
			}
		};
	} else {  //Others
		script.onload = function(){
			callback();
		};
	}
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}