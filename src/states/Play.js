'use strict';

var config = require('../components/Configuration.js');

var Play = function (playButtonText) {
    /** @var {Phaser.Text} */
    this.playText = null;

    /** @var {string} */
    this.playButtonText = playButtonText;
    if (typeof playButtonText != 'string') {
        this.playButtonText = config.defaultPlayButtonText;
    }
};

Play.prototype = {
    init: function(levelKey) {
        if (typeof levelKey != 'string') {
            this.levelKey = config.defaultLevel;
        } else {
            this.levelKey = levelKey;
        }
    },

    create: function () {
        this.game.world.setBounds(0, 0, config.gameWidth, config.gameHeight);

        this.playText = this.game.add.text(
            this.game.world.centerX,
            this.game.world.centerY,
            this.playButtonText,
            config.playButtonTextStyle
        );
        this.playText.anchor.setTo(0.5, 0.5);
    },

    update: function() {
        if (
            this.game.input.activePointer.positionUp &&
            this.game.input.activePointer.positionUp.x != 0 &&
            this.game.input.activePointer.positionUp.y != 0
        ) {
            var bounds = this.playText.getBounds();
            if (bounds.contains(
                    this.game.input.activePointer.positionUp.x,
                    this.game.input.activePointer.positionUp.y
                )) {
                this.playItsFishy();
            }
        }
    },

    playItsFishy: function () {
        this.game.state.start('ItsFishy', true, false, this.levelKey);
    }
};

module.exports = Play;