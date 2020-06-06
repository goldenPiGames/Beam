const LANG = {};

const LANGUAGES = ["en", "es", "ru"/*, "cg"*/];

function lg(name, subs) {
	if (!subs)
		subs = {};
	var got = LANG[settings.lang][name] || LANG.en[name];
	if (!got)
		return undefined;
	else if (typeof got == "string")
		return got.replace(/<.+?>/g, tag=>evalTag(tag, subs));
	else if (Array.isArray(got))
		return got.map(sub => sub.replace(/<.+?>/g, tag=>evalTag(tag, subs)));
	else
		return got;
}

function evalTag(tag, subs) {
	var args = tag.substring(1, tag.length-1).split("|");
	var sub = subs[args[0]];
	if (sub) {
		return sub;
	}
	switch (args[0]) {
		case "lg" : return lg(args[1]); break;
		case "SameGameColor" : return getSameGameColorDescription(args[1]); break;
		default : return tag; break;
	}
}

function getSameGameColorDescription(which) {
	return settings.colorblind ? lg("SameGame-Pattern"+which) : getColorDescription(palette["samegame"+which]);
}

function getLangCredits() {
	return LANGUAGES.map(l=>{
		return {
			name : LANG[l]["Lang-Name"],
			credits : LANG[l]["Lang-Credits"]
		}
	});
}