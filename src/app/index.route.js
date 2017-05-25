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
			url: '/'
		})
		.state('puzzle', {
			parent: 'app',
			url: '/puzzle/:id',
			stateParams: {
				id: ''
			},
			views: {
				content: {
					templateUrl: 'app/components/puzzle/puzzle.tpl.html'
				}
			}
		})
		.state('puzzle.edit', {
			url: '/edit'
		})
		.state('app.new', {
			url: '/new',
			views: {
				content: {
					controller: 'puzzleFormController',
					controllerAs: 'puzzleForm',
					templateUrl: 'app/components/puzzle/form/puzzleForm.tpl.html'
				}
			}
		})
		;
}
