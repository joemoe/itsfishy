'use strict';

var CombinedKiller = function(game, x, y, obstacle) {
	Phaser.Sprite.call(this, game, x, y, 'combined-killer');

	this.game.physics.p2.enable(this);
	this.obstacle = obstacle;

	this.takesFish = 1;

	this.body.static = true;
}

CombinedKiller.prototype = Object.create(Phaser.Sprite.prototype);
CombinedKiller.prototype.constructor = CombinedKiller;

CombinedKiller.prototype.fishDetonation = function(fish) {
	this.takesFish--;
	if(this.takesFish == 0) {
		this.obstacle.open();
	} else if(this.takesFish > 0) fish.kill();
}

module.exports = CombinedKiller;