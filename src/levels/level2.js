"use strict";

var levelGenerator = require('./levelGenerator.js');

var level2 = {
	world: {
    	width: 5300,
    	height: 600,
    	cameraSpeed: 1,
    	gameOverFishAmount: 1,
    	fishAmount: 20
 	},
 	loadOffset: 0,
 	obstacles: [],
 	deathZones: [],
 	floaters: [],
 	combined: [],
 	build: function() {
 		var x = 600;
 		this.addFloater(x, 300, 'airmattress');
 		x += 500;
 		this.obstacles = this.obstacles.concat(levelGenerator.generateIsland(x, 150, 5, 2));
 		x += 200;
 		this.addFloater(x, 400, 'ducks');
 		x += 500;
 		this.addDeathZone(x, 200, 'boat');
 		x += 500;
 		this.obstacles = this.obstacles.concat(levelGenerator.generateIsland(x, 250, 2, 5));
 		x += 100;
 		this.addFloater(x, 100, 'ducks');
 		x += 100;
 		this.addFloater(x, 200, 'ducks');
 		x += 200;
 		this.addDeathZone(x, 400, 'boat');
 		x += 400;
 		this.addDeathZone(x, 150, 'octopus-small');
 		x += 200;
 		this.addFloater(x, 150, 'ducks');
 		x += 100;
 		this.addFloater(x, 400, 'ducks');
 		x += 300;
 		this.addDeathZone(x, 400, 'octopus-small');
 		x += 200;
 		this.addDeathZone(x, 100, 'octopus-small');
 		x += 400;
 		this.addFloater(x, 150, 'airmattress');
 		x += 400;
 		this.addDeathZone(x, 450, 'boat');
 		x += 300;
 		this.addDeathZone(x, 500, 'octopus-small');
 		x += 200;
 		this.addDeathZone(x, 100, 'octopus-small');


 		this.loadOffset = x - 1000;

 		this.world.width = x + 800;
 	}, addObstacle: function(x, y, asset) {
 		this.obstacles.push({
 			x: x,
 			y: y,
 			asset: asset
 		});
 	}, addDeathZone: function(x, y, asset) {
 		this.deathZones.push({
 			x: x,
 			y: y,
 			asset: asset
 		});
 	}, addFloater: function(x, y, asset) {
 		this.floaters.push({
 			x: x,
 			y: y,
 			asset: asset
 		});
 	}
};
level2.build()
module.exports = level2;