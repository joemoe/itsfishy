'use strict';

var config = require('../components/Configuration.js');

var GameWon = function () {
    this.survivers = 0;
};

GameWon.prototype = {
    init: function(survivers) {
        this.survivers = survivers;
    },

    create: function () {
        this.game.world.setBounds(0, 0, config.gameWidth, config.gameHeight);

        var gameWonTitle = this.game.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY / 2,
            'gamewon'
        );
        gameWonTitle.fixedToCamera = true;
        gameWonTitle.anchor.setTo(0.5, 0.5);

        var playButton = this.game.add.button(
            this.game.world.centerX,
            this.game.world.centerY,
            'play',
            this.playItsFishy,
            this
        );
        playButton.anchor.setTo(0.5, 0.5);

        var surviversText = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY * 1.5,
            'Survivers: ' + this.survivers,
            config.gameWonTextStyle
        );
        surviversText.anchor.setTo(0.5, 0.5);
    },

    playItsFishy: function () {
        this.game.state.start('ItsFishy');
    }
};

module.exports = GameWon;