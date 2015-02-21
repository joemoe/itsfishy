'use strict';

var config = require('./Configuration.js');

var Fish = function(game, x, y, asset) {
    if (typeof asset === 'undefined') {
        asset = 'fish';
    }
    Phaser.Sprite.call(this, game, x, y, asset);
    this.game.physics.p2.enable(this);
    this.id = Math.random();
    this.onSpeedBread = false;

    this.body.collideWorldBounds = true;
    this.body.allowGravity = false;

    this.animations.add('normal', [0]);
    this.animations.add('explode', [1]);
    this.animations.add('win', [2]);
    this.animations.add('speed', [3]);

    this.animations.play('normal');
};

Fish.prototype = Object.create(Phaser.Sprite.prototype);
Fish.prototype.constructor = Fish;

Fish.prototype.setOnSpeedBread = function() {
    this.onSpeedBread = true;
    this.animations.play('speed');
    this.body.thrust(100);
};

Fish.prototype.setToNormal = function() {
    this.onSpeedBread = false;
    this.animations.play('normal');
};

Fish.prototype.isOnSpeed = function() {
    return this.onSpeedBread;
};

Fish.prototype.kill = function(animation) {
    if (typeof animation != 'string') {
        animation = 'explode';
    }
    if (this.animations.currentAnim.name === animation) {
        return;
    }
    this.animations.play(animation);
    this.game.time.events.add(
        Phaser.Timer.SECOND * config.fishExplosionDuration,
        Phaser.Sprite.prototype.kill,
        this
    );
};

module.exports = Fish;