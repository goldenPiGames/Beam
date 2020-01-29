var MusicInfoBar = function(songName, delay = 30, speed = 25) {
	this.text = "♫ "+songName;
	this.delay = delay;
	this.speed = speed;
	this.width = 300;
	this.height = 35;
	this.x = 800 - 1;// - this.width;
	this.y = 600 - this.height;
	this.fade = 0;
}
MusicInfoBar.prototype = Object.create(ParticleBase);
MusicInfoBar.prototype.overInfo = true;

MusicInfoBar.prototype.draw = function(ctx) {
	if (this.delay > 0) {
		if (this.x > 800- this.width) {
			this.x -= this.speed;
			if (this.x < 800 - this.width)
				this.x = 800 - this.width;
		} else
			this.delay -= 1;
	} else {
		this.x += this.speed;
	}
	ctx.fillStyle = settings.background_color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	
	ctx.strokeWidth = 2;
	ctx.strokeStyle = settings.normal_color;
	ctx.strokeRect(this.x, this.y, this.width + 3, this.height);
	
	ctx.fillStyle = settings.normal_color;
    ctx.font = (this.height - 10) + "px " + settings.font;
	ctx.fillText(this.text, this.x + 5, this.y + 3);
}