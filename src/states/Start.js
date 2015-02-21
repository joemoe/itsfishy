'use strict';

var config = require('../components/Configuration.js');

var Start = function () {
};

Start.prototype = {
    create: function () {
        var bg = this.game.add.tileSprite(
            0, 0, config.gameWidth, config.gameHeight, 'background'
        );
        var startscreen = this.game.add.sprite(
            0, 0, 'startscreen'
        );
        var playButton = this.game.add.button(
            650,
            450,
            'play',
            this.playItsFishy,
            this
        );
        playButton.anchor.setTo(0.5, 0.5);
    },

    playItsFishy: function () {
        this.game.state.start('ItsFishy', true, false, 'level1');
    }
};

module.exports = Start;