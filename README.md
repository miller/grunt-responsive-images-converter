# grunt-responsive-images-converter

> Convert image tag in markdown file to picture element as to support [resoponsive image](http://responsiveimages.org). It is best to use with [grunt-responsive-images ](https://github.com/andismith/grunt-responsive-images), which could build responsive images from one image.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-responsive-images-converter --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-responsive-images-converter');
```

## The "responsive_images_converter" task

### Overview
In your project's Gruntfile, add a section named `responsive_images_converter` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  responsive_images_converter: {
    default_options: {
      files: {
        'tmp/default_options': [ 'test/fixtures/only-one-image.md' ],
      },
    }
  },
})
```

### Options

#### options.asset
Type: `String`
Default value: `''`

The directory of your responsive images, it will be the same with the original img tag in markdown file if ignored.

#### options.queries
Type: `Array`
Default value: see below

The breakpoints configuration of your responsive policy, with following properties:

* name: One part of the responsive images' name.
* media: Value of the media attribute with source tag in picture element.
* dprs: Device pixel ratios that will support.
* suffix: Anoher part of the responsive images' name.

The default value of `options.queries`:

```js
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
```

### Usage Examples

#### Default Options

test/fixtures/only-one-image.md

```html
![Webp compare tool](/img/raw/webp-tool.png)
```

Gruntfile.js

```js
grunt.initConfig({
  responsive_images_converter: {
    default_options: {
      files: {
        'tmp/default_options': [ 'test/fixtures/only-one-image.md' ],
      },
    }
  },
})
```

After running the task above, it will creat a new file named `default_options` under `tmp` directory.

tmp/default_options

```html
<picture>
    <source srcset="/img/raw/webp-tool-phone.png, /img/raw/webp-tool-phone@2x.png 2x" media="(max-width:500px)">
    <source srcset="/img/raw/webp-tool-tablet.png, /img/raw/webp-tool-tablet@2x.png 2x" media="(max-width:800px)">
    <source srcset="/img/raw/webp-tool-desktop.png, /img/raw/webp-tool-desktop@2x.png 2x" media="(min-width:800px)">
    <img alt="Webp compare tool">
</picture>
```

#### Asset Option
When your responsive images locat in the different directory from the orignal img tag. For the example above, the directory of you img tag in markdown file is `/img/raw/`, if your responsive images' directory is `img/resp/`, then you should use the `asset` field. 

```js
grunt.initConfig({
  responsive_images_converter: {
    options: {
      asset: '/img/resp/'
    },
    files: {
      'tmp/change_srcset_dir': [ 'test/fixtures/only-one-image.md' ],
    },
  },
})
```

And the result will be:

```html
<picture>
    <source srcset="/img/resp/webp-tool-phone.png, /img/resp/webp-tool-phone@2x.png 2x" media="(max-width:500px)">
    <source srcset="/img/resp/webp-tool-tablet.png, /img/resp/webp-tool-tablet@2x.png 2x" media="(max-width:800px)">
    <source srcset="/img/resp/webp-tool-desktop.png, /img/resp/webp-tool-desktop@2x.png 2x" media="(min-width:800px)">
    <img alt="Webp compare tool">
</picture>
```
#### Src Option
When you don't want to create a new file and just need to replace the original markdown file, then use the `src` field.

```js
grunt.initConfig({
  responsive_images_converter: {
    src: [ 'tmp/dest_equal_src.md' ],
  },
})
```
The result after running task will be written to `tmp/dest_equal_src.md`.

## Notice
At present, browsers don't support the responsive image tech well, you may need use the [picturefill](http://scottjehl.github.io/picturefill/) to polyfill.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
