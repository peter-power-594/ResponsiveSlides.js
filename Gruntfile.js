module.exports = function(grunt) {

	grunt.initConfig({
		sass: {
			options: {
				style: 'compressed',
				noSourceMap: true
			},
			dist: {
				files: {
				  'dist/css/responsiveslides.min.css': 'src/sass/responsiveslides.scss',
				  'dist/css/bootstrap-carousel.min.css': 'src/sass/bootstrap-carousel.scss'
				}
			}
		},
		jshint: {
			all: [
				'src/js/responsiveslides.js'
			]
		},
		uglify: {
			options: {
				output: {
					comments: 'some'
				}
			},
			build: {
				src: 'src/js/responsiveslides.js',
				dest: 'dist/js/responsiveslides.min.js'
			}
		},
		concat: {
			build: {
				src: [
					'src/js/responsiveslides.js'
				],
				dest: 'dist/js/responsiveslides.js'
			}
		},
		connect: {
			server: {
				options: {
					 port: 8080,
					 hostname: 'localhost',
					 livereload: 35780
				}
			}
		},
		watch: {
			all: {
				options: {
					livereload: 35780
				},
				files: [
					'src/sass/*.scss',
					'src/js/*.js'
				],
				tasks: [ 'sass', 'jshint', 'uglify', 'concat' ]
			},
			debug: {
				options: {
					livereload: 35780
				},
				files: [
					'src/sass/*.scss',
					'src/js/*.js'
				],
				tasks: [ 'sass', 'jshint', 'concat' ]
			},
			js: {
				options: {
					livereload: 35780
				},
				files: [
					'src/sass/*.scss',
					'src/js/*.js'
				],
				tasks: [ 'jshint', 'concat' ]
			}
		}
	});

	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	grunt.registerTask( 'default', [ 'connect', 'watch:all' ] );

	grunt.registerTask( 'debug', [ 'connect', 'watch:debug' ] );

	grunt.registerTask( 'js', [ 'connect', 'watch:js' ] );

};
