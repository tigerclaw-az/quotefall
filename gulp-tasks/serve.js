/* jshint node: true */
'use strict';

// Dependencies
var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	options = require('./config/options'),
	paths = require('./config/paths'),
	updateImports = require('./utility/update-imports'),
	getSassImports = require('./utility/get-sass-imports'),
	reload = browserSync.reload;

// Export
module.exports = function() {
	browserSync(options.browserSync);

	// Update SCSS @imports when new files are created
	gulp.watch(paths.css.source, function(event) {
		if (event.type === 'added' || event.type === 'deleted') {
			updateImports(getSassImports(paths.create.components, '../'),
						getSassImports(paths.create.patterns));
		}
	});

	// Compile styles when SCSS files are updated
	gulp.watch(paths.css.source, ['styles']);

	// Compile JS files when files are added/deleted/modifed for Head or Foot
	gulp.watch([paths.js.source.head, paths.js.source.foot], ['js-watch']);

	// Refresh Page on HTML file changes
	gulp.watch(paths.html.source, ['pages-watch']);

	return true;
};
