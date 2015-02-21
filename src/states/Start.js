'use strict';

var Play = require('./Play.js');

var Start = function () {
    Play.call(this);
};

Start.prototype = Object.create(Play.prototype);
Start.prototype.constructor = Start;


Start.prototype.create = function () {
    Play.prototype.create.call(this);
};

module.exports = Start;