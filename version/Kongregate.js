const STRIP_SONGS = "kong";
const VERSION_KONGREGATE = true;
const VERSION_NEWGROUNDS = false;
var kongregate;

loadScript("https://cdn1.kongregate.com/javascripts/kongregate_api.js", function() {
	console.log("Kong API script loaded");
	kongregateAPI.loadAPI(function() {
		console.log("Kong API loaded");
		kongregate = kongregateAPI.getAPI();
		kongregate.sharedContent.addLoadListener("Level", onLevelLoad);
		//kongregate.sharedContent.addLoadListener("Set", onSetLoad);
	});
});

function submitToAPI(key, value) {
	kongregate.stats.submit(key, value);
}

function onLevelLoad(params) {
	try {
		var editor = editorFromJSON(params.content);
		runnee = new EditorWrapper(editor);
	} catch (e) {
		qAlert(lg("EditorLoad-Error"));
	}
}

function onSetLoad() {
	
}

var kongThumbCanvas;
var kongThumbCtx;
const KONG_THUMB_SCALE = 1/8;

function submitLevel(data, mode, snap) {
	if (typeof data != "string")
		data = JSON.stringify(data);
	if (!kongThumbCanvas) {
		kongThumbCanvas = document.createElement("canvas");
		kongThumbCtx = kongThumbCanvas.getContext("2d");
	}
	ctx.putImageData(snap, 0, 0);
	kongThumbCanvas.width = WIDTH * KONG_THUMB_SCALE;
	kongThumbCanvas.height = HEIGHT * KONG_THUMB_SCALE;
	kongThumbCtx.drawImage(canvas, 0, 0, WIDTH*KONG_THUMB_SCALE, HEIGHT*KONG_THUMB_SCALE)
	var thumb64 = kongThumbCanvas.toDataURL();
	console.log(thumb64);
	kongregate.sharedContent.save("Level", data, ()=>{}, thumb64, mode);
}