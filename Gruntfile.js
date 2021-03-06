/*
 * grunt-contrib-jst
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tim Branyen, contributors
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
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    jst: {
      compile: {
        files: {
          "tmp/jst.js": ["test/fixtures/template.html"]
        }
      },
      pretty_amd: {
        options: {
          prettify: true,
          amdWrapper: true
        },
        files: {
          "tmp/pretty_amd.js": ["test/fixtures/template.html"]
        }
      },
      prettify: {
        options: {
          prettify: true
        },
        files: {
          "tmp/pretty.js": ["test/fixtures/template.html"]
        }
      },
      amd_wrapper: {
        options: {
          amdWrapper:true
        },
        files: {
          "tmp/amd_wrapper.js": ["test/fixtures/template.html"]
        }
      },
      uglyfile: {
        files: {
          "tmp/uglyfile.js": ["test/fixtures/*bad-filename*"]
        }
      },
      ns_nested: {
        options: {
          namespace: "MyApp.JST.Main"
        },
        files: {
          "tmp/ns_nested.js": ["test/fixtures/template.html"]
        }
      },
      ns_nested_this: {
        options: {
          namespace: "this.MyApp.JST.Main"
        },
        files: {
          "tmp/ns_nested_this.js": ["test/fixtures/template.html"]
        }
      },
      process_content: {
        options: {
          processContent: function (src) {
            return src.replace(/(^\s+|\s+$)/gm, '');
          }
        },
        files: {
          "tmp/process_content.js": ["test/fixtures/indent_template.html"]
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'jst', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);

};
