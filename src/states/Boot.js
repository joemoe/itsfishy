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
        // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.scale.pageAlignHorizontally = true;
        // this.scale.setScreenSize();

        // switch to Preload
        this.game.state.start('Preload');

        // load plugins
        this.game.automata = this.game.plugins.add(Phaser.Plugin.Automata);
    }
};

module.exports = Boot;