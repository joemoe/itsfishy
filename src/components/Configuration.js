'use strict';

var configuration = {
    gameWidth: 800,
    gameHeight: 600,

    defaultLevel: 'level1',

    fishRandomCreateBorder: 50,
    fishSpeedDuration: 2,

    defaultPlayButtonText: 'play',

    flashMessageBlinkTime: 0.2,
    flashMessageRepeatCount: 6,
    flashMessageTop: 140,

    // overwritten by level-configuration
    defaultCameraSpeed: 1,
    fishDefaultGameOverAmount: 1,
    breadCrumbDefaultLifespan: 5,
    breadCrumbDefaultReloadTime: 3,

    statsTextStyle: {
        font: '15px Arial',
        fill: '#ffffff',
        align: 'center'
    },

    flashDefaultMessageTextStyle: {
        font: '64px Comic Sans MS',
        fill: '#cc33ff',
        align: 'center'
    },

    gameWonTextStyle: {
        font: '24px Comic Sans MS',
        fill: '#ff00ff',
        align: 'center'
    },

    playButtonTextStyle: {
        font: '20px Comic Sans MS',
        fill: '#ff00ff',
        align: 'center'
    }
};

module.exports = configuration;