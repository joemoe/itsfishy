'use strict';

var config = require('./Configuration.js');

var FlashMessage = function(game, text, style) {
    this.blinkState = false;
    this.repeatCount = config.flashMessageRepeatCount;

    if (typeof style === 'undefined') {
        style = config.flashDefaultMessageTextStyle;
    }
    var x = config.gameWidth / 2;
    var y = config.flashMessageTop;
    Phaser.Text.call(this, game, x, y, text, style);


    this.anchor.setTo(0.5, 0.5);
    this.fixedToCamera = true;

    this.game.time.events.repeat(
        Phaser.Timer.SECOND * config.flashMessageBlinkTime,
        config.flashMessageRepeatCount,
        this.blink,
        this
    );
};

FlashMessage.prototype = Object.create(Phaser.Text.prototype);
FlashMessage.prototype.constructor = FlashMessage;

FlashMessage.prototype.blink = function() {
    this.repeatCount--;
    this.visible = this.blinkState;
    this.blinkState = !this.blinkState;
    if (this.repeatCount === 0) {
        this.visible = false;
    }
};

module.exports = FlashMessage;