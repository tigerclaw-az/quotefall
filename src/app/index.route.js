export function routerConfig($stateProvider, $urlRouterProvider) {
	'ngInject';

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('app', {
			abstract: true,
			url: '',
			controller: 'mainController',
			controllerAs: 'mainCtrl',
			templateUrl: 'app/main/main.tpl.html',
			resolve: {
				// Ensure that puzzles are loaded properly before other route(s) that
				// requires them is run.
				puzzlesLoaded: (puzzleStore) => {
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
					controller: 'puzzleFormController as puzzleFormCtrl',
					templateUrl: 'app/components/puzzle/form/puzzleForm.tpl.html'
				}
			}
		})
		.state('app.edit', {
			url: '/edit',
			views: {
				content: {
					controller: 'puzzleController as puzzleCtrl',
					templateUrl: 'app/components/puzzle/puzzle.tpl.html'
				}
			}
		})
		.state('app.list', {
			url: '/list',
			resolve: {
				allPuzzles: (puzzlesLoaded) => {
					return puzzlesLoaded;
				}
			},
			views: {
				content: {
					controller: 'puzzleListController as puzzleListCtrl',
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
					controller: 'puzzleController as puzzleCtrl',
					templateUrl: 'app/components/puzzle/puzzle.tpl.html'
				}
			}
		})
		;
}
