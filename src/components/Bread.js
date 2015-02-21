'use strict';

var FlashMessage = require('./FlashMessage.js');
var config = require('./Configuration.js');
var Fish = require('./Fish.js');

/**
 *
 * @param {Phaser.Game} game
 * @param {number=} breadCrumbLifespan
 * @param {number=} x
 * @param {number=} y
 * @param {string=} asset
 * @extends {Phaser.Sprite}
 * @constructor
 */
var Bread = function(game, x, y, breadCrumbLifespan, asset) {
    this.breadCrumbLifespan = breadCrumbLifespan || config.breadCrumbDefaultLifespan;

    this.breadEatMessage = 'Awesome!';

    if (typeof x === 'undefined') {
        x = game.input.x + game.camera.x;
    }
    if (typeof y === 'undefined') {
        y = game.input.y + game.camera.y;
    }
    if (typeof asset === 'undefined') {
        asset = 'breadcrumb';
    }

    Phaser.Sprite.call(this, game, x, y, asset);

    this.game.physics.p2.enable(this);

    this.body.static = true;
    this.body.allowGravity = false;
    this.body.onBeginContact.add(this.contact, this);

    this.id = Math.random();

    this.timerEvent = this.game.time.events.add(
        Phaser.Timer.SECOND * this.breadCrumbLifespan,
        this.removeBread,
        this,
        this.id
    );

};

Bread.prototype = Object.create(Phaser.Sprite.prototype);
Bread.prototype.constructor = Bread;

/**
 * @param {Phaser.Physics.P2.Body} body
 */
Bread.prototype.contact = function (body) {
    if ((body.sprite instanceof Fish) && body.sprite.alive) {
        this.game.time.events.remove(this.timerEvent);
        this.kill();
        this.game.add.existing(
            new FlashMessage(this.game, this.breadEatMessage)
        );
    }
};

Bread.prototype.removeBread= function (breadId) {
    if (this.alive && this.id === breadId) {
        this.game.time.events.remove(this.timerEvent);
        this.kill();
    }
};


module.exports = Bread;