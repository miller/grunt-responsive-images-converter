'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    responsive_images_converter: {
      dev: {
        options: {},
        files: [{
        }]
      }
    }
  });

  grunt.loadNpmTasks('../grunt-responsive-images-converter');

  grunt.registerTask('default', ['responsive_images_converter']);
};
