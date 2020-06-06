const EXTRA_EMBER = true;
var hovered = false;

class Particle {
    constructor() {
		
	}
	go() {
		this.updatePosition();
		ctx.globalAlpha = this.alpha;
		this.draw(ctx);
		this.updateAlpha();
		return !this.dead;
    }
    updatePosition() {
        this.x += this.dx;
		this.y += this.dy;
		if (this.x < 0 || this.y < 0 || this.x > canvas.width || this.y > canvas.height)
			this.die();
    }
	updateAlpha() {
		this.alpha -= (this.fade > 1) ? (1/this.fade) : this.fade;
		if (this.alpha <= 0)
			this.die();
    }
	die() {
		this.dead = true;
	}
}
Particle.prototype.dead = false;
Particle.prototype.dx = 0;
Particle.prototype.dy = 0;
Particle.prototype.alpha = 1;
Particle.prototype.fade = 30;

//--------------------------------------------------------- Ember ------------------------------------------
class Ember extends Particle { 
	constructor(x, y, dx, dy, radius, color, fade) {
		super();
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.color = color;
		this.fade = fade;
	}
	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		ctx.closePath();
		ctx.fill();
	}
}
Ember.prototype.overInfo = false;

function addRandomEmbers() {
	if (!settings.cursorParticles)
		return;
	particles.push(randomCursorEmber(mouse.x, mouse.y));
	if (EXTRA_EMBER) {
		//console.log(mouse.x, mouse.lastX)
		particles.push(randomCursorEmber((mouse.x + mouse.lastX) / 2, (mouse.y + mouse.lastY) / 2));
	}
}

function randomCursorEmber(x, y, color = null) {
	var direction = randomDirection();
	var speed = .5 + .5 * Math.random();
	var color = color || (mouse.down ? palette.click : (hovered ? palette.hover : palette.normal));
	var dx = Math.cos(direction) * speed;
	var dy = Math.sin(direction) * speed;
	return new Ember(x - dx, y - dy, dx, dy, 2, color, .03);
}

//------------------------------------ Ring --------------------------
class ParticleRing extends Particle {
	constructor(x, y, growth, color, fade) {
		super();
		this.x = x;
		this.y = y;
		this.radius = 0;
		this.growth = growth;
		this.color = color;
		this.fade = fade;
	}
	draw() {
		ctx.lineWidth = 2;
		this.radius += this.growth;
		ctx.globalAlpha = this.alpha;
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		ctx.closePath();
		ctx.stroke();
	}
}

function randomDirection() {
	return Math.random() * 2 * Math.PI; 
}

function rgb(r, g, b) {
	return "rgb("+Math.round(r)+", "+Math.round(g)+", "+Math.round(b)+")";
}