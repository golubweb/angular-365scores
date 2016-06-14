module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'app/*.js', 'app/*/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        
        concat: {
			dist: {
				src: ['app/*.js', 'app/*/*.js'],
				dest: 'dist/app.js'
			}
		},

		sass: {
			dist: {
				files: {
					'dist/365scores.css': 'assets/css/365scores.scss'
				}
			}
		},
        copy: {
            files: {
                src: 'node_modules/normalize.css/normalize.css',
                dest: 'dist/normalize.css'
            }
        },
        connect: {
            server: {
                options: {
                    port: 9005,
                    livereload: true
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.server.options.port %>'
            }
        },
        watch: {
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint']
            },
            src: {
                files: ['app/*.js', 'app/*/*.js'],
                tasks: ['concat']
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');


    grunt.registerTask('default', ['concat', 'copy', 'jshint', 'sass', 'connect', 'open', 'watch']);

};