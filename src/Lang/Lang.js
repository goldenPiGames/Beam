const LANG = {};

const LANGUAGES = ["en", "cg"];

function lg(name) {
	return LANG[settings.lang][name] || LANG.en[name];
}