'use strict';

var levelGenerator = {
	tileWidth: 50,
	tileHeight: 50,

	dimensions: {
		island: {
			width: 50,
			height: 50
		}, octopusSmall: {
			width: 150,
			height: 150
		}, octopuss: {
			width: 300,
			height: 300
		}, airmattress: {
			width: 480,
			height: 170
		}, ducks: {
			width: 241,
			height: 71
		}
	},

	generateIsland: function(x, y, tilesX, tilesY) {
		var island = [];
		for(var i = 0, ix = x; i < tilesX; i++, ix += this.tileWidth) {
			for(var j = 0, jy = y; j < tilesY; j++, jy += this.tileHeight) {
				var asset = 'island';
				if(i == 0) asset += "-left";
				else if(i == tilesX - 1) asset += "-right";
				if(j == 0 && jy != 0) asset += "-top";
				else if(j == tilesY - 1 && jy != 0) asset += "-bottom";
				island.push({x: ix, y: jy, asset: asset});
			}
		}
		return island;
	}	
}

module.exports = levelGenerator;