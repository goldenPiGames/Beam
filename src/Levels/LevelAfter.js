for (lev in Levels) {
	Levels[lev].prototype.id = lev;
	if (!Levels[lev].prototype.lLevelHints)
		Levels[lev].prototype.lLevelHints = lev+"-Hints";
}