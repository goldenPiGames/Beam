const STRIP_SONGS = "kong";
const VERSION_KONGREGATE = true;
const VERSION_NEWGROUNDS = false;
var kongregate;

loadScript("https://cdn1.kongregate.com/javascripts/kongregate_api.js", function() {
	console.log("Kong API script loaded");
	kongregateAPI.loadAPI(function() {
		console.log("Kong API API loaded");
		kongregate = kongregateAPI.getAPI();
	});
});

function submitToAPI(key, value) {
	kongregate.stats.submit(key, value);
}

function getVersionTimeTrialPara(scrin) {
	let lines = [lg("TimeTrial-KongregatePara")]
	let mdex = scrin.modeButtons.index;
	if (mdex >= 0) {
		let lengths = INFINITE_MODES[mdex].submitKong;
		lines.push(lg("TimeTrial-KongregateParaLength"), {"modename":lg(INFINITE_MODES[mdex].lName), "length0":lengths[0], "length0":lengths[1], "length0":lengths[2]});
	} else {
		lines.push(lg("TimeTrial-KongregateParaLengthNone"));
	}
	return lines.join(" <br> ");
}