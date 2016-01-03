'use strict';
// generated on 2015-12-31 using generator-gulp-foundation 0.0.3

var gulp = require('gulp');
var options = require('./gulp-tasks/config/options');
var paths = require('./gulp-tasks/config/paths');
var settings = require('./gulp-tasks/config/settings');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gutil = require('gulp-util');
var del = require('del');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('dust', function() {
	gulp.src('app/templates/*.html')
		.pipe($.dust())
		.pipe($.concat('tpl.js'))
		.pipe(gulp.dest(paths.js.dist))
		.pipe(reload({stream:true}));
});

gulp.task('styles', function () {
    return gulp.src(paths.styles.source.main)
        .pipe($.sass({errLogToConsole: true}))
        .pipe($.autoprefixer(options.autoprefixer))
        .pipe(gulp.dest(settings.dirs.app + '/css'))
        .pipe(reload({stream:true}))
        .pipe($.size());
});

//gulp.task('styles-watch', ['styles'], reload);

gulp.task('js', function () {
    return gulp.src(paths.js.source)
    	.pipe($.jscs())
		.pipe($.jscsStylish())
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe(reload({stream:true}));
});

//gulp.task('scripts-watch', ['js'], reload);

gulp.task('html', ['dust', 'styles', 'js'], function () {
    return gulp.src(paths.html.source)
        .pipe($.useref())
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cssnano()))
        .pipe(gulp.dest(settings.dirs.dist))
        .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src(paths.images.source)
        .pipe($.cache($.imagemin(options.imagemin)))
        .pipe(gulp.dest(paths.images.dist))
        .pipe(reload({stream:true, once:true}))
        .pipe($.size());
});

gulp.task('fonts', function () {
    gulp.src(paths.fonts.source)
        //.pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.if('*.{eot,svg,ttf,woff}' ,$.flatten()))
        .pipe(gulp.dest(paths.fonts.dist))
        .pipe($.size());
});

gulp.task('clean', function () {
    return del(['app/css/main.css', './' + settings.dirs.dist], {force: true});
});

gulp.task('build', ['clean'], function() {
	gulp.start('html');
	gulp.start('images');
	gulp.start('fonts');
});

gulp.task('default', ['watch']);

gulp.task('serve', ['clean', 'build'], function () {
    browserSync.init(null, options.browserSync);
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;
    gulp.src(paths.styles.source.all)
        .pipe(wiredep({
            directory: paths.bower.source
        }))
        .pipe(gulp.dest(paths.styles.dist));
    gulp.src(paths.html.source)
        .pipe(wiredep({
            directory: paths.bower.source,
            exclude: ['bootstrap-sass-official']
        }))
        .pipe(gulp.dest(settings.dirs.app));
});

gulp.task('watch', ['serve'], function () {

    // watch for changes
    gulp.watch([paths.html.source], reload);

    gulp.watch(paths.styles.source.all, ['styles']);
    gulp.watch(paths.js.source, ['js']);
    gulp.watch(paths.images.source, ['images']);
    gulp.watch('bower.json', ['wiredep']);
});
