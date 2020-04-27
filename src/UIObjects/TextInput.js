var textInput0;
var test100;
var fileInput;
var inputs;

function initInputs() {
	test100 = document.getElementById("Test100");
	textInput0 = document.getElementById("TextInput0");
	textInput1 = document.getElementById("TextInput1");
	fileInput = document.getElementById("FileInput");
	inputs = [
		textInput0,
		textInput1,
		fileInput,
	];
	inputs.forEach(i=>i.style.fontFamily=settings.font);
}

function setTextInput(which, x, y, width, height, text) {
	//console.log(x, y, width, height, text)
	var p = typeof which == "number" ? inputs[which] : which;
	p.lastMoveArgs = [x, y, width, height];
	p.hidden = false;
	moveInput(p, x, y, width, height);
	p.placeholder = text;
	p.value = "";
	p.style.border = "3px solid "+settings.normal_color;
	p.style.background = settings.background_color;
	p.style.color = settings.normal_color;
}

function resizeInputs() {
	inputs.forEach(pu=>{
		if (pu.hidden)
			return false;
		moveInput(pu, ...pu.lastMoveArgs);
	});
}

function hideTextInput() {
	textInput0.hidden = true;
}

function hideInputs() {
	inputs.forEach(pu=>pu.hidden = true);
}

function moveInput(input, x, y, width, height) {
	var rect = canvasToCSSRect(x, y, width, height);
	input.style.left = rect.x + "px";
	input.style.top = rect.y + "px";
	input.style.width = rect.width-6 + "px";
	let h = rect.height-6;
	input.style.height = h + "px";
	input.style.fontSize = (h-2)+"px";
	
}

function setFileInput(x, y, width, height, type) {
	fileInput.lastMoveArgs = [x, y, width, height];
	fileInput.hidden = false;
	moveInput(fileInput, x, y, width, height);
	fileInput.files = null;
	fileInput.accept = type || "application/json";
	//fileInput.style.border = "3px solid "+settings.normal_color;
	fileInput.style.background = settings.background_color;
	fileInput.style.color = settings.normal_color;
}

function hideFileInput() {
	fileInput.hidden = true;
}

function canvasToCSSRect(x, y, width, height) {
	var rekt100 = test100.getBoundingClientRect();
	var rektCanvas = canvas.getBoundingClientRect();
	return {
		x : rektCanvas.width / rekt100.width * x / WIDTH * 100 + rektCanvas.x - rekt100.x,
		y : rektCanvas.height / rekt100.height * y / HEIGHT * 100 + rektCanvas.y - rekt100.y,
		width : rektCanvas.width / rekt100.width * width / WIDTH * 100,
		height : rektCanvas.height / rekt100.height * height / HEIGHT * 100,
	}
}