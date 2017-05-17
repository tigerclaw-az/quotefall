export function routerConfig($stateProvider, $urlRouterProvider) {
	'ngInject';

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('app', {
			// abstract: true,
			url: '/',
			views: {
				'': {
					controller: 'MainController as main',
				},
				'header': {
					templateUrl: 'app/components/header/header.tpl.html'
				},
				'content': {
					templateUrl: 'app/main/blank.tpl.html'
				}
			}
		})
		.state('app.create', {
			url: 'create',
			views: {
				'content@': {
					templateUrl: 'app/components/puzzle/puzzleForm.tpl.html'
					// TODO: Add specific controller for the form
				}
			}
		})
		;
}
