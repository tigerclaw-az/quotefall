export class MainController {
	constructor ($scope, $state, $log, $timeout, utils, answerGridModel, letterColumnsModel, puzzleModel, puzzleStore) {
		'ngInject';

		this.$log = $log;
		this.$scope = $scope;
		this.$state = $state;

		this.activate($timeout);

		this.answerGridModel = answerGridModel;
		this.letterColumnsModel = letterColumnsModel;
		this.puzzleModel = puzzleModel;
		this.utils = utils;

		$scope.puzzleStore = puzzleStore;
		$scope.puzzles = $scope.puzzleStore.puzzles;

		this.$log.info('constructor()', this, $scope);

		$scope.puzzleStore.loadPuzzles('puzzles.json');
	}

	activate($timeout) {
		$timeout(() => {
			this.classAnimation = 'rubberBand';
		}, 4000);
	}
}
