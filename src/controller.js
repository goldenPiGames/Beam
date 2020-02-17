//mouse
var mouse = {
	x:NaN,
	y:0,
	clicked:false,
	down:false,
	unClick : function() {
		this.clicked = false;
		this.wasPressed = this.pressed;
		this.lastX = this.x;
		this.lastY = this.y;
		this.scrolled = 0;
	}
}

function addEvents() {
	eventCatcher.addEventListener("mousemove", function(e) {
		mouse.x = e.offsetX;
		mouse.y = e.offsetY;
		//mouse.clicked = (e.which == 1 && !mouse.down);
		//mouse.down = (e.which == 1);
	});
	
	eventCatcher.addEventListener("mousedown", function(e) {
		mouse.clicked = true;// !mouse.down;
		mouse.down = true;
	});
	
	document.addEventListener("mouseup", function(e) {
		mouse.down = false;
		mouse.clicked;
	});
	
	/*eventCatcher.addEventListener("mousewheel", function(e) {
		mouse.scrolled += e.deltaY / 3;
		console.log(mouse.scrolled);
	});*/
	
	eventCatcher.addEventListener("wheel", function(e) {
		mouse.scrolled += e.deltaY > 0 ? 1 : -1;
		//console.log(mouse.scrolled);
	});
	
	eventCatcher.addEventListener("touchstart", function(e) {
		e.preventDefault();
		mouse.clicked = true;
		mouse.down = true;
		mouse.x = e.changedTouches[0].clientX;
		mouse.y = e.changedTouches[0].clientY;
	});
	
	eventCatcher.addEventListener("touchend", function(e) {
		e.preventDefault();
		mouse.down = false;
		mouse.x = NaN;
		mouse.y = NaN;
	});
	
	eventCatcher.addEventListener("touchcancel", function(e) {
		e.preventDefault();
		mouse.down = false;
		mouse.x = NaN;
		mouse.y = NaN;
	});
	
	eventCatcher.addEventListener("touchmove", function(e) {
		e.preventDefault();
		mouse.x = e.changedTouches[0].clientX;
		mouse.y = e.changedTouches[0].clientY;
	});
}