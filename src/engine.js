var runnee;
var overlay;
const FPS = 30;
var particles = [];

var coreEngine = {
    frameDelay : 1000 / FPS,
	particles : [],
	run : function() {
		var desiredTime = Date.now() + this.frameDelay;
		musicLoopCheck();
		hovered = false;
		runnee.update();
		clearBack();
		if (mouse.clicked)
			particles.push(new ParticleRing(mouse.x, mouse.y, 1.5, settings.click_color, .04));
		runnee.draw();
		addRandomEmbers();
		particles = particles.filter((oj)=>oj.go());
		mouse.unClick();
		setTimeout(()=>this.run(), Math.max(0, desiredTime-Date.now()));
	},
}