/*global module:false*/
module.exports = function(grunt) {

	require('time-grunt')(grunt);

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		config: grunt.file.readJSON('grunt/_config.json')
	});

	//grunt.loadTasks('grunt/_config.js');
	grunt.loadTasks('grunt');

	grunt.registerTask('serve',
		'Starts a static webserver with livereload',
		function (target) {

			var tasks = [];

			if (target === 'dist') {
				return grunt.task.run(['build', 'connect:dist:keepalive']);
			} else if(target === 'build') {
				tasks = [
					'build',
					'configureRewriteRules',
					'connect:livereload',
					'watch'
				];
			} else {
				tasks = [
					'dev',
					'configureRewriteRules',
					'connect:livereload',
					'watch'
				];
			}

			grunt.task.run(tasks);

		}

	);

	grunt.registerTask('deploy',
		'Deploys dist/htdocs folder on a public webserver via ftp',
		function(target) {

			if (target === 'live') {

				return grunt.task.run(['build', 'ftpush:live']);

			} else {

				return grunt.task.run(['build', 'ftpush:stage']);

			}

		}

	);

	grunt.registerTask('dev',
		'Quickly build site files for development.',
		[
			'clean:dev',
			'copy:dev',
			'useminPrepare',
			//'bowerInstall',
			'sass:dev',
			'concat',
			'uglify',
			'cssmin',
			'autoprefixer',
			// 'rev',
			'usemin',
			'newer:imagemin',
			//'clean:post'
		]
	);

	grunt.registerTask('build',
		'Build site files for deployment.',
		[
			'clean:pre',
			'copy:prod',
			'useminPrepare',
			'bowerInstall',
			'sass:prod',
			'concat',
			'uglify',
			'cssmin',
			'autoprefixer',
			'compress:gzip',
			'rev',
			'usemin',
			'imagemin',
			'svgmin',
			'htmlmin',
			'replace:prod',
			'clean:post'
		]
	);

	grunt.registerTask('default', ['serve:dev']);

	// Alias tasks
	grunt.registerTask('stage', ['deploy:stage']);
	grunt.registerTask('publis', ['deploy:live']);

};
