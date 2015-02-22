"use strict";

var levelGenerator = require('./levelGenerator.js');

var level3 = {
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
 		var x = 900;

 		for(var i = 0; i < 5; i ++) {
 			var r = Math.floor(Math.random()*3);
 			if(r == 0) {
 				this.addFloater(x, 100, 'ducks');
 				this.addFloater(x, 300, 'ducks');
 				this.addDeathZone(x+150, 500+50, 'ducks-evil');
 			} else if(r == 1) {
 				this.addFloater(x, 100, 'ducks');
 				this.addDeathZone(x+150, 300 + 50, 'ducks-evil');
 				this.addFloater(x, 500, 'ducks');
 			} else if(r == 2) {
 				this.addDeathZone(x + 150, 100 + 50, 'ducks-evil');
 				this.addFloater(x, 300, 'ducks');
 				this.addFloater(x, 500, 'ducks');
 			}
 			x += 400;
 		}
 		x += 400
 		this.addDeathZone(x, 300, 'octopus');

 		// this.loadOffset = x - 1000;

 		this.world.width = x + 500;
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
}
level3.build()
module.exports = level3;