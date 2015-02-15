'use strict';

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'its-fishy');

// game.plugins.add(Phaser.Plugin.Automata);

game.state.add('GameState', require('./states/GameState.js'));

game.state.start('GameState');