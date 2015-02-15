/**
 * js hint
 */
var grunt = require('grunt');

module.exports = {
    // define the files to lint
    files: [
        'gruntfile.js',
        'src/**/*.js'
    ],

    // configure JSHint (documented at http://www.jshint.com/docs/)
    options: grunt.file.readJSON('.jshintrc')
};
