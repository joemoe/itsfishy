/*
 * 
 * mcpf
 * https://github.com/jakoblahmer/templating-engine
 *
 * Copyright (c) 2014 ja
 * Licensed under the MIT license.
 */

module.exports = {

    javascript: {
        files: [
            'src/*.js',
            'src/**/*.js'
        ],
        tasks: ['browserify2:development']
    },

    assets: {
        files: [
            'src/index.html',
            'src/assets/**/*.png',
            'src/assets/**/*.jpeg',
            'src/assets/**/*.jpg',
            'src/assets/**/*.woff',
            'src/assets/**/*.gexf',
            'src/assets/**/*.ttf',
            'src/assets/**/*.eot',
            'src/assets/**/*.svg',
            'src/assets/**/*.json'
        ],
        tasks: ['copy:development']
    }
};
