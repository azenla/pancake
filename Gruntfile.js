/*global module:false*/
module.exports = function (grunt) {

   // Project configuration.
   grunt.initConfig({
      // Task configuration.
      jshint: {
         options: {
            curly: false,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            unused: true,
            boss: true,
            eqnull: true,
            browser: true,
            globals: {
               "jQuery": false,
               "$": false
            }
         },
         gruntfile: {
            src: 'Gruntfile.js'
         },
         lib_test: {
            src: ['src/pancake.js']
         }
      },
      watch: {
         gruntfile: {
            files: '<%= jshint.gruntfile.src %>',
            tasks: ['jshint:gruntfile']
         },
         lib_test: {
            files: '<%= jshint.lib_test.src %>',
            tasks: ['jshint:lib_test']
         }
      },
      uglify: {
         my_target: {
            files: {
               'build/pancake.min.js': ['src/pancake.js']
            }
         }
      }
   });

   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-uglify');

   // Default task.
   grunt.registerTask('default', ['jshint', 'uglify']);

   // Test task.
   grunt.registerTask('test', ['jshint']);

};