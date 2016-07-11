/////////////////////////////////////////////////
// Gulp tasks to automate build and unit testing.
//
// @file:   gulpfile.js
// @author: Anurag Bhandari <anurag@ofssam.com>
/////////////////////////////////////////////////

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var jsxcs = require('gulp-jsxcs');
var nodemon = require('gulp-nodemon');
var jasmine = require('gulp-jasmine');
var babel = require('gulp-babel');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

// Location of all JS files that need to be linted
var jsFiles = ['*.js', 'src/**/*.js'];

// Location of all Jasmine spec files
var specFiles = ['test/*.js'];

// Location of all JSX files
var jsxFiles = ['src/views/*.js', 'src/views/**/*.js'];

// Gulp task to lint our JS files against JSCS and JSHint
// (aka Code Analysis)
gulp.task('style', function () {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
    //    .pipe(eslint({
    // 		'extends': 'eslint:recommended',
    // 		'ecmaFeatures': {
    //             'jsx': true,
    // 			'modules': true
    //         }
    //    }))
    //    .pipe(eslint.format())
    //    //.pipe(eslint.failOnError())
});

// Gulp task to transpile our React JSX files into native ES5 ones
// and reacts a nice (and ugly/minified) bundle out of them
// Hint: https://gist.github.com/hecof/88813137c0309a4ab88f
var jsx2js = function () {
    browserify({
        entries: './src/views/titan.js',
        extensions: ['.js'],
        debug: true
    })
        .transform('babelify', {
            presets: ['react']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest('./public/js/'));
};
gulp.task('jsx2js', jsx2js);

// Gulp task to unit test the app
gulp.task('test', function () {
    return gulp.src(specFiles)
        .pipe(jasmine());
});

// Gulp task to build the app
// (combo of code analysis and unit testing)
gulp.task('build', ['style', 'jsx2js'], function () {
    return gulp.src(specFiles)
        .pipe(jasmine());
});

// Gulp task to monitor the app server
// and restart it when changes in code are detected
gulp.task('serve', ['style', 'jsx2js'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 5000
        },
        watch: jsFiles,
        /*tasks: function (changedFiles) {
            var tasks = [];
            // TODO: condition to check whether client- or server-side code has changed;
            // add jsx2js only if client-side code has changed
            tasks.push('jsx2js'); 
            return tasks;
        }*/
    };
    return nodemon(options)
        .on('restart', function (changedFiles) {
            console.log('Restarting...');
        });
});