/* jshint node: true */
'use strict';

// Dependencies
var _ = require('lodash'),
	settings = require('./settings'),
	args = require('./args'),
	output;

// Safe Default incase settings.json not found
var safe = {
	autoprefixer: {
		browsers: ['last 2 versions', '> 1%', 'ie 8', 'ie 7'],
		remove: false
	},
	browserSync: {
		server: {
			baseDir: settings.dirs.app,
			directory: false
		},
		debugInfo: false,
		xip: false,
		port: 9000
	},
	imagemin: {
		optimizationLevel: 3,
		progressive: true,
		interlaced: true
	},
	sass: {
		outputStyle: 'expanded',
		includePaths: [],
		errLogToConsole: true
	},
	sasslint: {
		config: '/.sass-lint.yml'
	}
};

// Settings
try {
	output = require('../../../settings.json');
} catch (e) {
	output = {};
} finally {
	output = _.merge(safe, output.options);
}

// Export
module.exports = output;
