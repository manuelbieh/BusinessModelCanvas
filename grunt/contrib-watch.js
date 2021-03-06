module.exports = function(grunt) {

	grunt.config('watch', {

		htmlcssjs: {

			options: {
				//livereload: true,
				livereload: '<%= connect.options.livereload %>'
			},

			files: [
				'<%= config.dirs.src %>/**/*.{html,js,json,css,scss}',
			],

			tasks: [
				'clean:dev',
				'copy:dev',
				'useminPrepare',
				'sass:dev',
				'concat',
				'uglify',
				'cssmin',
				'autoprefixer',
				// 'rev',
				'usemin'
			]

		},

		bower: {

			options: {
				//livereload: true,
				livereload: '<%= connect.options.livereload %>',
				event: ['added', 'deleted'/*, 'changed'*/]
			},

			files: [
				'<%= config.dirs.src %>/components/**/*'
			],

			tasks: ['bowerInstall']

		},

		imagemin: {

			options: {
				//livereload: true,
				livereload: '<%= connect.options.livereload %>'
			},

			files: [
				'<%= config.dirs.src %>/img/**/*'
			],

			tasks: ['newer:imagemin']

		},

		livereload: {

			options: {
				livereload: '<%= connect.options.livereload %>'
			},

			files: [
				'<%= config.dirs.src %>/{,*/}*.html',
				'<%= config.dirs.src %>/{,*/}*.{css,scss,sass,less,styl}',
				'<%= config.dirs.src %>/{,*/}*.js',
				'.tmp/styles/{,*/}*.css',
				'<%= config.dirs.src %>/img/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
			]

		}

	});

	//grunt.loadNpmTasks('grunt-contrib-watch');

}