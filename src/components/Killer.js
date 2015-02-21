'use strict';

var FlashMessage = require('./FlashMessage.js');
var Fish = require('./Fish.js');

var Killer = function(game, x, y, asset) {
    Phaser.Sprite.call(this, game, x, y, asset);
    this.game.physics.p2.enable(this);

    this.body.static = true;

    this.body.onBeginContact.add(this.hitDeathZone, this);

};

Killer.prototype = Object.create(Phaser.Sprite.prototype);
Killer.prototype.constructor = Killer;

/**
 * @param {Phaser.Physics.P2.Body} body
 */
Killer.prototype.hitDeathZone = function(body) {
    if (body.sprite instanceof Fish) {
        if (body.sprite.isOnSpeed()) {
            this.kill();
            this.game.add.existing(
                new FlashMessage(this.game, 'KILL!')
            );
        } else {
            body.sprite.kill();
        }
    }
};

module.exports = Killer;