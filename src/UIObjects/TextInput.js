var textInput;
var test100;
var textInputLastArgs = [];

function initTextInput() {
	textInput = document.getElementById("TextInput");
	test100 = document.getElementById("Test100");
}

function setTextInput(x, y, width, height, text) {
	//console.log(x, y, width, height, text)
	textInputLastArgs = [x, y, width, height];
	showTextInput();
	moveTextInput(x, y, width, height);
	textInput.placeholder = text;
	textInput.value = "";
	textInput.style.border = "3px solid "+settings.normal_color;
	textInput.style.background = settings.background_color;
	textInput.style.color = settings.normal_color;
}

function moveTextInput(x, y, width, height) {
	var rekt100 = test100.getBoundingClientRect();
	var rektCanvas = canvas.getBoundingClientRect();
	textInput.style.left = (rektCanvas.width / rekt100.width * x / WIDTH * 100 + rektCanvas.x - rekt100.x)+ "px";
	textInput.style.top = (rektCanvas.height / rekt100.height * y / HEIGHT * 100 + rektCanvas.y - rekt100.y) + "px";
	textInput.style.width = (rektCanvas.width / rekt100.width * width / WIDTH * 100) + "px";
	let h = (rektCanvas.height / rekt100.height * height / HEIGHT * 100)
	textInput.style.height = h + "px";
	textInput.style.fontSize = (h-8)+"px";
}

function resizeTextInput() {
	if (textInput.hidden)
		return false;
	moveTextInput(...textInputLastArgs);
}

function showTextInput() {
	textInput.hidden = false;
}

function hideTextInput() {
	textInput.hidden = true;
}