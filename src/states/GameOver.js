'use strict';

var config = require('../components/Configuration.js');

var GameOver = function (game) {
};

GameOver.prototype = {
    create: function () {
        this.game.world.setBounds(0, 0, config.gameWidth, config.gameHeight);

        var gameOverTitle = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY / 2,
            'gameover'
        );
        gameOverTitle.fixedToCamera = true;
        gameOverTitle.anchor.setTo(0.5, 0.5);

        var playButton = this.game.add.button(
            this.game.world.centerX,
            this.game.world.centerY,
            'play',
            this.playItsFishy,
            this
        );
        playButton.anchor.setTo(0.5, 0.5);
    },

    playItsFishy: function () {
        this.game.state.start('ItsFishy');
    }
};

module.exports = GameOver;