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
		wiredep: tmpDir + '/styles',
		dist: distDir + '/styles'
	},
	images: {
		source: [appDir + '/images/**/*'],
		dist: distDir + '/images'
	},
	fonts: {
		source: appDir + '/fonts/**/*',
		dist: distDir + '/fonts'
	},
	js: {
		source: appDir + '/js/**/*.js',
		dist: distDir + '/scripts'
	},
	html: {
		source: appDir + '/*.html',
		dist: distDir,
		wiredep: tmpDir
	},
	templates: {
		source: appDir + '/templates/*.html',
		dist: distDir + '/js'
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
