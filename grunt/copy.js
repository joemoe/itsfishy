'use strict';

var additionalFiles = [
    'bower_components/phaser/build/phaser.min.js',
    'bower_components/phaser/build/phaser.map',
    'phaser-plugins/Automata/Automata.js',
    'src/index.html'
];

module.exports = {
    production: {
        files: [
            {
                expand: true,
                src: 'assets/**',
                cwd: 'src',
                dest: 'dist'
            },
            {
                expand: true,
                flatten: true,
                src: additionalFiles,
                dest: 'dist/'
            }
        ]
    },

    development: {
        files: [
            {
                expand: true,
                src: 'assets/**',
                cwd: 'src',
                dest: 'build'
            },
            {
                expand: true,
                flatten: true,
                src: additionalFiles,
                dest: 'build/'
            }
        ]
    }
};