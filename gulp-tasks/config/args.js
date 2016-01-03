/* jshint node: true */
'use strict';

// Dependencies
var args = require('yargs').argv,
	settings = require('./settings');

// Export
module.exports = {
	env: args.env === 'production'
};
