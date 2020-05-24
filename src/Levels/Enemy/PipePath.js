class EnemyLevelPipeCursor extends PipeLevel {
	constructor(layout) {
		super(layout);
	}
}

Levels.FinalBossPipe = class LevelFinalBossPipe extends EnemyLevelPipeCursor {
	constructor() {
		super({
			entranceSide:1,
			exitSide:3,
			width:8,
			height:5,
			entrancePosition:4,
			exitPosition:1,
			pipeGrid:[
				[0,1,0,0,1],
				[1,1,1,1,1],
				[0,0,0,0,0],
				[0,0,0,1,1],
				[1,1,1,1,0],
				[0,1,1,1,1],
				[1,1,1,1,1],
				[0,1,1,1,1]
			],
			solution:[
				{x:7,y:4,type:1,solution:0},{x:7,y:3,type:1,solution:2},{x:6,y:3,type:1,solution:0},{x:6,y:2,type:1,solution:1},{x:7,y:2,type:1,solution:3},{x:7,y:1,type:1,solution:2},{x:6,y:1,type:1,solution:0},{x:6,y:0,type:1,solution:2},{x:5,y:0,type:0,solution:1},{x:4,y:0,type:1,solution:1},{x:4,y:1,type:1,solution:3},{x:3,y:1,type:0,solution:1},{x:2,y:1,type:0,solution:1},{x:1,y:1,type:1,solution:1},{x:1,y:2,type:1,solution:0},{x:2,y:2,type:0,solution:1},{x:3,y:2,type:0,solution:1},{x:4,y:2,type:1,solution:2},{x:4,y:3,type:1,solution:0},{x:5,y:3,type:1,solution:2},{x:5,y:4,type:1,solution:3},{x:4,y:4,type:0,solution:1},{x:3,y:4,type:1,solution:0},{x:3,y:3,type:1,solution:2},{x:2,y:3,type:0,solution:1},{x:1,y:3,type:1,solution:1},{x:1,y:4,type:1,solution:3},{x:0,y:4,type:1,solution:0},{x:0,y:3,type:0,solution:0},{x:0,y:2,type:0,solution:0},{x:0,y:1,type:1,solution:2}
			]
		});
	};
}