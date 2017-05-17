import { config } from './index.config';
import { routerConfig } from './index.route';
import { MainController } from './main/main.controller';
import { PantherParserDirective } from '../app/shared/form/pantherParser.directive';
import { PuzzleDirective } from '../app/components/puzzle/puzzle.directive';

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
	.controller('MainController', MainController)
	.directive('puzzle', PuzzleDirective)
	.directive('pantherParser', PantherParserDirective)
;
