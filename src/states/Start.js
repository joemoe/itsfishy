'use strict';

var Start = function () {
};

Start.prototype = {
    create: function () {
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
        this.game.state.start('ItsFishy', true, false, 'level1');
    }
};

module.exports = Start;