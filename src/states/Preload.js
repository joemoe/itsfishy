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
        this.game.load.image('killer', 'assets/images/killer.png');
        this.game.load.image('breadcrumb', 'assets/images/breadcrumb.png');
        this.game.load.image('land', 'assets/images/land.png');
        this.game.load.image('combined-killer', 'assets/images/combined-killer.png');
        this.game.load.image('combined-obstacle', 'assets/images/combined-obstacle.png');

        // load additional assets (like sprites or audaleio streams) here
        this.game.load.spritesheet('timer', 'assets/images/timer.png', 150, 20);

        // load levels
        this.game.load.json('level1', 'assets/levels/level1.json?' + (new Date().getTime()));

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