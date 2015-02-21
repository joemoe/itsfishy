'use strict';

var Floater = function(game, x, y, asset) {
    Phaser.Sprite.call(this, game, x, y, asset);

}

Floater.prototype = Object.create(Phaser.Sprite.prototype);
Floater.prototype.constructor = Floater;

module.exports = Floater;