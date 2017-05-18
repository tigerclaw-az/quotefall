'use strict';

// jscs:disable requireMultipleVarDecl
var $ = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'del']
	}),
	gulp = require('gulp');

var babelify = require('babelify'),
	browserSync = require('browser-sync'),
	browserify = require('browserify'),
	buffer = require('vinyl-buffer'),
	changeCase = require('change-case'),
	glob = require('glob'),
	path = require('path'),
	source = require('vinyl-source-stream');

var conf = require('./config'),
	options = conf.options,
	paths = conf.paths;

function compileScripts(test) {
	var files = [glob.sync(paths.scripts.out)];

	if (test) {
		files.push(glob.sync(paths.scripts.source.test));
	}

	options.browserify.entries = files;

	return injectScripts().on('end', function() {
		return browserify(options.browserify)
			.transform(babelify, options.babelify)
			.bundle().on('error', conf.errorHandler('bundle'))
			.pipe(source('app.js'))
			.pipe(buffer())
			.pipe($.sourcemaps.init({ loadMaps: true }))
			.pipe($.sourcemaps.write('./', { includeContent: true }))
			.pipe(gulp.dest(paths.scripts.serve));
	});
}

function injectScripts() {
	$.del.sync(paths.scripts.out, { force: true });

	var jsFiles = gulp.src(paths.scripts.source.inject, { read: false, cwd: './' }),
		fnInjectTransform = function(filepath, file) {
			var injectName = this.name,
				fileName = path.basename(filepath, '.js'),
				fileNameParse = path.parse(fileName),
				moduleName = changeCase.pascalCase(fileName),
				modulePath = filepath.replace('.js', ''),
				moduleType = fileNameParse.ext,
				moduleRef = fileNameParse.name;

			if (injectName === 'import-inject') {
				return `import { ${moduleName} } from './${modulePath}';`;
			}

			return `${moduleType}('${moduleRef}', ${moduleName})`;
		},
		injectOpts = {
			endtag: '/* endinject */',
			relative: true,
			transform: fnInjectTransform
		},
		importInjectOpts = Object.assign({}, injectOpts, {
			name: 'import-inject',
			starttag: '/* import-inject:js */'
		}),
		moduleInjectOpts = Object.assign({}, injectOpts, {
			name: 'module-inject',
			starttag: '/* module-inject:js */'
		});

	return gulp.src(paths.scripts.source.index, { cwd: './' })
		.pipe($.plumber(conf.onErrorHandler))
		.pipe($.inject(jsFiles, importInjectOpts))
		.pipe($.inject(jsFiles, moduleInjectOpts))
		.pipe($.rename('index.js'))
		.pipe(gulp.dest(paths.app));
}

gulp.task('scripts:lint', function() {
	return gulp.src(paths.scripts.source.all)
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
	compileScripts(true);
});

gulp.task('scripts:test-watch', function(callback) {
	// return webpackWrapper(true, true, callback);
});
