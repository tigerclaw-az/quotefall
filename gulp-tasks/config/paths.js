/* jshint node: true */
'use strict';

// Dependencies
var _ = require('lodash'),
	args = require('./args'),
	settings = require('./settings'),
	appDir = settings.dirs.app,
	distDir = settings.dirs.dist,
	tmpDir = settings.dirs.tmp,
	output;

// Safe Default incase settings.json not found
var safe = {
	bower: {
		source: './bower_components'
	},
	clean: [
		settings.dirs.tmp,
		settings.dirs.dist
	],
	styles: {
		source: {
			all: [appDir + '/scss/**/*.scss'],
			main: [appDir + '/scss/main.scss']
		},
		serve: tmpDir + '/styles',
		dist: distDir + '/styles'
	},
	images: {
		source: [appDir + '/images/**/*'],
		serve: tmpDir + '/images',
		dist: distDir + '/images'
	},
	fonts: {
		source: appDir + '/fonts/**/*',
		serve: tmpDir + '/fonts',
		dist: distDir + '/fonts'
	},
	js: {
		source: appDir + '/js/**/*.js',
		serve: tmpDir + '/scripts',
		dist: distDir + '/scripts'
	},
	html: {
		source: appDir + '/*.html',
		serve: tmpDir,
		dist: distDir
	},
	templates: {
		source: appDir + '/templates/*.html',
		serve: tmpDir + '/scripts',
		dist: distDir + '/scripts'
	}
};

// Settings
try {
	output = require('../../../settings.json');
} catch (e) {
	output = {};
} finally {
	output.paths = output.paths || {};
	output = _.merge(safe, output.paths);
}

// Export
module.exports = output;
