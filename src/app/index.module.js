import { config } from './index.config';
import { routerConfig } from './index.route';

/* import-inject:js */
/* endinject */

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

export
default angular.module('quotefall', deps)
	.constant('moment', moment)
	.config(config)
	.config(routerConfig)
	/* module-inject:js */
	/* endinject */
;
