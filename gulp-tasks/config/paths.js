/* jshint node: true */
'use strict';

// Dependencies
var _ = require('lodash'),
	args = require('./args'),
	settings = require('./settings'),
	appDir = settings.dirs.app,
	distDir = settings.dirs.dist,
	output;

// Safe Default incase settings.json not found
var safe = {
	bower: {
		source: appDir + '/bower_components'
	},
	clean: [
		settings.dirs.app + '/css/main.css',
		settings.dirs.app + 'js/lib',
		'./' + settings.dirs.dist
	],
	styles: {
		source: {
			all: [appDir + '/sass/**/*.scss'],
			main: [appDir + '/sass/main.scss']
		},
		wiredep: appDir + '/css',
		dist: distDir + '/css'
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
		source: [appDir + '/js/*.js'],
		dist: appDir + '/js/lib'
	},
	html: {
		source: appDir + '/index.html',
		dist: distDir
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
