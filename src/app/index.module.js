import { config } from './index.config';
import { routerConfig } from './index.route';
import { MainController } from './main/main.controller';
import { PantherParserDirective } from '../app/components/form/pantherParser.directive';
import { PuzzleDirective } from '../app/components/puzzle/puzzle.directive';

let deps = [
	'ngAnimate',
	'ngCookies',
	'ngTouch',
	'ngSanitize',
	'ngMessages',
	'ngAria',
	'ngResource',
	'ngRoute',
	'ui.bootstrap',
	'toastr'
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
