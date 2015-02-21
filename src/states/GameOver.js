'use strict';

var GameOver = function (game) {
};

GameOver.prototype = {
    create: function () {
        var gameOverTitle = this.game.add.sprite(
            this.game.world.centerX,
            160,
            'gameover'
        );
        gameOverTitle.anchor.setTo(0.5, 0.5);

        var playButton = this.game.add.button(
            this.game.world.centerX,
            320,
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