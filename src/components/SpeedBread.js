'use strict';

var Bread = require('./Bread.js');
var Fish = require('./Fish.js');
var config = require('./Configuration.js');

/**
 * @param {Phaser.Game} game
 * @param {number=} x
 * @param {number=} y
 * @param {number=} breadCrumbLifespan
 * @param {number=} speedDuration
 * @extends {Bread}
 * @constructor
 */
var SpeedBread = function(game, x, y, breadCrumbLifespan, speedDuration) {
    Bread.call(this, game, x, y, breadCrumbLifespan, 'speedbreadcrumb');

    if (typeof speedDuration != 'number') {
        this.speedDuration = config.fishSpeedDuration;
    } else {
        this.speedDuration = speedDuration;
    }
};

SpeedBread.prototype = Object.create(Phaser.Sprite.prototype);
SpeedBread.prototype.constructor = SpeedBread;

/**
 * @param {Phaser.Physics.P2.Body} body
 */
SpeedBread.prototype.contact = function (body) {
    Bread.prototype.contact.call(this, body);

    if (body.sprite instanceof Fish) {
        body.sprite.setOnSpeedBread();
    }

    this.game.time.events.add(
        Phaser.Timer.SECOND * this.speedDuration,
        function() {
            if (body && body.sprite && body.sprite.alive) {
                body.sprite.setToNormal();
            }
        },
        this,
        this.id
    );
};


module.exports = SpeedBread;