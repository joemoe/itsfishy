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
        this.game.load.image('obstacle', 'assets/images/obstacle.png');

        this.game.load.image('breadcrumb', 'assets/images/breadcrumb.png');
        game.load.spritesheet('timer', 'assets/images/timer.png', 150, 20);

        // load additional assets (like sprites or audio streams) here
        // this.game.load.spritesheet('numbers', 'assets/numbers.png', 100, 100);

        // load physic assets
        /*
        this.game.load.crossOrigin = "Anonymous";
        this.game.load.image('check', 'https://dl.dropboxusercontent.com/u/134359065/media/images/polygon/check.png');
        this.game.load.physics('physicsData', 'https://dl.dropboxusercontent.com/u/134359065/media/images/polygon/physics.json');
        */
    },

    create: function () {
        this.game.state.start('ItsFishy');
    }
};

module.exports = Preload;