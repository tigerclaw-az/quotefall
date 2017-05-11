/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
var paths = {
	app: 'app',
	src: 'src',
	dist: 'dist',
	tmp: '.tmp',
	e2e: 'e2e'
};

exports.paths = Object.assign(paths, {
	bower: {
		source: paths.app + 'dev-serve/bower_components'
	},
	clean: [
		paths.tmp,
		paths.dist
	],
	styles: {
		source: {
			all: [paths.app + '/scss/**/*.scss', '!main.scss'],
			index: paths.app + '/scss/index.scss'
		},
		serve: paths.tmp + '/styles',
		dist: paths.dist + '/styles'
	},
	images: {
		source: [paths.app + '/images/**/*'],
		serve: paths.tmp + '/images',
		dist: paths.dist + '/images'
	},
	fonts: {
		source: paths.app + '/fonts/**/*',
		serve: paths.tmp + '/fonts',
		dist: paths.dist + '/fonts'
	},
	js: {
		source: paths.app + '/js/**/*.js',
		serve: paths.tmp + '/scripts',
		dist: paths.dist + '/scripts'
	},
	html: {
		source: paths.app + '/*.html',
		serve: paths.tmp,
		dist: paths.dist
	},
	templates: {
		source: paths.app + '/templates/*.html',
		serve: paths.tmp + '/scripts',
		dist: paths.dist + '/scripts'
	}
});

exports.options = {
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
			baseDir: [paths.tmp],
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
	/**
	 *  Wiredep is the lib which inject bower dependencies in your project
	 *  Mainly used to inject script tags in the index.html but also used
	 *  to inject css preprocessor deps and js files in karma
	 */
	wiredep: {
		exclude: [/\/bootstrap\.js$/, /\/bootstrap-sass\/.*\.js/, /\/bootstrap\.css/],
		directory: 'bower_components',
		overrides: {
			'jquery-ui': {
				main: ['themes/dark-hive/jquery-ui.css']
			}
		}
	}
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
	'use strict';

	return function(err) {
		gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
		this.emit('end');
	};
};
