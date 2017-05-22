'use strict';

// jscs:disable requireMultipleVarDecl
var $ = require('gulp-load-plugins')({
		pattern: ['gulp-*']
	}),
	gulp = require('gulp');

var karma = require('karma');

var conf = require('./config'),
	path = require('path'),
	paths = conf.paths,
	pathSrcJs = [
		path.join(paths.scripts.serve, 'app.js')
	];

function runTests(singleRun, done) {
	var reporters = ['progress'],
		preprocessors = {},
		localConfig = {
			configFile: path.join(__dirname, '/../karma.conf.js'),
			singleRun: singleRun,
			autoWatch: !singleRun
		},
		server;

	[paths.html.source].forEach(function(path) {
		preprocessors[path] = ['ng-html2js'];
	});

	if (singleRun) {
		pathSrcJs.forEach(function(path) {
			preprocessors[path] = ['coverage'];
		});

		reporters.push('coverage');
	}

	Object.assign(localConfig, {
		reporters: reporters,
		preprocessors: preprocessors
	});

	server = new karma.Server(localConfig, function(failCount) {
		done(failCount ? new Error(`Failed ${failCount} tests.`) : null);
	});

	server.start();
}

gulp.task('test', ['scripts:test'], function(done) {
	return runTests(true, done);
});

gulp.task('test:auto', ['scripts:test-watch'], function(done) {
	return runTests(false, done);
});
