'use strict';

var Play = require('./Play.js');
var config = require('../components/Configuration.js');

var GameWon = function () {
    Play.call(this);
    this.survivors = 0;
};

GameWon.prototype = Object.create(Play.prototype);
GameWon.prototype.constructor = GameWon;

GameWon.prototype.init = function(levelKey, survivors) {
    Play.prototype.init.call(this, levelKey);

    this.survivors = survivors;
};

GameWon.prototype.create = function () {
    var bg = this.game.add.tileSprite(
        0, 0, config.gameWidth, config.gameHeight, 'background'
    );

    var youwonscreen = this.game.add.sprite(
        0, 0, 'youwonscreen'
    );
    Play.prototype.create.call(this);

    var survivorsText = this.game.add.text(
        this.game.world.centerX,
        this.game.world.centerY * 1.5,
        'Survivors: ' + this.survivors,
        config.gameWonTextStyle
    );
    survivorsText.anchor.setTo(0.5, 0.5);
};

module.exports = GameWon;