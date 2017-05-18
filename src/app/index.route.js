export function routerConfig($stateProvider, $urlRouterProvider) {
	'ngInject';

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('app', {
			url: '/',
			views: {
				'': {
					controller: 'MainController as main'
				},
				header: {
					templateUrl: 'app/components/header/header.tpl.html'
				}
			}
		})
		.state('puzzle', {
			abstract: true,
			url: '/puzzle',
			views: {
				content: {
					templateUrl: 'app/components/puzzle/puzzle.tpl.html'
				}
			}
		})
		.state('puzzle.create', {
			url: '/create',
			views: {
				puzzleForm: {
					templateUrl: 'app/components/puzzle/form/puzzleForm.tpl.html'
					// TODO: Add specific controller for the form
				}
			}
		})
		;
}
