'use strict';

var Fish = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'fish');
    this.game.physics.arcade.enable(this);

    this.body.collideWorldBounds = true;
    this.body.allowGravity = false;

}

Fish.prototype = Object.create(Phaser.Sprite.prototype);
Fish.prototype.constructor = Fish;

module.exports = Fish;