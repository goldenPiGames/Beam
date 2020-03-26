const LANG = {};

const LANGUAGES = ["en", "cg"];

function lg(name) {
	var got = LANG[settings.lang][name] || LANG.en[name];
	if (!got)
		return undefined;
	else if (typeof got == "string")
		return got.replace(/<.+?>/g, evalTag);
	else if (Array.isArray(got))
		return got.map(sub => sub.replace(/<.+?>/g, evalTag));
	else
		return got;
}

function evalTag(tag) {
	var args = tag.substring(1, tag.length-1).split("|");
	switch (args[0]) {
		case "lg" : return lg(args[1]); break;
		case "SameGameColor" : return settings.colorblind ? lg("SameGame-Pattern"+args[1]) : getColorDescription(palette["samegame"+args[1]]); break;
		default : return tag; break;
	}
}