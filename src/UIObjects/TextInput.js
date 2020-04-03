var textInput;
var test100;
var fileInput;
var inputs;

function initInputs() {
	textInput = document.getElementById("TextInput");
	test100 = document.getElementById("Test100");
	fileInput = document.getElementById("FileInput");
	inputs = [
		textInput,
		fileInput,
	];
}

function setTextInput(x, y, width, height, text) {
	//console.log(x, y, width, height, text)
	textInput.lastMoveArgs = [x, y, width, height];
	showTextInput();
	moveTextInput(x, y, width, height);
	textInput.placeholder = text;
	textInput.value = "";
	textInput.style.border = "3px solid "+settings.normal_color;
	textInput.style.background = settings.background_color;
	textInput.style.color = settings.normal_color;
}

function moveTextInput(x, y, width, height) {
	moveInput(textInput, x, y, width, height);
}

function resizeInputs() {
	inputs.forEach(pu=>{
		if (pu.hidden)
			return false;
		moveInput(pu, ...pu.lastMoveArgs);
	});
}

function showTextInput() {
	textInput.hidden = false;
}

function hideTextInput() {
	textInput.hidden = true;
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

function setFileInput(x, y, width, height, text) {
	fileInput.lastMoveArgs = [x, y, width, height];
	fileInput.hidden = false;
	moveInput(fileInput, x, y, width, height);
	fileInput.innerHTML = text;
	fileInput.files = null;
	//fileInput.style.border = "3px solid "+settings.normal_color;
	fileInput.style.background = settings.background_color;
	fileInput.style.color = settings.normal_color;
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