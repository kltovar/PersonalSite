module.exports = function(grunt) {

  // Configure task(s)
  grunt.initConfig({
    //calling the json file for the grunt build
    pkg: grunt.file.readJSON('package.json'),
    // Minify & concatenate js through uglify
    uglify: {
        build: {
            // where are the files? (source - get 'em all')
            // asteriks is a wild card - find every single
            // file that ends with .js
            src: 'src/js/*.js',
            // where are we minifying them? (final output)
            dest: 'js/script.min.js'
        },
        // these are your options for development
        // every plug-in has a different set of these
        dev: {
            options: {
                beautify: true,
                mangle: false,
                compress: false,
                preserveComments: 'all'
            },
            src: 'src/js/*.js',
            dest: 'js/script.min.js'
        }
    }, // end bracket for uglify
    // start sass
    sass: {
        dev: {
            options: {
                // do not minify - just concatenate
                outputStyle: 'expanded'
            },
            files: {
                //converted file < - > compiled file
                'css/styles.css' : 'src/scss/application.scss'
            }
        }, // end dev
        build: {
            options: {
                // minify the styles
                outputStyle: 'compressed'
            },
            files: {
                //converted file < - > compiled file
                'css/styles.css' : 'src/scss/application.scss'
            }
        }// end build
    },// end bracket for sass
    // start watch
    watch: {
        // yo watch my js changes & update yo self
        js: {
            // when these files change
            files: ['src/js/*.js'],
            // run this task
            tasks: ['uglify:dev']
            // must type 'grunt watch' in iTerm to
            // keep a watch of changes on js (in this example)
        },
        // yo watch my sass changes & update yo self
        css: {
            files: ['src/scss/**/*.scss'],
            tasks: ['sass:dev']
        }
    } // end bracket for watch
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');

  // Register task(s)
  // This do what it do. Runs by default on 'grunt'
//  grunt.registerTask('default', ['uglify:dev']);
  // REGISTER SASS TASK
//  grunt.registerTask('default', ['sass:dev']);
  // WE CAN JOIN TASKS AS FOLLOWS:
  grunt.registerTask('default', ['uglify:dev', 'sass:dev']);
  // This do what it do when you want to build/ship
  // the project ready for launch
  // must run task as 'grunt build'
  grunt.registerTask('build', ['uglify:build', 'sass:build']);

}
// when done run 'grunt' from iTerm
// MUST BE IN THE PROJECT'S FOLDER
