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

    console.debug(this.playButtonText);
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
            game.input.activePointer.positionUp &&
            game.input.activePointer.positionUp.x != 0 &&
            game.input.activePointer.positionUp.y != 0
        ) {
            var bounds = this.playText.getBounds();
            if (bounds.contains(
                    game.input.activePointer.positionUp.x,
                    game.input.activePointer.positionUp.y
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