/* jshint node: true */
'use strict';

// Dependencies
var _ = require('lodash'),
	args = require('./args'),
	paths = require('./paths'),
	settings = require('./settings'),
	output;

// Safe Default incase settings.json not found
var safe = {
	autoprefixer: {
		browsers: ['last 2 versions', '> 1%', 'safari >= 8'],
		remove: false
	},
	babelify: {
		// Use all of the ES2015 spec
		presets: ['es2015'],
		sourceMaps: true
	},
	browserify: {
		debug: true
	},
	browserSync: {
		debugInfo: false,
		port: 9000,
		server: {
			baseDir: [settings.dirs.tmp],
			directory: false,
			routes: {
				'/bower_components': 'bower_components'
			}
		},
		xip: false
	},
	imagemin: {
		optimizationLevel: 3,
		progressive: true,
		interlaced: true,
		/* Don't remove IDs from SVGs, they are often used
		 as hooks for embedding and styling */
		svgoPlugins: [{ cleanupIDs: false }]
	},
	minifyHtml: {
		conditionals: true,
		loose: true
	},
	sass: {
		outputStyle: 'expanded',
		includePaths: [],
		errLogToConsole: true
	},
	sasslint: {
		config: '/.sass-lint.yml'
	},
	wiredep: {
		// exclude: ['bootstrap-sass'],
		overrides: {
			'jquery-ui': {
				main: ['themes/dark-hive/jquery-ui.css']
			}
		}
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
