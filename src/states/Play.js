'use strict';

var Level = require('../components/Level.js');
var config = require('../components/Configuration.js');

var Play = function () {
    this.levelAmount = 4;
    this.levelBoxWidth = 40;
    this.levelBoxHeight = 40;
    this.levelBoxPadding = 2;

    this.levelChooserXOffset = 200;
    this.levelChooserYOffset = -60;
    /**
     * @type {Phaser.Group}
     */
    this.levels;
    /**
     * @type {Phaser.Group}
     */
    this.levelNames;
};

Play.prototype = {
    create: function () {
        this.game.world.setBounds(0, 0, config.gameWidth, config.gameHeight);
        this.levels = this.game.add.group();
        this.levelNames = this.game.add.group();

        var startX = config.gameWidth / 2 - (this.levelAmount * this.levelBoxWidth +
            (this.levelAmount - 1) * this.levelBoxPadding) / 2 + this.levelChooserXOffset;
        var startY = 400 + this.levelChooserYOffset;

        for (var i = 0; i < this.levelAmount; i++) {
            var level = new Level(
                this.game,
                startX + i * this.levelBoxWidth + i * this.levelBoxPadding,
                startY,
                i + 1
            );

            level.inputEnabled = true;
            level.events.onInputDown.add(this.levelSelected, this);

            this.levels.add(level);

            var text = new Phaser.Text(
                this.game,
                startX + i * this.levelBoxWidth + i * this.levelBoxPadding + this.levelBoxWidth / 2,
                startY + this.levelBoxHeight / 2,
                i + 1,
                config.levelTextStyle
            );
            text.anchor.setTo(0.5, 0.5);

            this.levelNames.add(text);

        }
    },

    levelSelected: function (level) {
        this.game.state.start('ItsFishy', true, false, 'level' + level.level);
    }
};

module.exports = Play;