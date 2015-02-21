'use strict';

var Preload = function (game) {
};

Preload.prototype = {
    preload: function () {
        var loadingBar = this.add.sprite(
            this.game.world.centerX,
            this.game.world.centerY,
            'loading'
        );
        loadingBar.anchor.setTo(0.5, 0.5);

        this.load.setPreloadSprite(loadingBar);

        //
        this.game.load.image('startscreen', 'assets/images/startscreen.png');
        this.game.load.image('gameoverscreen', 'assets/images/gameoverscreen.png');
        this.game.load.image('youwonscreen', 'assets/images/youwonscreen.png');

        // load images and unconfigured assets here
        this.game.load.image('speedfish', 'assets/images/speedfishright.png');
        this.game.load.image('gameover', 'assets/images/gameover.png');
        this.game.load.image('gamewon', 'assets/images/gamewon.png');
        this.game.load.image('loading', 'assets/images/loading.png');
        this.game.load.image('play', 'assets/images/play.png');
        this.game.load.image('obstacle', 'assets/images/obstacle.png');
        this.game.load.image('killer', 'assets/images/killer.png');

        this.game.load.image('speedbreadcrumb', 'assets/images/speedbreadcrumb.png');
        this.game.load.image('breadcrumb', 'assets/images/breadcrumb.png');
        this.game.load.spritesheet('breadcrumb-sprite', 'assets/images/breadcrumb-sprite.png', 79, 82);

        this.game.load.image('land', 'assets/images/beach-real.png');
        this.game.load.image('combined-killer', 'assets/images/combined-killer.png');
        this.game.load.image('combined-obstacle', 'assets/images/combined-obstacle.png');
        this.game.load.image('background', 'assets/images/water.jpg');
        this.game.load.image('goal', 'assets/images/goal.png');

        // killers
        this.game.load.image('octopus', 'assets/images/octopus.png');
        this.game.load.image('octopus-small', 'assets/images/octopus-small.png');

        // island freak out
        this.game.load.image('island', 'assets/images/island.png');
        this.game.load.image('island-bottom', 'assets/images/island-bottom.png');
        this.game.load.image('island-top', 'assets/images/island-top.png');
        this.game.load.image('island-right', 'assets/images/island-right.png');
        this.game.load.image('island-left', 'assets/images/island-left.png');
        this.game.load.image('island-top-bottom', 'assets/images/island-top-bottom.png');
        this.game.load.image('island-left-right', 'assets/images/island-left-right.png');
        this.game.load.image('island-left-bottom', 'assets/images/island-left-bottom.png');
        this.game.load.image('island-right-top', 'assets/images/island-right-top.png');
        this.game.load.image('island-right-bottom', 'assets/images/island-right-bottom.png');
        this.game.load.image('island-left-top', 'assets/images/island-left-top.png');

        //floaters
        this.game.load.image('airmattress', 'assets/images/airmattress.png');

        // load additional assets (like sprites or audaleio streams) here
        this.game.load.spritesheet('timer', 'assets/images/timer.png', 150, 20);
        this.game.load.spritesheet('fish', 'assets/images/fishright.png', 80, 50);

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
        this.game.state.start('Start');
    }
};

module.exports = Preload;