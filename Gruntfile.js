/*
 * grunt-responsive-images-converter
 * https://github.com/miller/grunt-responsive-images-converter
 *
 * Copyright (c) 2014 miller
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    responsive_images_converter: {
      default_options: {
        files: {
          'tmp/default_options': [ 'test/fixtures/only-one-image.md' ],
        },
        // src: [ 'test/fixtures/only-one-image.md' ],

      },
      
      change_srcset_dir: {
        options: {
          asset: '/img/resp/'
        },
        files: {
          'tmp/change_srcset_dir': [ 'test/fixtures/only-one-image.md' ],
        },
      },
      
      custom_media_query: {
        options: {
          queries:[
            {
              name: 'phone',
              media: '(max-width:400px)',
              //device pixel ratio( 1 is default )
              dprs: [ 1, 2 ],
              suffix: '-'
            },
            {
              name: 'tablet',
              media: '(max-width:600px)',
              //device pixel ratio( 1 is default )
              dprs: [ 1, 2 ],
              suffix: '-'
            }
          ]
        },
        files: {
          'tmp/custom_media_query': [ 'test/fixtures/only-one-image.md' ],
        },
      },

      dest_equal_src: {
        options: {
          setup: function() {
            // Prepare for dest_euqal_src testcase
            grunt.file.write( 'tmp/dest_equal_src.md', '![](/img/raw/webp-tool.png)' );
          }
        },
        src: [ 'tmp/dest_equal_src.md' ],

      },

      multiple_image: {
        files: {
          'tmp/multiple_image': [ 'test/fixtures/multiple-image.md' ],
        }
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'responsive_images_converter', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
