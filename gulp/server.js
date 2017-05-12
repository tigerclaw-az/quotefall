'use strict';

var path = require('path'),
	gulp = require('gulp'),
	conf = require('./config'),
	paths = conf.paths;

var browserSync = require('browser-sync'),
	browserSyncSpa = require('browser-sync-spa'),
	util = require('util');

var isOnlyChange = function(event) {
	return event.type === 'changed';
};

function browserSyncInit(baseDir, browser) {
	var options = conf.options.browserSync,
		routes = null,
		server;

	browser = browser === undefined ? 'default' : browser;

	if (baseDir === paths.src || (util.isArray(baseDir) && baseDir.indexOf(paths.src) !== -1)) {
		routes = {
			'/bower_components': 'bower_components'
		};
	}

	server = {
		baseDir: baseDir,
		routes: routes
	};

	options = Object.assign(options, {
		startPath: '/',
		server: server,
		browser: browser
	});

	/*
	* You can add a proxy to your backend by uncommenting the line below.
	* You just have to configure a context which will we redirected and the target url.
	* Example: $http.get('/users') requests will be automatically proxified.
	*
	* For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.9.0/README.md
	*/
	// server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', changeOrigin: true});

	browserSync.instance = browserSync.init(options);
}

/** NEW **/
// gulp.task('watch', ['scripts:watch', 'inject'], function() {
// 	gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject-reload']);

// 	gulp.watch([
// 		path.join(conf.paths.app, '/**/*.css'),
// 		path.join(conf.paths.app, '/**/*.scss')
// 	], function(event) {
// 		if (isOnlyChange(event)) {
// 			gulp.start('styles-reload');
// 		} else {
// 			gulp.start('inject-reload');
// 		}
// 	});

// 	gulp.watch(path.join(conf.paths.app, '/**/*.html'), function(event) {
// 		browserSync.reload(event.path);
// 	});
// });

/** OLD **/
gulp.task('watch', ['clean', 'wiredep', 'scripts', 'styles'], function() {
	// Watch for changes
	gulp.watch([
		paths.html.serve + '/*.html',
		paths.fonts.source,
		paths.images.source.join(','),
		paths.scripts.serve + '/**/*.js'
	]).on('change', browserSync.reload);

	gulp.watch(paths.styles.source.all, ['styles']);
	gulp.watch(paths.scripts.source, ['scripts']);
	gulp.watch('bower.json', ['wiredep', 'fonts']);

	gulp.watch(path.join(paths.html.source), function(event) {
		browserSync.reload(event.path);
	});

	return true;
});

/** SERVE **/

browserSync.use(browserSyncSpa({
	selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch'], function() {
	browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function() {
	browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function() {
	browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function() {
	browserSyncInit(conf.paths.dist, []);
});
