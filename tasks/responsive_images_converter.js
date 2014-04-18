/*
 * grunt-responsive-images-converter
 * https://github.com/miller/grunt-responsive-images-converter
 *
 * Copyright (c) 2014 miller
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  //When responsive images are in the same dir with the image's src in markdown.
  var DEFAULT_OPTIONS = {
    queries: [{
      name: 'phone',
      media: '(max-width:500px)',
      //device pixel ratio( 1 is default )
      dprs: [ 2 ],
      suffix: '@'
    },{
      name: 'tablet',
      media: '(max-width:800px)',
      //device pixel ratio( 1 is default )
      dprs: [ 2 ],
      suffix: '@'
    },{
      name: 'desktop',
      media: '(min-width:800px)',
      //device pixel ratio( 1 is default )
      dprs: [ 2 ],
      suffix: '@'
    }]
  };

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('responsive_images_converter', 'convert image tag.', function() {
    
    var options = this.options( DEFAULT_OPTIONS ),
        //![Webp compare tool](/img/raw/webp-tool.png)
        rImgs = [ /\!\[([^\]]*)\]\(([^\)]+)\)/img ];

    if( options.setup ) {
      options.setup();
    }

    function parseAndReplaceImgs( content, queries, asset ) {

      rImgs.forEach( function( rImg ) {
        content = content.replace( rImg, function( a, title, src ) {
          var pic = [ '<picture>' ];

          queries.forEach( function( query ) {
            pic.push( '    ' + generatePictureSource( src, query, asset ) );
          } );

          pic.push( '    <img alt="' + title + '">' );
          pic.push( '</picture>' );

          return pic.join( '\n' );
        } );
      } );

      return content;
    }

    function generatePictureSource( src, query, asset ) {
      var name = query.name || '',
          media = query.media || '',
          dprs = query.dprs || [],
          suffix = query.suffix || '',
          srcset = [],
          fileName = src,
          fileExt = '';

      var lastDot = src.lastIndexOf( '.' );

      if( lastDot !== -1 ) {
        fileName = src.substr( 0, lastDot );
        fileExt = src.substr( lastDot );
      }

      if( asset ) {
        fileName = asset + /[^\/]+$/.exec( fileName )[0];
      }

      // check if there is 1 in dprs, then will add @1x suffix explicity
      if( dprs.indexOf( 1 ) === -1 ) {
        srcset.push( fileName + '-' + name + fileExt );
      }

      dprs.forEach( function( dpr ) {
        srcset.push( fileName + '-' + name + suffix + dpr + 'x' + fileExt + ' ' + dpr + 'x' );
      } );

      return '<source srcset="' + srcset.join( ', ' ) + '" media="' + media + '">';

    }

    // grunt.log.ok( this.filesSrc );

    this.files.forEach( function( file ) {

      var dest = file.dest;
      var destEqualSrc = !dest;
      var src = file.src.filter( function( filepath ) {

        // Warn on and remove invalid source files (if nonull was set).
        if ( !grunt.file.exists( filepath ) ) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      } ).map( function( filepath ) {

        if( destEqualSrc ) {
          dest = filepath;
        }

        // Read file source.
        var content = grunt.file.read( filepath );

        content = parseAndReplaceImgs( content, options.queries, options.asset );

        // Write the destination file.
        grunt.file.write( dest, content );

        // Print a success message.
        grunt.log.writeln('File "' + dest + '" created.');

      });

    } );
  });

};
