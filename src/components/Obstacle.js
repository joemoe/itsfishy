'use strict';

var Obstacle = function(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'obstacle');

	this.game.physics.arcade.enable(this);
	this.body.immovable = true;
}

Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;

module.exports = Obstacle;