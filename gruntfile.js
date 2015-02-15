/******************************************
 ******************************************
 * gruntfile
 *
 * a1 - spider app
 * created by ma on 04.12.14.
 ******************************************
 ******************************************/

module.exports = function(grunt) {
    'use strict';

    var path = require('path');

    // measures the time each task takes
    require('time-grunt')(grunt);

    // load grunt config
    require('load-grunt-config')(grunt, {
        configPath: path.join(process.cwd(), 'grunt'),
        overridePath: path.join(process.cwd(), 'grunt-'+process.env.USER)
    });

    // autoload grunt tasks
    require('load-grunt-tasks')(grunt);

    // manually load additional custom  tasks
    // grunt.loadTasks(path.join(process.cwd(), 'tasks'));

    grunt.registerTask(
        'build',
        'Generates a distributable version',
        [
            'clean:production',
            'copy:production',
            'browserify2:production'
        ]
    );

    grunt.registerTask(
        'build-dev',
        'Generates a development version',
        [
            'clean:development',
            'copy:development',
            'browserify2:development'
        ]
    );


};