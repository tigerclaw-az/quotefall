'use strict';

/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks.
 */

var path = require('path');

exports.settings = {
	projectName: 'quotefall'
};

/**
 *  The main paths of your project handle these with care
 */
var paths = {
	src: 'src',
	dist: 'dist',
	tmp: '.tmp',
	e2e: 'e2e'
};

paths.app = path.join(paths.src, 'app');
paths.assets = {
	source: path.join(paths.src, 'assets'),
	dist: path.join(paths.dist, 'assets')
};

paths = Object.assign(paths, {
	clean: [
		paths.tmp,
		paths.dist
	],
	images: {
		source: [path.join(paths.assets.source, 'images/**/*')],
		dist: path.join(paths.assets.dist, 'images')
	},
	fonts: {
		source: path.join(paths.assets.source, 'fonts/**/*'),
		dist: path.join(paths.assets.dist, 'fonts')
	},
	scripts: {
		source: {
			all: [
				path.join(paths.app, '**/*.js'),
				'!' + path.join(paths.app, 'index.js')
			],
			index: path.join(paths.app, 'index.module.js'),
			test: path.join(paths.app, '**/*.spec.js')
		},
		out: path.join(paths.app, 'index.js'),
		dist: path.join(paths.dist, 'scripts')
	},
	html: {
		index: path.join(paths.src, 'index.html'),
		source: path.join(paths.app, '**/*.html'),
		dist: paths.dist
	},
	serve: {
		tmp: path.join(paths.tmp, 'serve')
	},
	styles: {
		inject: [],
		source: {
			all: [
				path.join(paths.app, '**/*.scss')
			],
			index: path.join(paths.app, 'index.scss')
		},
		dist: path.join(paths.dist, 'styles')
	}
});

paths.scripts.source.all.push('!' + paths.scripts.source.test);
paths.scripts.source.inject = paths.scripts.source.all.concat(
	[
		'!' + path.join(paths.app, 'index*')
	]
);
paths.scripts.serve = path.join(paths.serve.tmp, 'scripts');
paths.styles.serve = path.join(paths.serve.tmp, 'styles');
paths.styles.source.noindex = paths.styles.source.all.concat(
	['!' + paths.styles.source.index]
);
paths.styles.source.inject = paths.styles.source.noindex.concat(
	['!' + paths.app + '/config/*']
);

exports.paths = paths;

exports.options = {
	autoprefixer: {
		browsers: ['last 2 versions', '> 1%', 'safari >= 8'],
		remove: false
	},
	babelify: {
		plugins: [[ 'angularjs-annotate', { explicitOnly: true } ]],
		// Use all of the ES2015 spec
		presets: ['es2015'],
		sourceMaps: true
	},
	browserify: {
		debug: true
	},
	browserSync: {
		debugInfo: false,
		minify: false,
		open: false,
		port: 8181,
		reloadOnRestart: true,
		watchEvents: ['add', 'change']
	},
	imagemin: {
		optimizationLevel: 3,
		progressive: true,
		interlaced: true,
		/* Don't remove IDs from SVGs, they are often used
		 as hooks for embedding and styling */
		svgoPlugins: [{ cleanupIDs: false }]
	},
	inject: {
		transform: function(filePath) {
			filePath = filePath.replace(paths.app + '/', '');

			return '@import "' + filePath + '";';
		},
		starttag: '// injector',
		endtag: '// endinjector',
		addRootSlash: false
	},
	htmlmin: {
		collapseBooleanAttributes: true,
		collapseWhitespace: true,
		removeEmptyAttributes: true,
		removeAttributeQuotes: true,
		useShortDoctype: true
	},
	sass: {
		errLogToConsole: true,
		includePaths: [],
		outputStyle: 'expanded',
		precision: 10
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
		exclude: [/\/jquery\.js$/, /\/bootstrap\.js$/, /\/bootstrap-sass\/.*\.js/, /\/bootstrap\.css/],
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
	var gutil = require('gulp-util'),
		notify = require('gulp-notify');

	return function(err) {
		var errMsg = err.toString();

		notify(errMsg).write(errMsg);
		gutil.log(gutil.colors.red('[' + title + ']'), errMsg);
		this.emit('end');
	};
};
