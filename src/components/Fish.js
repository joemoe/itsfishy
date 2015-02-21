'use strict';

var Fish = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'fish');
    this.game.physics.p2.enable(this);
    this.id = Math.random();
    this.onSpeedBread = false;

    this.body.collideWorldBounds = true;
    this.body.allowGravity = false;

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

module.exports = Fish;