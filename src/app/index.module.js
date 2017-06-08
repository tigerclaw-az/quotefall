import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { AppConfigConstant } from './config/appConfig.constant';

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
	'angular-logger',
	'toastr',
	'ui.bootstrap',
	'ui.router'
	/* deps-inject:js */
	/* endinject */
];

(function(ng) {
	'use strict';

	ng.module('quotefall', deps)
		.constant('moment', moment)
		.constant('_', _)
		.constant('appConfig', AppConfigConstant)
		.config(config)
		.config(routerConfig)
		.run(runBlock)
	;
})(angular);
