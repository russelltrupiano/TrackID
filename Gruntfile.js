module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        stylus: {
            compile: {
                options: {
                    paths: ['public/style/'],
                    urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
                    use: [
                        require('rupture'), // use stylus plugin at compile time
                        require('jeet'), // use stylus plugin at compile time
                        require('axis'), // use stylus plugin at compile time
                        require('nib'), // use stylus plugin at compile time
                    ],
                },
                files: {
                  'public/css/style.css': 'public/stylesheets/style.styl', // 1:1 compile
                }
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.registerTask('default', [ 'stylus' ]);
    grunt.registerTask('compile', [ 'stylus' ]);
};
