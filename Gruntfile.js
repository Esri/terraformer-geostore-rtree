module.exports = function (grunt) {
  grunt.initConfig({
    pkg:   grunt.file.readJSON('package.json'),

    meta: {
      version: '0.0.1',
      banner: '/*! Terraformer JS - <%= meta.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '*   https://github.com/geoloqi/Terraformer\n' +
        '*   Copyright (c) <%= grunt.template.today("yyyy") %> Environmental Systems Research Institute, Inc.\n' +
        '*   Licensed MIT */'
    },

    jshint: {
      files: [ 'terraformer-geostore-rtree.js' ],
      options: {
        node: true
      }
    },


    uglify: {
      options: {
        report: 'gzip'
      },

      "terraformer-geostore-rtree": {
        src: ["terraformer-geostore-rtree.js"],
        dest: 'terraformer-geostore-rtree.min.js'
      }
    },

    jasmine: {
      coverage: {
        src: [
          "terraformer-geostore-rtree.js"
        ],
        options: {
          specs: 'spec/*Spec.js',
          helpers: [
            './node_modules/terraformer/terraformer.js',
            './node_modules/terraformer-geostore/browser/terraformer-geostore.js'
          ],
          //keepRunner: true,
          outfile: 'SpecRunner.html',
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: './.coverage/coverage.json',
            report: './.coverage',
            thresholds: {
              lines: 65,
              statements: 65,
              branches: 55,
              functions: 55
            }
          }
        }
      }
    },

    complexity: {
      generic: {
        src: [ 'terraformer-geostore-rtree' ],
        options: {
          jsLintXML: 'complexity.xml', // create XML JSLint-like report
          errorsOnly: false, // show only maintainability errors
          cyclomatic: 6,
          halstead: 15,
          maintainability: 65
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('default', [ 'jshint', 'jasmine', 'uglify', 'complexity' ]);
};
