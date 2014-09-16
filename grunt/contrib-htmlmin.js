module.exports = function(grunt) {


	// Using useminPrepare generated cssmin config

	grunt.config('htmlmin', {
		prod: {
			options: {
				removeComments: true,
			},
			files: {
				'<%= config.dirs.dist %>/htdocs/index.html': '<%= config.dirs.dist %>/htdocs/index.html'
			}
		}
	});

	//grunt.loadNpmTasks('grunt-contrib-cssmin');

}
