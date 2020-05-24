var runnee;
var globalTimer = 0;
const FPS = 30;
var particles = [];
var lastFrameDelay = 0;

var coreEngine = {
    frameDelay : 1000 / FPS,
	lastRunTime : 0,
	run : function() {
		var now = Date.now();
		var desiredTime = now + this.frameDelay;
		lastFrameDelay = now - this.lastRunTime;
		this.lastRunTime = now;
		globalTimer++;
		musicLoopCheck();
		hovered = false;
		runnee.update();
		clearBack();
		if (mouse.clicked)
			particles.push(new ParticleRing(mouse.x, mouse.y, 1.5, palette.click, .04));
		canvas.style.cursor = hovered ? "pointer" : "default";
		runnee.draw();
		addRandomEmbers();
		particles = particles.filter((oj)=>oj.go());
		mouse.unClick();
		setTimeout(()=>this.run(), Math.max(0, desiredTime-Date.now()));
	},
}