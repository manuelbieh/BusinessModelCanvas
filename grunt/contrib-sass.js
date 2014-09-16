module.exports = function(grunt) {

	grunt.config('sass', {
		"dev": {
			"files": {
				"<%= config.dirs.dist %>/htdocs/css/custom.css" : "<%= config.dirs.src %>/scss/custom.scss"
			},
			"options": {
				"lineNumbers": true,
				"sourcemap": true
			}
		},
		"prod": {
			"files": {
				"<%= config.dirs.dist %>/htdocs/css/custom.css" : "<%= config.dirs.src %>/scss/custom.scss"
			},
			"options": {
				"style": "compressed"
			}
		}
	});

	//grunt.loadNpmTasks('grunt-contrib-sass');

}