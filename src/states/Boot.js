'use strict';

var Boot = function (game) {
    console.log('%cStarting the awesome its fishy time', 'color:white; background:red');
};

Boot.prototype = {
    preload: function () {
        this.game.load.image('loading', 'assets/images/loading.png');
    },

    create: function () {
        // scale configurations
        //this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.game.scale.refresh();
        //this.game.input.onDown.add(this.gofull, this);
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.setScreenSize(true);

        // switch to Preload
        this.game.state.start('Preload');

        // load plugins
        this.game.automata = this.game.plugins.add(Phaser.Plugin.Automata);
    }

    /*
    ,gofull: function () {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
        } else {
            game.scale.startFullScreen(false);
        }
    }
    */
};

module.exports = Boot;