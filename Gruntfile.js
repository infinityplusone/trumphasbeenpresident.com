/*
 * Gruntfile
 *
 * Author(s):  Jonathan "Yoni" Knoll
 * Version:    0.5.0
 * Date:       2017-03-07
 *
 */

module.exports = function(grunt) {

  var _ = require('lodash');
  var pkg = grunt.file.readJSON('./package.json');

  grunt.initConfig({
    pkg: pkg
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
  grunt.registerTask('build', function() {
    grunt.file.write('VERSION', pkg.version);
    grunt.task.run('collect');
  });

  grunt.registerTask('copy-assets', ['copy:fonts', 'copy:assets']);
  grunt.registerTask('collect', ['copy-assets', 'less']);
  grunt.registerTask('default', ['collect', 'simple-watch']);

  console.log('\n');

};