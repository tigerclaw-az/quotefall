export function routerConfig($stateProvider, $urlRouterProvider) {
	'ngInject';

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('app', {
			abstract: true,
			url: '',
			controller: 'mainController',
			controllerAs: 'main',
			templateUrl: 'app/main/main.tpl.html',
			resolve: {
				puzzles: (puzzleStore) => {
					return puzzleStore.loadPuzzles('puzzles.json');
				}
			}
		})
		.state('app.home', {
			url: '/'
		})
		.state('app.new', {
			url: '/new',
			views: {
				content: {
					controller: 'puzzleFormController as puzzleForm',
					templateUrl: 'app/components/puzzle/form/puzzleForm.tpl.html'
				}
			}
		})
		.state('app.list', {
			url: '/list',
			views: {
				content: {
					controller: 'puzzleListController as puzzleList',
					templateUrl: 'app/components/puzzle/list/puzzleList.tpl.html'
				}
			}
		})
		.state('puzzle', {
			parent: 'app',
			url: '/puzzle/:id',
			stateParams: {
				id: ''
			},
			views: {
				content: {
					controller: 'puzzleController as puzzle',
					templateUrl: 'app/components/puzzle/puzzle.tpl.html'
				}
			}
		})
		.state('puzzle.edit', {
			url: '/edit'
		})
		;
}
