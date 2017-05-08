/* jshint node: true */
'use strict';

var $ = require('gulp-load-plugins')(),
	gulp = require('gulp'),
	babelify = require('babelify'),
	browserify = require('browserify'),
	browserSync = require('browser-sync'),
	glob = require('glob'),
	options = require('./gulp-tasks/config/options'),
	paths = require('./gulp-tasks/config/paths'),
	reload = browserSync.reload,
	sasslint = require('gulp-sass-lint'),
	settings = require('./gulp-tasks/config/settings'),
	source = require('vinyl-source-stream');

gulp.task('eslint', function() {
	return gulp.src(paths.js.source)
		.pipe($.eslint())
		/* Outputs hinting to console */
		.pipe($.eslint.format());
				//.pipe($.if(!browserSync.active, $.eslint.failOnError()))
});

gulp.task('es6', ['eslint'], function() {
	var files = glob.sync(paths.js.source);

	options.browserify.entries = files;

	return browserify(options.browserify)
		.transform(babelify, options.babelify)
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest(paths.js.serve));
});

gulp.task('dust', function() {
	gulp.src(paths.templates.source)
		.pipe($.rename({ extname: '' }))
		.pipe($.dust())
		.pipe($.concat('tpl.js'))
		.pipe(gulp.dest(paths.templates.serve))
		.pipe(reload({ stream: true }));
});

gulp.task('sass-lint', function() {
	return gulp.src(paths.styles.source.all)
		.pipe($.plumber())
		.pipe(sasslint(options.sasslint))
		.pipe(sasslint.format())
		.pipe(sasslint.failOnError());
});

gulp.task('scss', ['sass-lint'], function() {
	return gulp.src(paths.styles.source.main)
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.sass({ errLogToConsole: true }))
		.pipe($.autoprefixer(options.autoprefixer))
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(paths.styles.serve))
		.pipe(reload({ stream: true }))
		.pipe($.size());
});

gulp.task('html', ['wiredep', 'es6', 'dust', 'scss'], function() {
	return gulp.src(settings.dirs.tmp + '/*.html')
		.pipe($.useref({ searchPath: [settings.dirs.tmp] }))
		// .pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.csso()))
		.pipe($.if('*.html', $.minifyHtml(options.minifyHtml)))
		.pipe(gulp.dest(settings.dirs.dist))
		.pipe($.size());
});

gulp.task('images', function() {
	return gulp.src(paths.images.source)
		.pipe($.cache($.imagemin(options.imagemin)))
		.pipe(gulp.dest(paths.images.serve))
		.pipe(gulp.dest(paths.images.dist))
		.pipe(reload({ stream: true, once: true }))
		.pipe($.size());
});

gulp.task('fonts', function() {
	return gulp.src(require('main-bower-files')().concat(paths.fonts.source))
		.pipe($.if('*.{eot,svg,ttf,woff}', $.flatten()))
		.pipe(gulp.dest(paths.fonts.serve))
		.pipe(gulp.dest(paths.fonts.dist));
});

gulp.task('extras', function() {
	return gulp.src([
		'app/*.*',
		'!app/*.html'
		], {
			dot: true
		})
		.pipe(gulp.dest(settings.dirs.dist));
});

gulp.task('clean', function() {
	return require('del').sync(paths.clean, { force: true });
});

gulp.task('serve', ['build'], function() {
	browserSync(options.browserSync);
});

// Inject bower components
gulp.task('wiredep', function() {
	var wiredep = require('wiredep').stream;

	// Only needed if we use bower:scss inside main.scss
	// gulp.src(paths.styles.source.main)
	// 	.pipe(wiredep({
	// 		directory: paths.bower.source
	// 	}))
	// 	.pipe(gulp.dest(settings.dirs.app));

	gulp.src(paths.html.source)
		.pipe(wiredep(options.wiredep))
		.pipe(gulp.dest(paths.html.serve));
});

gulp.task('watch', ['serve'], function() {
	// Watch for changes
	gulp.watch([
		paths.html.serve + '/*.html',
		paths.images.source.join(','),
		paths.js.serve + '/app.js'
	]).on('change', reload);

	gulp.watch(paths.styles.source.all, ['scss']);
	gulp.watch(paths.fonts.source, ['fonts'], reload);
	gulp.watch(paths.js.source, ['es6']);
	gulp.watch(paths.templates.source, ['dust']);
	gulp.watch(paths.images.source, ['images']);
	gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('preflight', ['eslint']);

gulp.task('produce', ['preflight', 'wiredep', 'es6', 'scss', 'images', 'fonts']);

gulp.task('package', ['produce', 'html', 'extras']);

gulp.task('build', ['clean', 'package'], function() {
	return gulp.src(settings.dirs.dist + '/**/*')
		.pipe($.plumber())
		.pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('default', ['watch']);
