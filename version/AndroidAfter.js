function fitCanvas(e) {
	var rekt = backDiv.getBoundingClientRect();
	//console.log(rekt, WIDTH, HEIGHT)
	if (rekt.width/rekt.height >= WIDTH/HEIGHT) {
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