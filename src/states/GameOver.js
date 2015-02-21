'use strict';

var Play = require('./Play.js');

var GameOver = function () {
    Play.call(this);
};

GameOver.prototype = Object.create(Play.prototype);
GameOver.prototype.constructor = GameOver;


GameOver.prototype.create = function () {
    Play.prototype.create.call(this);

    var gameOverTitle = this.game.add.sprite(
        this.game.world.centerX,
        this.game.world.centerY / 2,
        'gameover'
    );
    gameOverTitle.fixedToCamera = true;
    gameOverTitle.anchor.setTo(0.5, 0.5);
};

module.exports = GameOver;