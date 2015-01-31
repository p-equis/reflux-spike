'use strict';

var gulp       = require('gulp');
var del        = require('del');
var path       = require('path');
var browserify = require('browserify');
var reactify   = require('reactify');
var watchify   = require('watchify');
var source     = require('vinyl-source-stream');
var $          = require('gulp-load-plugins')();
var fs         = require('fs');

var prod = $.util.env.prod;

// gulp-plumber for error handling
function onError() {
    /* jshint ignore:start */
    var args = Array.prototype.slice.call(arguments);
    $.util.beep();
    $.notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
    /* jshint ignore:end */
}

/* 
 * This allows us to 'require' files relative to the /src/scripts directory
 * instead of the current files directory. This is to avoid having requires 
 * like:
 *       require('../../Shared/thing')
 *
 * this would instead be:
 *
 *       require('app/Shared/thing')
*/
function symlinkAppIntoNodeModules() {
    try {
        fs.symlinkSync(__dirname + '/src/scripts', 'node_modules/app');
    } catch(e) {
        if(e.code === 'EEXIST') {
            // ignore, this just means the sym link is already there
        }
        else {
            throw e;
        }
    }
}


// Styles
gulp.task('styles', function() {
    return gulp.src('src/styles/**/*')
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.concat('main.scss'))
        .pipe($.rubySass({
            style: 'compressed',
            precision: 10,
            loadPath: ['src/bower_components']
        }))
        .pipe($.autoprefixer('last 3 versions'))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size());
});


// Scripts
gulp.task('scripts', function() {
    symlinkAppIntoNodeModules();

    var bundler;
    bundler = browserify({
        basedir: __dirname,
        noparse: ['react/addons', 'reflux', 'fastclick', 'react-router'],
        entries: ['./src/scripts/app.jsx'],
        transform: [[reactify, {global: true}]],
        extensions: ['.jsx'],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    bundler = watchify(bundler);

    function rebundle() {
        console.log('Bundling Scripts...');
        var start = Date.now();
        return bundler.bundle()
            .on('error', onError)
            .pipe(source('app.js'))
            .pipe($.streamify($.uglify()))
            .pipe(gulp.dest('dist/scripts'))
            .pipe($.notify(function() {
                console.log('Bundling Complete - ' + (Date.now() - start) + 'ms');
            }));
    }

    bundler.on('update', rebundle);

    return rebundle();
});


// HTML
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});


// Images
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});


// Webserver
gulp.task('serve', function() {
    gulp.src('dist')
        .pipe($.webserver({
            livereload: true,
            port: 9000,
            fallback: 'index.html'
        }));
});


// Testing
gulp.task('jest', function() {
    var nodeModules = path.resolve('./node_modules');
    return gulp.src('src/scripts/**/__tests__')
        .pipe($.jest({
            scriptPreprocessor: nodeModules + '/gulp-jest/preprocessor.js',
            unmockedModulePathPatterns: [nodeModules + '/react']
        }));
});


// Clean
gulp.task('clean', function(cb) {
    del(['dist/styles', 'dist/scripts', 'dist/images'], cb);
});


// Default task
gulp.task('default', ['clean', 'html', 'styles', 'scripts', 'jest']);


// Watch
gulp.task('watch', ['html', 'styles', 'scripts', 'serve'], function() {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/images/**/*', ['images']);
});
