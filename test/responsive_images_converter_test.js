'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.responsive_images_converter = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default_options');
    var expected = grunt.file.read('test/expected/default_options');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },

  change_srcset_dir: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/change_srcset_dir');
    var expected = grunt.file.read('test/expected/change_srcset_dir');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },

  custom_media_query: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/custom_media_query');
    var expected = grunt.file.read('test/expected/custom_media_query');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },

  dest_equal_src: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/dest_equal_src.md');
    var expected = grunt.file.read('test/expected/dest_equal_src');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },

  multiple_image: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/multiple_image');
    var expected = grunt.file.read('test/expected/multiple_image');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  },
};
