'use strict';

var gulp = require('gulp'),
	options = require('./gulp-tasks/config/options'),
	paths = require('./gulp-tasks/config/paths'),
	settings = require('./gulp-tasks/config/settings'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	gutil = require('gulp-util'),
	del = require('del');

// Load plugins
var $ = require('gulp-load-plugins')();

gulp.task('dust', function() {
	gulp.src(paths.templates.source)
		.pipe($.rename({ extname: '' }))
		.pipe($.dust())
		.pipe($.concat('tpl.js'))
		.pipe(gulp.dest(paths.js.dist))
		.pipe(gulp.dest(paths.templates.dist))
		.pipe(reload({ stream: true }));
});

gulp.task('styles', function() {
	return gulp.src(paths.styles.source.main)
		.pipe($.sass({ errLogToConsole: true }))
		.pipe($.autoprefixer(options.autoprefixer))
		.pipe(gulp.dest(paths.styles.wiredep))
		.pipe(gulp.dest(paths.styles.dist))
		.pipe(reload({ stream: true }))
		.pipe($.size());
});

gulp.task('js', function() {
	return gulp.src(paths.js.source)
		.pipe($.jscs())
		.pipe($.jscsStylish())
		.pipe($.jshint())
		.pipe($.jshint.reporter(require('jshint-stylish')))
		.pipe(reload({ stream: true }));
});

gulp.task('html', ['dust', 'styles', 'js'], function() {
	return gulp.src(paths.html.source)
		.pipe($.useref())
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.cssnano()))
		.pipe(gulp.dest(settings.dirs.dist))
		.pipe($.size());
});

gulp.task('images', function() {
	return gulp.src(paths.images.source)
		.pipe($.cache($.imagemin(options.imagemin)))
		.pipe(gulp.dest(paths.images.dist))
		.pipe(reload({ stream: true, once: true }))
		.pipe($.size());
});

gulp.task('fonts', function() {
	gulp.src(paths.fonts.source)
		//.pipe($.filter('**/*.{eot,svg,ttf,woff}'))
		.pipe($.if('*.{eot,svg,ttf,woff}', $.flatten()))
		.pipe(gulp.dest(paths.fonts.dist))
		.pipe($.size());
});

gulp.task('clean', function() {
	return del.sync(paths.clean, { force: true });
});

gulp.task('build', ['clean', 'html', 'images', 'fonts']);

gulp.task('default', ['watch']);

gulp.task('serve', ['clean', 'build'], function() {
	browserSync.init(null, options.browserSync);
});

// Inject bower components
gulp.task('wiredep', function() {
	var wiredep = require('wiredep').stream;

	gulp.src(paths.styles.source.main)
		.pipe(wiredep({
			directory: paths.bower.source
		}))
		.pipe(gulp.dest(paths.styles.wiredep));

	gulp.src(paths.html.source)
		.pipe(wiredep({
			directory: paths.bower.source,
			exclude: ['bootstrap-sass-official']
		}))
		.pipe(gulp.dest(settings.dirs.app));
});

gulp.task('watch', ['serve'], function() {

	// Watch for changes
	gulp.watch([paths.html.source], reload);

	gulp.watch(paths.styles.source.all, ['styles']);
	gulp.watch(paths.js.source, ['js']);
	gulp.watch(paths.templates.source, ['dust']);
	gulp.watch(paths.images.source, ['images']);
	gulp.watch('bower.json', ['wiredep']);
});
