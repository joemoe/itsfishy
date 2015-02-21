'use strict';

var CombinedObstacle = function(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'combined-obstacle');

	this.game.physics.p2.enable(this);

	this.body.static = true;
}

CombinedObstacle.prototype = Object.create(Phaser.Sprite.prototype);
CombinedObstacle.prototype.constructor = CombinedObstacle;

CombinedObstacle.prototype.open = function() {
	this.height = this.height / 2;
	this.body.y = 0;
}

module.exports = CombinedObstacle;