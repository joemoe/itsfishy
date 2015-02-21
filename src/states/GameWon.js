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
    Play.prototype.create.call(this);

    var gameWonTitle = this.game.add.sprite(
        this.game.world.centerX,
        this.game.world.centerY / 2,
        'gamewon'
    );
    gameWonTitle.fixedToCamera = true;
    gameWonTitle.anchor.setTo(0.5, 0.5);

    var survivorsText = this.game.add.text(
        this.game.world.centerX,
        this.game.world.centerY * 1.5,
        'Survivors: ' + this.survivors,
        config.gameWonTextStyle
    );
    survivorsText.anchor.setTo(0.5, 0.5);
};

module.exports = GameWon;