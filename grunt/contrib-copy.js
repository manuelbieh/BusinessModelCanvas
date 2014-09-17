module.exports = function(grunt) {

	grunt.config('copy', {
		prod: {
			files: [{
				expand: true,
				dot: true,
				cwd: '<%= config.dirs.src %>',
				dest: '<%= config.dirs.dist %>/htdocs',
				src: [
					'*.html',
					'{,*/}*.{ico,png,txt,json}',
					'.htaccess',
					'img/{,*/}*.{webp,gif,GIF,jpeg,jpg}',
					'fonts/{,*/}*.*',
					'js/**/*.js',
					'css/**/*.css',
					'templates/**/*',
					'partials/**/*',
					'config.xml'
					//'js/vendor/*.js',
					//'components/**/*'
				]
			}]
		},
		dev: {
			files: [{
				expand: true,
				dot: true,
				cwd: '<%= config.dirs.src %>',
				dest: '<%= config.dirs.dist %>/htdocs',
				src: [
					'*.html',
					'{,*/}*.{ico,png,txt,json}',
					'.htaccess',
					'img/{,*/}*.{webp,gif,GIF,jpeg,jpg}',
					'fonts/{,*/}*.*',
					'js/**/*.js',
					'css/**/*.css',
					'templates/**/*',
					'partials/**/*',
					'config.xml'
				//	'components/**/*'
				]
			}]
		},
		phonegap: {
			files: [{
				expand: true,
				dot: true,
				cwd: '<%= config.dirs.dist %>/htdocs',
				dest: 'app/www',
				src: ['**/*']
			}]
		}
	});

	//grunt.loadNpmTasks('grunt-contrib-copy');

}