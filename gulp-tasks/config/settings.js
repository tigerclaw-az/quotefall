/* jshint node: true */
'use strict';

// Dependencies
var _ = require('lodash'),
	output;

// Safe Default incase settings.json not found
var safe = {
	dirs: {
		app: './app',
		dist: './dist',
		tmp: './.tmp'
	},
	defaults: {

	}
};

// Settings
try {
	output = require('../../../settings.json');
} catch (e) {
	output = {};
} finally {
	output = _.merge(safe, output);
}

// Export
module.exports = output;
