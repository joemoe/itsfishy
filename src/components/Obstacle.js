'use strict';

var Obstacle = function(game, x, y, asset) {
    Phaser.Sprite.call(this, game, x, y, asset);
    this.width = 50;
    this.height = 50;

    this.game.physics.p2.enable(this);
    this.body.static = true;
}

Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
Obstacle.prototype.constructor = Obstacle;

module.exports = Obstacle;