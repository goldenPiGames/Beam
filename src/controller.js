//mouse
var mouse = {x:0,y:0,clicked:false,down:false,
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
}