for (lev in Levels) {
	Levels[lev].prototype.id = lev;
	if (!Levels[lev].prototype.lLevelHints)
		Levels[lev].prototype.lLevelHints = lev+"-Hints";
}

const MAIN_LEVEL_SEQS = [
	SEQ_MAIN_PIPE,
	SEQ_MAIN_ONCE,
	SEQ_MAIN_TOGGLE,
	SEQ_MAIN_GRIDLOCK,
	SEQ_MAIN_SAME,
	SEQ_MAIN_CONCENTRIC,
	SEQ_MAIN_MAZE,
]

const ALL_LEVEL_IDS = [].concat(...MAIN_LEVEL_SEQS.map(seq=>seq.levelIDs));