/* jshint node: true */
'use strict';

var $ = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
	});

var gulp = require('gulp'),
	babelify = require('babelify'),
	browserify = require('browserify'),
	browserSync = require('browser-sync'),
	glob = require('glob'),
	reload = browserSync.reload,
	conf = require('./gulp-tasks/config/config'),
	source = require('vinyl-source-stream');

var options = conf.options,
	paths = conf.paths;

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

gulp.task('sass-lint', function() {
	return gulp.src(paths.styles.source.all)
		.pipe($.plumber())
		.pipe($.sassLint(options.sasslint))
		.pipe($.sassLint.format())
		.pipe($.sassLint.failOnError());
});

gulp.task('scss', ['sass-lint'], function() {
	return gulp.src(paths.app + '/scss/main.scss')
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.sass({ errLogToConsole: true }))
		.pipe($.autoprefixer(options.autoprefixer))
		.pipe($.sourcemaps.write())
		.pipe($.rename('main.css'))
		.pipe(gulp.dest(paths.styles.serve))
		.pipe(reload({ stream: true }))
		.pipe($.size());
});

gulp.task('partials', function () {
	return gulp.src([
		paths.join(paths.app, '/**/*.html'),
		paths.join(paths.tmp, '/**/*.html')
	])
	.pipe($.htmlmin({
		removeEmptyAttributes: true,
		removeAttributeQuotes: true,
		collapseBooleanAttributes: true,
		collapseWhitespace: true
	}))
	.pipe($.angularTemplatecache('templateCacheHtml.js', {
		module: 'gulpAngular',
		root: 'app'
	}))
	.pipe(gulp.dest(paths.tmp + '/partials/'));
});

gulp.task('html', ['wiredep', 'es6', 'scss'], function() {
	return gulp.src(paths.tmp + '/*.html')
		.pipe($.useref({ searchPath: [paths.tmp] }))
		// .pipe($.if('*.js', $.uglify()))
		.pipe($.replace('../../bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
		.pipe($.if('*.css', $.csso()))
		.pipe($.if('*.html', $.minifyHtml(options.minifyHtml)))
		.pipe(gulp.dest(paths.dist))
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
	return gulp.src($.mainBowerFiles().concat(paths.fonts.source))
		.pipe($.filter('**/*.{eot,otf,svg,ttf,woff,woff2}'))
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
		.pipe(gulp.dest(paths.tmp))
		.pipe(gulp.dest(paths.dist));
});

gulp.task('clean', function() {
	return $.del.sync(paths.clean, { force: true });
});

gulp.task('serve', ['build'], function() {
	browserSync(options.browserSync);

	return true;
});

// Inject bower components
gulp.task('wiredep', function() {
	var wiredep = require('wiredep').stream;

	// Only needed if we use bower:scss inside main.scss
	gulp.src(paths.styles.source.index)
		.pipe($.rename('main.scss'))
		.pipe(wiredep())
		.pipe(gulp.dest(paths.app + '/scss'));

	return gulp.src(paths.html.source)
		.pipe(wiredep(options.wiredep))
		.pipe(gulp.dest(paths.html.serve));
});

gulp.task('watch', ['serve'], function() {
	// Watch for changes
	gulp.watch([
		paths.html.serve + '/*.html',
		paths.images.source.join(','),
		paths.js.serve + '/**/*.js'
	]).on('change', reload);

	gulp.watch(paths.styles.source.all, ['scss']);
	gulp.watch(paths.fonts.source, ['fonts'], reload);
	gulp.watch(paths.js.source, ['es6']);
	gulp.watch(paths.images.source, ['images']);
	gulp.watch(paths.html.source, ['wiredep']);
	gulp.watch('bower.json', ['wiredep', 'fonts']);

	return true;
});

gulp.task('preflight', ['eslint']);

gulp.task('produce', ['preflight', 'wiredep', 'es6', 'scss', 'images', 'fonts']);

gulp.task('package', ['produce', 'html', 'extras']);

gulp.task('build', ['clean', 'package'], function() {
	return gulp.src(paths.dist + '/**/*')
		.pipe($.plumber())
		.pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('default', ['watch']);
