for (lev in Levels) {
	Levels[lev].prototype.id = lev;
	//if (!Levels[lev].prototype.lLevelHints)
	//	Levels[lev].prototype.lLevelHints = lev+"-Hints";
}

const MAIN_LEVEL_SEQS = [
	SEQ_MAIN_PIPE,
	SEQ_MAIN_MAZE,
	SEQ_MAIN_ONCE,
	SEQ_MAIN_TOGGLE,
	SEQ_MAIN_GRIDLOCK,
	SEQ_MAIN_SAME,
	SEQ_MAIN_CONCENTRIC,
]

const MAIN_INDICES = {};

const ALL_LEVEL_IDS = [].concat(...MAIN_LEVEL_SEQS.map(seq=>seq.levelIDs));

MAIN_LEVEL_SEQS.forEach((seq, sdex) => {
	seq.levelIDs.forEach((lev, dex) => {
		Levels[lev].prototype.seq = seq;
		Levels[lev].prototype.index = dex;
	});
	seq.color = RAINBOW_7[sdex];
});


const EDITOR_MODES = [
	EDITOR_MODE_PIPE_PATH,
	EDITOR_MODE_MAZE,
	EDITOR_MODE_WALK_ONCE,
	EDITOR_MODE_TOGGLE_GATES,
	EDITOR_MODE_CONCENTRIC_CIRCLES,
	EDITOR_MODE_SAMEGAME,
	EDITOR_MODE_GRIDLOCK,
];