var textInput;

function initTextInput() {
	textInput = document.getElementById("TextInput");
}

function setTextInput(x, y, width, height, text) {
	//console.log(x, y, width, height, text)
	showTextInput();
	textInput.style.left = x+"px";
	textInput.style.top = y+"px";
	textInput.style.width = width+"px";
	textInput.style.height = height+"px";
	textInput.style.fontSize = (height-8)+"px";
	textInput.placeholder = text;
	textInput.value = "";
	textInput.style.border = "3px solid "+settings.normal_color;
	textInput.style.background = settings.background_color;
	textInput.style.color = settings.normal_color;
}

function showTextInput() {
	textInput.hidden = false;
}

function hideTextInput() {
	textInput.hidden = true;
}