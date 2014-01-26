/*global module:false*/
var sources = [
   "src/pancake.js"
];
module.exports = function(grunt) {

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
         pancake: {
            src: sources
         }
      },
      watch: {
         gruntfile: {
            files: '<%= jshint.gruntfile.src %>',
            tasks: ['jshint:gruntfile']
         },
         pancake: {
            files: sources,
            tasks: ['jshint:pancake']
         }
      },
      uglify: {
         pancake: {
            files: {
               'build/pancake.min.js': sources
            }
         }
      },
      qunit: {
         all: ['tests/**/*.html']
      }
   });

   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-qunit');

   // Default task.
   grunt.registerTask('default', ['jshint', 'qunit', 'uglify']);

   // Test task.
   grunt.registerTask('test', ['jshint', 'qunit']);

};