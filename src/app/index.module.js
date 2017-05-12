import { config } from './index.config';
import { routerConfig } from './index.route';
import { MainController } from './main/main.controller';
import { PuzzleDirective } from '../app/components/puzzle/puzzle.directive';

export
default angular.module('quotefall', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ngRoute', 'ui.bootstrap', 'toastr'])
	.constant('moment', moment)
	.config(config)
	.config(routerConfig)
	.controller('MainController', MainController)
	.directive('quotefallPuzzle', PuzzleDirective);
