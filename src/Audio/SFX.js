var lastSFXvolume;

function makeCycler(args) {
	return new SFXCycler(Array.prototype.slice.call(arguments, 0));
}
function makeSound(nom) {
	var fec = document.createElement("audio");
	fec.preload = "auto";
	fec.controls = "none";
	fec.style.display = "none";
	fec.addEventListener("ended", function() {
			this.currentTime = 0;
			this.pause();
		}, false);
	fec.src = "src/Audio/SFX/"+nom;
	fec.volume = settings.sfx;
	document.body.appendChild(fec);
	return fec;
}
var sfx = {
	
}
function initSFX() {
	lastSFXvolume = settings.sfx;
	sfx = {
		"blip1_0" : makeSound("blip1.mp3"), //audacity: chirp: 440Hz, 0.8-0.1, .05s
		"blip1_1" : makeSound("blip1.mp3"),
		"blip1" : new SFXCycler(["blip1_0", "blip1_1"]),
		"blipdown" : makeSound("blipdown.mp3"),
	}
}

function playSFX(name) {
	//console.log(name)
	sfx[name].play();
}

function setSFXVolume(quant) {
	if (quant != lastSFXvolume) {
		for (f in sfx) {
			sfx[f].volume = quant;
		}
		lastSFXvolume = quant;
	}
}

class SFXCycler {
	constructor(names) {
		this.names = names;
		this.cycle = 0;
	}
	play = function() {
		this.cycle = this.cycle % this.names.length;
		playSFX(this.names[this.cycle]);
		this.cycle++;
	}
}