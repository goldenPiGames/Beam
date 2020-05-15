const STRIP_SONGS = "kong";
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