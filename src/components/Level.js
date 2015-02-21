'use strict';

var config = require('./Configuration.js');

var Level = function(game, x, y, level) {
    Phaser.Sprite.call(this, game, x, y, 'levels');

    this.animations.add('normal', [0]);
    this.animations.add('locked', [1]);

    this.animations.play('normal');

    this.level = level;
};

Level.prototype = Object.create(Phaser.Sprite.prototype);
Level.prototype.constructor = Level;

module.exports = Level;