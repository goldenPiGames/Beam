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

function setMousePosition(clientX, clientY) {
	var rekt = eventCatcher.getBoundingClientRect();
	mouse.x = (clientX - rekt.x) / rekt.width * WIDTH;
	mouse.y = (clientY - rekt.y) / rekt.height * HEIGHT;
}

function addEvents() {
	eventCatcher.addEventListener("mousemove", function(e) {
		setMousePosition(e.clientX, e.clientY);
	});
	
	eventCatcher.addEventListener("mousedown", function(e) {
		mouse.clicked = true;
		mouse.down = true;
	});
	
	document.addEventListener("mouseup", function(e) {
		mouse.down = false;
		mouse.clicked;
	});
	
	eventCatcher.addEventListener("wheel", function(e) {
		e.preventDefault();
		mouse.scrolled += e.deltaY > 0 ? 1 : -1;
		//console.log(mouse.scrolled);
	});
	
	eventCatcher.addEventListener('dblclick', function (e) {
		e.preventDefault();
	});
	
	eventCatcher.addEventListener("touchstart", function(e) {
		//if (runnee.overrideTouch) because otherwise it'll sometimes click twice and i don't know how else to fix that
			e.preventDefault();
		mouse.clicked = true;
		mouse.down = true;
		setMousePosition(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
	});
	
	eventCatcher.addEventListener("touchend", function(e) {
		if (runnee.overrideTouch)
			e.preventDefault();
		mouse.down = false;
		mouse.x = NaN;
		mouse.y = NaN;
	});
	
	eventCatcher.addEventListener("touchcancel", function(e) {
		if (runnee.overrideTouch)
			e.preventDefault();
		mouse.down = false;
		mouse.x = NaN;
		mouse.y = NaN;
	});
	
	eventCatcher.addEventListener("touchmove", function(e) {
		if (runnee.overrideTouch)
			e.preventDefault();
		setMousePosition(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
	});
	
	backDiv.addEventListener("fullscreenchange", fitCanvas);
	
	document.addEventListener("fullscreenerror", function(e) {
		qAlert(lg("Fullscreen-Reject"));
	});
	
	window.addEventListener("resize", fitCanvas);
	
	window.addEventListener("focus", musicFocus);
	
	window.addEventListener("blur", musicFocusOut);
}

function fitCanvas(e) {
	var rekt = backDiv.getBoundingClientRect();
	//console.log(rekt, WIDTH, HEIGHT)
	if (!document.fullscreen) {
		//console.log("part");
		canvas.classList.remove("fullscreenWider");
		canvas.classList.remove("fullscreenTaller");
		canvas.classList.add("partscreen");
	} else if (rekt.width/rekt.height >= WIDTH/HEIGHT) {
		//console.log("wider");
		canvas.classList.remove("partscreen");
		canvas.classList.remove("fullscreenTaller");
		canvas.classList.add("fullscreenWider");
	} else {
		//console.log("taller");
		canvas.classList.remove("partscreen");
		canvas.classList.remove("fullscreenWider");
		canvas.classList.add("fullscreenTaller");
	}
	resizeInputs();
}

function attemptFullscreen() {
	if (document.fullscreen) {
		document.exitFullscreen();
	} else {
		try {
			backDiv.requestFullscreen();
		} catch (e) {
			qAlert(lg("Fullscreen-Reject"));
		}
	}
}

function bubbleDrawIFullscreen() {
	ctx.beginPath();
	ctx.moveTo(this.x-this.radius/2, this.y-this.radius/4);
	ctx.lineTo(this.x-this.radius/2, this.y-this.radius/2);
	ctx.lineTo(this.x-this.radius/4, this.y-this.radius/2);
	ctx.moveTo(this.x+this.radius/4, this.y-this.radius/2);
	ctx.lineTo(this.x+this.radius/2, this.y-this.radius/2);
	ctx.lineTo(this.x+this.radius/2, this.y-this.radius/4);
	ctx.moveTo(this.x+this.radius/2, this.y+this.radius/4);
	ctx.lineTo(this.x+this.radius/2, this.y+this.radius/2);
	ctx.lineTo(this.x+this.radius/4, this.y+this.radius/2);
	ctx.moveTo(this.x-this.radius/4, this.y+this.radius/2);
	ctx.lineTo(this.x-this.radius/2, this.y+this.radius/2);
	ctx.lineTo(this.x-this.radius/2, this.y+this.radius/4);
	ctx.stroke();
}