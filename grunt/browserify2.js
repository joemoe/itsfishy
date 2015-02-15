'use strict';

module.exports = {
    production: {
        entry: './src/main.js',
        compile: './dist/main.js'
    },

    development: {
        entry: './src/main.js',
        compile: './build/main.js',
        debug: true
    }
};