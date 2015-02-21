'use strict';

var Play = require('./Play.js');
var config = require('../components/Configuration.js');

var GameWon = function () {
    Play.call(this);
    this.survivers = 0;
};

GameWon.prototype = Object.create(Play.prototype);
GameWon.prototype.constructor = GameWon;

GameWon.prototype.init = function(levelKey, survivers) {
    Play.prototype.init.call(this, levelKey);
    if (typeof levelKey != 'string') {
        this.levelKey = config.defaultLevel;
    } else {
        this.levelKey = levelKey;
    }

    this.survivers = survivers;
};

GameWon.prototype.create = function () {
    var bg = this.game.add.tileSprite(
        0, 0, config.gameWidth, config.gameHeight, 'background'
    );

    var youwonscreen = this.game.add.sprite(
        0, 0, 'youwonscreen'
    );
    Play.prototype.create.call(this);

    var surviversText = this.game.add.text(
        this.game.world.centerX,
        this.game.world.centerY * 1.5,
        'Survivers: ' + this.survivers,
        config.gameWonTextStyle
    );
    surviversText.anchor.setTo(0.5, 0.5);
};

module.exports = GameWon;