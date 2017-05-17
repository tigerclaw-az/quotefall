export function routerConfig($stateProvider, $urlRouterProvider) {
	'ngInject';

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('app', {
			url: '/',
			templateUrl: 'app/main/main.html',
			controller: 'MainController',
			controllerAs: 'main'
		})
		.state('app.create', {
			url: 'create',
			views: {
				'puzzle-form': {
					templateUrl: 'app/components/puzzle/puzzleForm.tpl.html'
					// TODO: Add specific controller for the form
				}
			}
		})
		;
}
