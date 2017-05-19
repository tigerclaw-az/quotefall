export function routerConfig($stateProvider, $urlRouterProvider) {
	'ngInject';

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('app', {
			abstract: true,
			url: '',
			controller: 'mainController',
			controllerAs: 'main',
			templateUrl: 'app/main/main.tpl.html'
		})
		.state('app.home', {
			// parent: 'app',
			url: '/'
		})
		.state('puzzle', {
			abstract: true,
			parent: 'app',
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
				}
			}
		})
		;
}
