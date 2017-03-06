/*
 * Gruntfile
 *
 * Author(s):  Jonathan "Yoni" Knoll
 * Version:    3.14.0
 * Date:       2017-03-02
 *
 */

module.exports = function(grunt) {

  var _ = require('lodash');

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json')
  });

  grunt.loadNpmTasks('necromancy');

  var necromancy = require('necromancy/main')(grunt, __dirname);

  necromancy.config('less.default.src', [
    'common/*/*.less',
  ]);
  necromancy.config('copy', {
    fonts: {
      files: [{
        expand: true,
        flatten: true,
        filter: 'isFile',
        cwd: 'common/',
        src: [
          '**/fonts/*.*',
          '**/fonts/**/*.*'
        ],
        dest: '<%=meta.dir.assets%>/fonts'
      }]
    }

  });

  // Register Default task(s).
  grunt.registerTask('copy-assets', ['copy:fonts', 'copy:assets']);
  grunt.registerTask('default', ['collect', 'simple-watch']);

  console.log('\n');

};