module.exports = function(grunt) {

	grunt.config('replace', {

		prod: {

			src: [
				'<%= config.dirs.dist %>/**/*.html'
			],
			overwrite: true,
			replacements: [
				{
					from: '$version$',
					to: '<%= pkg.version %>'
				}, 
				{
					from: /<script (.*)src="js\//,
					to: '<script $1src="<%= config.url.prod.static %>js/'
				}, 
				{
					from: /<link (.*)href="css\//,
					to: '<link $1href="<%= config.url.prod.static %>css/'
				},
				{
					from: /<img(.*)src="img\//,
					to: '<img $1src="<%= config.url.prod.static %>img/'
				}
			]

		}

	});

	//grunt.loadNpmTasks('grunt-text-replace');

}