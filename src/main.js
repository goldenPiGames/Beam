//const PLAYER_COLOR = "#3434FF";
//const COMPANION_COLOR = "#FFFF00";
const WIDTH = 800;
const HEIGHT = 600;
var gameInterval;
var canvas;
var ctx;
var engine;
var loadingTotal = 0;
var loadedYet = 0;

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
	runnee = new MainMenu();
	initMusic();
	coreEngine.run();
}

function getValue(obj, value) {
	if (typeof value == 'function')
		return object.value()
	return object.value;
}



function doNothing() {
	
};

var emptyGameObject = {
	update : doNothing,
	draw : doNothing,
}

function clearBack() {
	ctx.globalAlpha = 1;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = settings.background_color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSprite(sprite, x, y, woff = 0, hoff = 0) {
	if (!sprite)
		return;
	if (sprite instanceof HTMLImageElement) {
		ctx.drawImage(sprite, Math.round(x - woff*sprite.width), Math.round(y - hoff*sprite.height));
	} else if (sprite.image) {
		//console.log(sprite.image)
		//console.log(sprite.x, sprite.y, sprite.width, sprite.height, x - woff*sprite.width, y - hoff*sprite.height, sprite.width, sprite.height)
		ctx.drawImage(sprite.image, sprite.x, sprite.y, sprite.width, sprite.height, Math.round(x - woff*sprite.width), Math.round(y - hoff*sprite.height), sprite.width, sprite.height);
	}
}

function makeImage(sauce) {
	var img = new Image();
	loadingTotal++;
	img.onload = function() {
		loadedYet++;
		//console.log("shub");
		//img.crossOrigin = "anonymous";
	};
	img.src = sauce;
	return img;
}

function makeSprites(sauce, sec, prel = true) {
	var image;
	if (typeof sauce == "string") {
		if (prel)
			image = makeImage(sauce);
	} else {
		image = sauce;
		sauce = image.src;
	}
	var sheetData = {image:image, src:sauce};
	if (Array.isArray(sec)) {
		var subs = Array.prototype.slice.call(arguments, 1);
		subs.forEach(function(oj) {
			oj.image = sauce;
			sheetData[oj.name] = oj;
			oj.parent = sheetData;
		});
	} else {
		for (var sub in sec) {
			sheetData[sub] = sec[sub];
			sheetData[sub].image = image;
			sheetData[sub].parent = sheetData;
		}
	}
	return sheetData;
}

function loadSprites(data) {
	//console.log(data);
	var image = makeImage(data.src);
	//console.log(image);
	data.image = image;
	for (var sub in data) {
		data[sub].image = image;
	}
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
	//console.log(text);
	//text = text.replace(/<Player>/g, player.name);
	//text = text.replace(/<Companion>/g, companion.name);
	//console.log(text);
	var words = text.split(" ");
	var cx = x;
	var cy = y;
	for (var i = 0; i < words.length; i++) {
		ctx.fillStyle = settings.normal_color;
		var word = words[i];
		if (word.indexOf("<") >= 0) {
			if (word == "<br>") {
				cy += size;
				cx = x;
			} else if (word.includes("Player")) {
				word = word.replace("<Player>", player.name);
				ctx.fillStyle = player.color;
			} else if (word.includes("Companion")) {
				word = word.replace("<Companion>", companion.name);
				ctx.fillStyle = companion.color;
			}
		} else if (typeof STAT_INDICES[word]) {
			ctx.fillStyle = STAT_COLORS[STAT_INDICES[word]];
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

function loadEnemies(args) {
	var things = Array.isArray(args) ? args : Array.prototype.slice.call(arguments);
	things.forEach(oj => {
		//console.log(oj);
		if (oj.prototype.sprites && !oj.prototype.sprites.image)
			loadSprites(oj.prototype.sprites);
	});
}