'use strict';

var Preload = function (game) {
};

Preload.prototype = {
    preload: function () {
        var loadingBar = this.add.sprite(160, 240, 'loading');
        loadingBar.anchor.setTo(0.5, 0.5);

        this.load.setPreloadSprite(loadingBar);

        // load images and unconfigured assets here
        this.game.load.image('fish', 'assets/images/fishright.png');
        this.game.load.image('gameover', 'assets/images/gameover.png');
        this.game.load.image('loading', 'assets/images/loading.png');
        this.game.load.image('play', 'assets/images/play.png');

        // load additional assets (like sprites or audio streams) here
        // this.game.load.spritesheet('numbers', 'assets/numbers.png', 100, 100);
    },

    create: function () {
        this.game.state.start('ItsFishy');
    }
};

module.exports = Preload;