export class MainController {
	constructor ($scope, $state, $log, $timeout, utils, answerGridModel, letterColumnsModel, puzzleModel, puzzleStore) {
		'ngInject';

		this.$scope = $scope;
		this.$state = $state;

		this.activate($timeout);

		this.answerGridModel = answerGridModel;
		this.letterColumnsModel = letterColumnsModel;
		this.puzzleModel = puzzleModel;
		this.puzzleStore = puzzleStore;
		this.utils = utils;

		this.puzzles = this.puzzleStore.puzzles;

		this.puzzleStore.loadPuzzles('puzzles.json');
	}

	activate($timeout) {
		$timeout(() => {
			this.classAnimation = 'rubberBand';
		}, 4000);
	}
}
