'use strict';

var Killer = function(game, x, y) {
	Phaser.Sprite.call(this, game, x, y, 'killer');
	this.game.physics.arcade.enable(this);

	this.body.immovable = true;
}

Killer.prototype = Object.create(Phaser.Sprite.prototype);
Killer.prototype.constructor = Killer;

module.exports = Killer;