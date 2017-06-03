'use strict';

var conf = require('./gulp/config'),
	path = require('path'),
	wiredep = require('wiredep');

function listFiles() {
	var wiredepOptions = Object.assign({}, conf.options.wiredep, {
			dependencies: true,
			devDependencies: true
		}),
		patterns = wiredep(wiredepOptions).js
			.concat([
				path.join(conf.paths.scripts.serve, 'app.js')
			])
			.concat([conf.paths.html.source]),
		files = patterns.map(function(pattern) {
			return {
				pattern: pattern
			};
		});

	files.push({
		pattern: path.join(conf.paths.assets.source, '/**/*'),
		included: false,
		served: true,
		watched: false
	});

	return files;
}

module.exports = function(config) {
	var configuration = {
		browsers: ['Chrome', 'PhantomJS'],

		client: {
			captureConsole: true
		},

		coverageReporter: {
			type: 'html',
			dir: 'coverage/'
		},

		files: listFiles(),

		frameworks: ['phantomjs-shim', 'jasmine'],

		logLevel: 'WARN',

		loggers: [
			{ type: 'console' }
		],

		ngHtml2JsPreprocessor: {
			stripPrefix: conf.paths.src + '/',
			moduleName: 'quotefall'
		},

		plugins: [
			'karma-chrome-launcher',
			'karma-phantomjs-launcher',
			'karma-phantomjs-shim',
			'karma-coverage',
			'karma-jasmine',
			'karma-ng-html2js-preprocessor',
			'karma-spec-reporter',
			'karma-jasmine-html-reporter'
		],

		// proxies: {
		// 	'/assets/': path.join('/base/', conf.paths.assets.source)
		// }
	};

	// This is the default preprocessors configuration for a usage with Karma cli
	// The coverage preprocessor is added in gulp/unit-test.js only for single tests
	// It was not possible to do it there because karma doesn't let us now if we are
	// running a single test or not
	configuration.preprocessors = {};
	configuration.preprocessors[conf.paths.html.source] = ['ng-html2js'];

	// This block is needed to execute Chrome on Travis
	// If you ever plan to use Chrome and Travis, you can keep it
	// If not, you can safely remove it
	// https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
	if (configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
		configuration.customLaunchers = {
			'chrome-travis-ci': {
				base: 'Chrome',
				flags: ['--no-sandbox']
			}
		};
		configuration.browsers = ['chrome-travis-ci'];
	}

	config.set(configuration);
};
