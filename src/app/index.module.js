import { config } from './index.config';
import { Utils } from './index.service';
import { routerConfig } from './index.route';

/* import-inject:js */
/* endinject */

var mod;

(function(ng) {
	'use strict';

	let deps = [
		'ngAnimate',
		'ngAria',
		'ngCookies',
		'ngMessages',
		'ngResource',
		'ngSanitize',
		'ngTouch',
		'toastr',
		'ui.bootstrap',
		'ui.router'
	];

	mod = ng.module('quotefall', deps)
		.constant('moment', moment)
		.constant('_', _)
		.config(config)
		.config(routerConfig)
		.service('utils', Utils)
		/* module-inject:js */
		/* endinject */
	;
})(angular);

export
	default mod;

