'use strict';

window.game = new Phaser.Game(800, 600, Phaser.AUTO, 'its-fishy');

//window.game.plugins.add(Phaser.Plugin.Automata);

window.game.state.add('Boot', require('./states/Boot.js'));
window.game.state.add('Preload', require('./states/Preload.js'));
window.game.state.add('ItsFishy', require('./states/ItsFishy.js'));
window.game.state.add('GameOver', require('./states/GameOver.js'));

window.game.state.start('Boot');