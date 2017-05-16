'use strict';

// jscs:disable requireMultipleVarDecl
var $ = require('gulp-load-plugins')({
		pattern: ['gulp-*']
	}),
	gulp = require('gulp');

var babelify = require('babelify'),
	browserSync = require('browser-sync'),
	browserify = require('browserify'),
	glob = require('glob'),
	buffer = require('vinyl-buffer'),
	source = require('vinyl-source-stream');

var conf = require('./config'),
	options = conf.options,
	paths = conf.paths;

function compileScripts(test) {
	var files = [glob.sync(paths.scripts.index)];

	if (test) {
		files.push(glob.sync(paths.scripts.test));
	}

	options.browserify.entries = files;

	return browserify(options.browserify)
		.transform(babelify, options.babelify)
		.bundle().on('error', conf.errorHandler('bundle'))
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe($.sourcemaps.init({ loadMaps: true }))
		.pipe($.sourcemaps.write('./', { includeContent: true }))
		.pipe(gulp.dest(paths.scripts.serve));
}

gulp.task('scripts:lint', function() {
	return gulp.src(paths.scripts.source)
		.pipe($.jscs())
		.pipe($.jscsStylish())
		.pipe($.eslint())
		.pipe($.eslint.format())
		.pipe($.if(!browserSync.active, $.eslint.failOnError()));
});

gulp.task('scripts', ['scripts:lint'], function() {
	return compileScripts();
});

gulp.task('scripts:test', function() {
	return compileScripts(true);
});

gulp.task('scripts:test-watch', function(callback) {
	// return webpackWrapper(true, true, callback);
});
