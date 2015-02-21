'use strict';

var Play = require('./Play.js');
var config = require('../components/Configuration.js');

var Start = function () {
    Play.call(this);
};

Start.prototype = Object.create(Play.prototype);
Start.prototype.constructor = Start;

Start.prototype.create = function () {
    var bg = this.game.add.tileSprite(
        0, 0, config.gameWidth, config.gameHeight, 'background'
    );
    var startscreen = this.game.add.sprite(
        0, 0, 'startscreen'
    );
    Play.prototype.create.call(this);
};

module.exports = Start;