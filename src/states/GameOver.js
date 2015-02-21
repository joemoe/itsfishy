'use strict';

var Play = require('./Play.js');
var config = require('../components/Configuration.js');


var GameOver = function () {
    Play.call(this);
};

GameOver.prototype = Object.create(Play.prototype);
GameOver.prototype.constructor = GameOver;


GameOver.prototype.create = function () {
    var bg = this.game.add.tileSprite(
        0, 0, config.gameWidth, config.gameHeight, 'background'
    );
    var gameoverscreen = this.game.add.sprite(
        0, 0, 'gameoverscreen'
    );
    Play.prototype.create.call(this);
};

module.exports = GameOver;