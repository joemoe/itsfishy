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

    this.survivers = survivers;
};

GameWon.prototype.create = function () {
    Play.prototype.create.call(this);

    var gameWonTitle = this.game.add.sprite(
        this.game.world.centerX,
        this.game.world.centerY / 2,
        'gamewon'
    );
    gameWonTitle.fixedToCamera = true;
    gameWonTitle.anchor.setTo(0.5, 0.5);

    var surviversText = this.game.add.text(
        this.game.world.centerX,
        this.game.world.centerY * 1.5,
        'Survivers: ' + this.survivers,
        config.gameWonTextStyle
    );
    surviversText.anchor.setTo(0.5, 0.5);
};

module.exports = GameWon;