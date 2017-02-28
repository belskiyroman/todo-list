module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            jst: {
                files: {
                    'public/js/templates-min.js': 'public/js/templates.js'
                }
            }
        },

        watch: {
            scripts: {
                files: ['public/templates/*.html'],
                tasks: ['jst']
            }
        },

        jst: {
            compile: {
                options: {
                    processName: function(filepath) {
                        return filepath.replace('public/templates/', '');
                    }
                },
                files: {
                    "public/js/templates.js": ["public/templates/*.html"]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jst');

    grunt.registerTask('default', ['jst', 'uglify']);

};
