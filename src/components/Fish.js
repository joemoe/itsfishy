'use strict';

var config = require('./Configuration.js');

var Fish = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'fish');
    this.game.physics.p2.enable(this);
    this.id = Math.random();
    this.onSpeedBread = false;

    this.body.collideWorldBounds = true;
    this.body.allowGravity = false;

    this.animations.add('normal', [0]);
    this.animations.add('explode', [1]);

    this.animations.play('normal');
};

Fish.prototype = Object.create(Phaser.Sprite.prototype);
Fish.prototype.constructor = Fish;

Fish.prototype.setOnSpeedBread = function() {
    this.onSpeedBread = true;
    this.loadTexture('speedfish');
    this.body.thrust(100);
};

Fish.prototype.setToNormal = function() {
    this.onSpeedBread = false;
    this.loadTexture('fish');
};

Fish.prototype.isOnSpeed = function() {
    return this.onSpeedBread;
};

Fish.prototype.kill = function() {
    if (this.animations.currentAnim.name === 'explode') {
        return;
    }
    this.animations.play('explode');
    this.game.time.events.add(
        Phaser.Timer.SECOND * config.fishExplosionDuration,
        Phaser.Sprite.prototype.kill,
        this
    );
};

module.exports = Fish;