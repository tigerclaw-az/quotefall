/* jshint node: true */
'use strict';

// jscs:disable requireMultipleVarDecl
var $ = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'autoprefixer', 'main-bower-files', 'uglify-save-license', 'del']
	}),
	gulp = require('gulp');

var browserSync = require('browser-sync'),
	glob = require('glob'),
	path = require('path'),
	wiredep = require('wiredep').stream;

var conf = require('./config'),
	options = conf.options,
	paths = conf.paths;

gulp.task('styles:lint', function() {
	return gulp.src(paths.styles.source.all)
		.pipe($.plumber())
		.pipe($.sassLint(options.sasslint))
		.pipe($.sassLint.format())
		.pipe($.sassLint.failOnError());
});

gulp.task('styles', ['styles:lint'], function() {
	var injectFiles = gulp.src(paths.styles.source.inject, { read: false }),
		postcssPlugins = [
			$.autoprefixer(options.autoprefixer)
		];

	return gulp.src(paths.styles.source.index)
		.pipe($.plumber(options.errorHandler))
		.pipe($.inject(injectFiles, options.inject)).on('error', conf.errorHandler('inject'))
		.pipe(wiredep(options.wiredep))
		.pipe($.sourcemaps.init())
		.pipe($.sass(options.sass)).on('error', conf.errorHandler('sass'))
		.pipe($.postcss(postcssPlugins)).on('error', conf.errorHandler('postcss'))
		.pipe($.sourcemaps.write())
		.pipe($.rename('main.css'))
		.pipe(gulp.dest(paths.styles.serve))
		.pipe(browserSync.reload({ stream: true }))
		.pipe($.size());
});

gulp.task('partials', function() {
	return gulp.src([
		path.join(paths.app, '/**/*.html'),
		path.join(paths.tmp, '/**/*.html')
	])
	.pipe($.htmlmin(conf.options.htmlmin))
	.pipe($.angularTemplatecache('templateCacheHtml.js', {
		module: conf.settings.projectName,
		root: 'app'
	}))
	.pipe(gulp.dest(path.join(paths.serve.tmp, '/partials/')));
});

gulp.task('html', ['wiredep', 'partials', 'scripts', 'styles'], function() {
	return gulp.src([path.join(paths.tmp, '/*.html')])
		.pipe($.useref({ searchPath: [paths.tmp] }))
		// .pipe($.if('*.js', $.uglify()))
		.pipe($.replace('../../bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
		.pipe($.if('*.css', $.csso()))
		.pipe($.if('*.html', $.htmlmin(options.htmlmin)))
		.pipe(gulp.dest(paths.dist))
		.pipe($.size());
});

gulp.task('images', function() {
	return gulp.src(paths.images.source)
		.pipe($.cache($.imagemin(options.imagemin)))
		.pipe(gulp.dest(paths.images.dist))
		.pipe($.size());
});

gulp.task('fonts', function() {
	return gulp.src($.mainBowerFiles().concat(paths.fonts.source))
		.pipe($.filter('**/*.{eot,otf,svg,ttf,woff,woff2}'))
		.pipe($.if('*.{eot,svg,ttf,woff}', $.flatten()))
		.pipe(gulp.dest(paths.fonts.dist));
});

gulp.task('extras', function() {
	var fileFilter = $.filter(function(file) {
		return file.stat.isFile();
	});

	return gulp.src([
		path.join(conf.paths.src, '/**/*'),
		path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
	])
	.pipe(fileFilter)
	.pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function() {
	return $.del.sync(paths.clean, { force: true });
});

// Inject bower components
gulp.task('wiredep', function() {
	return gulp.src([path.join(paths.src, '/*.html')])
		.pipe(wiredep(options.wiredep))
		.pipe(gulp.dest(paths.serve.tmp));
});

gulp.task('preflight', ['scripts:lint']);

gulp.task('produce', ['preflight', 'wiredep', 'scripts', 'styles', 'images', 'fonts']);

gulp.task('package', ['produce', 'html', 'extras']);

gulp.task('build', ['clean', 'package'], function() {
	return gulp.src([path.join(paths.dist, '/**/*')])
		.pipe($.plumber())
		.pipe($.size({ title: 'build', gzip: true }));
});
